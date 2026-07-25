# 🚀 Cloud Deployment Guide

JanAI is prepared for one-click cloud deployment via **Vercel** (Frontend) and **Render.com / DigitalOcean** (Backend).

---

## 🌐 Production Environment Variables

### Frontend (`frontend/.env.production`)
```env
VITE_API_URL=https://api.janai.in
```

### Backend (`backend/.env.production`)
```env
JWT_SECRET_KEY=production-rsa-signing-key-2026
ALLOW_ORIGINS=https://janai.in,https://preview.janai.in
```
