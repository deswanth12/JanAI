# 🧪 Automated Testing Strategy & Verification

JanAI includes a 3-tier automated testing suite covering end-to-end citizen journeys, AI precision benchmarks, and search domain performance.

---

## 🛠️ Executing Tests Locally

```bash
# 1. Priority 1: Automated E2E Citizen Journey Test
python backend/tests/test_e2e_workflows.py

# 2. Priority 2: AI Quality & Zero Hallucination Benchmark
python backend/tests/evaluate_ai_quality.py

# 3. Priority 3: Search Relevance & Latency Benchmark
python backend/tests/test_search_quality.py
```
