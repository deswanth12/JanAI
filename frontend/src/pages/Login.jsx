import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Mail, Phone, Lock, Sparkles } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { updateUserProfile } = useAuth()
  const [authMethod, setAuthMethod] = useState("email")
  const [email, setEmail] = useState("deshu@example.com")
  const [phone, setPhone] = useState("9876543210")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({ email, isVerified: true })
    navigate("/dashboard")
  }

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (!otpSent) {
      setOtpSent(true)
    } else {
      updateUserProfile({ phone: `+91 ${phone}`, isVerified: true })
      navigate("/dashboard")
    }
  }

  const handleGoogleLogin = () => {
    updateUserProfile({ name: "Deshu (Google Auth)", email: "deshu.google@example.com", isVerified: true })
    navigate("/dashboard")
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 to-blue-500 flex items-center justify-center font-bold text-black text-2xl mx-auto mb-3 shadow-lg">
            J
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome to JanAI</h1>
          <p className="text-xs text-gray-400 mt-1">Sign in to access eligible schemes & application tracking</p>
        </div>

        <div className="flex bg-[#1b2338] p-1 rounded-2xl border border-gray-800 text-xs font-semibold">
          <button
            onClick={() => { setAuthMethod("email"); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-xl transition ${authMethod === "email" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Email Login
          </button>
          <button
            onClick={() => { setAuthMethod("phone"); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-xl transition ${authMethod === "phone" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Phone OTP
          </button>
        </div>

        {authMethod === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-medium">Email Address</label>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-3 rounded-xl mt-1 text-xs">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-medium">Password</label>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-3 rounded-xl mt-1 text-xs">
                <Lock size={16} className="text-gray-400" />
                <input
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-xs transition shadow-lg"
            >
              Sign In with Email
            </button>
          </form>
        )}

        {authMethod === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-medium">Mobile Number (+91)</label>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-3 rounded-xl mt-1 text-xs">
                <Phone size={16} className="text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="text-xs text-gray-400 font-medium">Enter 6-Digit OTP</label>
                <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-3 rounded-xl mt-1 text-xs">
                  <Sparkles size={16} className="text-green-400" />
                  <input
                    type="text"
                    required
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-transparent text-white outline-none w-full font-mono tracking-widest text-center"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-xs transition shadow-lg"
            >
              {otpSent ? "Verify OTP & Continue" : "Send OTP Verification"}
            </button>
          </form>
        )}

        <div className="relative border-t border-gray-800 my-4 text-center">
          <span className="bg-[#12182b] px-3 text-[10px] text-gray-500 font-semibold uppercase relative -top-2">
            Or Continue With
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 glass hover:bg-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
        >
          <span className="font-bold text-blue-400">G</span> Sign in with Google Workspace
        </button>
      </div>
    </div>
  )
}