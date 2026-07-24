import { useState } from "react"
import { ShieldCheck, Lock, AlertTriangle, Key, Smartphone, CheckCircle2, Copy } from "lucide-react"

export default function SecurityHealthDashboard() {
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [copied, setCopied] = useState(false)

  const [backupCodes] = useState([
    "8041-9281-7401",
    "6019-4820-1129",
    "3901-5742-8812",
    "9104-3321-4509",
    "7210-8849-2014",
    "1590-4428-6601",
    "4028-1193-8840",
    "2914-7701-3329"
  ])

  const [anomalies] = useState([
    {
      type: "SUSPICIOUS_LOGIN_BLOCKED",
      title: "New Device Sign-in Attempt",
      detail: "Attempted login from Chrome on Windows / IP 185.220.101.4 (Frankfurt, Germany) was challenged with MFA.",
      date: "Yesterday, 22:14 IST",
      status: "Blocked & Challenged"
    }
  ])

  const securityScore = mfaEnabled ? 92 : 75

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#12182b] p-6 rounded-3xl border border-gray-800 space-y-6 text-xs">
      {/* Header & Overall Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Security Health Score</h3>
              <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2.5 py-0.5 rounded-full font-mono">
                {securityScore}% Excellent
              </span>
            </div>
            <p className="text-gray-400 text-[11px]">Argon2id Hashed • RS256 Tokens • Real-Time Anomaly Detection</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMfaEnabled(!mfaEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              mfaEnabled ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
            }`}
          >
            <Smartphone size={14} /> {mfaEnabled ? "2FA / MFA Active" : "Enable 2FA / MFA"}
          </button>

          <button
            onClick={() => setShowBackupCodes(!showBackupCodes)}
            className="glass hover:bg-white/10 text-gray-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <Key size={14} /> One-Time Backup Codes
          </button>
        </div>
      </div>

      {/* Security Health Breakdown Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Email Verified</span>
          <strong className="text-green-400 block font-bold flex items-center gap-1">
            <CheckCircle2 size={13} /> Verified
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Mobile Phone</span>
          <strong className="text-green-400 block font-bold flex items-center gap-1">
            <CheckCircle2 size={13} /> Verified (+91)
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Password Strength</span>
          <strong className="text-green-400 block font-bold flex items-center gap-1">
            <Lock size={13} /> Argon2id (Strong)
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Multi-Factor Auth</span>
          <strong className={mfaEnabled ? "text-green-400 block font-bold flex items-center gap-1" : "text-yellow-400 block font-bold"}>
            {mfaEnabled ? "TOTP Active" : "Disabled"}
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 font-semibold">Device Sessions</span>
          <strong className="text-blue-400 block font-bold">
            2 Trusted Devices
          </strong>
        </div>
      </div>

      {/* Backup Codes Modal / Panel */}
      {showBackupCodes && (
        <div className="p-4 bg-[#1b2338] border border-gray-700 rounded-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <div>
              <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Key size={14} className="text-yellow-400" /> One-Time Emergency Backup Recovery Codes
              </h4>
              <p className="text-gray-400 text-[10px]">Use these one-time codes if you lose access to your primary authenticator device.</p>
            </div>
            <button
              onClick={copyBackupCodes}
              className="text-xs bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
            >
              <Copy size={12} /> {copied ? "Copied to Clipboard!" : "Copy Codes"}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-yellow-300">
            {backupCodes.map((code, idx) => (
              <div key={idx} className="bg-[#12182b] p-2 rounded-xl border border-gray-800 text-center">
                {code}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suspicious Activity Detection Card */}
      {anomalies.length > 0 && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
            <AlertTriangle size={16} /> Automated Suspicious Activity Alert
          </div>
          {anomalies.map((anom, idx) => (
            <div key={idx} className="text-[11px] text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-yellow-500/20 pt-2">
              <div>
                <strong className="text-white">{anom.title}</strong> — {anom.detail}
              </div>
              <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-mono px-2 py-0.5 rounded font-bold shrink-0">
                {anom.date} • {anom.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
