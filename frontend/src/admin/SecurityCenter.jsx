import { useState } from "react"
import { ShieldCheck, Lock, KeyRound } from "lucide-react"

export default function SecurityCenter() {
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const securityEvents = [
    { id: "sec-101", timestamp: "17:38:12 IST", severity: "critical", levelLabel: "🔴 Critical", title: "Authentication Service Anomaly", description: "Transient RS256 token verification timeout resolved.", actor: "Gateway Shield" },
    { id: "sec-102", timestamp: "17:25:40 IST", severity: "high", levelLabel: "🟠 High", title: "Multiple Failed Login Attempts", description: "5 consecutive failed attempts on citizen account +91 9988***.", actor: "IP 183.82.20.14" },
    { id: "sec-103", timestamp: "16:45:02 IST", severity: "medium", levelLabel: "🟡 Medium", title: "CSP Violation Telemetry Reported", description: "Inline style attempt blocked by strict CSP header policy.", actor: "Browser Client" },
    { id: "sec-104", timestamp: "14:10:00 IST", severity: "info", levelLabel: "🔵 Informational", title: "Scheduled RSA Signing Key Rotation", description: "90-day RSA-256 asymmetric signing key rotated successfully.", actor: "Key Manager" }
  ]

  const severityCounts = {
    all: securityEvents.length,
    critical: securityEvents.filter(e => e.severity === "critical").length,
    high: securityEvents.filter(e => e.severity === "high").length,
    medium: securityEvents.filter(e => e.severity === "medium").length,
    info: securityEvents.filter(e => e.severity === "info").length
  }

  const filteredEvents = selectedSeverity === "all" ? securityEvents : securityEvents.filter(e => e.severity === selectedSeverity)

  return (
    <div className="space-y-6 text-xs">
      {/* Security Header */}
      <div className="glass p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-3 py-1 rounded-full uppercase border border-red-500/30">
            JanAI OS Security & SIEM Command Center
          </span>
          <h2 className="text-xl font-extrabold text-white mt-2 flex items-center gap-2">
            <ShieldCheck size={20} className="text-red-400" /> SIEM Threat Telemetry & Severity Matrix
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Categorized threat logs, RSA-256 keypair rotation status, and CSP enforcement telemetry.
          </p>
        </div>

        <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 flex items-center gap-3 font-mono text-xs">
          <KeyRound size={16} className="text-green-400" />
          <div>
            <span className="text-gray-400 block text-[10px]">RSA-256 Key Status:</span>
            <strong className="text-green-400">Active (Next Rotation in 74 Days)</strong>
          </div>
        </div>
      </div>

      {/* Severity Filter Tabs */}
      <div className="grid grid-cols-5 gap-2 bg-[#12182b] p-1.5 rounded-2xl border border-gray-800 font-bold text-center text-xs">
        <button onClick={() => setSelectedSeverity("all")} className={`py-2 rounded-xl transition ${selectedSeverity === "all" ? "bg-purple-600 text-white" : "text-gray-400"}`}>
          All ({severityCounts.all})
        </button>
        <button onClick={() => setSelectedSeverity("critical")} className={`py-2 rounded-xl transition ${selectedSeverity === "critical" ? "bg-red-600 text-white" : "text-gray-400"}`}>
          🔴 Critical ({severityCounts.critical})
        </button>
        <button onClick={() => setSelectedSeverity("high")} className={`py-2 rounded-xl transition ${selectedSeverity === "high" ? "bg-orange-600 text-white" : "text-gray-400"}`}>
          🟠 High ({severityCounts.high})
        </button>
        <button onClick={() => setSelectedSeverity("medium")} className={`py-2 rounded-xl transition ${selectedSeverity === "medium" ? "bg-yellow-600 text-black" : "text-gray-400"}`}>
          🟡 Medium ({severityCounts.medium})
        </button>
        <button onClick={() => setSelectedSeverity("info")} className={`py-2 rounded-xl transition ${selectedSeverity === "info" ? "bg-blue-600 text-white" : "text-gray-400"}`}>
          🔵 Info ({severityCounts.info})
        </button>
      </div>

      {/* Categorized Threat Stream */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock size={16} className="text-red-400" /> Security Threat Stream ({filteredEvents.length} Events)
        </h3>

        <div className="space-y-2.5">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-4 rounded-2xl bg-[#12182b] border border-gray-800 flex items-start justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{event.title}</span>
                  <span className="text-[10px] font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded font-bold">
                    {event.levelLabel}
                  </span>
                </div>
                <p className="text-gray-300 text-xs">{event.description}</p>
                <span className="text-[10px] text-gray-500 font-mono block">Actor: {event.actor}</span>
              </div>

              <span className="font-mono text-gray-400 text-[10px] shrink-0">{event.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
