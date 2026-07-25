# 📡 API Gateway Reference

The JanAI backend exposes versioned RESTful endpoints under `/api/v1/`.

---

## 🔑 Authentication Endpoints

### `POST /api/v1/auth/register`
- **Purpose**: Register a new citizen account.
- **Request Body**:
  ```json
  {
    "full_name": "Devanth Baskar",
    "email": "devanth@janai.in",
    "phone": "+919876543210",
    "password": "SecurePassword2026!"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "tokens": {
      "access_token": "eyJhbGciOiJSUzI1Ni...",
      "token_type": "Bearer"
    }
  }
  ```

### `POST /api/v1/auth/login`
- **Purpose**: Authenticate citizen or admin credentials.

---

## 🔍 Search & Scheme Endpoints

### `GET /api/v1/citizen/schemes?query=scholarship&category=Education`
- **Purpose**: Execute hybrid search across scheme database.

---

## 🩺 Operational Health Endpoints

### `GET /health`
- **Response**: `{"status": "healthy", "service": "JanAI Backend Engine"}`

### `GET /readiness`
- **Response**: `{"status": "ready", "database": "connected"}`
