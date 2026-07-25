# 🚑 JanAI Incident Response & Operational Rollback Runbook

> **Version**: 1.0 Production  
> **Classification**: Internal Operational Procedure  
> **Author**: Antigravity AI & Founder Desvanth  

---

## 🚨 1. Incident Classification & Severity Matrix

| Severity Level | Definition | Impact Scope | Response SLA |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Core API / Auth outage or PII breach. | Platform wide down | **< 15 minutes** |
| **SEV-2 (High)** | AI Reasoning latency spike (> 2000ms). | Partial feature degradation | **< 30 minutes** |
| **SEV-3 (Moderate)** | Partner Portal sync delay or minor UI bug. | Partner portal affected | **< 2 hours** |

---

## 🛠️ 2. Operational Health & Diagnostic Probes

- **Liveness Probe**: `GET http://127.0.0.1:8000/health`
- **Readiness Probe**: `GET http://127.0.0.1:8000/readiness`
- **SIEM Security Threat Stream**: JanAI OS ➔ `http://localhost:5173/admin` (Security Center)

---

## 🔄 3. Operational Rollback Procedure

If a SEV-1 deployment failure occurs in production:

1. **Trigger Automated Failover / Maintenance Mode**:
   - Access JanAI OS System Settings (`/admin`) ➔ Toggle `Maintenance Mode: Active`.
2. **Revert Git Deployment**:
   ```bash
   git checkout main
   git reset --hard HEAD~1
   git push origin main --force-with-lease
   ```
3. **Verify Liveness**:
   ```bash
   curl -f http://127.0.0.1:8000/health
   ```
4. **Post-Mortem Root Cause Analysis (RCA)**:
   - File structured RCA report within 24 hours covering Root Cause, MTTD, MTTR, and Preventative Actions.
