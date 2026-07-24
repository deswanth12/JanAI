import sqlite3
import json
import os
import time

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "janai.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Extended Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            full_name TEXT,
            name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            password_hash TEXT,
            google_id TEXT,
            role TEXT DEFAULT 'Citizen',
            is_verified INTEGER DEFAULT 0,
            profile_completed INTEGER DEFAULT 0,
            age INTEGER,
            gender TEXT,
            state TEXT,
            district TEXT,
            occupation TEXT,
            annual_income TEXT,
            education TEXT,
            caste TEXT,
            disability TEXT,
            land_ownership TEXT,
            created_at TEXT,
            updated_at TEXT,
            last_login TEXT,
            failed_login_attempts INTEGER DEFAULT 0,
            account_locked_until TEXT,
            refresh_token_version INTEGER DEFAULT 1
        )
    ''')

    # Audit Logs Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            action TEXT,
            ip_address TEXT,
            timestamp TEXT,
            details TEXT
        )
    ''')

    # Family Members Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS family_members (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            relation TEXT,
            name TEXT,
            age INTEGER,
            gender TEXT,
            occupation TEXT,
            annual_income TEXT,
            education TEXT,
            caste TEXT,
            disability TEXT,
            land_ownership TEXT
        )
    ''')

    # Applications Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            scheme_id TEXT,
            scheme_title TEXT,
            applicant_name TEXT,
            relation TEXT,
            date_submitted TEXT,
            status TEXT,
            probability_score INTEGER,
            tracking_milestones TEXT
        )
    ''')

    # Reset/Update user profile
    now = time.strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("DELETE FROM users WHERE id = 'user-1'")
    cursor.execute('''
        INSERT INTO users (id, full_name, name, email, phone, role, is_verified, profile_completed, age, gender, state, district, occupation, annual_income, education, caste, disability, land_ownership, created_at, updated_at, last_login, failed_login_attempts, refresh_token_version)
        VALUES ('user-1', 'Devanth Baskar', 'Devanth', 'devanth@example.com', '+91 9876543210', 'Citizen', 1, 1, 21, 'Male', 'Andhra Pradesh', 'Visakhapatnam', 'Student', '180000', 'Undergraduate (B.Tech)', 'OBC', 'No', '2.5', ?, ?, ?, 0, 1)
    ''', (now, now, now))

    # Log initial system seed
    cursor.execute('''
        INSERT INTO audit_logs (user_id, action, ip_address, timestamp, details)
        VALUES ('user-1', 'SYSTEM_SEED', '127.0.0.1', ?, 'Initialized production security schema and user account.')
    ''', (now,))

    # Reset/Update family profiles
    cursor.execute("DELETE FROM family_members WHERE user_id = 'user-1'")
    cursor.execute('''
        INSERT INTO family_members (id, user_id, relation, name, age, gender, occupation, annual_income, education, caste, disability, land_ownership)
        VALUES ('fam-1', 'user-1', 'Father', 'Baskar', 52, 'Male', 'Farmer', '150000', 'Secondary (10th)', 'OBC', 'No', '2.5')
    ''')
    cursor.execute('''
        INSERT INTO family_members (id, user_id, relation, name, age, gender, occupation, annual_income, education, caste, disability, land_ownership)
        VALUES ('fam-2', 'user-1', 'Mother', 'Lalitha', 48, 'Female', 'Homemaker', '0', 'Primary (5th)', 'OBC', 'No', '0')
    ''')
    cursor.execute('''
        INSERT INTO family_members (id, user_id, relation, name, age, gender, occupation, annual_income, education, caste, disability, land_ownership)
        VALUES ('fam-3', 'user-1', 'Sister', 'Pavani', 18, 'Female', 'Student', '0', 'Undergraduate', 'OBC', 'No', '0')
    ''')

    # Reset/Update applications
    cursor.execute("DELETE FROM applications WHERE user_id = 'user-1'")
    milestones = json.dumps([
        {"title": "Application Drafted & Verified", "date": "2026-07-09", "completed": True},
        {"title": "Submitted to Nodal Officer", "date": "2026-07-10", "completed": True},
        {"title": "State Department Scrutiny", "date": "2026-07-18", "completed": True},
        {"title": "Direct Benefit Transfer Sanction", "date": "Pending", "completed": False}
    ])
    cursor.execute('''
        INSERT INTO applications (id, user_id, scheme_id, scheme_title, applicant_name, relation, date_submitted, status, probability_score, tracking_milestones)
        VALUES ('APP-2026-8812', 'user-1', 'post-matric-scholarship', 'Post-Matric Scholarship Scheme for SC/ST/OBC Students', 'Devanth', 'Self', '2026-07-10', 'Under Review', 92, ?)
    ''', (milestones,))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database updated with Devanth's production audit & security schema successfully!")
