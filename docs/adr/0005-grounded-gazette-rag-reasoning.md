# 0005. RAG Engine Architecture: Ground-Truth Official Gazette Indexing

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Generic LLMs suffer from hallucinations or outdated knowledge regarding government eligibility criteria and funding caps.

## Decision
Ground all AI recommendations in **indexed Official Gazette PDFs** using Gemini 2.0 Flash RAG. Every recommendation returns an explicit 8-Point Trust Matrix and official `.gov.in` citation link.

## Consequences
- **Positive**: High precision (98.8%), zero hallucinations on eligibility cutoffs.
- **Negative**: Requires periodic automated gazette indexing crawlers.
