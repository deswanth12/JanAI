# 🤝 Contributing to JanAI

Thank you for your interest in contributing to **JanAI** — India's Enterprise AI Citizen Welfare Platform!

---

## 📜 Development Principles & Standards

1. **Stability & Bug Fix Priority**: Bug fixes and security patches take absolute priority over new feature requests.
2. **Code Quality**:
   - Backend Python code must follow PEP 8 standards and pass `py_compile` syntax checks.
   - Frontend React code must pass `npm run lint` with **0 errors**.
   - Production bundle must compile cleanly via `npm run build`.
3. **Automated Testing**: Every pull request must include tests verifying the new or modified behavior.

---

## 🚀 How to Submit a Pull Request (PR)

1. Fork the repository `deswanth12/JanAI`.
2. Create your feature or fix branch:
   ```bash
   git checkout -b fix/issue-description
   ```
3. Run backend and frontend verification suites:
   ```bash
   # Backend Tests
   python backend/tests/test_e2e_workflows.py
   python backend/tests/evaluate_ai_quality.py
   python backend/tests/test_search_quality.py

   # Frontend Verification
   cd frontend
   npm run lint
   npm run build
   ```
4. Commit your changes following standard commit conventions (`fix: ...`, `feat: ...`, `docs: ...`).
5. Open a Pull Request against the `main` branch.
