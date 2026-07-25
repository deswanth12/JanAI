import { AlertTriangle } from "lucide-react"

export default function MaintenanceModeBanner({ isMaintenanceActive = false, maintenanceMessage = "" }) {
  if (!isMaintenanceActive) return null

  const defaultMsg = "Scheduled Maintenance Notice: JanAI gazette synchronization from 2:00 AM – 4:00 AM IST. Core platform services remain operational."
  const displayMsg = maintenanceMessage || defaultMsg

  return (
    <div className="bg-yellow-500/20 border-b border-yellow-500/40 py-2.5 px-4 text-yellow-300 text-xs font-bold flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2 max-w-5xl mx-auto">
        <AlertTriangle size={16} className="text-yellow-400 shrink-0 animate-pulse" />
        <span>{displayMsg}</span>
      </div>
      <span className="text-[10px] bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded uppercase font-mono shrink-0">
        System Notice
      </span>
    </div>
  )
}
