import { Users, FileCheck, Bot, Clock, ShieldCheck, TrendingUp } from "lucide-react"

export default function ExecutiveDashboard() {
  const kpis = [
    { label: "Registered Citizens", value: "12,450", change: "↑ 18% this month", icon: Users, color: "text-blue-400" },
    { label: "Submitted Today", value: "327", change: "↑ 12% vs yesterday", icon: FileCheck, color: "text-purple-400" },
    { label: "Applications Completed", value: "289", change: "88.3% success rate", icon: CheckCircleIcon, color: "text-green-400" },
    { label: "AI Queries Today", value: "5,812", change: "98.8% precision", icon: Bot, color: "text-yellow-400" },
    { label: "Avg Response Time", value: "140 ms", change: "P95 response latency", icon: Clock, color: "text-pink-400" },
    { label: "Platform Availability", value: "99.97%", change: "0 unplanned outages", icon: ShieldCheck, color: "text-emerald-400" }
  ]

  function CheckCircleIcon({ size, className }) {
    return <TrendingUp size={size} className={className} />
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-1">
        <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
          JanAI OS Executive Command Pillar
        </span>
        <h2 className="text-xl font-extrabold text-white mt-2">Executive KPI Summary</h2>
        <p className="text-gray-400 text-xs">
          Real-time business impact metrics and platform availability overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div key={idx} className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-[11px] font-semibold">{kpi.label}</span>
                <Icon size={18} className={kpi.color} />
              </div>
              <h3 className="text-2xl font-extrabold text-white">{kpi.value}</h3>
              <span className="text-[10px] text-green-400 font-bold">{kpi.change}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
