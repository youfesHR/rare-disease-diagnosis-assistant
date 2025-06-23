# Rare Disease Diagnosis Assistant

A web-based application that helps users identify possible rare diseases based on symptom descriptions using semantic similarity search with machine learning.

---

## 🧠 Project Overview

This project leverages advanced Natural Language Processing (NLP) techniques to compare user symptoms against a curated dataset of rare diseases. Using the `SentenceTransformer` model and `FAISS` for efficient similarity search, it returns the most relevant rare diseases with similarity scores and detailed information links.

The app includes:

- ✅ A user-friendly frontend interface for inputting symptoms and displaying results.
- ⚡ A FastAPI backend serving the prediction model and dataset.
- 🔍 Integration of a semantic search pipeline for accurate diagnosis assistance.

---

## 🚀 Features

- Input symptoms in natural language.  
- Receive a ranked list of possible rare diseases with similarity percentages.  
- Access detailed disease information through trusted external links.  
- Multilingual support (English & French).  
- Responsive and modern UI (React + Tailwind CSS).

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite  
- **Backend:** Python, FastAPI, SentenceTransformer, FAISS, PyNgrok  
- **Development:** Ngrok (backend tunneling), Git & GitHub

---

## 📦 Getting Started

### Prerequisites

- Node.js & npm/yarn (for frontend)  
- Python 3.8+ (for backend)  
- Git

---

### ⚙️ Installation

#### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py

---

#### Frontend

cd frontend/project
npm install
npm run dev
Then open your browser and visit:

http://localhost:5173
Make sure both the frontend and backend are running at the same time in two separate terminals.
---
####🧪 Usage
Enter symptoms in the input field using natural language.

Click the Search button.

View a ranked list of potential rare diseases with similarity scores.

Click More Info to access external medical resources about each disease.
----
🔮 Future Improvements
Integrate a larger and more diverse rare disease dataset.

Add user authentication and personal health history tracking.

Visualize disease insights using interactive charts.

Deploy both frontend and backend on a cloud platform (e.g., Vercel + Render).

Add support for additional languages and accessibility features.
---
####🧑‍💻 How to Run Locally on Another PC
Clone the repository:


git clone https://github.com/youfesHR/rare-disease-diagnosis-assistant.git
cd rare-disease-diagnosis-assistant
Start the backend:

cd backend
pip install -r requirements.txt
python app.py
Start the frontend:

cd frontend/project
npm install
npm run dev
Open your browser and go to:
http://localhost:5173
✅ Make sure both frontend and backend are running simultaneously.

🤝 Contributing
Contributions are welcome!
Feel free to fork the repository, make changes, and submit a pull request.


📬 Contact
Harbi youssef – LinkedIn
Project Repository: GitHub
