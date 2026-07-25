"""
JanAI User Registration Endpoint
Collects minimal required details first (Full Name, Email, Mobile, Password).
"""

from typing import Dict, Any
import time
import uuid
from auth.jwt import hash_password_bcrypt_style, create_access_token, create_rotated_refresh_token

def handle_user_register(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    if not full_name or not email or not password:
        return {"error": "Full Name, Email, and Password are required."}

    cursor.execute("SELECT id FROM users WHERE email = ? OR phone = ?", (email, phone))
    if cursor.fetchone():
        return {"error": "A user with this Email or Mobile Number already exists."}

    user_id = f"user-{uuid.uuid4().hex[:8]}"
    pwd_hash = hash_password_bcrypt_style(password)
    now = time.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute("""
        INSERT INTO users (id, full_name, email, phone, password_hash, role, is_verified, profile_completed, created_at, last_login)
        VALUES (?, ?, ?, ?, ?, 'Citizen', 0, 0, ?, ?)
    """, (user_id, full_name, email, phone, pwd_hash, now, now))
    conn.commit()

    access_token = create_access_token(user_id, email, "Citizen")
    refresh_token = create_rotated_refresh_token(user_id, 1)

    return {
        "status": "success",
        "message": "User registered successfully.",
        "user": {
            "id": user_id,
            "full_name": full_name,
            "email": email,
            "phone": phone,
            "role": "Citizen",
            "is_verified": False,
            "profile_completed": False
        },
        "tokens": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
    }
