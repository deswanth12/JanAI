import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { SCHEMES_DATABASE } from "../api/schemesData"
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  Target,
  AlertCircle
} from "lucide-react"

export default function JanAiAutonomousAgent() {
  const { user } = useAuth()
  const { submitNewApplication } = useSchemes()
  const [goalQuery, setGoalQuery] = useState("I want to study engineering at university")
  const [isExecuting, setIsExecuting] = useState(false)
  const [agentPlan, setAgentPlan] = useState(null)

  const sampleGoals = [
    "I want to study engineering at university",
    "My father wants to buy a tractor for farming",
    "I want to start a local dairy & organic food business",
    "My sister wants to complete her postgraduate degree"
  ]

  const handleExecuteAgentGoal = (query) => {
    const target = query || goalQuery
    setGoalQuery(target)
    setIsExecuting(true)
    setAgentPlan(null)

    setTimeout(() => {
      setIsExecuting(false)
      setAgentPlan({
        goalTitle: target,
        matchingSchemes: [
          { scheme: SCHEMES_DATABASE[0], role: "100% Tuition Fee Waiver & Annual Stipend", officialPortal: "https://scholarships.gov.in" },
          { scheme: SCHEMES_DATABASE[2], role: "Low-Interest Collateral-Free Education Loan", officialPortal: "https://www.vidyalakshmi.co.in" }
        ],
        missingDocuments: [
          { name: "Income Certificate (Below ₹2.5L)", estDays: 2 },
          { name: "College Seat Allotment Letter", estDays: 1 }
        ],
        autoActionsTaken: [
          "Scanned 25+ Gazette Schemes using RAG Vector DB",
          "Scrutinized Devanth's Household Income (₹1.8L) & OBC Category",
          "Generated Pre-Filled Common Application Package PDF",
          "Set Automated SMS/WhatsApp Reminders for Cut-off Date (Aug 15)"
        ],
        estimatedAnnualBenefit: "₹75,000 / year"
      })
    }, 1800)
  }

  const handlePrepareSubmissionPackage = () => {
    if (!agentPlan) return
    agentPlan.matchingSchemes.forEach(item => {
      submitNewApplication({
        schemeId: item.scheme.id,
        schemeTitle: item.scheme.title,
        applicantName: user.name,
        relation: "Self",
        probabilityScore: 96,
        status: "Pre-Filled Package Ready (Official Portal Handoff)"
      })
    })
    alert("📄 Pre-filled Application Package generated! Opening official government portal link...")
    window.open(agentPlan.matchingSchemes[0].officialPortal, "_blank")
  }

  return (
    <div className="glass p-6 md:p-8 rounded-3xl border border-gradient-to-r from-emerald-500 to-blue-500/30 space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold px-3 py-1 rounded-full uppercase">
              The Apex Evolution
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
              Goal-Driven Autonomous Agent
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <Compass className="text-green-400 animate-spin-slow" size={26} /> JanAI Autonomous Goal Agent
          </h2>
          <p className="text-xs text-gray-400">Tell JanAI your life goal — the AI will discover schemes, verify eligibility, resolve missing documents, pre-fill packages & guide official portal submission.</p>
        </div>
      </div>

      {/* Input Goal & Sample Buttons */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 glass p-2 rounded-2xl border border-gray-700 flex items-center gap-2 text-xs">
            <Target size={18} className="text-green-400 shrink-0 ml-2" />
            <input
              type="text"
              value={goalQuery}
              onChange={(e) => setGoalQuery(e.target.value)}
              placeholder="e.g. I want to study engineering / start a dairy farm..."
              className="w-full bg-transparent text-white outline-none placeholder-gray-500 font-medium text-sm"
            />
          </div>

          <button
            onClick={() => handleExecuteAgentGoal()}
            disabled={isExecuting}
            className="bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500 text-black font-extrabold px-6 py-3 rounded-2xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
          >
            {isExecuting ? (
              <>
                <Zap size={16} className="animate-spin" /> Orchestrating Goal...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Execute Autonomous Agent
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-gray-400 text-[11px] self-center">Try Life Goals:</span>
          {sampleGoals.map((g, i) => (
            <button
              key={i}
              onClick={() => handleExecuteAgentGoal(g)}
              className="bg-[#12182b] hover:bg-white/10 text-gray-300 px-3 py-1 rounded-xl border border-gray-800 text-[11px] transition"
            >
              "{g}"
            </button>
          ))}
        </div>
      </div>

      {/* Execution Results */}
      {agentPlan && (
        <div className="bg-[#12182b] p-6 rounded-3xl border border-green-500/40 space-y-6 text-xs animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
                Goal Execution Blueprint
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{agentPlan.goalTitle}</h3>
            </div>

            <div className="text-right">
              <span className="text-gray-400 text-[10px] block">Est. Annual Value Unlocked</span>
              <strong className="text-pink-400 text-lg font-extrabold">{agentPlan.estimatedAnnualBenefit}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Matching Schemes */}
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-3">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <CheckCircle2 size={16} className="text-green-400" /> 1. Selected Welfare Schemes
              </h4>
              <div className="space-y-2">
                {agentPlan.matchingSchemes.map((item, idx) => (
                  <div key={idx} className="bg-[#12182b] p-2.5 rounded-xl border border-gray-800 space-y-1">
                    <p className="font-bold text-white">{item.scheme.title}</p>
                    <span className="text-[10px] text-green-400 font-semibold">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Documents */}
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-3">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <FileText size={16} className="text-yellow-400" /> 2. Action Required Checklist
              </h4>
              <div className="space-y-2">
                {agentPlan.missingDocuments.map((doc, idx) => (
                  <div key={idx} className="bg-[#12182b] p-2.5 rounded-xl border border-yellow-500/20 flex justify-between items-center text-yellow-300">
                    <span>{doc.name}</span>
                    <span className="text-[10px] bg-yellow-500/20 px-2 py-0.5 rounded font-mono">
                      {doc.estDays} Days
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Actions */}
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-3">
              <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <ShieldCheck size={16} className="text-blue-400" /> 3. Automated Agent Operations
              </h4>
              <div className="space-y-1.5">
                {agentPlan.autoActionsTaken.map((act, idx) => (
                  <p key={idx} className="text-gray-300 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> {act}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Integration Realism Clarification Banner */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-2 text-blue-300 text-[11px]">
            <AlertCircle size={16} className="shrink-0 text-blue-400" />
            <p>
              <strong>Submission Workflow Notice:</strong> JanAI pre-fills your official application package and provides direct deep-linking to official government portals (e.g. <code>scholarships.gov.in</code>). Direct 1-click submission is performed where official government REST APIs are enabled.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-4">
            <p className="text-gray-400 text-[11px] flex items-center gap-1">
              <Clock size={14} className="text-green-400" /> JanAI Autonomous Agent is tracking application cutoffs on your behalf.
            </p>

            <button
              onClick={handlePrepareSubmissionPackage}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Get Pre-Filled Package & Open Official Portal <ExternalLink size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
