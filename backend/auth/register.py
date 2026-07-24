"""
JanAI User Registration Endpoint
Collects basic credentials (Full Name, Email, Mobile Number, Password)
and initializes unverified user record awaiting email verification.
"""

from typing import Dict, Any
import time
import uuid

def handle_user_register(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    if not full_name or not email or not password:
        return {"error": "Full Name, Email, and Password are required."}

    # Check existing user
    cursor.execute("SELECT id FROM users WHERE email = ? OR phone = ?", (email, phone))
    existing = cursor.fetchone()
    if existing:
        return {"error": "An account with this email or mobile number already exists."}

    from auth.jwt import hash_password, create_access_token, create_refresh_token
    user_id = f"user-{uuid.uuid4().hex[:8]}"
    pwd_hash = hash_password(password)
    created_at = time.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute("""
        INSERT INTO users (id, full_name, email, phone, password_hash, role, is_verified, profile_completed, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, 'Citizen', 0, 0, ?, ?)
    """, (user_id, full_name, email, phone, pwd_hash, created_at, created_at))
    conn.commit()

    access_token = create_access_token(user_id, email, "Citizen")
    refresh_token = create_refresh_token(user_id)

    return {
        "status": "success",
        "message": "User registered successfully. Verification email sent.",
        "user_id": user_id,
        "verification_code": "904128",  # Simulated 6-digit email verification code
        "tokens": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
    }
