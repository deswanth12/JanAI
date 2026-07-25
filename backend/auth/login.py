"""
JanAI User Login Endpoint
Handles Email + Password authentication, rate limiting, and returns JWT tokens.
"""

from typing import Dict, Any
import time
from auth.jwt import verify_password_bcrypt_style, create_access_token, create_rotated_refresh_token

def handle_user_login(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    email_or_phone = data.get("email_or_phone", "").strip().lower()
    password = data.get("password", "")

    if not email_or_phone or not password:
        return {"error": "Email/Phone and password are required."}

    cursor.execute("""
        SELECT id, full_name, email, phone, password_hash, role, is_verified, profile_completed
        FROM users WHERE LOWER(email) = ? OR phone = ?
    """, (email_or_phone, email_or_phone))

    user = cursor.fetchone()
    if not user:
        return {"error": "Invalid login credentials."}

    user_dict = dict(user)
    if not user_dict.get("password_hash") or not verify_password_bcrypt_style(password, user_dict["password_hash"]):
        return {"error": "Invalid login credentials."}

    # Update last login timestamp
    now = time.strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user_dict["id"]))
    conn.commit()

    access_token = create_access_token(user_dict["id"], user_dict["email"], user_dict["role"])
    refresh_token = create_rotated_refresh_token(user_dict["id"], 1)

    return {
        "status": "success",
        "user": {
            "id": user_dict["id"],
            "full_name": user_dict["full_name"],
            "email": user_dict["email"],
            "phone": user_dict["phone"],
            "role": user_dict["role"],
            "is_verified": bool(user_dict["is_verified"]),
            "profile_completed": bool(user_dict["profile_completed"])
        },
        "tokens": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
    }
