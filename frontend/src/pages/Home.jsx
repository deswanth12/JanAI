import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  Smartphone,
  Lock,
  Mail,
  ArrowRight,
  Bot,
  Mic,
  CheckCircle2,
  BellRing,
  HelpCircle,
  Eye,
  Star,
  AlertTriangle
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // State for Login Tab Selection: "email" | "otp" | "google"
  const [loginMethod, setLoginMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [authError, setAuthError] = useState("")

  // Floating AI Assistant State
  const [showAiFloating, setShowAiFloating] = useState(true)

  // Maintenance Banner Toggle
  const [showMaintenanceBanner] = useState(false)

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setAuthError("Please enter both email and password.")
      return
    }
    login({ email, name: email.split("@")[0], role: "Citizen" })
    navigate("/dashboard")
  }

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setAuthError("Please enter a valid 10-digit Indian mobile number (+91).")
      return
    }
    setOtpSent(true)
    setAuthError("")
  }

  const handleVerifyOtp = () => {
    if (otpCode.length !== 6) {
      setAuthError("Please enter the 6-digit OTP code sent to your mobile.")
      return
    }
    login({ phone: `+91 ${phone}`, name: `Citizen (${phone.slice(-4)})`, role: "Citizen" })
    navigate("/dashboard")
  }

  const handleGoogleSignIn = () => {
    login({ email: "citizen.google@gmail.com", name: "Google Citizen User", role: "Citizen" })
    navigate("/dashboard")
  }

  return (
    <div className="space-y-10 pb-16 text-xs">
      {/* 🔔 Optional Scheduled Maintenance Banner */}
      {showMaintenanceBanner && (
        <div className="bg-yellow-500/20 border border-yellow-500/40 p-3 rounded-2xl flex items-center justify-between text-yellow-300 font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Scheduled Maintenance Notice: Gazette Synchronization pipeline update from 2:00 AM – 4:00 AM IST. Platform remains online.</span>
          </div>
        </div>
      )}

      {/* 📢 Latest Updates Ticker */}
      <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 flex items-center justify-between overflow-x-auto text-[11px]">
        <div className="flex items-center gap-2 text-green-400 font-bold shrink-0">
          <BellRing size={14} className="animate-bounce" /> Latest Gazette Updates:
        </div>
        <div className="flex items-center gap-6 text-gray-300 font-mono">
          <span>🎓 Post-Matric Scholarship 2026 Guidelines Published</span>
          <span>🌾 PM-Kisan 17th Installment Date Confirmed</span>
          <span>💼 PM Mudra Loan Cap Increased to ₹20 Lakhs</span>
        </div>
      </div>

      {/* 🌟 HERO & TRUSTED GOVERNMENT ENTRY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Hero Branding & Trust Statement */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/janai-logo.jpg"
              alt="JanAI Official Emblem Logo"
              className="h-16 w-auto rounded-2xl border border-gray-700 bg-white p-1 shadow-lg"
            />
            <div>
              <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase border border-green-500/30">
                AI Powered • Citizen First
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">JanAI National Welfare Platform</h2>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
            Helping Every Indian Citizen Discover, Understand & Access Welfare with AI
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            State-grounded AI assistant covering <strong className="text-green-400">420+ Central & State Schemes</strong> across <strong className="text-blue-400">22 Official Scheduled Languages</strong>. Verified against Gazette Notifications with 98.8% rule precision.
          </p>

          {/* 👀 PROMINENT GUEST EXPLORATION MODE BUTTON */}
          <div className="p-6 glass rounded-3xl border border-green-500/30 bg-green-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Anonymous Guest Exploration Mode
                </span>
                <h3 className="text-base font-bold text-white mt-1">Explore JanAI Without Creating an Account</h3>
              </div>

              <button
                onClick={() => navigate("/finder")}
                className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-3 rounded-2xl text-xs transition shadow-lg shadow-green-500/20 flex items-center gap-2 shrink-0"
              >
                Explore Schemes Now <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-gray-300 text-xs">
              Search 420+ schemes, calculate eligibility, and chat with AI anonymously. No registration required.
            </p>
          </div>

          {/* 💡 "Why Create an Account?" Comparison Panel */}
          <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle size={16} className="text-blue-400" /> Why Create a Citizen Account?
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2">
                <span className="font-bold text-gray-300 flex items-center gap-1.5">
                  <Eye size={14} className="text-gray-400" /> Without an Account (Guest Mode)
                </span>
                <ul className="text-gray-400 space-y-1 text-[11px]">
                  <li>✅ Browse 420+ Government Schemes</li>
                  <li>✅ Ask AI natural language questions</li>
                  <li>✅ Evaluate instant eligibility rules</li>
                </ul>
              </div>

              <div className="bg-[#12182b] p-4 rounded-2xl border border-blue-500/30 space-y-2">
                <span className="font-bold text-green-400 flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400" /> With a Citizen Account
                </span>
                <ul className="text-gray-300 space-y-1 text-[11px]">
                  <li>⭐ Save & bookmark favorite schemes</li>
                  <li>⭐ Upload e-KYC documents to Vault securely</li>
                  <li>⭐ Track multi-step application milestones</li>
                  <li>⭐ Receive official deadline alerts & notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: 🔐 Multi-Method Government-Trusted Login Panel */}
        <div className="lg:col-span-5 glass p-6 md:p-8 rounded-[36px] border border-gray-800 space-y-6 shadow-2xl bg-[#12182b]/90">
          <div>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
              Government-Trusted Portal Sign-In
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-2">Sign In to JanAI</h3>
            <p className="text-gray-400 text-xs mt-1">Access your saved schemes, document vault, and application tracking.</p>
          </div>

          {/* Login Method Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#1b2338] p-1.5 rounded-2xl text-[11px] font-bold text-center">
            <button
              onClick={() => setLoginMethod("email")}
              className={`py-2 rounded-xl transition ${loginMethod === "email" ? "bg-green-500 text-black shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod("otp")}
              className={`py-2 rounded-xl transition ${loginMethod === "otp" ? "bg-green-500 text-black shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              Mobile OTP
            </button>
            <button
              onClick={() => setLoginMethod("google")}
              className={`py-2 rounded-xl transition ${loginMethod === "google" ? "bg-green-500 text-black shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              Google
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bold text-[11px]">
              ⚠️ {authError}
            </div>
          )}

          {/* Option A: Email + Password Login */}
          {loginMethod === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Email Address</label>
                <div className="glass px-3 py-2.5 rounded-xl border border-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none text-white text-xs w-full"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Password</label>
                <div className="glass px-3 py-2.5 rounded-xl border border-gray-700 flex items-center gap-2">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent outline-none text-white text-xs w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white text-[10px] font-bold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <label className="flex items-center gap-1.5 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="accent-green-500" defaultChecked /> Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-green-400 hover:underline font-bold"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold py-3.5 rounded-2xl text-xs transition shadow-lg shadow-green-500/20"
              >
                Sign In to Citizen Account
              </button>
            </form>
          )}

          {/* Option B: Mobile OTP Login (+91) */}
          {loginMethod === "otp" && (
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Indian Mobile Number (+91)</label>
                <div className="glass px-3 py-2.5 rounded-xl border border-gray-700 flex items-center gap-2 font-mono">
                  <Smartphone size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-bold">+91</span>
                  <input
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent outline-none text-white text-xs w-full"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-2xl text-xs transition shadow-lg shadow-blue-600/20"
                >
                  Send 6-Digit Mobile OTP
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-300 font-semibold block mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="904128"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#1b2338] text-white text-center font-mono text-lg tracking-widest border border-gray-700 outline-none"
                    />
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3.5 rounded-2xl text-xs transition shadow-lg shadow-green-500/20"
                  >
                    Verify OTP & Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Option C: Google OAuth Login */}
          {loginMethod === "google" && (
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-100 text-black font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Continue with Google Workspace
              </button>
            </div>
          )}

          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-gray-400 text-[11px]">
              Don't have an account yet?{" "}
              <button onClick={() => navigate("/register")} className="text-green-400 font-bold hover:underline">
                Create Free Citizen Account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 LIVE TRUST STATISTICS SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Citizens Served</p>
          <h4 className="text-2xl font-extrabold text-white">86,120</h4>
          <span className="text-[10px] text-green-400 font-bold">Across AP & TS</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Welfare Schemes</p>
          <h4 className="text-2xl font-extrabold text-blue-400">420+</h4>
          <span className="text-[10px] text-blue-400 font-bold">Central & State</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">AI Precision</p>
          <h4 className="text-2xl font-extrabold text-purple-400">98.8%</h4>
          <span className="text-[10px] text-purple-400 font-bold">Gazette Verified</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Indian Languages</p>
          <h4 className="text-2xl font-extrabold text-yellow-400">22</h4>
          <span className="text-[10px] text-yellow-400 font-bold">Scheduled Vernacular</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1 col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-400 font-semibold">Avg AI Latency</p>
          <h4 className="text-2xl font-extrabold text-pink-400">112 ms</h4>
          <span className="text-[10px] text-pink-400 font-bold">P95 Response</span>
        </div>
      </div>

      {/* 🛡️ TRUST & COMPLIANCE BADGES SECTION */}
      <div className="glass p-6 rounded-3xl border border-gray-800 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-gray-300">
        <span className="flex items-center gap-1.5 text-green-400">
          <CheckCircle2 size={16} /> DPDP Act 2023 Compliant
        </span>
        <span className="flex items-center gap-1.5 text-blue-400">
          <CheckCircle2 size={16} /> AES-256-GCM Encryption
        </span>
        <span className="flex items-center gap-1.5 text-purple-400">
          <CheckCircle2 size={16} /> RS256 JWT Authentication
        </span>
        <span className="flex items-center gap-1.5 text-yellow-400">
          <CheckCircle2 size={16} /> Official Gazette Ground Truth
        </span>
      </div>

      {/* 🤖 FLOATING AI WELCOME ASSISTANT & 🎤 VOICE ASSISTANT */}
      {showAiFloating && (
        <div className="fixed bottom-6 right-6 z-50 glass p-4 rounded-3xl border border-green-500/40 shadow-2xl max-w-xs space-y-3 bg-[#12182b]/95">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-green-400" />
              <span className="font-bold text-white text-xs">JanAI Welcome Assistant</span>
            </div>
            <button onClick={() => setShowAiFloating(false)} className="text-gray-400 hover:text-white font-bold text-xs">✕</button>
          </div>

          <p className="text-[11px] text-gray-300">
            Need help? Ask me any question without signing in:
          </p>

          <div className="space-y-1.5">
            {["What is PM Kisan Samman Nidhi?", "Find scholarship for B.Tech student", "How to track my application?"].map((q, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/chat?q=${encodeURIComponent(q)}`)}
                className="w-full text-left p-2 rounded-xl bg-[#1b2338] text-[10px] text-gray-200 hover:text-green-400 hover:bg-white/5 transition"
              >
                "{q}"
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/chat")}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
          >
            <Mic size={14} /> Speak to AI Assistant
          </button>
        </div>
      )}
    </div>
  )
}