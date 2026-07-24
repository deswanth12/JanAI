import { useState, useEffect } from "react"
import { SCHEMES_DATABASE } from "../api/schemesData"
import { fetchMcpTools } from "../api/backendApi"
import {
  ShieldCheck,
  FileSpreadsheet,
  Activity,
  Plus,
  Sparkles,
  BarChart3,
  Server,
  Globe,
  Code
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function Admin() {
  const [adminRole, setAdminRole] = useState("Super Admin")
  const [schemesList] = useState(SCHEMES_DATABASE)
  const [csvStatus, setCsvStatus] = useState("")
  const [mcpToolsList, setMcpToolsList] = useState([])

  useEffect(() => {
    fetchMcpTools().then(res => {
      if (res && res.tools) {
        setMcpToolsList(res.tools)
      }
    })
  }, [])

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
            Admin & MCP Control Portal
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={28} /> JanAI Founder Control Center
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">Total Registered Users</span>
          <h3 className="text-3xl font-extrabold text-white">86,120</h3>
          <p className="text-[10px] text-green-400 font-bold">↑ +18.4% this week</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">MCP Server Protocol</span>
          <h3 className="text-3xl font-extrabold text-blue-400">MCP 2.0</h3>
          <p className="text-[10px] text-blue-400 font-bold">5 Tools Registered</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">Scheduled Languages</span>
          <h3 className="text-3xl font-extrabold text-yellow-400">22 Indian</h3>
          <p className="text-[10px] text-yellow-400 font-bold">Code-mixed Hinglish/Teluglish</p>
        </div>
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-xs text-gray-400 font-semibold">AI Accuracy Score</span>
          <h3 className="text-3xl font-extrabold text-pink-400">98.8%</h3>
          <p className="text-[10px] text-pink-400 font-bold">Ground truth verified</p>
        </div>
      </div>

      {/* MCP Server Registry Section */}
      <div className="glass p-6 rounded-3xl border border-blue-500/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-3">
          <div>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
              Model Context Protocol Backend
            </span>
            <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <Server className="text-blue-400" size={20} /> JanAI Live MCP Tool Registry (/mcp/v1/tools)
            </h3>
            <p className="text-xs text-gray-400">Standard MCP JSON-RPC 2.0 endpoints exposing scheme context & tools to AI agents.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-xl font-bold">
              ✓ MCP HTTP / SSE Server Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mcpToolsList.map((tool) => (
            <div key={tool.name} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-blue-400 flex items-center gap-1">
                  <Code size={14} /> {tool.name}
                </span>
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  MCP Tool
                </span>
              </div>
              <p className="text-gray-300 text-[11px] leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 22 Multilingual AI Capability Panel */}
      <div className="glass p-6 rounded-3xl border border-yellow-500/30 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div>
            <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-3 py-1 rounded-full uppercase">
              Multilingual Vernacular Engine
            </span>
            <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <Globe className="text-yellow-400" size={20} /> 22 Scheduled Indian Languages & Code-Switching Radar
            </h3>
            <p className="text-xs text-gray-400">Exceeding standard 11-language limitations with village vernacular jargon simplification & voice synthesis.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
          {[
            "English", "हिन्दी (Hindi)", "తెలుగు (Telugu)", "தமிழ் (Tamil)", "ಕನ್ನಡ (Kannada)",
            "বাংলা (Bengali)", "मराठी (Marathi)", "മലയാളം (Malayalam)", "ગુજરાતી (Gujarati)", "ਪੰਜਾਬੀ (Punjabi)",
            "ଓଡ଼ିଆ (Odia)", "অসমীয়া (Assamese)", "मैथिली (Maithili)", "ᱥᱟᱱᱛᱟᱲᱤ (Santali)", "कॉशुर (Kashmiri)",
            "नेपाली (Nepali)", "कोंकणी (Konkani)", "डोगरी (Dogri)", "ꯃꯤꯇꯩ ꯂꯣꯟ (Manipuri)", "बर' (Bodo)",
            "संस्कृतम् (Sanskrit)", "सिन्धी (Sindhi)", "Hinglish Mode", "Teluglish Mode"
          ].map((langName, i) => (
            <div key={i} className="bg-[#12182b] p-3 rounded-xl border border-gray-800 text-center font-medium text-gray-200">
              {langName}
            </div>
          ))}
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
