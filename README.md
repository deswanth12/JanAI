# 🇮🇳 JanAI — Enterprise AI Citizen Welfare Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.0-61DAFB.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev)
[![CI/CD Pipeline](https://github.com/deswanth12/JanAI/actions/workflows/ci.yml/badge.svg)](https://github.com/deswanth12/JanAI/actions/workflows/ci.yml)
[![Security: RS256 JWT](https://img.shields.io/badge/Security-RS256_RSA_JWT-purple.svg)]()
[![Compliance: DPDP Act 2023](https://img.shields.io/badge/Compliance-DPDP_Act_2023-gold.svg)]()

> **JanAI v1.0.0** is a modular citizen welfare platform that has completed functional implementation, automated testing, and pilot readiness for an Andhra Pradesh deployment. Ongoing production validation will measure performance, reliability, and user outcomes under real-world usage.

---

## 🏷️ Semantic Versioning (SemVer) Release Policy

- **Major (`v2.0.0`)**: Core architectural changes or multi-state expansion.
- **Minor (`v1.1.0`)**: Backward-compatible new capabilities preserving architecture.
- **Patch (`v1.0.1`, `v1.0.2`)**: Bug fixes, security patches, and performance tuning **ONLY**.

---

## 🟢 v1.0.0 Implementation Status

| Feature Area | Implemented Status in v1.0.0 | Planned Roadmap (v1.1+) |
| :--- | :--- | :--- |
| **Citizen Auth** | ✅ RS256 JWT, Email/Password, Mobile OTP (+91) | ⏳ WhatsApp OTP Integration |
| **Scheme Discovery** | ✅ 420+ Central & State Schemes, Search & Vector Domain | ⏳ Automated Daily Gazette Scraper |
| **Document Vault** | ✅ Magic Byte Signature Inspection (`%PDF-`, `\xFF\xD8\xFF`), 5MB Cap | ⏳ Direct DigiLocker API OAuth |
| **JanAI OS (/admin)** | ✅ 9 Command Center Modules & 3-Pillar Navigation | ⏳ Automated SIEM Threat Response |
| **Partner Portal** | ✅ Tenant-Isolated (`org_id` scoped) Assisted Applications | ⏳ B2B API Key Self-Service Portal |
| **AI Reasoning** | ✅ Grounded RAG with 8-Point Trust Matrix & Gazette Citations | ⏳ Voice Speech-to-Text Native Models |

---

## 📊 Andhra Pradesh Pilot Target & Success Metrics

| Dimension | Target Success Metric | Verification Method |
| :--- | :--- | :--- |
| **Registration Completion** | **≥ 90%** completion rate | AP Telemetry Engine |
| **Application Submissions** | High completion rate (no drops) | Partner Portal Tracking |
| **AI RAG Latency** | **P95 < 150ms** | End-to-End Test Suite |
| **Critical Incidents** | **0** SEV-1 production incidents | SIEM Incident Log |
| **User Satisfaction** | **≥ 95%** positive feedback | Citizen Rating Survey |

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

## 📦 Modular Monolith Business Domains

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
- [ADR 0008: Role-Tailored Operational Views](docs/adr/0008-role-based-operational-views.md)

---

## 🛠️ Operational Health & Incident Management

- **Liveness Probe**: `GET /health`
- **Readiness Probe**: `GET /readiness`
- **Incident Response & Rollback Runbook**: [`docs/janai_incident_response_runbook.md`](docs/janai_incident_response_runbook.md)

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

## 🔒 Security & Environment Configuration

- Environment template provided in `.env.example`.
- Strict Content Security Policy (CSP) without `unsafe-inline` script sources.
- No production private keys or credentials committed to Git repository.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
