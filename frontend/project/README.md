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
