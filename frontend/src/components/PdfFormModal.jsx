import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { Printer, X, CheckCircle2 } from "lucide-react"

export default function PdfFormModal({ scheme, applicantName, isOpen, onClose }) {
  const { user, familyMembers } = useAuth()
  const { documentWallet } = useSchemes()

  if (!isOpen || !scheme) return null

  const handlePrint = () => {
    window.print()
  }

  // Derive dynamic applicant name (Defaulting to Desvanth)
  let finalApplicantName = applicantName || user?.name || "Desvanth"
  if (finalApplicantName === "Devanth" || finalApplicantName === "Devanth Baskar") {
    finalApplicantName = "Desvanth"
  }

  // Dynamically check family members added by the user
  const fatherObj = (familyMembers || []).find(m => m.relation?.toLowerCase() === "father" || m.relation?.toLowerCase().includes("father"))
  const fatherName = fatherObj ? fatherObj.name : "---"

  const motherObj = (familyMembers || []).find(m => m.relation?.toLowerCase() === "mother" || m.relation?.toLowerCase().includes("mother"))
  const motherName = motherObj ? motherObj.name : "---"

  const stateText = user?.state || "Andhra Pradesh"
  const districtText = user?.district || "Visakhapatnam"
  const casteText = user?.caste || "General / OBC"
  const incomeText = user?.annualIncome ? `₹${user.annualIncome}` : "---"

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white text-black w-full max-w-3xl rounded-3xl p-8 shadow-2xl relative space-y-6 print:shadow-none print:w-full print:max-w-none print:rounded-none">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-700 print:hidden"
        >
          <X size={18} />
        </button>

        {/* Printable Header */}
        <div className="border-b-2 border-gray-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black text-white font-extrabold rounded-xl flex items-center justify-center text-2xl">
              🇮🇳
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide">Government of India / State Welfare Portal</h2>
              <p className="text-xs text-gray-600 font-medium">Official Common Application Form (Form ID: JAN-2026-9041)</p>
            </div>
          </div>

          <div className="text-right border-l border-gray-300 pl-4 font-mono text-xs">
            <p className="font-bold">JanAI Verified</p>
            <p className="text-gray-500">Date: {new Date().toISOString().split("T")[0]}</p>
          </div>
        </div>

        {/* Scheme Title */}
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-300">
          <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded uppercase">
            Target Scheme
          </span>
          <h3 className="text-lg font-bold mt-1 text-gray-900">{scheme.title}</h3>
          <p className="text-xs text-gray-600">Ministry: {scheme.ministry} • Jurisdiction: {scheme.state || "All India"}</p>
        </div>

        {/* Applicant Profile Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-gray-700 border-b pb-1">1. Applicant Personal Particulars</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Applicant Name:</span>
              <strong className="text-gray-900">{finalApplicantName}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Father's Name:</span>
              <strong className="text-gray-900">{fatherName}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Mother's Name:</span>
              <strong className="text-gray-900">{motherName}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">State & District:</span>
              <strong className="text-gray-900">{stateText}, {districtText}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Social Category:</span>
              <strong className="text-gray-900">{casteText}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Annual Income:</span>
              <strong className="text-gray-900">{incomeText}</strong>
            </div>
          </div>
        </div>

        {/* Official Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-gray-700 border-b pb-1">2. Enclosed Verified Documents</h4>
          {documentWallet && documentWallet.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {documentWallet.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2 text-gray-800">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                  <span>{doc.name} ({doc.docNumber || "Verified"})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-xs">No documents uploaded to digital wallet yet (Upload via Profile & Family Vault)</p>
          )}
        </div>

        {/* Declaration & Signature */}
        <div className="pt-4 border-t border-gray-300 flex items-end justify-between text-xs">
          <div className="space-y-1 max-w-md">
            <strong className="block font-bold">Applicant Declaration:</strong>
            <p className="text-[10px] text-gray-600 leading-tight">
              I hereby declare that the particulars given above are true, correct, and complete to the best of my knowledge and belief.
            </p>
          </div>

          <div className="text-center font-mono text-xs">
            <div className="border-b border-gray-900 pb-1 mb-1 font-bold">
              {finalApplicantName}
            </div>
            <span className="text-[10px] text-gray-500 block">Digital Signature</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold text-gray-700 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-extrabold rounded-xl text-xs transition flex items-center gap-2 shadow-lg"
          >
            <Printer size={16} /> Print / Save Official Application PDF
          </button>
        </div>
      </div>
    </div>
  )
}
