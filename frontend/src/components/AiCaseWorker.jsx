import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from "lucide-react"

export default function AiCaseWorker({ onLaunchApply }) {
  const { familyMembers } = useAuth()
  const { applications, documentWallet } = useSchemes()

  const steps = [
    {
      step: 1,
      title: "Complete Household Profile",
      description: `Household verified with ${familyMembers.length} family members.`,
      status: "completed"
    },
    {
      step: 2,
      title: "Verify Aadhaar e-KYC",
      description: "DigiLocker Aadhaar e-KYC connected & verified.",
      status: "completed"
    },
    {
      step: 3,
      title: "Resolve Missing Documents",
      description: documentWallet.some(d => d.type === "Financial")
        ? "Income Certificate verified & active."
        : "Income Certificate renewal required for Post-Matric Scholarship.",
      status: "in_progress"
    },
    {
      step: 4,
      title: "Apply for High Match Scheme",
      description: "Post-Matric Scholarship & PM-Kisan ready for 1-click submission.",
      status: "pending"
    },
    {
      step: 5,
      title: "Application Pre-Flight Submission",
      description: applications.length > 0
        ? `${applications.length} application${applications.length > 1 ? "s" : ""} submitted to Nodal Officer.`
        : "No applications submitted yet — Apply via AI Scheme Finder.",
      status: applications.length > 0 ? "completed" : "pending"
    },
    {
      step: 6,
      title: "Weekly Status & DBT Credit Check",
      description: "Next status automated check scheduled in 3 days.",
      status: "pending"
    }
  ]

  return (
    <div className="glass p-6 rounded-3xl border border-blue-500/30 space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
            Active Guided Case Worker
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Sparkles className="text-blue-400" size={22} /> JanAI Active Case Worker
          </h3>
          <p className="text-xs text-gray-400">Guiding your household step-by-step from discovery to bank account transfer</p>
        </div>

        <div className="bg-[#12182b] border border-blue-500/30 px-4 py-2 rounded-2xl text-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-300 font-semibold">Case Status: <strong className="text-green-400">Step 3 of 6 Active</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s) => {
          const isCompleted = s.status === "completed"
          const isInProgress = s.status === "in_progress"

          return (
            <div
              key={s.step}
              className={`p-4 rounded-2xl border transition space-y-2 ${
                isInProgress
                  ? "bg-[#1b2338] border-blue-500 shadow-lg shadow-blue-500/10"
                  : isCompleted
                  ? "bg-[#12182b] border-green-500/30"
                  : "bg-[#12182b]/60 border-gray-800 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isCompleted ? "bg-green-500/20 text-green-400" : isInProgress ? "bg-blue-500/20 text-blue-300" : "bg-gray-800 text-gray-400"
                }`}>
                  STEP {s.step}
                </span>

                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-green-400" />
                ) : isInProgress ? (
                  <AlertTriangle size={18} className="text-yellow-400 animate-bounce" />
                ) : (
                  <Circle size={18} className="text-gray-600" />
                )}
              </div>

              <h4 className="text-sm font-bold text-white">{s.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{s.description}</p>

              {isInProgress && (
                <button
                  onClick={() => onLaunchApply && onLaunchApply()}
                  className="mt-2 w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-1.5"
                >
                  Action Required <ArrowRight size={14} />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
