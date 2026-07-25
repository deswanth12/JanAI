# 📜 JanAI Changelog

All notable changes to the JanAI platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-25 (Feature Complete Pilot Ready)

### 🚀 Added
- **3-Product Enterprise Ecosystem**:
  - 👤 **JanAI Citizen Portal (`/dashboard`)**: Mobile-first citizen web application with pre-login AI demo sandbox, persona quick-select, live data freshness bar, recent updates checklist, and citizen support section.
  - 🏢 **JanAI OS (`/admin`)**: Internal operating system featuring 3 operational pillars (Operations, Security, Executive) and 9 command center modules.
  - 🤝 **Partner Portal (`/partner`)**: Assisted application entry portal for colleges, NGOs, CSC operators, and banks with `org_id` multi-tenant isolation.
- **Modular Monolith Backend (9 Domains)**:
  - Identity Domain (RS256 RSA JWT & Argon2id password hashing).
  - Citizen Profile Domain (Demographics, household linking).
  - Scheme Domain (Welfare catalog, rules database).
  - Application Domain (Multi-milestone submission tracking).
  - Document Domain (AES-256 vault, magic byte signature validation `%PDF-`, `\xFF\xD8\xFF`).
  - Notification Platform (Multi-channel SMS, Email, Push, In-App dispatcher).
  - AI Reasoning Domain (Grounded Gazette RAG Engine).
  - Audit & Privacy Domain (Cryptographic block-chained audit ledger).
  - Search & Vector Domain (Hybrid BM25 full-text + vector search & autocomplete).
- **Security & Compliance**:
  - Asymmetric RS256 RSA keypair token signing with 90-day rotation.
  - DPDP Act 2023 consent ledger & AES-256-GCM vault encryption.
  - Strict Content Security Policy (CSP) headers without `unsafe-inline` scripts.
- **Operational Readiness & Telemetry**:
  - `GET /health` liveness probe and `GET /readiness` readiness probe.
  - Real-time Public Status Portal (`/status`) with domain health grid and 30-day uptime metrics.
  - Auto-expiring and dismissible system maintenance banners.
  - Automated Vite build metadata injection (`VITE_APP_VERSION`, `VITE_GIT_COMMIT`, `VITE_BUILD_DATE`).
  - Andhra Pradesh Pilot Telemetry Dashboard covering Visakhapatnam, Tirupati, and Vijayawada districts.
