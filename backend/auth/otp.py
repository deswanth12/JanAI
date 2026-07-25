"""
JanAI Mobile OTP Passwordless Handler
"""

from typing import Dict, Any
import time
import uuid
from auth.jwt import generate_random_6digit_otp, create_access_token, create_rotated_refresh_token

OTP_STORE: Dict[str, str] = {}

def handle_request_otp(data: Dict[str, Any]) -> Dict[str, Any]:
    phone = data.get("phone", "").strip()
    if not phone or len(phone) < 10:
        return {"error": "Valid 10-digit mobile number is required."}

    otp = generate_random_6digit_otp()
    OTP_STORE[phone] = otp

    return {
        "status": "success",
        "message": f"OTP sent to +91 {phone}",
        "demo_otp": otp
    }

def handle_verify_otp(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    phone = data.get("phone", "").strip()
    otp = data.get("otp", "").strip()

    if not phone or not otp:
        return {"error": "Phone and OTP are required."}

    stored_otp = OTP_STORE.get(phone)
    if not stored_otp or stored_otp != otp:
        return {"error": "Invalid or expired OTP code."}

    del OTP_STORE[phone]
    now = time.strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute("SELECT id, full_name, email, role, is_verified, profile_completed FROM users WHERE phone = ?", (phone,))
    user = cursor.fetchone()

    if user:
        user_dict = dict(user)
        user_id = user_dict["id"]
        email = user_dict["email"]
        role = user_dict["role"]
        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user_id))
    else:
        user_id = f"user-{uuid.uuid4().hex[:8]}"
        email = f"citizen_{phone[-4:]}@janai.in"
        role = "Citizen"
        cursor.execute("""
            INSERT INTO users (id, full_name, email, phone, role, is_verified, profile_completed, created_at, last_login)
            VALUES (?, ?, ?, ?, 'Citizen', 1, 0, ?, ?)
        """, (user_id, f"Citizen (+91 {phone})", email, phone, now, now))

    conn.commit()

    access_token = create_access_token(user_id, email, role)
    refresh_token = create_rotated_refresh_token(user_id, 1)

    return {
        "status": "success",
        "user": {
            "id": user_id,
            "full_name": f"Citizen (+91 {phone})",
            "phone": phone,
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
