"""
JanAI Reset & Forgot Password Handler
"""

from typing import Dict, Any
from auth.jwt import generate_random_6digit_otp, hash_password_bcrypt_style

RESET_TOKEN_STORE: Dict[str, str] = {}

def handle_forgot_password(data: Dict[str, Any], cursor) -> Dict[str, Any]:
    email = data.get("email", "").strip().lower()
    if not email:
        return {"error": "Email is required."}

    cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,))
    user = cursor.fetchone()
    if not user:
        return {"error": "No account found with this email."}

    reset_code = generate_random_6digit_otp()
    RESET_TOKEN_STORE[email] = reset_code

    return {
        "status": "success",
        "message": f"Password reset OTP sent to {email}",
        "demo_code": reset_code
    }

def handle_reset_password(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    email = data.get("email", "").strip().lower()
    code = data.get("code", "").strip()
    new_password = data.get("new_password", "")

    if not email or not code or not new_password:
        return {"error": "Email, Code, and New Password are required."}

    stored_code = RESET_TOKEN_STORE.get(email)
    if not stored_code or stored_code != code:
        return {"error": "Invalid or expired reset code."}

    pwd_hash = hash_password_bcrypt_style(new_password)
    cursor.execute("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?", (pwd_hash, email))
    conn.commit()

    del RESET_TOKEN_STORE[email]

    return {
        "status": "success",
        "message": "Password updated successfully. Please log in with your new password."
    }
