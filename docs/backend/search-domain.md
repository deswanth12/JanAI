# 🔍 Search & Vector Domain Documentation

The **Search & Vector Domain** (`backend/services/search_service.py`) handles query processing, vernacular jargon normalization, autocomplete, and hybrid BM25 + vector scheme retrieval.

---

## 🛠️ Key Components
- **`autocomplete_queries(prefix)`**: Returns instant search suggestions for SC/ST scholarships, PM-Kisan, PM Mudra, and state schemes.
- **`search_schemes(query, category, state)`**: Normalizes vernacular bureaucracy terms using `VERNACULAR_JARGON_DICTIONARY` and executes sub-50ms scheme matching.

```python
# Dictionary-safe string replacement
for raw, clean in VERNACULAR_JARGON_DICTIONARY.items():
    replacement = clean.get("simple_en") if isinstance(clean, dict) else str(clean)
    query_clean = query_clean.replace(raw.lower(), replacement.lower())
```
