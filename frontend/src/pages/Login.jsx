import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Mail, Phone, Lock, Sparkles, ArrowRight, Briefcase, IndianRupee } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { updateUserProfile } = useAuth()
  const [authMethod, setAuthMethod] = useState("email")
  const [email, setEmail] = useState("desvanth@gmail.com")
  const [password, setPassword] = useState("••••••••")
  const [phone, setPhone] = useState("7702256073")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  // Basic profile details on login
  const [occupation, setOccupation] = useState("Student")
  const [annualIncome, setAnnualIncome] = useState("180000")

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({
      email,
      occupation,
      role: occupation,
      annualIncome,
      isVerified: true
    })
    navigate("/complete-profile")
  }

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (!otpSent) {
      setOtpSent(true)
    } else {
      updateUserProfile({
        phone: `+91 ${phone}`,
        occupation,
        role: occupation,
        annualIncome,
        isVerified: true
      })
      navigate("/complete-profile")
    }
  }

  const handleGoogleLogin = () => {
    updateUserProfile({
      name: "Desvanth (Google Workspace)",
      email: "desvanth.google@gmail.com",
      occupation,
      role: occupation,
      annualIncome,
      isVerified: true
    })
    navigate("/complete-profile")
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-5 text-xs">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img
            src="/janai-logo.jpg"
            alt="JanAI - AI Powered Citizen First Logo"
            className="h-16 w-auto rounded-xl object-contain mx-auto border border-gray-700 bg-white p-0.5"
          />
          <h1 className="text-2xl font-bold text-white mt-1">Welcome Back to JanAI</h1>
          <p className="text-xs text-gray-400">Sign in to access eligible government schemes & live tracking</p>
        </div>

        {/* Method Selector */}
        <div className="flex bg-[#1b2338] p-1 rounded-2xl border border-gray-800 text-xs font-semibold">
          <button
            onClick={() => { setAuthMethod("email"); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-xl transition ${authMethod === "email" ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            Email Login
          </button>
          <button
            onClick={() => { setAuthMethod("phone"); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-xl transition ${authMethod === "phone" ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
          >
            Mobile OTP
          </button>
        </div>

        {/* Basic Eligibility Profile (Role & Family Income) */}
        <div className="p-3 bg-[#1b2338] border border-blue-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px]">
            <Sparkles size={14} className="text-blue-400" />
            <span>Select Citizen Role & Income (For AI Scheme Matching)</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-gray-400 font-semibold block mb-1">Primary Role</label>
              <div className="glass p-1.5 rounded-xl flex items-center gap-1.5 border border-gray-700">
                <Briefcase size={13} className="text-green-400 shrink-0" />
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-transparent text-white text-[11px] outline-none cursor-pointer"
                >
                  <option value="Student" className="bg-[#12182b]">Student 🎓</option>
                  <option value="Farmer" className="bg-[#12182b]">Farmer 🌾</option>
                  <option value="Senior Citizen" className="bg-[#12182b]">Senior Citizen (60+) 👴</option>
                  <option value="Women Entrepreneur" className="bg-[#12182b]">Women / Homemaker 👩</option>
                  <option value="MSME" className="bg-[#12182b]">MSME / Business 🏬</option>
                  <option value="Self-Employed" className="bg-[#12182b]">Self-Employed 💻</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-semibold block mb-1">Family Income (₹)</label>
              <div className="glass p-1.5 rounded-xl flex items-center gap-1.5 border border-gray-700">
                <IndianRupee size={13} className="text-amber-400 shrink-0" />
                <input
                  type="number"
                  required
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full bg-transparent text-white text-[11px] outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {authMethod === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-semibold">Email Address</label>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-2.5 rounded-xl mt-1 text-xs">
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
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[11px] text-yellow-400 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-2.5 rounded-xl mt-1 text-xs">
                <Lock size={16} className="text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 text-black font-extrabold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              Sign In & Launch Dashboard <ArrowRight size={14} />
            </button>
          </form>
        )}

        {authMethod === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-semibold">Indian Mobile Number (+91)</label>
              <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-2.5 rounded-xl mt-1 text-xs">
                <Phone size={16} className="text-gray-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent text-white outline-none w-full font-mono"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="text-xs text-gray-400 font-semibold">Enter 6-Digit OTP</label>
                <div className="flex items-center gap-2 bg-[#1b2338] border border-gray-700 px-3 py-2.5 rounded-xl mt-1 text-xs">
                  <Sparkles size={16} className="text-green-400" />
                  <input
                    type="text"
                    required
                    placeholder="904128"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-transparent text-white outline-none w-full font-mono tracking-widest text-center text-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 text-black font-extrabold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              {otpSent ? "Verify 6-Digit OTP & Sign In" : "Send 6-Digit Mobile OTP"} <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div className="relative border-t border-gray-800 my-3 text-center">
          <span className="bg-[#12182b] px-3 text-[10px] text-gray-500 font-semibold uppercase relative -top-2">
            Or Continue With
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 glass hover:bg-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition border border-gray-700"
        >
          <span className="font-bold text-blue-400 text-sm">G</span> Continue with Google Workspace
        </button>

        <div className="text-center text-gray-400 border-t border-gray-800 pt-3">
          Don't have a JanAI account?{" "}
          <button onClick={() => navigate("/register")} className="text-green-400 font-bold hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}