import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function VerifyEmail() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "devanth@gmail.com"
  const [code, setCode] = useState("904128")
  const [verified, setVerified] = useState(false)

  const handleVerify = (e) => {
    e.preventDefault()
    setVerified(true)
    setTimeout(() => {
      navigate("/complete-profile")
    }, 1200)
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 text-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold mx-auto">
          <CheckCircle2 size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Verify Your Email Address</h2>
          <p className="text-gray-400 text-xs mt-1">Enter the 6-digit verification code sent to <strong className="text-white">{email}</strong></p>
        </div>

        {verified ? (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-bold">
            Email Verified Successfully! Redirecting to complete your profile...
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full text-center tracking-widest font-mono text-2xl py-3 rounded-2xl bg-[#1b2338] text-white border border-gray-700 outline-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Verify Email & Continue <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
