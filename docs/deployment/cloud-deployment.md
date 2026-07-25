# 🚀 Cloud Deployment Architecture Guide

JanAI is engineered for zero-downtime cloud deployment across **Vercel** (Frontend SPA) and **Render / DigitalOcean** (FastAPI Backend Engine).

---

## 🌐 Cloud Infrastructure Deployment Architecture

```mermaid
graph LR
    subgraph Global Edge CDN (Vercel)
        CDN[Vercel Edge Network] --> SPA[React 18 SPA static bundle]
    end

    subgraph Backend Cloud (Render / DigitalOcean)
        LB[HTTPS Load Balancer] --> API1[FastAPI Worker 1]
        LB --> API2[FastAPI Worker 2]
        API1 & API2 --> DB[(Managed PostgreSQL DB)]
    end

    SPA -->|VITE_API_URL=https://api.janai.in| LB
```
