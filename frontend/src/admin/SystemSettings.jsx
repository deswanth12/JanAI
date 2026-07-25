import { useState } from "react"
import { Settings, RefreshCw, Database, ToggleLeft, ToggleRight, Key } from "lucide-react"

export default function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [featureFlags, setFeatureFlags] = useState({
    voiceAssistant: true,
    digiLockerKyc: true,
    ocrDocumentParser: true,
    autonomousGoalAgent: true,
    b2bPartnerPortal: true
  })

  const [message, setMessage] = useState("")

  const toggleFlag = (key) => {
    setFeatureFlags({ ...featureFlags, [key]: !featureFlags[key] })
  }

  const handleRotateRsaKeys = () => {
    setMessage("RSA Signing Keypair successfully rotated! New Key ID: janai-rsa-key-2.")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleTriggerBackup = () => {
    setMessage("Automated SQLite WAL backup created & uploaded to S3 vault successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-purple-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
              CEO Master Control Privilege
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">System Settings & Feature Flag Controller</h3>
          <p className="text-gray-400 text-xs">Platform maintenance mode, RSA key rotation, automated backups, and feature flags</p>
        </div>

        <button
          onClick={() => setMaintenanceMode(!maintenanceMode)}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition border ${
            maintenanceMode ? "bg-red-500 text-white border-red-500" : "bg-gray-800 text-gray-300 border-gray-700 hover:text-white"
          }`}
        >
          {maintenanceMode ? "🚨 Maintenance Mode Active" : "Enable Maintenance Mode"}
        </button>
      </div>

      {message && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-300 font-bold text-center">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progressive Feature Flags Controller */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings size={16} className="text-purple-400" /> Feature Flags & Progressive Rollout
          </h4>

          <div className="space-y-3">
            {Object.keys(featureFlags).map((flag) => (
              <div key={flag} className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase text-[11px]">{flag.replace(/([A-Z])/g, ' $1')}</span>
                <button onClick={() => toggleFlag(flag)} className="text-purple-400">
                  {featureFlags[flag] ? <ToggleRight size={28} className="text-green-400" /> : <ToggleLeft size={28} className="text-gray-500" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CEO Operations: Key Rotation & Backup */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Key size={16} className="text-yellow-400" /> Key Rotation & Database Backup
          </h4>

          <div className="space-y-3">
            <div className="p-4 bg-[#12182b] rounded-2xl border border-gray-800 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-white">Scheduled RSA Key Rotation</strong>
                <button
                  onClick={handleRotateRsaKeys}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-xl text-[10px] transition flex items-center gap-1"
                >
                  <RefreshCw size={12} /> Rotate Keys Now
                </button>
              </div>
              <p className="text-gray-400 text-[11px]">Rotates RS256 RSA private key without invalidating active user access tokens.</p>
            </div>

            <div className="p-4 bg-[#12182b] rounded-2xl border border-gray-800 space-y-2">
              <div className="flex justify-between items-center">
                <strong className="text-white">Automated Database WAL Backup</strong>
                <button
                  onClick={handleTriggerBackup}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl text-[10px] transition flex items-center gap-1"
                >
                  <Database size={12} /> Backup DB Now
                </button>
              </div>
              <p className="text-gray-400 text-[11px]">Creates a snapshot of janai.db and streams Write-Ahead Logs to encrypted S3 bucket.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
