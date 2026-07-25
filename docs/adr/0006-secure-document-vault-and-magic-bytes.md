# 0006. Document Storage Standard: AES-256 Vault & Magic Bytes Validation

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Citizens upload sensitive documents (Aadhaar e-KYC, Income Certificates, Caste Certificates, Land Passbooks).

## Decision
Validate documents via **Magic Byte Signature Inspection** (`%PDF-`, `\xFF\xD8\xFF`, `\x89PNG`) with a 5MB size cap, stored outside the web root with **AES-256-GCM encryption**.

## Consequences
- **Positive**: Prevents file upload RCE attacks and protects citizen privacy under DPDP Act 2023.
- **Negative**: Adds CPU overhead for magic byte inspection during uploads.
