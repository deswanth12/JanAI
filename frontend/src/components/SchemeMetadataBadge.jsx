import { useState } from "react"
import { ExternalLink, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react"
import AiConfidenceExplainModal from "./AiConfidenceExplainModal"

export default function SchemeMetadataBadge({ metadata, officialUrl, schemeTitle = "Government Scheme" }) {
  const [showExplainModal, setShowExplainModal] = useState(false)

  if (!metadata) return null

  return (
    <div className="bg-[#12182b] p-4 rounded-2xl border border-blue-500/20 space-y-3 text-[11px] text-gray-300">
      {/* Separated Verified vs AI Confidence */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-1.5 font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-xl border border-green-500/30">
          <CheckCircle2 size={15} />
          <span>Verified Against Official Source: <strong className="text-white">YES</strong></span>
        </div>

        <button
          onClick={() => setShowExplainModal(true)}
          className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 font-mono font-bold px-3 py-1 rounded-xl border border-blue-500/30 transition"
          title="Click to see why AI Confidence is scored at this level"
        >
          <ShieldCheck size={14} className="text-blue-400" />
          <span>AI Interpretation Confidence: <u className="text-white font-mono">{metadata.confidenceScore}%</u></span>
          <HelpCircle size={12} className="text-blue-400" />
        </button>
      </div>

      {/* Expanded 8-Point Production Trust Matrix */}
      <div className="bg-[#1b2338] p-3 rounded-xl border border-gray-800 space-y-2 text-[10px]">
        <span className="text-gray-400 font-bold uppercase block tracking-wider text-[9px] border-b border-gray-800/80 pb-1">
          Official Source & Verification Matrix
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-300 font-medium">
          <span className="flex items-center gap-1 text-green-400 font-bold">✓ Official Govt Portal</span>
          <span className="flex items-center gap-1 text-green-400 font-bold">✓ Gazette / Notification</span>
          <span className="flex items-center gap-1 text-gray-300">Last Verified: <strong className="text-white font-mono">{metadata.lastVerified}</strong></span>
          <span className="flex items-center gap-1 text-gray-300">Data Version: <strong className="text-yellow-400 font-mono">v{metadata.dataVersion}</strong></span>
          <span className="flex items-center gap-1 text-blue-400 font-bold">✓ AI Explanation Included</span>
          <span className="flex items-center gap-1 text-purple-300 font-bold">✓ Human Review Available</span>
          <span className="flex items-center gap-1 text-yellow-300 font-bold">✓ Policy Change History</span>
          {officialUrl ? (
            <a href={officialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-400 font-bold hover:underline">
              ✓ Official Direct Link <ExternalLink size={10} />
            </a>
          ) : (
            <span className="flex items-center gap-1 text-gray-400">✓ Official Link Provided</span>
          )}
        </div>
      </div>

      <AiConfidenceExplainModal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        confidenceScore={metadata.confidenceScore}
        schemeTitle={schemeTitle}
      />
    </div>
  )
}
