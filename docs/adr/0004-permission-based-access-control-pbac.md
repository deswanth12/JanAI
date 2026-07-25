# 0004. Authorization Model: Permission-Based Access Control (PBAC)

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Hardcoded role checks (`if role == "Manager"`) make role customization and delegated administration fragile.

## Decision
Adopt **Permission-Based Access Control (PBAC)**. Code checks granular permission scopes (`has_permission(role, "documents.review")`) mapped dynamically in `permissions.py`.

## Consequences
- **Positive**: Enables adding new roles, temporary delegations, or tenant-specific sub-roles without refactoring application logic.
- **Negative**: Requires maintaining explicit permission maps.
