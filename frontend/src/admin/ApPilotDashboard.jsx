import { useState } from "react"
import {
  Users,
  Search,
  Bot,
  FileCheck,
  TrendingUp,
  MapPin,
  ThumbsUp
} from "lucide-react"

export default function ApPilotDashboard() {
  const [districtFilter, setDistrictFilter] = useState("Visakhapatnam")

  const pilotStats = {
    visakhapatnam: { activeUsers: "4,820", searches: "18,420", aiQueries: "12,940", docsUploaded: "3,110", appsCompleted: "2,840", supportTickets: "12", satisfaction: "98.4%" },
    tirupati: { activeUsers: "3,940", searches: "14,110", aiQueries: "9,820", docsUploaded: "2,450", appsCompleted: "2,190", supportTickets: "8", satisfaction: "99.1%" },
    vijayawada: { activeUsers: "4,160", searches: "15,800", aiQueries: "10,400", docsUploaded: "2,890", appsCompleted: "2,610", supportTickets: "14", satisfaction: "97.8%" }
  }

  const currentStats = pilotStats[districtFilter.toLowerCase()] || pilotStats.visakhapatnam

  return (
    <div className="space-y-6 text-xs">
      {/* Pilot Header */}
      <div className="glass p-6 rounded-3xl border border-green-500/40 bg-green-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
            Andhra Pradesh Pilot Operational Dashboard
          </span>
          <h2 className="text-xl font-extrabold text-white mt-2 flex items-center gap-2">
            <MapPin size={20} className="text-green-400" /> AP State Pilot Telemetry & Performance Engine
          </h2>
          <p className="text-gray-300 text-xs mt-1">
            Pilot launch cohort partnered with Andhra University CSC Assistance Center (Visakhapatnam).
          </p>
        </div>

        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="bg-[#12182b] text-white px-4 py-2.5 rounded-2xl border border-gray-700 font-bold outline-none cursor-pointer text-xs shrink-0"
        >
          <option value="Visakhapatnam">📍 Visakhapatnam District</option>
          <option value="Tirupati">📍 Tirupati District</option>
          <option value="Vijayawada">📍 NTL Vijayawada District</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex justify-between items-center text-gray-400">
            <span>Daily Active Users</span>
            <Users size={16} className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">{currentStats.activeUsers}</h3>
          <span className="text-[10px] text-green-400 font-bold">↑ 14% this week</span>
        </div>

        <div className="glass p-4 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex justify-between items-center text-gray-400">
            <span>Searches Performed</span>
            <Search size={16} className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-purple-300">{currentStats.searches}</h3>
          <span className="text-[10px] text-gray-400">Avg response: 14ms</span>
        </div>

        <div className="glass p-4 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex justify-between items-center text-gray-400">
            <span>AI Questions Asked</span>
            <Bot size={16} className="text-green-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-green-300">{currentStats.aiQueries}</h3>
          <span className="text-[10px] text-green-400 font-bold">98.8% Precision</span>
        </div>

        <div className="glass p-4 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex justify-between items-center text-gray-400">
            <span>Applications Completed</span>
            <FileCheck size={16} className="text-yellow-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-yellow-300">{currentStats.appsCompleted}</h3>
          <span className="text-[10px] text-yellow-400 font-bold">{currentStats.docsUploaded} Docs Verified</span>
        </div>
      </div>

      {/* Telemetry Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" /> Top Searched Welfare Terms ({districtFilter})
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-xl bg-[#12182b]">
              <span>🎓 Jagananna Vidya Deevena (Tuition Fee)</span>
              <span className="font-mono text-green-400 font-bold">4,120 searches</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-[#12182b]">
              <span>🌾 PM-Kisan 17th Installment Date</span>
              <span className="font-mono text-blue-400 font-bold">3,450 searches</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-[#12182b]">
              <span>💼 PM Mudra Loan (Tarun Plus ₹20 Lakhs)</span>
              <span className="font-mono text-purple-400 font-bold">2,890 searches</span>
            </div>
          </div>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ThumbsUp size={16} className="text-yellow-400" /> Operational Metrics & User Feedback
          </h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-400 text-[10px]">User Satisfaction</span>
              <h4 className="text-xl font-extrabold text-green-400">{currentStats.satisfaction}</h4>
            </div>
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-400 text-[10px]">Avg App Time</span>
              <h4 className="text-xl font-extrabold text-blue-400">4.2 mins</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
