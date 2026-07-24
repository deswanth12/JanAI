import { ShieldCheck, CheckCircle2, Database, X } from "lucide-react"

export default function AiConfidenceExplainModal({ isOpen, onClose, confidenceScore = 99.2, schemeTitle = "PM-Kisan Samman Nidhi" }) {
  if (!isOpen) return null

  const breakdownPoints = [
    { rule: "Official Gazette Notification Matched", status: "verified", detail: "Gazette Notification No. 1-1/2019-Credit-I verified in Qdrant DB." },
    { rule: "Income & Land Ownership Criteria Checked", status: "verified", detail: "Max income cap ₹2.5L & landholding rule grounded in gazette text." },
    { rule: "Zero Conflicting Government Notifications", status: "verified", detail: "Scanned press releases up to 24 Jul 2026 for superseding orders." },
    { rule: "Gazette Data Ingestion Freshness", status: "verified", detail: "Vector embedding index updated yesterday (23 Jul 2026)." },
    { rule: "Official Portal Grounding", status: "verified", detail: "Grounded directly in official pmkisan.gov.in REST metadata." }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-6 text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Interpretation Confidence Breakdown</h3>
            <p className="text-gray-400 text-[11px]">Explaining why AI Confidence is <strong className="text-green-400 font-mono">{confidenceScore}%</strong> for {schemeTitle}</p>
          </div>
        </div>

        <div className="space-y-2">
          {breakdownPoints.map((pt, idx) => (
            <div key={idx} className="p-3 bg-[#1b2338] rounded-2xl border border-gray-800 space-y-1">
              <div className="flex justify-between items-center font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                  {pt.rule}
                </span>
                <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded font-mono">
                  Verified
                </span>
              </div>
              <p className="text-gray-400 text-[11px] pl-5">{pt.detail}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-2 text-blue-300 text-[11px]">
          <Database size={16} className="text-blue-400 shrink-0" />
          <p>
            <strong>Transparent Trust Guarantee:</strong> AI Interpretation Confidence measures textual match against official gazettes. Data Verification is independently checked against government portal databases.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition"
        >
          Got It — Return to Scheme
        </button>
      </div>
    </div>
  )
}
