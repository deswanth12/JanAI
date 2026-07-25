import { useState, useEffect } from "react"
import { FEATURE_FLAGS } from "../config/featureFlags"
import { API_BASE_URL } from "../config/api"
import { Activity, CheckCircle2, ShieldCheck, Cpu } from "lucide-react"

export default function SystemDiagnostics() {
  const [apiHealth, setApiHealth] = useState("Checking...")

  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.json())
      .then(data => setApiHealth(data.status === "healthy" ? "Healthy (200 OK)" : "Degraded"))
      .catch(() => setApiHealth("Unavailable"))
  }, [])

  const buildInfo = {
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    commit: import.meta.env.VITE_GIT_COMMIT || "9d5a49a",
    buildDate: import.meta.env.VITE_BUILD_DATE || "2026-07-25",
    environment: import.meta.env.MODE || "production"
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
        <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
          JanAI OS Feature & System Diagnostics
        </span>
        <h2 className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
          <Activity size={20} className="text-green-400" /> Internal System Health & Feature Flags
        </h2>
        <p className="text-gray-400 text-xs">
          Verify feature rollouts, API connectivity, and build metadata without inspecting environment variables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Flags Status */}
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu size={16} className="text-blue-400" /> Active Feature Flags
          </h3>

          <div className="space-y-2 text-xs">
            {Object.keys(FEATURE_FLAGS).map((flag) => {
              const enabled = FEATURE_FLAGS[flag]
              return (
                <div key={flag} className="flex justify-between items-center p-3 rounded-xl bg-[#12182b]">
                  <span className="font-mono text-gray-300 font-semibold">{flag}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${enabled ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {enabled ? "✓ Enabled" : "✕ Disabled"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Operational System Diagnostics */}
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck size={16} className="text-purple-400" /> System Build Diagnostics
          </h3>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between p-3 rounded-xl bg-[#12182b]">
              <span className="text-gray-400">Backend API Gateway Status:</span>
              <strong className="text-green-400 flex items-center gap-1">
                <CheckCircle2 size={14} /> {apiHealth}
              </strong>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#12182b]">
              <span className="text-gray-400">Platform Version:</span>
              <strong className="text-white">v{buildInfo.version}</strong>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#12182b]">
              <span className="text-gray-400">Git Commit:</span>
              <strong className="text-blue-400">{buildInfo.commit}</strong>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#12182b]">
              <span className="text-gray-400">Build Timestamp:</span>
              <strong className="text-purple-300">{buildInfo.buildDate}</strong>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#12182b]">
              <span className="text-gray-400">Environment Mode:</span>
              <span className="bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                {buildInfo.environment}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
