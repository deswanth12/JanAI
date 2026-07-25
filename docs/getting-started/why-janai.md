# 💡 Why JanAI? — Purpose, Principles & Value

This document outlines the core problem, engineering solution, stakeholder benefits, and ethical boundaries of the **JanAI** platform.

---

## 🛑 1. The Problem

For millions of citizens across India, discovering and applying for government welfare schemes remains complex and fragmented:

- **Information Fragmentation**: Scheme rules are scattered across hundreds of departmental websites and PDF gazette notifications.
- **Complex Jargon**: Eligibility criteria are written in dense legal bureaucracy (*e.g., "Pattadar Passbook", "Direct Benefit Transfer"*).
- **Middleman Dependency**: Vulnerable citizens often rely on unverified middlemen or unauthorized agents.
- **Document Vulnerability**: Hardcopy paper documents get misplaced or damaged.

---

## 🌟 2. The Solution

**JanAI** unifies welfare discovery into an enterprise AI platform:

- **Unified Vernacular Search**: Citizens search across central and state welfare catalogs using everyday language.
- **Source-Backed AI Guidance**: Grounded AI Copilot answers eligibility questions anchored in official gazette citations.
- **Encrypted Document Vault**: AES-256 encrypted vault with Magic Byte signature validation for proof certificates.
- **Assisted Partner Network**: Colleges, CSC operators, and NGOs submit verified applications on behalf of rural citizens via the Partner Portal (`/partner`).

---

## 👥 3. Who Benefits?

| Stakeholder | How JanAI Helps |
| :--- | :--- |
| **👤 Citizens** | Plain-language search in 22 languages, source-backed eligibility checks, and free application tracking. |
| **🤝 Partner Orgs** | Multi-tenant portal (`org_id` scoped) to assist students, farmers, and seniors at scale. |
| **🏢 Administrators** | JanAI OS (`/admin`) provides real-time operational telemetry, SIEM security logs, and scheme authoring. |

---

## ⚖️ 4. Core Platform Principles

1. **Source-Backed AI Guidance**: Every AI response is anchored in official state and central gazettes with verified citations.
2. **Security & Privacy by Design**: Compliant with the DPDP Act 2023, featuring RS256 token signing, Argon2id hashing, and AES-256 vault encryption.
3. **Inclusion & Accessibility**: High-contrast modes, screen reader labels, keyboard navigation, and vernacular support.
4. **Operational Transparency**: Public status telemetry (`/status`) tracking system uptime and API response times.

---

## 🛑 5. What JanAI Is NOT

> [!IMPORTANT]
> **Important Clarification**: JanAI provides intelligent assistance, information retrieval, and digital workflow automation. JanAI **does not replace official government nodal officers**, perform sovereign decision-making, or legally guarantee welfare approval. Final sanctioning authority remains strictly with government department officers.
