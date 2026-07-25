import { useState } from "react"
import { AlertTriangle, Info, CheckCircle2, AlertOctagon, X } from "lucide-react"

export default function MaintenanceModeBanner({
  isMaintenanceActive = false,
  maintenanceType = "scheduled", // "scheduled" | "disruption" | "info" | "complete"
  maintenanceMessage = "",
  dismissible = true,
  expiresAt = null // e.g. "2026-07-28T18:00:00Z"
}) {
  const [dismissedKey, setDismissedKey] = useState("")

  // Derive dismissal state based on current message identifier
  const currentKey = `${maintenanceType}-${maintenanceMessage}`
  const isDismissed = dismissedKey === currentKey

  // Auto-expiration check
  const isExpired = expiresAt ? new Date() > new Date(expiresAt) : false

  if (!isMaintenanceActive || isDismissed || isExpired) return null

  const bannerConfigs = {
    scheduled: {
      style: "bg-yellow-500/20 border-yellow-500/40 text-yellow-300",
      badge: "bg-yellow-500/30 text-yellow-200",
      label: "Scheduled Maintenance",
      icon: AlertTriangle,
      iconColor: "text-yellow-400",
      defaultMsg: "Scheduled Maintenance Notice: JanAI gazette synchronization from 2:00 AM – 4:00 AM IST. Core platform services remain operational."
    },
    disruption: {
      style: "bg-red-500/20 border-red-500/40 text-red-300",
      badge: "bg-red-500/30 text-red-200",
      label: "Service Disruption",
      icon: AlertOctagon,
      iconColor: "text-red-400",
      defaultMsg: "Service Disruption Notice: Partner API sync experiencing elevated latency. Engineering team actively investigating."
    },
    info: {
      style: "bg-blue-500/20 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/30 text-blue-200",
      label: "System Notice",
      icon: Info,
      iconColor: "text-blue-400",
      defaultMsg: "Informational Notice: 12 new state welfare schemes added to Andhra Pradesh catalog."
    },
    complete: {
      style: "bg-green-500/20 border-green-500/40 text-green-300",
      badge: "bg-green-500/30 text-green-200",
      label: "Maintenance Complete",
      icon: CheckCircle2,
      iconColor: "text-green-400",
      defaultMsg: "Maintenance Complete: Gazette index synchronization successfully completed."
    }
  }

  const config = bannerConfigs[maintenanceType] || bannerConfigs.scheduled
  const Icon = config.icon
  const displayMsg = maintenanceMessage || config.defaultMsg

  return (
    <div className={`border-b py-2.5 px-4 text-xs font-bold flex items-center justify-between shadow-lg ${config.style}`}>
      <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
        <Icon size={16} className={`${config.iconColor} shrink-0 animate-pulse`} />
        <span>{displayMsg}</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono ${config.badge}`}>
          {config.label}
        </span>
        {dismissible && (
          <button
            onClick={() => setDismissedKey(currentKey)}
            className="hover:opacity-75 font-extrabold text-xs transition px-1"
            title="Dismiss notice"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
