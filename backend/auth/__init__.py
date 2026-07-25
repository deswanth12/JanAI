# JanAI Auth Package Init
from auth.jwt import (
    create_access_token,
    create_rotated_refresh_token,
    verify_rs256_token,
    hash_password_bcrypt_style,
    verify_password_bcrypt_style
)
from auth.register import handle_user_register
from auth.login import handle_user_login
from auth.google_auth import handle_google_auth
from auth.otp import handle_request_otp, handle_verify_otp
from auth.reset_password import handle_forgot_password, handle_reset_password

__all__ = [
    "create_access_token",
    "create_rotated_refresh_token",
    "verify_rs256_token",
    "hash_password_bcrypt_style",
    "verify_password_bcrypt_style",
    "handle_user_register",
    "handle_user_login",
    "handle_google_auth",
    "handle_request_otp",
    "handle_verify_otp",
    "handle_forgot_password",
    "handle_reset_password"
]
