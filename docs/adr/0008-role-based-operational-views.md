# 0008. Operational Telemetry: Role-Tailored Operational Views

- **Status**: Approved
- **Date**: 2026-07-25
- **Deciders**: Founder Devanth Baskar, Antigravity AI

## Context
Different stakeholders require different levels of operational visibility without cluttering citizen interfaces or leaking security infrastructure details.

## Decision
Separate operational telemetry into 3 role-tailored views:
1. **Citizen View (`/status`)**: Public platform status, active maintenance notices, citizen helpline, component health grid, 30-day uptime.
2. **Administrator View (`/admin` - JanAI OS System Diagnostics)**: Feature flag toggles, memory probes, build commit hash, API latency.
3. **Security Officer / CEO View (`/admin` - Security Center)**: RS256 authentication health, structured audit log stream, RSA key rotation status, SIEM threat logs.

## Consequences
- **Positive**: Keeps citizen UI clean and simple while providing deep operational telemetry to administrators and security engineers.
- **Negative**: Requires maintaining role-scoped permission checks (`has_permission(role, scope)`).
