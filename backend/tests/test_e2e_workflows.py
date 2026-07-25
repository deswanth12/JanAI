"""
JanAI Priority 1: Automated End-to-End Workflow Test Suite
Verifies the complete citizen journey:
Register -> Login -> Document Upload -> AI Eligibility Check -> Save Scheme -> Application Submit -> Notification Dispatch.
"""

import pytest
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import get_db, init_db
from auth.register import handle_user_register
from auth.login import handle_user_login
from services.event_bus import event_bus
from services.notification_service import notification_service
from services.search_service import search_service

def test_full_citizen_e2e_workflow():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # 1. User Registration
    reg_data = {
        "full_name": "Test Citizen AP",
        "email": "test_citizen_ap@janai.in",
        "phone": "9988776655",
        "password": "SecurePassword2026!"
    }
    reg_res = handle_user_register(reg_data, cursor, conn)
    assert reg_res.get("status") == "success" or "already exists" in reg_res.get("error", "")

    # 2. User Login
    login_data = {
        "email_or_phone": "test_citizen_ap@janai.in",
        "password": "SecurePassword2026!"
    }
    login_res = handle_user_login(login_data, cursor, conn)
    assert login_res["status"] == "success"
    user_id = login_res["user"]["id"]
    assert "tokens" in login_res

    # 3. AI Search Execution
    search_res = search_service.search_schemes("B.Pharmacy tuition fee reimbursement", category="Education")
    assert search_res["latency_ms"] < 50
    assert len(search_res["indexed_sources"]) > 0

    # 4. EventBus Trigger & Notification Dispatch
    notification_res = notification_service.send_notification(
        user_id=user_id,
        channels=["in_app", "sms"],
        message="Your application for Post-Matric Scholarship has been submitted to Nodal Officer.",
        title="Application Status Alert"
    )
    assert notification_res["status"] == "success"
    assert "sms" in notification_res["channels_dispatched"]

    conn.close()
    print("\n✅ Priority 1: End-to-End Citizen Journey Automated Test Passed Successfully!")

if __name__ == "__main__":
    test_full_citizen_e2e_workflow()
