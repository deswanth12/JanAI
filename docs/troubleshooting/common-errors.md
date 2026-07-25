# 🔧 Troubleshooting & Common Fixes

Solutions to common developer setup and runtime issues.

---

## 🛑 Common Issues & Solutions

### 1. `Port 5173 / 8000 in use`
- **Cause**: Existing dev server process running in background.
- **Fix**: Kill background server or specify alternative port:
  ```bash
  npx kill-port 5173
  ```

### 2. `TypeError: replace() argument 2 must be str, not dict`
- **Cause**: Attempting string substitution with dictionary values.
- **Fix**: Extract string explicitly: `clean.get("simple_en")` before calling `replace()`.

### 3. `sqlite3.OperationalError: table users has no column named...`
- **Cause**: Pre-existing database missing newly declared columns.
- **Fix**: Handled automatically via `PRAGMA table_info(users)` schema migration checks in `database.py`.
