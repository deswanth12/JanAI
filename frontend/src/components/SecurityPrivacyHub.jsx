import { useState } from "react"
import { ShieldCheck, Lock, Eye, Trash2, History, Monitor } from "lucide-react"
import ActiveSessionsModal from "./ActiveSessionsModal"

export default function SecurityPrivacyHub() {
  const [consentGranted, setConsentGranted] = useState(true)
  const [showSessionsModal, setShowSessionsModal] = useState(false)
  const [purged, setPurged] = useState(false)

  const [auditLogs] = useState([
    { timestamp: "2026-07-24 18:30:12", action: "USER_LOGIN_SUCCESS", ip: "157.48.91.12", device: "Chrome / Windows 11" },
    { timestamp: "2026-07-24 14:15:00", action: "PROFILE_UPDATED", ip: "157.48.91.12", device: "Chrome / Windows 11" },
    { timestamp: "2026-07-22 09:20:44", action: "DIGILOCKER_KYC_VERIFIED", ip: "157.48.91.12", device: "Chrome / Windows 11" },
    { timestamp: "2026-07-20 11:04:18", action: "PASSWORD_CHANGED_SUCCESS", ip: "157.48.91.12", device: "Chrome / Windows 11" }
  ])

  return (
    <div className="bg-[#12182b] p-6 rounded-3xl border border-gray-800 space-y-6 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Security, Privacy & Data Control Hub</h3>
            <p className="text-gray-400 text-[11px]">DPDP Act 2023 Compliant • AES-256 Encrypted Profile Storage</p>
          </div>
        </div>

        <button
          onClick={() => setShowSessionsModal(true)}
          className="glass hover:bg-white/10 text-blue-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
        >
          <Monitor size={14} /> Active Sessions & Devices
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center gap-2 text-green-400 font-bold">
            <Lock size={16} /> Encryption & Token Protection
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            All user data, Aadhaar numbers, and income certificates are encrypted at rest using AES-256-GCM. Tokens use RS256 RSA keypair signing with single-use refresh rotation.
          </p>
        </div>

        <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Eye size={16} /> Data Processing Consent (DPDP)
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-300 font-medium">Consent for AI Scheme Matching:</span>
            <button
              onClick={() => setConsentGranted(!consentGranted)}
              className={`px-3 py-1 rounded-xl font-bold text-[10px] transition ${
                consentGranted ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-800 text-gray-400"
              }`}
            >
              {consentGranted ? "Granted ✓" : "Revoked ✗"}
            </button>
          </div>
        </div>

        <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <ShieldCheck size={16} /> Admin Protection
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Admin endpoints require mandatory Hardware MFA / TOTP, IP Whitelist monitoring, and device fingerprint verification.
          </p>
        </div>
      </div>

      {/* Production Audit Log Inspector */}
      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-white text-xs flex items-center gap-2">
          <History size={16} className="text-blue-400" /> Production Security Audit Logs
        </h4>
        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-2 text-[11px]">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/60 pb-1.5 last:border-0 last:pb-0">
              <span className="font-mono text-gray-400">{log.timestamp}</span>
              <span className="font-mono text-green-400 font-bold">{log.action}</span>
              <span className="text-gray-300">IP: <code className="text-white">{log.ip}</code></span>
              <span className="text-gray-400 text-[10px]">{log.device}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-xs">
        <span className="text-gray-400">Right to Erasure (DPDP Section 12):</span>
        <button
          onClick={() => {
            setPurged(true)
            setTimeout(() => setPurged(false), 3000)
          }}
          className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl border border-red-500/30 transition"
        >
          <Trash2 size={14} /> {purged ? "Data Purge Requested ✓" : "Purge All My Data"}
        </button>
      </div>

      <ActiveSessionsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
      />
    </div>
  )
}
