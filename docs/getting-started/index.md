# 🚀 Getting Started with JanAI

This guide will walk you through cloning, setting up, and running the JanAI platform on your local environment.

---

## 📋 Prerequisites
- **Python 3.12+**
- **Node.js 20+** and **npm**
- **Git**

---

## ⚙️ 1. Backend Setup

```bash
# Clone repository
git clone https://github.com/deswanth12/JanAI.git
cd JanAI/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn app.main:app --port 8000 --reload
```

---

## 🎨 2. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` in your browser!
