import { Activity, UserCheck, ShieldCheck, FileText, CheckCircle2 } from "lucide-react"

export default function ActivityFeed() {
  const activities = [
    { id: "act-1", timestamp: "18:10 IST", event: "Official Gazette Sync Finished for AP State", actor: "System Automator", icon: CheckCircle2, color: "text-green-400" },
    { id: "act-2", timestamp: "17:45 IST", event: "New Partner Organization 'Andhra University CSC' Approved", actor: "Admin Devanth", icon: UserCheck, color: "text-blue-400" },
    { id: "act-3", timestamp: "16:30 IST", event: "Scheme 'Post-Matric Scholarship' Rule Updated", actor: "Scheme Manager", icon: FileText, color: "text-purple-400" },
    { id: "act-4", timestamp: "14:00 IST", event: "Scheduled 90-Day RSA-256 Signing Key Rotation Completed", actor: "Security Officer", icon: ShieldCheck, color: "text-yellow-400" }
  ]

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity size={16} className="text-blue-400" /> Platform Internal Operational Activity Feed
        </h3>
        <span className="text-[10px] text-gray-400 font-mono">Real-Time Team Telemetry</span>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => {
          const Icon = act.icon
          return (
            <div key={act.id} className="p-3.5 rounded-2xl bg-[#12182b] border border-gray-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Icon size={16} className={act.color} />
                <div>
                  <span className="font-bold text-white text-xs block">{act.event}</span>
                  <span className="text-[10px] text-gray-400">Triggered by: {act.actor}</span>
                </div>
              </div>

              <span className="font-mono text-gray-400 text-[10px] shrink-0">{act.timestamp}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
