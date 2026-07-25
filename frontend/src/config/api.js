/**
 * JanAI Dynamic API Environment Configuration
 * Evaluates import.meta.env.VITE_API_URL based on active environment:
 * - Development: http://localhost:8000
 * - Preview / Staging: https://staging-api.janai.in
 * - Production: https://api.janai.in
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${API_BASE_URL}${cleanEndpoint}`
}
