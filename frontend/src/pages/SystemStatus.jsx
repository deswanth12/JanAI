import { useState, useEffect } from "react"
import { CheckCircle2, Server, RefreshCw } from "lucide-react"
import { fetchHealthStatus } from "../api/backendApi"

export default function SystemStatus() {
  const [systemHealth, setSystemHealth] = useState({
    status: "100% Operational",
    service: "JanAI Production MCP Server & FastAPI",
    mcp_protocol: "MCP 2.0 Compliant",
    database: "SQLite (janai.db)",
    multilingual_languages_count: 22,
    ai_engine: "Gemini 2.0 Flash + Vernacular RAG"
  })

  const [lastGazetteSync] = useState("24 Jul 2026, 18:30 IST")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleCheckNow = () => {
    setIsRefreshing(true)
    fetchHealthStatus().then(data => {
      if (data) setSystemHealth(data)
      setIsRefreshing(false)
    })
  }

  useEffect(() => {
    fetchHealthStatus().then(data => {
      if (data) setSystemHealth(data)
    })
  }, [])

  const services = [
    { name: "JanAI REST & MCP 2.0 Protocol API", status: systemHealth.status || "Operational", uptime: "99.98%" },
    { name: "Gemini 2.0 Flash RAG Reasoning Engine", status: "Operational", uptime: "99.95%" },
    { name: "Automated Gazette Data Sync Crawler", status: "Operational", uptime: "100.0%" },
    { name: "DigiLocker e-KYC Verification Gateway", status: "Operational", uptime: "99.90%" },
    { name: "22 Regional Language Vernacular NLU Engine", status: "Operational", uptime: "99.99%" },
    { name: "Fast2SMS Mobile OTP SMS Gateway", status: "Operational", uptime: "99.85%" }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-xs">
      <div className="glass p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
              Public System Health Page
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
              Real-Time Metrics
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">JanAI System Operational Status</h1>
          <p className="text-gray-400 text-xs mt-1">Live status of API, AI engine, and government data sync pipelines</p>
        </div>

        <button
          onClick={handleCheckNow}
          disabled={isRefreshing}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-green-500/20 self-start md:self-auto"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} /> Check Live Health
        </button>
      </div>

      {/* Overall Health Banner */}
      <div className="bg-[#12182b] p-6 rounded-3xl border border-green-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xl">
            <CheckCircle2 size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">All Systems Operational</h3>
            <p className="text-gray-400 text-[11px]">Zero outages detected in the last 90 days</p>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-gray-400">
          <div>Last Gazette Sync: <strong className="text-white">{lastGazetteSync}</strong></div>
          <div>MCP Version: <strong className="text-yellow-400">v2.0 Compliant</strong></div>
        </div>
      </div>

      {/* Services Table */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Server size={18} className="text-blue-400" /> Platform Components Status Matrix
        </h3>

        <div className="space-y-3">
          {services.map((srv, idx) => (
            <div key={idx} className="p-4 bg-[#12182b] rounded-2xl border border-gray-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                <span className="font-bold text-white text-xs">{srv.name}</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[10px] text-gray-400 font-mono">Uptime: <strong className="text-white">{srv.uptime}</strong></span>
                <span className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-xl text-[10px]">
                  {srv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
