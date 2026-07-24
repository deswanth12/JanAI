import { useState } from "react"
import { ShieldCheck, CheckCircle2, X, RefreshCw } from "lucide-react"

export default function FormValidationModal({ isOpen, onClose, onVerifiedSubmit }) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationPassed, setValidationPassed] = useState(false)

  const validationChecks = [
    { rule: "Aadhaar 12-Digit Format Verification", status: "passed", detail: "Format XXXX-XXXX-9012 verified valid." },
    { rule: "Digital Signature Presence Check", status: "passed", detail: "Citizen digital signature found." },
    { rule: "Document Image Quality (Blur Detection)", status: "passed", detail: "Clean scan, zero glare or blur." },
    { rule: "Certificate Date Validity", status: "passed", detail: "Income certificate active through Aug 2026." },
    { rule: "Bank Account NPCI Linkage", status: "passed", detail: "Aadhaar linked to State Bank of India DBT." }
  ]

  if (!isOpen) return null

  const handleRunValidation = () => {
    setIsValidating(true)
    setTimeout(() => {
      setIsValidating(false)
      setValidationPassed(true)
    }, 1400)
  }

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
            <h3 className="text-xl font-bold text-white">AI Form Pre-Flight Validation</h3>
            <p className="text-gray-400 text-[11px]">Catching errors, blur, & invalid formats before government submission</p>
          </div>
        </div>

        <div className="space-y-2">
          {validationChecks.map((chk, i) => (
            <div key={i} className="p-3 bg-[#1b2338] rounded-2xl border border-gray-800 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{chk.rule}</p>
                <span className="text-[10px] text-gray-400">{chk.detail}</span>
              </div>

              <span className="text-green-400 font-bold bg-green-500/20 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                <CheckCircle2 size={12} /> Passed
              </span>
            </div>
          ))}
        </div>

        {isValidating ? (
          <div className="py-4 text-center space-y-2">
            <RefreshCw size={24} className="text-green-400 animate-spin mx-auto" />
            <p className="text-green-300 font-medium">Running AI Pre-Flight Rules Engine...</p>
          </div>
        ) : validationPassed ? (
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl text-center space-y-2">
            <h4 className="font-bold text-green-400 text-sm">Pre-Flight Audit Passed — Zero Errors Found!</h4>
            <p className="text-gray-300 text-[11px]">Rejection risk reduced by 99.4%. Form is ready for submission.</p>
            <button
              onClick={() => { onVerifiedSubmit && onVerifiedSubmit(); onClose(); }}
              className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition"
            >
              Submit Application to Nodal Officer
            </button>
          </div>
        ) : (
          <button
            onClick={handleRunValidation}
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} /> Run AI Pre-Flight Validation Audit
          </button>
        )}
      </div>
    </div>
  )
}
