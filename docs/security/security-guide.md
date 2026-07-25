# 🔒 Security Architecture & Authentication Sequence

JanAI enforces strict zero-trust security standards using asymmetric RS256 RSA JWT token signing and cryptographically chained audit logging.

---

## 🔑 RS256 Authentication Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as SPA Frontend (/login)
    participant Auth as Identity Domain (/api/v1/auth/login)
    participant Crypto as RS256 Security Engine
    participant Audit as Cryptographic Audit Ledger

    User->>Frontend: Submit Email/Phone + Password
    Frontend->>Auth: POST /api/v1/auth/login
    Auth->>Auth: Fetch User Record & Verify Argon2id Password Hash
    
    alt Password Valid
        Auth->>Crypto: Sign JWT Access Token (RS256 Private Key)
        Auth->>Crypto: Sign Single-Use Refresh Token
        Crypto-->>Auth: Return Access & Refresh Tokens
        Auth->>Audit: Log Audit Event (SHA-256 Chained Block)
        Auth-->>Frontend: Return HTTP 200 OK + Bearer Tokens
        Frontend-->>User: Grant Portal Access
    else Password Invalid
        Auth->>Audit: Log Failed Login Attempt
        Auth-->>Frontend: Return HTTP 401 Unauthorized
        Frontend-->>User: Display Security Warning
    end
```
