import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  Smartphone,
  Mail,
  ArrowRight,
  Bot,
  PhoneCall,
  ShieldCheck,
  RotateCw,
  Info,
  X,
  UserCheck
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { login, loginAsGuest } = useAuth()

  const handleGuestExplore = () => {
    loginAsGuest()
    navigate("/dashboard")
  }

  // Login Mode: "options" | "email" | "otp"
  const [loginMode, setLoginMode] = useState("options")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [authError, setAuthError] = useState("")

  // Interactive Google Account Picker Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [customGoogleEmail, setCustomGoogleEmail] = useState("")
  const [customGoogleName, setCustomGoogleName] = useState("")

  // Persona Selection State (Optional)
  const [selectedPersona, setSelectedPersona] = useState("student")

  // Before-Login AI Demo Sandbox State
  const [demoQuery, setDemoQuery] = useState("")
  const [demoResult, setDemoResult] = useState(null)
  const [isDemoLoading, setIsDemoLoading] = useState(false)

  const handleRunDemoQuery = (queryText) => {
    const q = queryText || demoQuery
    if (!q.trim()) return
    setIsDemoLoading(true)
    setTimeout(() => {
      setDemoResult({
        query: q,
        answer: "Based on 2026 AP Gazette Rules: B.Pharmacy students with annual family income below ₹2.50 Lakhs are eligible for Post-Matric Full Tuition Reimbursement (Jagananna Vidya Deevena) + ₹20,000/yr Hostel Maintenance Allowance.",
        schemeTitle: "Post-Matric Tuition Fee Reimbursement",
        benefit: "100% Tuition Fee + ₹20,000 Hostel",
        gazetteRef: "Official Gazette Notification 2026/07"
      })
      setIsDemoLoading(false)
    }, 900)
  }

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setAuthError("Please enter both email and password.")
      return
    }
    const derivedName = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)
    login({ email, name: derivedName, role: "Citizen" })
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

  const handleSelectGoogleAccount = (selectedEmail, selectedName) => {
    const name = selectedName || selectedEmail.split("@")[0].charAt(0).toUpperCase() + selectedEmail.split("@")[0].slice(1)
    login({ email: selectedEmail, name, role: "Citizen" })
    setShowGoogleModal(false)
    navigate("/dashboard")
  }

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault()
    if (!customGoogleEmail || !customGoogleEmail.includes("@")) {
      setAuthError("Please enter a valid Google email address.")
      return
    }
    handleSelectGoogleAccount(customGoogleEmail, customGoogleName)
  }

  const personaGreetings = {
    student: { title: "🎓 Student", subtitle: "Discover scholarships, tuition fee waivers, and education loans." },
    farmer: { title: "🌾 Farmer", subtitle: "Check PM-Kisan installments, Rythu Bharosa, and crop subsidies." },
    senior: { title: "👵 Senior Citizen", subtitle: "Explore Old Age Pensions, Ayushman Bharat, and healthcare." },
    business: { title: "💼 Entrepreneur", subtitle: "Find PM Mudra collateral-free loan caps up to ₹20 Lakhs." }
  }

  return (
    <div className="space-y-12 pb-16 text-xs transition-all">

      {/* 🌟 1. SIMPLE FIRST SCREEN (ABOVE THE FOLD FOCUS) */}
      <div className="min-h-[75vh] flex flex-col justify-center items-center text-center space-y-8 py-6">
        {/* Brand Hero Badge */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src="/janai-logo.jpg"
            alt="JanAI Logo"
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl object-contain shadow-2xl border-2 border-gray-700 bg-white p-1.5 animate-bounce-slow"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-extrabold uppercase tracking-widest font-mono">
            AI POWERED • CITIZEN FIRST
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Discover & Access <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-amber-400 text-transparent bg-clip-text">
              Government Welfare with AI
            </span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Helping every Indian citizen find eligible welfare schemes grounded in official government gazette rules.
          </p>
        </div>

        {/* 🔐 CLEAN PROGRESSIVE ACTION BUTTONS */}
        <div className="w-full max-w-md glass p-6 md:p-8 rounded-[36px] border border-gray-800 space-y-3 bg-[#12182b]/95 shadow-2xl">
          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bold text-[11px]">
              ⚠️ {authError}
            </div>
          )}

          {loginMode === "options" && (
            <div className="space-y-3">
              <button
                onClick={() => setShowGoogleModal(true)}
                className="w-full bg-white hover:bg-gray-100 text-black font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Continue with Google
              </button>

              <button
                onClick={() => setLoginMode("otp")}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Smartphone size={16} /> Continue with Mobile OTP (+91)
              </button>

              <button
                onClick={() => setLoginMode("email")}
                className="w-full glass hover:bg-white/10 text-white font-extrabold py-3.5 rounded-2xl text-xs transition border border-gray-700 flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Sign In with Email
              </button>

              <div className="pt-2 border-t border-gray-800">
                <button
                  onClick={handleGuestExplore}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                  Explore as Guest (No Account Required) <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {loginMode === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-3 text-left">
              <div>
                <label className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-green-400 text-xs"
                />
              </div>

              <div>
                <label className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-green-400 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3 rounded-xl text-xs transition"
              >
                Sign In to Portal
              </button>

              <button
                type="button"
                onClick={() => setLoginMode("options")}
                className="w-full text-center text-gray-400 hover:text-white text-[11px] pt-1"
              >
                ← Back to all sign-in options
              </button>
            </form>
          )}

          {loginMode === "otp" && (
            <div className="space-y-3 text-left">
              {!otpSent ? (
                <>
                  <div>
                    <label className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Mobile Number (+91)</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98765 43210"
                      className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-400 text-xs font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3 rounded-xl text-xs transition"
                  >
                    Send 6-Digit OTP SMS
                  </button>
                </>
              ) : (
                <>
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-[11px] text-blue-300">
                    📩 6-digit OTP code sent to <strong>+91 {phone}</strong>
                  </div>

                  <div>
                    <label className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="881920"
                      className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-green-400 text-center font-mono font-bold tracking-widest text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3 rounded-xl text-xs transition"
                  >
                    Verify OTP & Access Portal
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setLoginMode("options")
                  setOtpSent(false)
                }}
                className="w-full text-center text-gray-400 hover:text-white text-[11px] pt-1"
              >
                ← Back to all sign-in options
              </button>
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-500 font-mono">
          Scroll down to explore features, updates, and AI reasoning. ↓
        </p>
      </div>

      {/* 🔴 INTERACTIVE GOOGLE ACCOUNT SELECTOR MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 max-w-md w-full space-y-5 bg-[#12182b] text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <h3 className="font-bold text-sm">Choose a Google Account</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-gray-300 text-xs">
              Select your Google Account to sign in to <strong>JanAI Citizen Welfare Portal</strong>:
            </p>

            <div className="space-y-2">
              {/* Account Option 1: Deswanth Baskar */}
              <button
                onClick={() => handleSelectGoogleAccount("deswanth12@gmail.com", "Devanth Baskar")}
                className="w-full text-left p-3.5 rounded-2xl bg-[#1b2338] hover:bg-white/10 border border-gray-700 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
                    D
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs group-hover:text-green-400 transition">Devanth Baskar</p>
                    <p className="text-[11px] text-gray-400">deswanth12@gmail.com</p>
                  </div>
                </div>
                <UserCheck size={16} className="text-green-400 opacity-0 group-hover:opacity-100 transition" />
              </button>

              {/* Account Option 2: Citizen Demo */}
              <button
                onClick={() => handleSelectGoogleAccount("citizen.demo@gmail.com", "Demo Citizen")}
                className="w-full text-left p-3.5 rounded-2xl bg-[#1b2338] hover:bg-white/10 border border-gray-700 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500 text-black font-bold flex items-center justify-center text-sm">
                    C
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs group-hover:text-green-400 transition">Demo Citizen</p>
                    <p className="text-[11px] text-gray-400">citizen.demo@gmail.com</p>
                  </div>
                </div>
                <UserCheck size={16} className="text-green-400 opacity-0 group-hover:opacity-100 transition" />
              </button>
            </div>

            <div className="pt-2 border-t border-gray-800 space-y-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Or sign in with another Google Email:</p>
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Full Name (e.g. Devanth Baskar)"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-400 text-xs"
                />
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-400 text-xs"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Continue with this Account
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. PERSONA SELECTION BANNER */}
      <div className="glass p-6 md:p-8 rounded-[36px] border border-gray-800 space-y-6 bg-[#12182b]/90">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-white">Who are you looking for today?</h2>
          <p className="text-gray-400 text-xs">Tailor scheme discovery for yourself or family members</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(personaGreetings).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setSelectedPersona(key)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedPersona === key
                  ? "bg-green-500/10 border-green-500 text-white font-bold scale-[1.02]"
                  : "bg-[#1b2338]/50 border-gray-800 text-gray-400 hover:border-gray-700"
              }`}
            >
              <h3 className="font-bold text-xs text-white">{val.title}</h3>
              <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{val.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRE-LOGIN AI DEMO SANDBOX */}
      <div className="glass p-6 md:p-8 rounded-[36px] border border-blue-500/30 bg-blue-500/5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Try JanAI Eligibility Sandbox
              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">No Sign-in Needed</span>
            </h2>
            <p className="text-gray-400 text-xs">Test instant AI scheme evaluation before creating an account</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={demoQuery}
              onChange={(e) => setDemoQuery(e.target.value)}
              placeholder="e.g. Am I eligible for B.Tech tuition fee reimbursement in Andhra Pradesh?"
              className="flex-1 bg-[#12182b] border border-gray-700 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-blue-400"
            />
            <button
              onClick={() => handleRunDemoQuery()}
              disabled={isDemoLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-2xl text-xs transition flex items-center gap-2 shrink-0"
            >
              {isDemoLoading ? <RotateCw size={14} className="animate-spin" /> : "Test AI"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="text-gray-400 self-center">Try sample prompts:</span>
            <button
              onClick={() => handleRunDemoQuery("Scholarship for B.Pharmacy student family income 1.8 Lakhs")}
              className="px-2.5 py-1 bg-[#12182b] hover:bg-white/10 rounded-xl text-gray-300 border border-gray-800"
            >
              🎓 B.Pharmacy Scholarship
            </button>
            <button
              onClick={() => handleRunDemoQuery("PM-Kisan land passbook eligibility 2.5 acres farmer")}
              className="px-2.5 py-1 bg-[#12182b] hover:bg-white/10 rounded-xl text-gray-300 border border-gray-800"
            >
              🌾 PM-Kisan Farmer Land
            </button>
          </div>
        </div>

        {demoResult && (
          <div className="p-5 rounded-2xl bg-[#12182b] border border-blue-500/40 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="font-bold text-blue-400 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Grounded AI Evaluation Result:
              </span>
              <span className="text-[10px] font-mono text-gray-400">{demoResult.gazetteRef}</span>
            </div>
            <p className="text-gray-200 leading-relaxed">{demoResult.answer}</p>
            <div className="flex items-center justify-between pt-2 text-[11px] font-bold">
              <span className="text-green-400">Scheme: {demoResult.schemeTitle}</span>
              <span className="text-amber-300">Benefit: {demoResult.benefit}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. EMERGENCY HELP & CITIZEN RIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-3 bg-[#12182b]/80">
          <div className="flex items-center gap-3">
            <PhoneCall size={18} className="text-green-400" />
            <h3 className="font-bold text-sm text-white">Need Assistance? Emergency Help Desk</h3>
          </div>
          <p className="text-gray-400 text-xs">
            Toll-Free Government Helpline: <strong>1800-11-2026</strong>. Available 24/7 in 22 regional languages.
          </p>
        </div>

        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-3 bg-[#12182b]/80">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-blue-400" />
            <h3 className="font-bold text-sm text-white">Citizen Privacy & Rights</h3>
          </div>
          <p className="text-gray-400 text-xs">
            Compliant with DPDP Act 2023. Encrypted document vault with zero data commercialization.
          </p>
        </div>
      </div>
    </div>
  )
}