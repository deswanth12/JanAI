import { useState } from "react"
import { BarChart3, Users, FileCheck, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react"

export default function ExecutiveDashboard() {
  const [metrics] = useState({
    totalUsers: 86120,
    activeUsersToday: 14920,
    applicationsSubmitted: 121,
    aiSuccessRate: 98.8,
    systemHealth: "100% Operational",
    revenueGrantsProcessed: "₹4.2 Cr",
    securityAlertsCount: 0
  })

  return (
    <div className="space-y-6 text-xs">
      {/* CEO Executive KPI Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span>Total Registered Citizens</span>
            <Users size={18} className="text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{metrics.totalUsers.toLocaleString()}</p>
          <p className="text-[11px] text-green-400 font-medium">↑ +1,420 new citizens this week</p>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span>Active Citizens Today</span>
            <TrendingUp size={18} className="text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-blue-400">{metrics.activeUsersToday.toLocaleString()}</p>
          <p className="text-[11px] text-gray-500">Across 26 Districts in AP & TS</p>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span>Applications Tracked</span>
            <FileCheck size={18} className="text-pink-400" />
          </div>
          <p className="text-3xl font-extrabold text-pink-400">{metrics.applicationsSubmitted}</p>
          <p className="text-[11px] text-yellow-400 font-medium">₹4.2 Cr Welfare Value Facilitated</p>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 font-semibold">
            <span>AI Precision & Accuracy</span>
            <Sparkles size={18} className="text-green-400" />
          </div>
          <p className="text-3xl font-extrabold text-green-400">{metrics.aiSuccessRate}%</p>
          <p className="text-[11px] text-gray-500">Grounded in 2026 Gazette PDFs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Health & Security Alert Overview */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400" /> Real-Time System Health & Security Status
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>Platform Core REST & MCP API</span>
              <span className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-xl text-[10px]">
                {metrics.systemHealth}
              </span>
            </div>

            <div className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>Security Anomaly Alerts</span>
              <span className="bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-xl text-[10px]">
                0 Critical / High Findings
              </span>
            </div>

            <div className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>Gazette Data Sync Crawler</span>
              <span className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-xl text-[10px]">
                Last Sync: 24 Jul 2026 18:30 IST
              </span>
            </div>
          </div>
        </div>

        {/* State Welfare Allocation Breakdown */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 size={18} className="text-purple-400" /> Executive State Welfare Breakdown
          </h3>

          <div className="space-y-3 font-mono text-[11px]">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>Education & Scholarships</span>
                <span className="text-purple-400 font-bold">₹1.8 Cr (43%)</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[43%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>Agriculture & Farmer Support</span>
                <span className="text-green-400 font-bold">₹1.5 Cr (36%)</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[36%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-300">
                <span>MSME & Collateral-Free Loans</span>
                <span className="text-yellow-400 font-bold">₹0.9 Cr (21%)</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[21%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
