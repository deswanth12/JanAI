# 0007. Domain Separation: Search & Gazette Vector Domain

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Full-text indexing, vector embeddings, autocomplete, ranking, and vernacular jargon normalization are core operational concerns distinct from raw scheme data modeling.

## Decision
Separate the **Search & Vector Domain** from the Scheme Domain. Hybrid search combines TF-IDF BM25 full-text indexing with vector embeddings to deliver < 20ms search latency across 22 scheduled Indian languages.

## Consequences
- **Positive**: High search relevance, typo tolerance, independent scaling of vector indexing workloads.
- **Negative**: Requires synchronizing vector index state whenever new gazette PDFs are published.
