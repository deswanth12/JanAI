import { useState } from "react"
import { ShieldCheck, ExternalLink, FileText, Database } from "lucide-react"

export default function AiGroundingRagPanel() {
  const [query] = useState("Is income limit for Post-Matric Scholarship ₹2.5 Lakh?")

  const groundingDetails = {
    gazettePdf: "Gazette Notification No. 402/AP/Edu-2026.pdf",
    pageNumber: "Page 14, Paragraph 3(b)",
    lastUpdated: "2026-07-20",
    confidenceScore: 98.4,
    officialTextExcerpt: "Eligible students belonging to SC/ST/OBC categories whose total annual household income does not exceed ₹2,50,000/- shall receive 100% tuition reimbursement.",
    isVerified: true
  }

  return (
    <div className="glass p-6 rounded-3xl border border-blue-500/30 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
            RAG Grounding & Zero-Hallucination Guardrail
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <Database size={16} className="text-blue-400" /> AI Source Citation & Grounding Inspector
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono font-bold text-xs bg-green-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1">
            <ShieldCheck size={14} /> Grounded Score: {groundingDetails.confidenceScore}%
          </span>
        </div>
      </div>

      <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-3">
        <p className="text-gray-400">Query: <strong className="text-white">"{query}"</strong></p>

        <div className="p-3 bg-[#1b2338] rounded-xl border border-blue-500/20 space-y-1 text-gray-300">
          <span className="text-[10px] text-blue-300 font-bold uppercase block">Official Gazette Excerpt:</span>
          <p className="italic text-[11px] leading-relaxed">"{groundingDetails.officialTextExcerpt}"</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className="bg-[#1b2338] p-2 rounded-xl">
            <span className="text-gray-500 block text-[9px]">SOURCE PDF</span>
            <span className="font-bold text-white flex items-center gap-1 truncate">
              <FileText size={12} className="text-blue-400 shrink-0" /> {groundingDetails.gazettePdf}
            </span>
          </div>

          <div className="bg-[#1b2338] p-2 rounded-xl">
            <span className="text-gray-500 block text-[9px]">LOCATION</span>
            <span className="font-bold text-yellow-400">{groundingDetails.pageNumber}</span>
          </div>

          <div className="bg-[#1b2338] p-2 rounded-xl">
            <span className="text-gray-500 block text-[9px]">LAST UPDATED</span>
            <span className="font-bold text-gray-200">{groundingDetails.lastUpdated}</span>
          </div>

          <div className="bg-[#1b2338] p-2 rounded-xl">
            <span className="text-gray-500 block text-[9px]">CITATIONS</span>
            <a href="#" className="font-bold text-blue-400 hover:underline flex items-center gap-0.5">
              Verify PDF <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
