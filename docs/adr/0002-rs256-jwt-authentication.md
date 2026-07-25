# 0002. Authentication Standard: RS256 RSA JWT & Argon2id Passwords

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Secure identity verification is essential for protecting citizen PII and scheme application data.

## Decision
Adopt **RS256 RSA Keypair signing** for JWT access tokens, paired with **Argon2id/PBKDF2 HMAC SHA-512 password hashing** (200,000 iterations) and **Single-Use Refresh Token Rotation**.

## Consequences
- **Positive**: Asymmetric signing allows microservices and external gateways to verify tokens using public keys without exposing private signing keys.
- **Negative**: RSA key management requires scheduled 90-day rotation procedures.
