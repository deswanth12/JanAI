"""
JanAI JWT Token & Password Security Manager
Handles JWT Access Token generation (15 min), Refresh Token generation (30 days),
and Password Hashing using PBKDF2/SHA256 (compatible with bcrypt standards).
"""

import os
import time
import hmac
import hashlib
import base64
import json
from typing import Dict, Any, Optional

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "janai-production-super-secret-key-2026-indias-ai-citizen-assistant")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 900  # 15 minutes
REFRESH_TOKEN_EXPIRE_SECONDS = 2592000  # 30 days

def hash_password(password: str) -> str:
    """Hash plain password using PBKDF2 HMAC SHA256"""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return base64.b64encode(salt + key).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password"""
    try:
        decoded = base64.b64decode(hashed_password.encode('utf-8'))
        salt = decoded[:16]
        stored_key = decoded[16:]
        new_key = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt, 100000)
        return hmac.compare_digest(stored_key, new_key)
    except Exception:
        return False

def create_jwt_token(data: Dict[str, Any], expires_delta: int) -> str:
    """Create a signed JWT token string"""
    header = {"alg": ALGORITHM, "typ": "JWT"}
    payload = data.copy()
    payload["exp"] = int(time.time()) + expires_delta

    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")

    signature_input = f"{header_b64}.{payload_b64}".encode()
    signature = hmac.new(SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip("=")

    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and verify JWT token"""
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None

        header_b64, payload_b64, signature_b64 = parts
        signature_input = f"{header_b64}.{payload_b64}".encode()

        # Re-compute signature
        expected_sig = hmac.new(SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
        expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip("=")

        if not hmac.compare_digest(signature_b64, expected_sig_b64):
            return None

        # Decode payload
        padding = "=" * (4 - len(payload_b64) % 4)
        payload_bytes = base64.urlsafe_b64decode(payload_b64 + padding)
        payload = json.loads(payload_bytes.decode())

        # Expiry check
        if payload.get("exp", 0) < int(time.time()):
            return None

        return payload
    except Exception:
        return None

def create_access_token(user_id: str, email: str, role: str) -> str:
    return create_jwt_token({"sub": user_id, "email": email, "role": role, "type": "access"}, ACCESS_TOKEN_EXPIRE_SECONDS)

def create_refresh_token(user_id: str) -> str:
    return create_jwt_token({"sub": user_id, "type": "refresh"}, REFRESH_TOKEN_EXPIRE_SECONDS)
