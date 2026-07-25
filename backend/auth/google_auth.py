"""
JanAI Google OAuth Authentication Handler
"""

from typing import Dict, Any
import time
import uuid
from auth.jwt import create_access_token, create_rotated_refresh_token

def handle_google_auth(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    google_id = data.get("google_id", "google-demo-id")
    email = data.get("email", "").strip().lower()
    full_name = data.get("full_name", "Google User")

    if not email:
        return {"error": "Email is required from Google OAuth."}

    now = time.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute("SELECT id, full_name, email, role, is_verified, profile_completed FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if user:
        user_dict = dict(user)
        user_id = user_dict["id"]
        role = user_dict["role"]
        cursor.execute("UPDATE users SET last_login = ?, google_id = ? WHERE id = ?", (now, google_id, user_id))
    else:
        user_id = f"user-{uuid.uuid4().hex[:8]}"
        role = "Citizen"
        cursor.execute("""
            INSERT INTO users (id, full_name, email, phone, google_id, role, is_verified, profile_completed, created_at, last_login)
            VALUES (?, ?, ?, '', ?, 'Citizen', 1, 0, ?, ?)
        """, (user_id, full_name, email, google_id, now, now))

    conn.commit()

    access_token = create_access_token(user_id, email, role)
    refresh_token = create_rotated_refresh_token(user_id, 1)

    return {
        "status": "success",
        "user": {
            "id": user_id,
            "full_name": full_name,
            "email": email,
            "role": role,
            "is_verified": True,
            "profile_completed": False
        },
        "tokens": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
    }
