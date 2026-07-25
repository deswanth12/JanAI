# 0001. Architectural Pattern: Modular Monolith

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
JanAI is scaling to serve citizens, nodal officers, and partner organizations. We evaluated microservices versus a monolith.

## Decision
We choose a **Modular Monolith** architecture for JanAI v1.0. All 9 business domains (Identity, Citizen, Scheme, Application, Document, Notification, AI Reasoning, Audit, Search) are developed as decoupled Python modules inside a single FastAPI repository.

## Consequences
- **Positive**: Simple deployments, fast local development, low infrastructure costs, zero network overhead between domain calls.
- **Negative**: High memory usage if one domain experiences heavy load (mitigated via async handlers and future domain extraction).
