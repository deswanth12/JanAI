import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { calculateSchemeSuccessProbability } from "../api/gemini"
import { X, CheckCircle2, Sparkles, FileText, ArrowRight, ArrowLeft } from "lucide-react"

export default function ApplicationWizard({ scheme, isOpen, onClose }) {
  const { user, familyMembers } = useAuth()
  const { submitNewApplication, documentWallet } = useSchemes()

  const [step, setStep] = useState(1)
  const [selectedApplicant, setSelectedApplicant] = useState("self")
  const [successScoreData, setSuccessScoreData] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [completedApp, setCompletedApp] = useState(null)

  if (!isOpen || !scheme) return null

  const getApplicantObj = (applicantId) => {
    if (applicantId === "self") return { name: user.name, relation: "Self", profile: user }
    const fam = familyMembers.find(f => f.id === applicantId)
    return { name: fam ? fam.name : user.name, relation: fam ? fam.relation : "Family", profile: fam || user }
  }

  const calculateScore = async (applicantId) => {
    const applicant = getApplicantObj(applicantId)
    const result = await calculateSchemeSuccessProbability(scheme, {
      ...applicant.profile,
      documents: documentWallet
    })
    setSuccessScoreData(result)
  }

  const handleApplicantChange = (applicantId) => {
    setSelectedApplicant(applicantId)
    calculateScore(applicantId)
  }

  const handleFinalSubmit = () => {
    setSubmitting(true)
    const applicant = getApplicantObj(selectedApplicant)

    setTimeout(() => {
      const app = submitNewApplication({
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        applicantName: applicant.name,
        relation: applicant.relation,
        probabilityScore: successScoreData ? successScoreData.score : 88,
        verifiedDocuments: scheme.documentsRequired.slice(0, 3)
      })
      setSubmitting(false)
      setCompletedApp(app)
      setStep(4)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="border-b border-gray-800 pb-4 mb-6">
          <span className="text-[10px] bg-green-500/20 text-green-300 px-3 py-1 rounded-full font-bold uppercase">
            AI Application Wizard
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{scheme.title}</h3>
          <p className="text-xs text-gray-400 mt-1">Official DBT Grant & Benefit Assistant</p>

          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                  step >= s ? "bg-green-500" : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Step 1: Select Applicant from Household</h4>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Who is applying for this scheme?</label>
              
              <div
                onClick={() => handleApplicantChange("self")}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  selectedApplicant === "self" ? "bg-green-500/10 border-green-500" : "bg-[#1b2338] border-gray-800 hover:border-gray-700"
                }`}
              >
                <div>
                  <p className="font-bold text-white text-sm">{user.name} (Self)</p>
                  <p className="text-xs text-gray-400">{user.occupation} • {user.state} • Income: ₹{user.annualIncome}/yr</p>
                </div>
                {selectedApplicant === "self" && <CheckCircle2 className="text-green-400" size={20} />}
              </div>

              {familyMembers.map((fam) => (
                <div
                  key={fam.id}
                  onClick={() => handleApplicantChange(fam.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedApplicant === fam.id ? "bg-green-500/10 border-green-500" : "bg-[#1b2338] border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div>
                    <p className="font-bold text-white text-sm">{fam.name} ({fam.relation})</p>
                    <p className="text-xs text-gray-400">{fam.occupation} • Age: {fam.age} • Income: ₹{fam.annualIncome}/yr</p>
                  </div>
                  {selectedApplicant === fam.id && <CheckCircle2 className="text-green-400" size={20} />}
                </div>
              ))}
            </div>

            {successScoreData && (
              <div className="bg-[#1b2338] p-4 rounded-2xl border border-green-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium">AI Estimated Success Score</span>
                  <h5 className="text-2xl font-bold text-green-400">{successScoreData.score}% — {successScoreData.level}</h5>
                  <div className="text-[11px] text-gray-300 mt-1 space-y-0.5">
                    {successScoreData.logs.map((log, idx) => (
                      <p key={idx}>{log}</p>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-green-400 text-lg">
                  {successScoreData.score}%
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-green-500 text-black font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-green-400 transition"
              >
                Next: Document Checklist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Step 2: Required Documents Checklist</h4>
            
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-3">
              {scheme.documentsRequired.map((doc, idx) => {
                const isVerifiedInWallet = documentWallet.some(d => doc.toLowerCase().includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(doc.toLowerCase()))
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-[#12182b] rounded-xl border border-gray-800 text-xs">
                    <div className="flex items-center gap-2 text-gray-200 font-medium">
                      <FileText size={16} className="text-green-400" />
                      {doc}
                    </div>
                    {isVerifiedInWallet ? (
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Verified in Wallet
                      </span>
                    ) : (
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full font-bold">
                        Self-Certified Copy Attached
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 glass rounded-xl text-xs text-gray-300 flex items-center gap-1"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-green-500 text-black font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-green-400 transition"
              >
                Next: Application Form Preview <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Step 3: Review Auto-Filled Official Application</h4>
            
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 text-xs space-y-2 text-gray-300 font-mono">
              <div className="flex justify-between border-b border-gray-700 pb-1">
                <span>Applicant:</span>
                <span className="text-white font-bold">{getApplicantObj(selectedApplicant).name} ({getApplicantObj(selectedApplicant).relation})</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-1">
                <span>Scheme Targeted:</span>
                <span className="text-green-400 font-bold">{scheme.title}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-1">
                <span>Sanctioning Ministry:</span>
                <span className="text-white">{scheme.ministry}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Benefit Amount:</span>
                <span className="text-pink-400 font-bold">{scheme.benefitAmount}</span>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 glass rounded-xl text-xs text-gray-300 flex items-center gap-1"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold rounded-xl text-xs flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-green-500/20"
              >
                {submitting ? (
                  <>
                    <Sparkles size={16} className="animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    Confirm & Submit Application <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && completedApp && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Application Successfully Submitted!</h4>
              <p className="text-xs text-gray-400 mt-1">Tracking ID: <span className="font-mono text-green-400 font-bold">{completedApp.id}</span></p>
            </div>

            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 max-w-md mx-auto text-xs text-left space-y-1 text-gray-300">
              <p><span className="text-gray-500">Applicant Name:</span> {completedApp.applicantName}</p>
              <p><span className="text-gray-500">Status:</span> <span className="text-green-400 font-bold">{completedApp.status}</span></p>
              <p><span className="text-gray-500">AI Success Score:</span> <span className="text-yellow-400 font-bold">{completedApp.probabilityScore}% Approval Chance</span></p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-green-500 text-black font-bold rounded-2xl text-xs hover:bg-green-400 transition"
            >
              Go to Application Tracker
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
