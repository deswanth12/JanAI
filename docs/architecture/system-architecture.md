# 🏛️ System Architecture Guide

JanAI is built as a **Modular Monolith** designed for seamless horizontal scaling into microservices as traffic scales.

---

## 📦 9 Core Business Domains

1. **Identity Domain (`auth/`)**: Handles RS256 RSA JWT authentication, Argon2id passwords, and Mobile OTP verification.
2. **Citizen Profile Domain (`services/citizen_service.py`)**: Manages citizen demographic profiles, income tiers, and family member relations.
3. **Scheme Domain (`services/scheme_service.py`)**: Stores 420+ welfare schemes, eligibility rules, and gazette PDF references.
4. **Application Domain (`services/application_service.py`)**: Multi-step application submission, probability scoring, and tracking milestones.
5. **Document Domain (`services/document_service.py`)**: Secure AES-256 vault storage with Magic Byte signature inspection (`%PDF-`, `\xFF\xD8\xFF`).
6. **Notification Domain (`services/notification_service.py`)**: Multi-channel dispatcher for SMS, Email, Push, and In-App alerts.
7. **AI Reasoning Domain (`app/mcp_server.py`)**: Grounded RAG reasoning engine with citation enforcement.
8. **Audit & Privacy Domain (`app/database.py`)**: Cryptographic block-chained audit ledger logging all system actions.
9. **Search & Vector Domain (`services/search_service.py`)**: Hybrid BM25 full-text + vector search & autocomplete.
