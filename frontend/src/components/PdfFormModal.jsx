import { useAuth } from "../context/AuthContext"
import { Printer, X, CheckCircle2 } from "lucide-react"

export default function PdfFormModal({ scheme, applicantName = "Devanth", isOpen, onClose }) {
  const { user } = useAuth()

  if (!isOpen || !scheme) return null

  const handlePrint = () => {
    window.print()
  }

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
            <p className="text-gray-500">Date: 22-07-2026</p>
          </div>
        </div>

        {/* Scheme Title */}
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-300">
          <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded uppercase">
            Target Scheme
          </span>
          <h3 className="text-lg font-bold mt-1 text-gray-900">{scheme.title}</h3>
          <p className="text-xs text-gray-600">Ministry: {scheme.ministry} • Jurisdiction: {scheme.state}</p>
        </div>

        {/* Applicant Profile Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-gray-700 border-b pb-1">1. Applicant Personal Particulars</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Applicant Name:</span>
              <strong className="text-gray-900">{applicantName}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Father's Name:</span>
              <strong className="text-gray-900">Baskar</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Mother's Name:</span>
              <strong className="text-gray-900">Lalitha</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">State & District:</span>
              <strong className="text-gray-900">{user.state}, {user.district}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Social Category:</span>
              <strong className="text-gray-900">{user.caste}</strong>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px]">Annual Income:</span>
              <strong className="text-gray-900">₹{user.annualIncome}</strong>
            </div>
          </div>
        </div>

        {/* Official Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-gray-700 border-b pb-1">2. Enclosed Verified Documents</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-800">
              <CheckCircle2 size={16} className="text-green-600" /> Aadhaar Card (XXXX-XXXX-9012)
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <CheckCircle2 size={16} className="text-green-600" /> Income & Caste Certificate Verified
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <CheckCircle2 size={16} className="text-green-600" /> Educational Marksheet (Class 10th / B.Tech)
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <CheckCircle2 size={16} className="text-green-600" /> Bank Passbook & Aadhaar e-KYC
            </div>
          </div>
        </div>

        {/* Declaration & Signature */}
        <div className="border-t-2 border-gray-300 pt-4 flex items-end justify-between text-xs text-gray-700">
          <div className="space-y-1">
            <p className="font-bold">Applicant Declaration:</p>
            <p className="text-[10px] text-gray-500 max-w-md">
              I hereby declare that the particulars given above are true, correct, and complete to the best of my knowledge and belief.
            </p>
          </div>

          <div className="text-center border-t border-gray-400 pt-2 min-w-32">
            <p className="font-bold text-gray-900">{applicantName}</p>
            <span className="text-[10px] text-gray-500 block">Digital Signature</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg"
          >
            <Printer size={16} /> Print / Save Official Application PDF
          </button>
        </div>
      </div>
    </div>
  )
}
