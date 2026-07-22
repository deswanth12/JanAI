import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { ShieldCheck, CheckCircle2, RefreshCw, X, FileText } from "lucide-react"

export default function DigiLockerModal({ isOpen, onClose }) {
  const { user, updateUserProfile } = useAuth()
  const { uploadDocumentToWallet } = useSchemes()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(user.isVerified)

  if (!isOpen) return null

  const handleDigiLockerFetch = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      updateUserProfile({ isVerified: true })

      // Auto-add DigiLocker verified documents to Document Wallet
      uploadDocumentToWallet({ name: "DigiLocker Verified Aadhaar Card", type: "Identity", docNumber: "XXXX-XXXX-9012" })
      uploadDocumentToWallet({ name: "DigiLocker Income Certificate", type: "Financial", docNumber: "AP-IC-2026-99" })
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
          🇮🇳
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">DigiLocker & Aadhaar e-KYC</h3>
          <p className="text-xs text-gray-400 mt-1">One-tap official document fetch from Ministry of Electronics & IT (MeitY)</p>
        </div>

        <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 text-xs text-left space-y-2">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Citizen Name:</span>
            <span className="font-bold text-white">{user.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Linked Mobile:</span>
            <span className="font-mono text-gray-200">{user.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Verification Status:</span>
            {isVerified ? (
              <span className="text-green-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={14} /> Verified Citizen
              </span>
            ) : (
              <span className="text-yellow-400 font-semibold">Unverified</span>
            )}
          </div>
        </div>

        {isVerifying ? (
          <div className="py-4 space-y-2">
            <RefreshCw size={28} className="text-blue-400 animate-spin mx-auto" />
            <p className="text-xs text-blue-300 font-medium">Connecting to DigiLocker Aadhaar & Revenue API...</p>
          </div>
        ) : isVerified ? (
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl space-y-2 text-center">
            <ShieldCheck size={32} className="text-green-400 mx-auto" />
            <h4 className="text-sm font-bold text-green-300">DigiLocker e-KYC Successfully Verified!</h4>
            <p className="text-xs text-gray-300">Aadhaar, Income & Caste certificates imported directly into your Document Wallet.</p>
          </div>
        ) : (
          <button
            onClick={handleDigiLockerFetch}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
          >
            <FileText size={18} /> Connect DigiLocker & Fetch Documents
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 glass rounded-xl text-xs text-gray-400 hover:text-white"
        >
          Close Window
        </button>
      </div>
    </div>
  )
}
