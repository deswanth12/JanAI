import { useSchemes } from "../context/SchemeContext"
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react"

export default function DocumentChecklist({ schemeTitle = "Post-Matric Scholarship Scheme" }) {
  const { documentWallet } = useSchemes()

  const requiredDocs = [
    { name: "Aadhaar Card", type: "Identity", estimatedDays: 0 },
    { name: "Income Certificate (₹1.8L)", type: "Financial", estimatedDays: 2 },
    { name: "Caste Certificate (OBC)", type: "Category", estimatedDays: 0 },
    { name: "Class 10th / B.Tech Marksheet", type: "Education", estimatedDays: 0 },
    { name: "Residence / Domicile Certificate", type: "Residence", estimatedDays: 3 }
  ]

  const checklist = requiredDocs.map(doc => {
    const isPresent = documentWallet.some(d => d.type === doc.type || d.name.toLowerCase().includes(doc.name.toLowerCase()))
    return { ...doc, isPresent }
  })

  const missingDocs = checklist.filter(d => !d.isPresent)
  const totalDays = missingDocs.reduce((acc, curr) => acc + curr.estimatedDays, 0)

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-2 py-0.5 rounded uppercase">
            Pre-Application Verification
          </span>
          <h4 className="text-sm font-bold text-white mt-1">AI Document Checklist — {schemeTitle}</h4>
        </div>

        <div className="text-right">
          <span className="text-gray-400 block text-[10px]">Estimated Readiness</span>
          <strong className="text-yellow-400 font-bold flex items-center gap-1">
            <Clock size={14} /> {totalDays === 0 ? "Ready Now" : `${totalDays} Days`}
          </strong>
        </div>
      </div>

      <div className="space-y-2">
        {checklist.map((doc, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border flex items-center justify-between transition ${
              doc.isPresent ? "bg-green-500/10 border-green-500/30 text-gray-200" : "bg-red-500/10 border-red-500/30 text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {doc.isPresent ? (
                <CheckCircle2 size={18} className="text-green-400 shrink-0" />
              ) : (
                <XCircle size={18} className="text-red-400 shrink-0" />
              )}
              <div>
                <p className="font-bold text-white">{doc.name}</p>
                <span className="text-[10px] text-gray-400">{doc.type} Verification</span>
              </div>
            </div>

            <div>
              {doc.isPresent ? (
                <span className="text-green-400 font-bold bg-green-500/20 px-2 py-0.5 rounded-full text-[10px]">
                  Verified
                </span>
              ) : (
                <span className="text-red-400 font-bold bg-red-500/20 px-2 py-0.5 rounded-full text-[10px]">
                  Missing ({doc.estimatedDays} days)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {missingDocs.length > 0 && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center gap-2 text-yellow-300">
          <AlertCircle size={16} className="shrink-0 text-yellow-400" />
          <p>
            You have <strong className="text-white">{missingDocs.length} missing document(s)</strong>. Use JanAI Office Finder or MeeSeva to complete them in {totalDays} days.
          </p>
        </div>
      )}
    </div>
  )
}
