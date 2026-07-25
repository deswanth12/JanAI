# 🔒 Security & Compliance Guide

JanAI enforces enterprise security practices across all layers.

---

## 🛡️ Core Security Architecture
- **RS256 RSA Token Signing**: Asymmetric JWT signing with 90-day key rotation cycle.
- **Argon2id / PBKDF2 Password Hashing**: 200,000 iteration password hashing with random 16-byte salt.
- **Magic Byte Document Validation**: Inspects raw binary header bytes (`%PDF-`, `\xFF\xD8\xFF`, `\x89PNG`) to prevent file extension spoofing.
- **DPDP Act 2023 Consent Ledger**: Cryptographically logs citizen data access consent events.
- **Cryptographic Block-Chained Audit Ledger**: Hashes audit events into an immutable SHA-256 chain.
