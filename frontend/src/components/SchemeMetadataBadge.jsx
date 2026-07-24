import { ExternalLink, ShieldCheck, Clock } from "lucide-react"

export default function SchemeMetadataBadge({ metadata, officialUrl, state = "All India" }) {
  if (!metadata) return null

  return (
    <div className="bg-[#12182b] p-3.5 rounded-2xl border border-blue-500/20 space-y-2 text-[11px] text-gray-300">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-1.5 font-semibold text-blue-300">
          <ShieldCheck size={14} className="text-blue-400" />
          <span>Source: <code className="text-white font-mono">{metadata.sourcePortal}</code></span>
        </div>

        <span className="text-[10px] bg-green-500/20 text-green-300 font-mono font-bold px-2 py-0.5 rounded">
          Confidence: {metadata.confidenceScore}%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-gray-400">
        <div>
          <span>Last Verified:</span>
          <strong className="text-white block font-mono">{metadata.lastVerified}</strong>
        </div>

        <div>
          <span>Data Version:</span>
          <strong className="text-yellow-400 block font-mono">v{metadata.dataVersion}</strong>
        </div>

        <div>
          <span>Applicability:</span>
          <strong className="text-white block">{state}</strong>
        </div>

        <div>
          <span>Gazette Ref:</span>
          <span className="text-gray-300 block truncate" title={metadata.gazetteReference}>
            {metadata.gazetteReference}
          </span>
        </div>
      </div>

      {metadata.policyNote && (
        <div className="text-[10px] text-gray-400 italic bg-[#1b2338] p-2 rounded-xl border border-gray-800 flex items-center gap-1">
          <Clock size={12} className="text-yellow-400 shrink-0" /> {metadata.policyNote}
        </div>
      )}

      {officialUrl && (
        <div className="pt-1 flex justify-end">
          <a
            href={officialUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline text-[10px] font-bold flex items-center gap-1"
          >
            Verify Official Portal <ExternalLink size={10} />
          </a>
        </div>
      )}
    </div>
  )
}
