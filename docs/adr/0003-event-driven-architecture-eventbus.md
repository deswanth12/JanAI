# 0003. Asynchronous Event-Driven Architecture (EventBus)

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Actions such as document uploads or application submissions require multiple downstream reactions (AI validation, audit logging, multi-channel notifications, analytics updates).

## Decision
Implement an **In-Memory Event Bus (`JanAIEventBus`)** to publish domain events (`DocumentUploaded`, `ApplicationSubmitted`) to registered asynchronous subscribers.

## Consequences
- **Positive**: Decouples domain logic. Subscribing a new service (e.g. Analytics) requires zero code changes to the primary calling domain.
- **Negative**: In-memory bus events must be persisted if server crashes occur mid-execution (handled via WAL audit logs).
