/**
 * JanAI Production Frontend API Gateway & Configuration Registry
 * Hardened with trailing slash normalization, URL validation, and versioned endpoint centralization.
 */

// 1. Normalize Base URL (Remove trailing slashes)
const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
export const API_BASE_URL = RAW_API_URL.replace(/\/+$/, "")

// 2. Validate URL Format at Startup
try {
  new URL(API_BASE_URL)
} catch {
  console.error(`⚠️ Invalid VITE_API_URL configuration: ${API_BASE_URL}`)
}

// 3. Helper to format endpoints safely
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${API_BASE_URL}${cleanEndpoint}`
}

// 4. Centralized API Endpoint Registry (/api/v1 versioned)
export const API = {
  // Operational Probes
  HEALTH: getApiUrl("/health"),
  READINESS: getApiUrl("/readiness"),

  // Auth Endpoints
  LOGIN: getApiUrl("/auth/login"),
  REGISTER: getApiUrl("/auth/register"),
  GOOGLE_AUTH: getApiUrl("/auth/google"),
  REQUEST_OTP: getApiUrl("/auth/otp/request"),
  VERIFY_OTP: getApiUrl("/auth/otp/verify"),
  FORGOT_PASSWORD: getApiUrl("/auth/forgot-password"),
  RESET_PASSWORD: getApiUrl("/auth/reset-password"),

  // Versioned Citizen APIs (/api/v1/citizen)
  CITIZEN_SCHEMES: getApiUrl("/api/v1/citizen/schemes"),
  CITIZEN_ELIGIBILITY: getApiUrl("/api/v1/citizen/eligibility"),
  CITIZEN_APPLICATIONS: getApiUrl("/api/v1/citizen/applications"),

  // Versioned Admin APIs (/api/v1/admin)
  ADMIN_STATS: getApiUrl("/api/v1/admin/stats"),
  ADMIN_AUDIT_LOGS: getApiUrl("/api/v1/admin/audit-logs"),

  // Versioned Partner APIs (/api/v1/partner)
  PARTNER_CASES: getApiUrl("/api/v1/partner/cases"),
  PARTNER_APPLY: getApiUrl("/api/v1/partner/apply")
}
