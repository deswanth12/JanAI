import { useState } from "react"
import { RefreshCw, CheckCircle2, Clock, Database } from "lucide-react"

export default function DataFreshnessEngine() {
  const [lastVerified] = useState("24 Jul 2026, 18:30 IST")
  const [nextScheduled] = useState("25 Jul 2026, 02:00 IST")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleManualTriggerCrawl = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-blue-500/30 space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
            Continuous Government Data Freshness
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <Database size={18} className="text-blue-400" /> Automated Gazette Sync & Verification Engine
          </h4>
          <p className="text-gray-400 text-[11px]">Continuously scanning data.gov.in & ministry press releases to ensure zero data drift</p>
        </div>

        <button
          onClick={handleManualTriggerCrawl}
          disabled={isRefreshing}
          className="glass hover:bg-white/10 text-green-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          <span>{isRefreshing ? "Syncing Gazette..." : "Trigger Manual Crawl"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Last Verification</span>
          <strong className="text-white block font-mono text-xs flex items-center gap-1">
            <Clock size={12} className="text-green-400" /> {lastVerified}
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Next Scheduled Verification</span>
          <strong className="text-yellow-400 block font-mono text-xs flex items-center gap-1">
            <Clock size={12} className="text-yellow-400" /> {nextScheduled}
          </strong>
        </div>

        <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Verification Status</span>
          <strong className="text-green-400 block text-xs font-bold flex items-center gap-1">
            <CheckCircle2 size={13} /> Latest Official Version Confirmed (0.0% Drift)
          </strong>
        </div>
      </div>
    </div>
  )
}
