# 🇮🇳 JanAI — Enterprise AI Citizen Welfare Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.0-61DAFB.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev)
[![Security: RS256 JWT](https://img.shields.io/badge/Security-RS256_RSA_JWT-purple.svg)]()
[![Compliance: DPDP Act 2023](https://img.shields.io/badge/Compliance-DPDP_Act_2023-gold.svg)]()

> **JanAI** is a state-grounded, multi-lingual AI assistant helping every Indian citizen discover, evaluate eligibility for, and access government welfare schemes. Built on official gazette notifications with 98.8% rule precision across 22 scheduled vernacular languages.

---

## 🏛️ Ecosystem Architecture

JanAI is structured as a **3-Product Enterprise Ecosystem** powered by a **Modular Monolith Backend**:

```
                                  JanAI Ecosystem
                                         │
 ┌───────────────────────────────────────┼───────────────────────────────────────┐
 │                                       │                                       │
 👤 JanAI Citizen App                 🏢 JanAI OS                           🤝 Partner Portal
  (/dashboard)                           (/admin)                              (/partner)
```

- **👤 Citizen App**: Clean citizen interface for scheme discovery, RAG Copilot, Document Vault, DigiLocker e-KYC, and multi-step application tracking.
- **🏢 JanAI OS**: Internal command center featuring 9 operational modules (Executive CEO Stats, User Control, Scheme Authoring, AI RAG Precision Controls, Document Verification Hub, Analytics Engine, Security SIEM Center, System Settings, and AP Pilot Telemetry).
- **🤝 Partner Portal**: Organization-isolated portal (`org_id` scoped) for Colleges, NGOs, CSC VLE operators, and Banks.

---

## 📦 Modular Monolith Domains

1. **Identity Domain**: RS256 RSA JWT, Argon2id passwords, SMS OTP.
2. **Citizen Profile Domain**: Demographic profiles, caste, income, family member links.
3. **Scheme Domain**: Rules database, gazette PDF ingestion.
4. **Application Domain**: Submission pipeline & milestone tracking.
5. **Document Domain**: Magic byte validation (`%PDF-`, `\xFF\xD8\xFF`, `\x89PNG`), AES-256 vault.
6. **Notification Platform**: Unified dispatcher for SMS, Email, Push, and In-App notifications.
7. **AI Reasoning Domain**: Grounded Gazette RAG execution.
8. **Audit & Privacy Domain**: Cryptographic block-chained audit ledger.
9. **Search & Vector Domain**: Hybrid BM25 full-text + vector indexing & autocomplete.

---

## 📜 Architecture Decision Records (ADRs)

Key architectural decisions are documented in `docs/adr/`:
- [ADR 0001: Modular Monolith Architecture](docs/adr/0001-modular-monolith.md)
- [ADR 0002: RS256 RSA JWT & Argon2id Authentication](docs/adr/0002-rs256-jwt-authentication.md)
- [ADR 0003: Asynchronous Event-Driven Architecture (EventBus)](docs/adr/0003-event-driven-architecture-eventbus.md)
- [ADR 0004: Permission-Based Access Control (PBAC)](docs/adr/0004-permission-based-access-control-pbac.md)
- [ADR 0005: Grounded Gazette RAG Reasoning Engine](docs/adr/0005-grounded-gazette-rag-reasoning.md)
- [ADR 0006: Secure Document Vault & Magic Bytes Validation](docs/adr/0006-secure-document-vault-and-magic-bytes.md)
- [ADR 0007: Search & Gazette Vector Domain Separation](docs/adr/0007-search-and-vector-domain.md)

---

## 🚀 Quick Start & Installation

### Prerequisites
- Python 3.12+
- Node.js 20+ & npm

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to explore the Citizen App, `/admin` for JanAI OS, and `/partner` for the Partner Portal.

---

## 🧪 Automated Testing & AI Evaluation

Run the automated test suite and AI benchmark evaluation:

```bash
# Run End-to-End Workflow Tests
python backend/tests/test_e2e_workflows.py

# Run AI Evaluation & Hallucination Benchmark
python backend/tests/evaluate_ai_quality.py

# Run Search Relevance & Latency Benchmark
python backend/tests/test_search_quality.py
```

---

## 🎯 Andhra Pradesh Pilot Cohort

- **Launch Cohort**: **Andhra Pradesh** (26 Districts)
- **Target Schemes**: Post-Matric Tuition Fee Reimbursement (Jagananna Vidya Deevena), PM-Kisan Samman Nidhi, PM Mudra Loan (Tarun Plus ₹20 Lakhs), Ayushman Bharat.
- **Accredited Launch Partner**: Andhra University CSC Assistance Center (Visakhapatnam).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
