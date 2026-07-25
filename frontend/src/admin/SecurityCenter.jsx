import { useState } from "react"
import { History } from "lucide-react"

export default function SecurityCenter() {
  const [securityScore] = useState(92)
  const [rsaKeyStatus] = useState("Active (janai-rsa-key-1) • Expires in 82 Days")

  const [siemLogs] = useState([
    { timestamp: "2026-07-24 18:30:12", event: "RS256_TOKEN_VERIFIED", ip: "157.48.91.12", threatLevel: "Low (0.0)" },
    { timestamp: "2026-07-24 14:15:00", event: "FAILED_LOGIN_CHALLENGE", ip: "185.220.101.4", threatLevel: "Medium (0.6)" },
    { timestamp: "2026-07-22 09:20:44", event: "SINGLE_USE_REFRESH_ROTATED", ip: "157.48.91.12", threatLevel: "Low (0.0)" }
  ])

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">Enterprise Security Command & SIEM Center</h3>
          <p className="text-gray-400 text-xs">Active session monitoring, cryptographic audit ledger, SIEM events, and RSA keypair status</p>
        </div>

        <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
          Security Score: {securityScore}% Passed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">RSA Signing Keypair</span>
          <strong className="text-white block font-mono text-xs">{rsaKeyStatus}</strong>
        </div>

        <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Password Security</span>
          <strong className="text-green-400 block text-xs font-bold">Argon2id (200,000 Iterations)</strong>
        </div>

        <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Audit Ledger Hash Chain</span>
          <strong className="text-purple-400 block text-xs font-bold">SHA-256 Block Chained ✓</strong>
        </div>
      </div>

      {/* SIEM Threat Logs Table */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <History size={16} className="text-blue-400" /> SIEM Event Log Stream & Threat Ingestion
        </h4>

        <div className="space-y-2 font-mono text-[11px]">
          {siemLogs.map((log, idx) => (
            <div key={idx} className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center text-gray-300">
              <span>{log.timestamp}</span>
              <strong className="text-green-400">{log.event}</strong>
              <span>IP: <code className="text-white">{log.ip}</code></span>
              <span className="text-yellow-400">{log.threatLevel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
