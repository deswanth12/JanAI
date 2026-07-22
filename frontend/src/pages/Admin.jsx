import { useState } from "react"
import { SCHEMES_DATABASE } from "../api/schemesData"
import {
  ShieldCheck,
  FileSpreadsheet,
  Activity,
  Plus,
  Sparkles,
  BarChart3
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function Admin() {
  const [adminRole, setAdminRole] = useState("Super Admin")
  const [schemesList] = useState(SCHEMES_DATABASE)
  const [csvStatus, setCsvStatus] = useState("")

  const analyticsData = [
    { day: "Mon", users: 1200, aiQueries: 4500, successRate: 94 },
    { day: "Tue", users: 1900, aiQueries: 5800, successRate: 96 },
    { day: "Wed", users: 2400, aiQueries: 7200, successRate: 95 },
    { day: "Thu", users: 3100, aiQueries: 8900, successRate: 97 },
    { day: "Fri", users: 4200, aiQueries: 11200, successRate: 98 },
    { day: "Sat", users: 5600, aiQueries: 14500, successRate: 96 },
    { day: "Sun", users: 6800, aiQueries: 18200, successRate: 97 }
  ]

  const stateDistributionData = [
    { state: "Andhra Pradesh", users: 14200 },
    { state: "Telangana", users: 12800 },
    { state: "Uttar Pradesh", users: 24500 },
    { state: "Maharashtra", users: 18900 },
    { state: "Tamil Nadu", users: 15600 }
  ]

  const handleCsvImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCsvStatus(`Importing ${file.name}...`)
    setTimeout(() => {
      setCsvStatus(`✓ Successfully synced 14 new Government schemes into vector database!`)
    }, 1500)
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
            Admin Management Portal
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={28} /> JanAI Startup Control Center
          </h1>
        </div>

        <div className="flex bg-[#12182b] p-1 rounded-2xl border border-gray-800 text-xs font-bold">
          {["Super Admin", "Content Manager", "Moderator", "Data Analyst"].map((role) => (
            <button
              key={role}
              onClick={() => setAdminRole(role)}
              className={`px-3 py-2 rounded-xl transition ${
                adminRole === role ? "bg-green-500 text-black shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">Total Registered Users</span>
          <h3 className="text-3xl font-extrabold text-white">86,120</h3>
          <p className="text-[10px] text-green-400 font-bold">↑ +18.4% this week</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">AI Queries Processed</span>
          <h3 className="text-3xl font-extrabold text-green-400">70,300</h3>
          <p className="text-[10px] text-green-400 font-bold">↑ +24.1% Gemini RAG load</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">Active Schemes Indexed</span>
          <h3 className="text-3xl font-extrabold text-blue-400">{schemesList.length}</h3>
          <p className="text-[10px] text-blue-400 font-bold">Vector RAG Sync Active</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">AI Accuracy Score</span>
          <h3 className="text-3xl font-extrabold text-pink-400">98.2%</h3>
          <p className="text-[10px] text-pink-400 font-bold">Ground truth verified</p>
        </div>
      </div>

      {(adminRole === "Super Admin" || adminRole === "Content Manager") && (
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="text-green-400" size={20} /> Government Data Sync (CSV/Excel)
              </h3>
              <p className="text-xs text-gray-400">Bulk upload schemes from Government Open Data Portal or Gazette notifications.</p>
            </div>

            <label className="bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer hover:opacity-90 transition flex items-center gap-2">
              <Plus size={16} /> Import Scheme CSV/Excel
              <input type="file" accept=".csv,.xlsx" onChange={handleCsvImport} className="hidden" />
            </label>
          </div>

          {csvStatus && (
            <div className="p-3 bg-[#12182b] border border-green-500/30 rounded-2xl text-xs text-green-400 font-bold flex items-center gap-2">
              <Sparkles size={16} /> {csvStatus}
            </div>
          )}
        </div>
      )}

      {(adminRole === "Super Admin" || adminRole === "Data Analyst") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="text-green-400" size={18} /> Daily Active Users & AI Usage
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="aiQueries" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-blue-400" size={18} /> Top State-Wise User Adoption
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateDistributionData}>
                  <XAxis dataKey="state" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="glass rounded-3xl border border-gray-800 overflow-x-auto p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Active Scheme Registry ({schemesList.length} Schemes)</h3>
        <table className="w-full text-xs text-left text-gray-300">
          <thead className="bg-[#12182b] text-gray-400 font-bold border-b border-gray-800 uppercase">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">State</th>
              <th className="p-3">Benefit</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {schemesList.map((s) => (
              <tr key={s.id}>
                <td className="p-3 font-bold text-white">{s.title}</td>
                <td className="p-3 text-green-400">{s.category}</td>
                <td className="p-3">{s.state}</td>
                <td className="p-3 text-pink-400 font-bold">{s.benefitAmount}</td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-400 hover:underline">Edit</button>
                  <button className="text-red-400 hover:underline">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
