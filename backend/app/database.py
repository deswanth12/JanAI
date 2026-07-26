import sqlite3
import os
import datetime
import hashlib
import json

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "janai.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Users Table
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
            org_id TEXT DEFAULT 'ORG-CITIZEN-GLOBAL',
            org_subrole TEXT DEFAULT 'Citizen',
            is_verified BOOLEAN DEFAULT 1,
            profile_completed BOOLEAN DEFAULT 1,
            age INTEGER DEFAULT 21,
            gender TEXT DEFAULT 'Male',
            state TEXT DEFAULT 'Andhra Pradesh',
            district TEXT DEFAULT 'Visakhapatnam',
            occupation TEXT DEFAULT 'Student',
            annual_income TEXT DEFAULT '180000',
            education TEXT DEFAULT 'Undergraduate',
            caste TEXT DEFAULT 'OBC',
            disability TEXT DEFAULT 'No',
            land_ownership TEXT DEFAULT '2.5',
            failed_login_attempts INTEGER DEFAULT 0,
            account_locked_until TEXT,
            refresh_token_version INTEGER DEFAULT 1,
            created_at TEXT,
            updated_at TEXT,
            last_login TEXT
        )
    ''')

    # Migration check for pre-existing databases
    cursor.execute("PRAGMA table_info(users)")
    existing_cols = set(row[1] for row in cursor.fetchall())

    needed_cols = {
        "full_name": "TEXT",
        "name": "TEXT",
        "password_hash": "TEXT",
        "google_id": "TEXT",
        "role": "TEXT DEFAULT 'Citizen'",
        "org_id": "TEXT DEFAULT 'ORG-CITIZEN-GLOBAL'",
        "org_subrole": "TEXT DEFAULT 'Citizen'",
        "is_verified": "BOOLEAN DEFAULT 1",
        "profile_completed": "BOOLEAN DEFAULT 1",
        "failed_login_attempts": "INTEGER DEFAULT 0",
        "account_locked_until": "TEXT",
        "refresh_token_version": "INTEGER DEFAULT 1",
        "created_at": "TEXT",
        "updated_at": "TEXT",
        "last_login": "TEXT"
    }
    for col_name, col_type in needed_cols.items():
        if col_name not in existing_cols:
            cursor.execute(f"ALTER TABLE users ADD COLUMN {col_name} {col_type}")

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
            land_ownership TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')

    # Applications Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            org_id TEXT DEFAULT 'ORG-CITIZEN-GLOBAL',
            scheme_id TEXT,
            scheme_title TEXT,
            applicant_name TEXT,
            relation TEXT,
            date_submitted TEXT,
            status TEXT,
            probability_score INTEGER,
            tracking_milestones TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')

    # Structured Enterprise Audit Logs Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            correlation_id TEXT,
            actor_id TEXT,
            target_id TEXT,
            org_id TEXT,
            action TEXT,
            outcome TEXT DEFAULT 'SUCCESS',
            ip_address TEXT,
            timestamp TEXT,
            details TEXT,
            previous_hash TEXT,
            block_hash TEXT
        )
    ''')

    # Seed Initial User 'user-1' if empty
    cursor.execute("SELECT COUNT(*) FROM users WHERE id = 'user-1'")
    if cursor.fetchone()[0] == 0:
        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        cursor.execute('''
            INSERT INTO users (id, full_name, name, email, phone, role, org_id, org_subrole, is_verified, profile_completed, age, gender, state, district, occupation, annual_income, education, caste, disability, land_ownership, created_at, updated_at, last_login, failed_login_attempts, refresh_token_version)
            VALUES ('user-1', 'Desvanth', 'Desvanth', 'desvanth@janai.in', '+917702256073', 'CEO', 'ORG-AU-89410', 'CEO', 1, 1, 21, 'Male', 'Andhra Pradesh', 'Visakhapatnam', 'Student', '180000', 'Undergraduate', 'OBC', 'No', '2.5', ?, ?, ?, 0, 1)
        ''', (now, now, now))

        # Initial Audit Ledger Entry
        prev_hash = "0000000000000000000000000000000000000000000000000000000000000000"
        block_data = f"corr-init|user-1|user-1|ORG-AU-89410|INITIALIZE_JANAI_DATABASE|SUCCESS|127.0.0.1|{now}|{prev_hash}"
        block_hash = hashlib.sha256(block_data.encode()).hexdigest()

        cursor.execute('''
            INSERT INTO audit_logs (correlation_id, actor_id, target_id, org_id, action, outcome, ip_address, timestamp, details, previous_hash, block_hash)
            VALUES ('corr-init', 'user-1', 'user-1', 'ORG-AU-89410', 'INITIALIZE_JANAI_DATABASE', 'SUCCESS', '127.0.0.1', ?, 'Platform Database Initialized with Cryptographic Block Chaining', ?, ?)
        ''', (now, prev_hash, block_hash))

    conn.commit()
    conn.close()

def log_structured_audit_event(correlation_id: str, actor_id: str, target_id: str, org_id: str, action: str, outcome: str, ip_address: str, details: str):
    """Log a cryptographically chained structured audit log event"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()

    # Get last block hash
    cursor.execute("SELECT block_hash FROM audit_logs ORDER BY id DESC LIMIT 1")
    row = cursor.fetchone()
    prev_hash = row["block_hash"] if row else "0000000000000000000000000000000000000000000000000000000000000000"

    block_data = f"{correlation_id}|{actor_id}|{target_id}|{org_id}|{action}|{outcome}|{ip_address}|{now}|{prev_hash}"
    block_hash = hashlib.sha256(block_data.encode()).hexdigest()

    cursor.execute('''
        INSERT INTO audit_logs (correlation_id, actor_id, target_id, org_id, action, outcome, ip_address, timestamp, details, previous_hash, block_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (correlation_id, actor_id, target_id, org_id, action, outcome, ip_address, now, details, prev_hash, block_hash))

    conn.commit()
    conn.close()
