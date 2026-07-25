# 🏛️ System Architecture & Visual Workflow Guide

JanAI is engineered as a **Modular Monolith** designed for high-throughput citizen welfare delivery, zero-hallucination AI reasoning, and multi-tenant operational control.

---

## 🌐 Overall Ecosystem Architecture

```mermaid
graph TD
    subgraph Client Layer
        A[👤 Citizen App /] -->|HTTP / REST| G[Gateway Shield / CORS / CSP]
        B[🏢 JanAI OS /admin] -->|HTTP / REST| G
        C[🤝 Partner Portal /partner] -->|HTTP / REST| G
    end

    subgraph Modular Monolith Core
        G --> Auth[Identity & Security Domain]
        G --> Search[Search & Vector Domain]
        G --> Scheme[Scheme & Gazette Domain]
        G --> App[Application Domain]
        G --> Doc[Document Vault Domain]
        G --> AI[AI RAG Reasoning Domain]

        Auth -->|Publish Events| Bus[Asynchronous EventBus]
        App -->|Publish Events| Bus
        Doc -->|Publish Events| Bus

        Bus --> Notif[Multi-Channel Notification Domain]
        Bus --> Audit[Audit & Privacy Ledger Domain]
    end

    subgraph Persistence Layer
        Auth & App & Scheme & Audit --> DB[(SQLite / PostgreSQL)]
        Doc --> Vault[(Encrypted AES-256 Vault)]
    end
```

---

## 🔄 Citizen Request Lifecycle Flow

```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant Portal as Citizen Portal (/dashboard)
    participant Gateway as FastAPI API Gateway
    participant Search as Search & Vector Domain
    participant AI as Grounded Gazette RAG Engine
    participant DB as Gazette Database

    Citizen->>Portal: Enter Query "Scholarship for B.Tech"
    Portal->>Gateway: GET /api/v1/citizen/schemes?query=...
    Gateway->>Search: search_schemes("scholarship for B.Tech")
    Search->>Search: Normalize Vernacular Terms ("b.tech" -> "undergraduate")
    Search-->>Gateway: Return Scheme Match (< 20ms)
    Gateway-->>Portal: Render Scheme Cards

    Citizen->>Portal: Click "Check AI Eligibility"
    Portal->>Gateway: POST /api/v1/ai/evaluate
    Gateway->>AI: Evaluate Household (Income, Age, Caste)
    AI->>DB: Query Gazette Rulebook & Citations
    DB-->>AI: Return Gazette PDF Rule Clause
    AI-->>Gateway: Return Grounded Decision + Citations (P95 < 150ms)
    Gateway-->>Portal: Render 8-Point Trust Decision Matrix
```
