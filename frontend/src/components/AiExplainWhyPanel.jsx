import { useState } from "react"
import { SCHEMES_DATABASE } from "../api/schemesData"
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles } from "lucide-react"

export default function AiExplainWhyPanel({ targetScheme, userProfile }) {
  const [selectedScheme, setSelectedScheme] = useState(targetScheme || SCHEMES_DATABASE[0])

  // Exclusion Reason Engine
  const generateExclusionAnalysis = (scheme, profile) => {
    const reasons = []
    const userIncome = parseInt(profile?.annualIncome || "180000", 10)
    const userAge = parseInt(profile?.age || "21", 10)

    if (scheme.eligibility.incomeLimit > 0 && userIncome > scheme.eligibility.incomeLimit) {
      reasons.push({
        type: "income",
        icon: XCircle,
        message: `Annual family income (₹${userIncome.toLocaleString('en-IN')}) exceeds the scheme's limit of ₹${scheme.eligibility.incomeLimit.toLocaleString('en-IN')}.`
      })
    }

    if (userAge < 18 && scheme.category === "Agriculture") {
      reasons.push({
        type: "age",
        icon: XCircle,
        message: `Applicant age (${userAge} yrs) is below the minimum required age of 18 years for landholding schemes.`
      })
    }

    if (scheme.eligibility.caste.length > 0 && !scheme.eligibility.caste.includes("All") && !scheme.eligibility.caste.includes(profile?.caste || "OBC")) {
      reasons.push({
        type: "caste",
        icon: XCircle,
        message: `Social Category '${profile?.caste}' is not listed in the target categories (${scheme.eligibility.caste.join(", ")}).`
      })
    }

    const isEligible = reasons.length === 0

    // Suggest alternative schemes where the user IS eligible
    const alternativeSchemes = SCHEMES_DATABASE.filter(s => {
      if (s.id === scheme.id) return false
      const incPass = s.eligibility.incomeLimit === 0 || userIncome <= s.eligibility.incomeLimit
      const castePass = s.eligibility.caste.includes("All") || s.eligibility.caste.includes(profile?.caste || "OBC")
      return incPass && castePass
    }).slice(0, 3)

    return { isEligible, reasons, alternativeSchemes }
  }

  const analysis = generateExclusionAnalysis(selectedScheme, userProfile)

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full uppercase">
            Transparent Explainable AI
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <HelpCircle className="text-indigo-400" size={22} /> AI "Explain Why" Trust & Exclusion Panel
          </h3>
          <p className="text-xs text-gray-400">Clear grounding explaining why a citizen is excluded + instant alternative recommendations</p>
        </div>

        <select
          value={selectedScheme.id}
          onChange={(e) => setSelectedScheme(SCHEMES_DATABASE.find(s => s.id === e.target.value))}
          className="p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 text-xs font-semibold outline-none"
        >
          {SCHEMES_DATABASE.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      {analysis.isEligible ? (
        <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
            <CheckCircle2 size={20} /> 100% Fully Eligible for {selectedScheme.title}!
          </div>
          <p className="text-xs text-gray-300">
            All criteria (Income ₹{userProfile?.annualIncome}, Caste {userProfile?.caste}, Age {userProfile?.age}) passed official government scrutiny.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <ShieldAlert size={20} /> Why You Do Not Qualify for {selectedScheme.title}:
            </div>

            <div className="space-y-2 text-xs">
              {analysis.reasons.map((r, idx) => (
                <div key={idx} className="flex items-start gap-2 text-red-300 bg-[#12182b]/60 p-3 rounded-xl border border-red-500/20">
                  <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <span>{r.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Scheme Recommendations */}
          <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                <Sparkles size={18} /> ✅ Instead, Your Household Qualifies For:
              </div>
              <span className="text-[10px] text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full font-bold">
                {analysis.alternativeSchemes.length} Alternatives Found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {analysis.alternativeSchemes.map((alt) => (
                <div key={alt.id} className="bg-[#12182b] p-4 rounded-xl border border-gray-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded uppercase">
                      {alt.category}
                    </span>
                    <h5 className="font-bold text-white mt-1 line-clamp-1">{alt.title}</h5>
                    <p className="text-[11px] text-pink-400 font-bold mt-0.5">{alt.benefitAmount}</p>
                  </div>

                  <button className="w-full py-1.5 bg-green-500 text-black font-bold rounded-lg text-[11px] hover:bg-green-400 transition flex items-center justify-center gap-1">
                    Apply Instead <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
