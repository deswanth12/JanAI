/**
 * JanAI Frontend Feature Flag Manager
 * Allows incremental feature rollouts without requiring code redeployments.
 */

export const FEATURE_FLAGS = {
  ENABLE_VOICE_ASSISTANT: import.meta.env.VITE_ENABLE_VOICE_ASSISTANT !== "false",
  ENABLE_PARTNER_PORTAL: import.meta.env.VITE_ENABLE_PARTNER_PORTAL !== "false",
  ENABLE_AI_SANDBOX: import.meta.env.VITE_ENABLE_AI_SANDBOX !== "false",
  ENABLE_DIGILOCKER_VAULT: import.meta.env.VITE_ENABLE_DIGILOCKER_VAULT !== "false"
}

export const isFeatureEnabled = (flagName) => {
  return Boolean(FEATURE_FLAGS[flagName])
}
