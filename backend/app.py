 import nest_asyncio
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
from pydantic import BaseModel
import re
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Allow asyncio in Colab
nest_asyncio.apply()

app = FastAPI()

# === CORS Middleware ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class SymptomRequest(BaseModel):
    symptoms: str

# Preprocess input
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    return ' '.join([word for word in text.split() if word not in set(["and", "the", "in", "i", "have"])])

# Upload diseases.json manually via Colab file dialog
from google.colab import files
uploaded = files.upload()

# Load diseases
with open("diseases.json", "r", encoding="utf-8") as f:
    diseases = json.load(f)

texts = [
    f"Symptoms: {', '.join(d.get('symptoms', []))}. Description: {d.get('description', '')}"
    for d in diseases
]

metadata = [{
    "id": d["id"],
    "name": d["name"],
    "description": d.get("description", ""),
    "url": d.get("url", "")
} for d in diseases]

# Load model & FAISS
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts, show_progress_bar=True, batch_size=32).astype("float32")
faiss.normalize_L2(embeddings)
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)
index.add(embeddings)

# Search function (fixed score handling)
def search_diseases(user_input, top_k=5, min_score=0.3):
    clean_input = preprocess_text(user_input)
    user_vector = model.encode([clean_input], convert_to_numpy=True).astype("float32")
    faiss.normalize_L2(user_vector)

    distances, indices = index.search(user_vector, top_k * 2)
    input_keywords = set(clean_input.split())
    candidates = []

    for dist, idx in zip(distances[0], indices[0]):
        if dist < min_score:
            continue
        disease = metadata[idx]
        name = (disease.get("name") or "").lower()
        desc = (disease.get("description") or "").lower()
        combined_text = f"{name} {desc}"
        match_count = sum(1 for word in input_keywords if word in combined_text)
        boost = 0.01 * match_count
        final_score = float(dist + boost)

        candidates.append({
            "name": disease["name"],
            "url": disease.get("url", "N/A"),
            "similarity": round(final_score, 4)  # Already a float between 0 and 1+
        })

    return sorted(candidates, key=lambda x: x["similarity"], reverse=True)[:top_k]

# Endpoint
@app.post("/predict")
def predict(symptoms: SymptomRequest):
    return {"results": search_diseases(symptoms.symptoms)}

# Start public tunnel
public_url = ngrok.connect(8000)
print("🚀 Public API URL:", public_url)

# Run server
uvicorn.run(app, host="0.0.0.0", port=8000)

# 🔁 Paste your full backend.py FastAPI code here
