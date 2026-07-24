"""
JanAI Password Reset Handler
Manages password reset requests and password updates.
"""

from typing import Dict, Any

def handle_forgot_password(data: Dict[str, Any], cursor) -> Dict[str, Any]:
    email = data.get("email", "").strip().lower()

    cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,))
    user = cursor.fetchone()
    if not user:
        return {"error": "No user account registered with this email address."}

    return {
        "status": "success",
        "message": "Password reset link sent to your registered email address.",
        "simulated_reset_token": "rst-9041-token"
    }

def handle_reset_password(data: Dict[str, Any], cursor, conn) -> Dict[str, Any]:
    email = data.get("email", "").strip().lower()
    new_password = data.get("new_password", "")

    if not email or not new_password:
        return {"error": "Email and new password are required."}

    from auth.jwt import hash_password
    pwd_hash = hash_password(new_password)

    cursor.execute("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?", (pwd_hash, email))
    conn.commit()

    return {
        "status": "success",
        "message": "Password successfully reset. You can now login with your new password."
    }
