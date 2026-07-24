"""
JanAI Google OAuth Endpoint
One-click Google Sign-in, auto-account creation, and importing Name & Email.
"""

from typing import Dict, Any
import time
import uuid

def handle_google_auth(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    google_id = data.get("google_id", "google-sub-9041")
    email = data.get("email", "devanth@gmail.com").strip().lower()
    full_name = data.get("full_name", "Devanth")

    from auth.jwt import create_access_token, create_refresh_token

    cursor.execute("SELECT id, full_name, email, role, is_verified, profile_completed FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    now = time.strftime("%Y-%m-%d %H:%M:%S")

    if user:
        user_dict = dict(user)
        user_id = user_dict["id"]
        cursor.execute("UPDATE users SET last_login = ?, google_id = ? WHERE id = ?", (now, google_id, user_id))
    else:
        user_id = f"user-g-{uuid.uuid4().hex[:8]}"
        cursor.execute("""
            INSERT INTO users (id, full_name, email, phone, google_id, role, is_verified, profile_completed, created_at, last_login)
            VALUES (?, ?, ?, '', ?, 'Citizen', 1, 0, ?, ?)
        """, (user_id, full_name, email, google_id, now, now))
        user_dict = {
            "id": user_id,
            "full_name": full_name,
            "email": email,
            "role": "Citizen",
            "is_verified": 1,
            "profile_completed": 0
        }

    conn.commit()

    access_token = create_access_token(user_id, email, user_dict["role"])
    refresh_token = create_refresh_token(user_id)

    return {
        "status": "success",
        "method": "google_oauth",
        "user": {
            "id": user_id,
            "full_name": user_dict["full_name"],
            "email": user_dict["email"],
            "role": user_dict["role"],
            "is_verified": True,
            "profile_completed": bool(user_dict["profile_completed"])
        },
        "tokens": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "Bearer"
        }
    }
