import { useState } from "react"
import { Sliders, CheckCircle2, AlertTriangle } from "lucide-react"

export default function AiControlCenter() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85)
  const [promptTemplate, setPromptTemplate] = useState(
    "You are JanAI, India's AI Citizen Assistant. Answer in simple 5th-grade regional vernacular language. Ground all eligibility checks strictly in official Gazette PDFs."
  )

  const [humanReviewQueue, setHumanReviewQueue] = useState([
    { id: "rev-101", citizen: "Desvanth", query: "Can I apply for Post-Matric Scholarship if income is ₹2.48L?", confidence: 82.4, reason: "Income close to ₹2.5L boundary cutoff", status: "Pending Human Review" },
    { id: "rev-102", citizen: "Father", query: "Is 2.5 acres pattadar passbook eligible for Rythu Bharosa?", confidence: 81.0, reason: "State land ceiling revision note detected", status: "Pending Human Review" }
  ])

  const handleApproveReview = (id) => {
    setHumanReviewQueue(humanReviewQueue.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">AI & RAG Engine Control Center</h3>
          <p className="text-gray-400 text-xs">Manage prompt templates, confidence thresholds, gazette embedding sync, and human escalation queue</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
            <CheckCircle2 size={12} /> Gemini 2.0 Flash Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confidence Threshold & Prompt Controls */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders size={16} className="text-purple-400" /> Human Review Confidence Escalation Threshold
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Minimum AI Confidence Score:</span>
              <strong className="text-purple-400 font-mono text-sm">{confidenceThreshold}%</strong>
            </div>
            <input
              type="range"
              min={70}
              max={95}
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseInt(e.target.value, 10))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-gray-400 text-[11px]">
              Queries with AI confidence below <strong className="text-white">{confidenceThreshold}%</strong> are automatically escalated to Nodal Officer Human Review.
            </p>
          </div>

          <div className="space-y-2 border-t border-gray-800 pt-3">
            <span className="text-gray-300 font-bold block">System Prompt Template Injection</span>
            <textarea
              rows={4}
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none text-xs"
            />
          </div>
        </div>

        {/* Human Review Queue */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-400" /> Human Review Queue (&lt; {confidenceThreshold}% Confidence)
            </h4>
            <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-2 py-0.5 rounded font-mono">
              {humanReviewQueue.length} Pending Escalations
            </span>
          </div>

          <div className="space-y-3">
            {humanReviewQueue.map((rev) => (
              <div key={rev.id} className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{rev.citizen}</span>
                  <span className="text-yellow-400 font-mono font-bold text-[11px]">{rev.confidence}% Score</span>
                </div>
                <p className="text-gray-300 text-[11px]">"{rev.query}"</p>
                <div className="flex justify-between items-center border-t border-gray-800/80 pt-2 text-[10px] text-gray-400">
                  <span>Reason: {rev.reason}</span>
                  <button
                    onClick={() => handleApproveReview(rev.id)}
                    className="bg-green-500 hover:bg-green-400 text-black font-bold px-3 py-1 rounded-xl transition"
                  >
                    Approve & Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
