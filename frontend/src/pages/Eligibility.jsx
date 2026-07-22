import { useState } from "react"
import { SCHEMES_DATABASE } from "../api/schemesData"
import ApplicationWizard from "../components/ApplicationWizard"
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react"

export default function Eligibility() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    occupation: "Student",
    state: "Andhra Pradesh",
    annualIncome: "180000",
    caste: "OBC",
    landOwned: "2.5"
  })
  const [matchingResults, setMatchingResults] = useState(null)
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else evaluateEligibility()
  }

  const evaluateEligibility = () => {
    const matches = SCHEMES_DATABASE.map((scheme) => {
      let isEligible = true
      const reasons = []

      if (scheme.state !== "All India" && scheme.state !== answers.state) {
        isEligible = false
        reasons.push(`State requirement: ${scheme.state} (You specified: ${answers.state})`)
      }

      if (Number(answers.annualIncome) > scheme.eligibility.incomeLimit) {
        isEligible = false
        reasons.push(`Income ceiling: ₹${scheme.eligibility.incomeLimit.toLocaleString()}/yr`)
      }

      if (!scheme.eligibility.caste.includes("All") && !scheme.eligibility.caste.includes(answers.caste)) {
        isEligible = false
        reasons.push(`Target social category: ${scheme.eligibility.caste.join(", ")}`)
      }

      return {
        scheme,
        isEligible,
        reasons: reasons.length ? reasons : ["All primary demographic criteria matched successfully!"]
      }
    })

    setMatchingResults(matches)
    setStep(5)
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="text-green-400" size={28} /> Interactive AI Eligibility Checker
        </h1>
        <p className="text-xs text-gray-400 mt-1">Answer 4 quick targeted questions to instantly calculate scheme eligibility & alternatives.</p>
      </div>

      {step < 5 && (
        <div className="glass p-8 rounded-3xl border border-gray-800 max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`flex-1 h-2 rounded-full ${step >= s ? "bg-green-500" : "bg-gray-800"}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Question 1: What is your primary occupation role?</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {["Student", "Farmer", "Senior Citizen", "MSME / Self-Employed", "Homemaker", "Unemployed"].map(role => (
                  <button
                    key={role}
                    onClick={() => setAnswers({ ...answers, occupation: role })}
                    className={`p-4 rounded-2xl border text-left font-bold transition ${
                      answers.occupation === role ? "bg-green-500/20 border-green-500 text-green-400" : "bg-[#1b2338] border-gray-800 text-gray-300"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Question 2: What is your State of Residence?</h3>
              <select
                value={answers.state}
                onChange={(e) => setAnswers({ ...answers, state: e.target.value })}
                className="w-full p-4 rounded-2xl bg-[#1b2338] text-white border border-gray-700 text-sm outline-none"
              >
                {["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Gujarat", "Punjab", "West Bengal", "Delhi"].map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Question 3: What is your Annual Family Income?</h3>
              <input
                type="number"
                value={answers.annualIncome}
                onChange={(e) => setAnswers({ ...answers, annualIncome: e.target.value })}
                className="w-full p-4 rounded-2xl bg-[#1b2338] text-white border border-gray-700 text-sm outline-none"
                placeholder="e.g. 180000"
              />
              <p className="text-[11px] text-gray-400">Total combined family annual income from all sources.</p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Question 4: Social Category & Land Ownership</h3>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Caste / Category</label>
                <select
                  value={answers.caste}
                  onChange={(e) => setAnswers({ ...answers, caste: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 text-xs"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Land Owned (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={answers.landOwned}
                  onChange={(e) => setAnswers({ ...answers, landOwned: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 text-xs"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-800">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 glass rounded-xl text-xs text-gray-300 flex items-center gap-1">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-green-500 text-black font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-green-400 transition"
            >
              {step === 4 ? "Calculate Eligibility" : "Next Question"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 5 && matchingResults && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">AI Eligibility Results & Analysis</h2>
            <button onClick={() => setStep(1)} className="px-4 py-2 glass rounded-xl text-xs text-gray-300">
              Retake Assessment
            </button>
          </div>

          <div className="space-y-4">
            {matchingResults.map(({ scheme, isEligible, reasons }) => (
              <div
                key={scheme.id}
                className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                  isEligible ? "bg-[#12182b] border-green-500/40" : "bg-[#12182b]/60 border-red-500/30 opacity-80"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{scheme.title}</span>
                    {isEligible ? (
                      <span className="bg-green-500/20 text-green-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} /> Eligible
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle size={12} /> Criteria Gap
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{scheme.shortDescription}</p>

                  <div className="mt-2 text-[11px] space-y-0.5 text-gray-300">
                    {reasons.map((r, i) => (
                      <p key={i} className={isEligible ? "text-green-300 font-medium" : "text-red-300 font-medium"}>
                        • {r}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  {isEligible ? (
                    <button
                      onClick={() => setSelectedSchemeForApply(scheme)}
                      className="px-6 py-2.5 bg-green-500 text-black font-bold rounded-xl text-xs hover:bg-green-400 transition"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 italic">Not eligible based on criteria</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ApplicationWizard
        scheme={selectedSchemeForApply}
        isOpen={!!selectedSchemeForApply}
        onClose={() => setSelectedSchemeForApply(null)}
      />
    </div>
  )
}
