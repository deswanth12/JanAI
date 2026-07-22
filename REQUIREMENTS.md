# 📋 System Prerequisites & Dependency Requirements

This document details all technical prerequisites, environment configurations, and software dependencies required to run the **JanAI Platform** locally or in production.

---

## 🛠️ System Requirements

| Requirement | Minimum Version | Recommended Version |
| :--- | :--- | :--- |
| **Node.js** | v18.0.0 | v20.x LTS |
| **npm** | v9.0.0 | v10.x |
| **Python** | v3.10.0 | v3.12.x |
| **pip** | v23.0 | Latest |
| **Git** | v2.30.0 | Latest |
| **Operating System** | Windows 10/11, macOS 12+, or Ubuntu 22.04 LTS | Any |

---

## 🐍 Backend Python Dependencies (`backend/requirements.txt`)

Installed via `pip install -r requirements.txt`:

```text
fastapi>=0.110.0          # High-performance REST API framework
uvicorn>=0.28.0           # ASGI web server implementation
pydantic>=2.6.0           # Data validation and settings management
python-dotenv>=1.0.0      # Loading environment variables from .env
google-generativeai>=0.4.0 # Gemini API Python client
requests>=2.31.0          # HTTP requests library
```

---

## ⚛️ Frontend Node Dependencies (`frontend/package.json`)

Installed via `npm install`:

### Core Dependencies
- `react` (`^19.2.5`): UI component rendering library.
- `react-dom` (`^19.2.5`): DOM bindings for React.
- `react-router-dom` (`^7.15.0`): Client-side SPA routing.
- `@google/generative-ai` (`^0.24.1`): Google Gemini Flash JS SDK.
- `lucide-react` (`^1.14.0`): UI Icon system.
- `recharts` (`^3.8.1`): Interactive analytics charts.
- `framer-motion` (`^12.38.0`): UI animations.

### Developer Dependencies
- `vite` (`^8.0.10`): Next-generation frontend tooling & dev server.
- `tailwindcss` (`^4.3.0`): Utility-first CSS framework.
- `@tailwindcss/postcss` (`^4.3.0`): PostCSS plugin for Tailwind CSS v4.
- `eslint` (`^10.2.1`): Code quality & linting.

---

## 🔑 Environment Variables (`.env.example`)

Copy `.env.example` to `.env` in your project root or `frontend/` directory:

```bash
VITE_GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
VITE_BACKEND_URL=http://127.0.0.1:8000
```

> **Note**: If `VITE_GEMINI_API_KEY` is omitted, JanAI automatically falls back to its built-in offline RAG engine with zero downtime or errors.

---

## 🚀 One-Line Installation Commands

```bash
# 1. Install Backend Dependencies
cd backend && python -m pip install -r requirements.txt

# 2. Install Frontend Dependencies
cd ../frontend && npm install
```
