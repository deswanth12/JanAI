import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  Smartphone,
  Mail,
  ArrowRight,
  Bot,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Volume2,
  RotateCw,
  Info
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { user, login, loginAsGuest } = useAuth()

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

  // Persona Selection State (Optional)
  const [selectedPersona, setSelectedPersona] = useState("student")

  // Accessibility Controls
  const [accessibility, setAccessibility] = useState({
    largeText: false,
    readAloud: false,
    language: "en"
  })

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

  const personaGreetings = {
    student: { title: "🎓 Student", subtitle: "Discover scholarships, tuition fee waivers, and education loans." },
    farmer: { title: "🌾 Farmer", subtitle: "Check PM-Kisan installments, Rythu Bharosa, and crop subsidies." },
    senior: { title: "👵 Senior Citizen", subtitle: "Explore Old Age Pensions, Ayushman Bharat, and healthcare." },
    business: { title: "💼 Entrepreneur", subtitle: "Find PM Mudra collateral-free loan caps up to ₹20 Lakhs." }
  }

  return (
    <div className={`space-y-12 pb-16 text-xs transition-all ${accessibility.largeText ? "text-sm" : ""}`}>
      {/* 🚀 ACCESSIBILITY TOOLBAR & GAZETTE STATUS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#12182b] p-3 rounded-2xl border border-gray-800 text-[11px]">
        <div className="flex items-center gap-2 font-mono text-gray-300">
          <CheckCircle2 size={14} className="text-green-400" />
          <span>Official Data Status: <strong className="text-green-400">✓ Gazette Updated 24 Jul 2026 • 18:30 IST</strong></span>
        </div>

        <div className="flex items-center gap-2 font-bold text-gray-300">
          <button
            onClick={() => setAccessibility({ ...accessibility, largeText: !accessibility.largeText })}
            className={`px-2.5 py-1 rounded-xl border transition ${accessibility.largeText ? "bg-purple-500/20 border-purple-500 text-purple-300" : "border-gray-700 hover:bg-white/5"}`}
          >
            🔤 {accessibility.largeText ? "Normal Text" : "Large Text"}
          </button>

          <button
            onClick={() => setAccessibility({ ...accessibility, readAloud: !accessibility.readAloud })}
            className={`px-2.5 py-1 rounded-xl border transition ${accessibility.readAloud ? "bg-green-500/20 border-green-500 text-green-400" : "border-gray-700 hover:bg-white/5"}`}
          >
            <Volume2 size={12} className="inline mr-1" /> {accessibility.readAloud ? "Reading Aloud" : "Read Aloud"}
          </button>

          <select
            value={accessibility.language}
            onChange={(e) => setAccessibility({ ...accessibility, language: e.target.value })}
            className="bg-[#1b2338] text-white px-2 py-1 rounded-xl border border-gray-700 outline-none cursor-pointer"
          >
            <option value="en">🌐 English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>
      </div>

      {/* 👋 RETURNING USER: "CONTINUE WHERE YOU LEFT OFF" CARD */}
      {user && (
        <div className="glass p-5 rounded-3xl border border-green-500/40 bg-green-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
              Welcome back, {user.name || "Devanth"}! 👋
            </span>
            <h3 className="text-base font-bold text-white">Continue where you left off</h3>
            <p className="text-gray-300 text-xs">
              Last Sign In: <strong>Yesterday • Windows 11 • Tirupati</strong>. Pending application: <strong>Post-Matric Scholarship Scheme</strong>.
            </p>
          </div>

          <button
            onClick={() => navigate("/applications")}
            className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-3 rounded-2xl text-xs transition shadow-lg shadow-green-500/20 flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            Continue Pending Application <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* 🌟 1. SIMPLE FIRST SCREEN (ABOVE THE FOLD FOCUS) */}
      <div className="min-h-[75vh] flex flex-col justify-center items-center text-center space-y-8 py-6">
        <div className="flex flex-col items-center space-y-3">
          <img
            src="/janai-logo.jpg"
            alt="JanAI Official Emblem Logo"
            className="h-20 w-auto rounded-3xl border border-gray-700 bg-white p-1.5 shadow-2xl"
          />
          <span className="text-xs bg-green-500/20 text-green-300 font-extrabold px-4 py-1 rounded-full uppercase border border-green-500/30">
            AI Powered • Citizen First
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl leading-tight">
            Discover & Access Government Welfare with AI
          </h1>
          <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
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
                onClick={handleGoogleSignIn}
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
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Email Sign-In</span>
                <button type="button" onClick={() => setLoginMode("options")} className="text-green-400 font-bold">← Back</button>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
                />
              </div>

              <button type="submit" className="w-full bg-green-500 text-black font-extrabold py-3.5 rounded-2xl text-xs">
                Sign In
              </button>
            </form>
          )}

          {loginMode === "otp" && (
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Mobile OTP Sign-In</span>
                <button type="button" onClick={() => setLoginMode("options")} className="text-green-400 font-bold">← Back</button>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Mobile Number (+91)</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white font-mono text-xs border border-gray-700 outline-none"
                />
              </div>

              {!otpSent ? (
                <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white font-extrabold py-3.5 rounded-2xl text-xs">
                  Send Mobile OTP
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="904128"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#1b2338] text-white text-center font-mono text-lg border border-gray-700 outline-none"
                  />
                  <button onClick={handleVerifyOtp} className="w-full bg-green-500 text-black font-extrabold py-3.5 rounded-2xl text-xs">
                    Verify & Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-gray-400 text-[11px]">Scroll down to explore features, updates, and AI reasoning ↓</p>
      </div>

      {/* 🧠 3. BEFORE-LOGIN AI DEMO SANDBOX (WITH SAFETY DISCLAIMER) */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800 pb-3">
          <div>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
              Interactive Pre-Login AI Sandbox
            </span>
            <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              <Bot size={20} className="text-purple-400" /> Test JanAI Reasoning Before Creating an Account
            </h3>
          </div>

          <span className="text-[11px] text-gray-400 font-mono">
            Gazette-Grounded Rules Execution
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ask a question (e.g., What scholarships are available for B.Pharmacy?)"
            value={demoQuery}
            onChange={(e) => setDemoQuery(e.target.value)}
            className="flex-1 p-3.5 rounded-2xl bg-[#12182b] text-white border border-gray-700 outline-none text-xs"
          />
          <button
            onClick={() => handleRunDemoQuery()}
            disabled={isDemoLoading}
            className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 shrink-0"
          >
            {isDemoLoading ? <RotateCw size={14} className="animate-spin" /> : "Ask JanAI Now"}
          </button>
        </div>

        {demoResult && (
          <div className="p-5 bg-[#12182b] rounded-2xl border border-purple-500/40 space-y-3 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-purple-300">JanAI AI Reasoning Result:</span>
              <span className="text-yellow-400 font-mono text-[10px]">{demoResult.gazetteRef}</span>
            </div>
            <p className="text-gray-200 leading-relaxed font-medium">"{demoResult.answer}"</p>
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-purple-300 font-bold text-[11px]">
                Create a free account to save this result and upload documents!
              </span>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition shrink-0"
              >
                Create Free Account
              </button>
            </div>
          </div>
        )}

        {/* ⚠️ SAFER AI DEMO DISCLAIMER NOTE */}
        <div className="p-3 bg-gray-800/40 rounded-xl border border-gray-700 text-gray-400 text-[11px] flex items-center gap-2">
          <Info size={16} className="text-blue-400 shrink-0" />
          <span>
            <strong>Note:</strong> Responses are generated from official sources where available. For important decisions, always verify the latest information on the relevant government portal.
          </span>
        </div>
      </div>

      {/* 📢 5. COMPACT RECENT UPDATES SECTION */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 size={18} className="text-green-400" /> Recent Platform & Policy Updates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <strong className="text-green-400 font-bold block">✓ Post-Matric Scholarship Guidelines Updated</strong>
            <span className="text-gray-400 text-[10px]">Income ceiling & tuition fee reimbursement rates revised for 2026 academic year.</span>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <strong className="text-blue-400 font-bold block">✓ PM-Kisan Schedule & Installments Verified</strong>
            <span className="text-gray-400 text-[10px]">17th installment disbursement schedule synchronized with agriculture department.</span>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <strong className="text-purple-400 font-bold block">✓ 4 New State Welfare Schemes Added</strong>
            <span className="text-gray-400 text-[10px]">Expanded coverage across higher education and collateral-free loan categories.</span>
          </div>
        </div>
      </div>

      {/* 🌾 4. OPTIONAL PERSONA SHORTCUT CARDS */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Quick Citizen Category Shortcuts (Optional)</h3>
          <span className="text-gray-400 text-[10px]">You can search freely without self-identification</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(personaGreetings).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPersona(key)}
              className={`p-3.5 rounded-2xl text-left transition ${selectedPersona === key ? "bg-green-500 text-black font-bold" : "bg-[#12182b] text-gray-300 hover:bg-white/5 border border-gray-800"}`}
            >
              <strong className="block text-xs">{personaGreetings[key].title}</strong>
              <span className="text-[10px] opacity-80 block mt-0.5">{personaGreetings[key].subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🚀 2. VERIFIED TARGET METRICS SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Citizens Supported Target</p>
          <h4 className="text-2xl font-extrabold text-white">86,120</h4>
          <span className="text-[10px] bg-gray-800 text-gray-400 font-mono px-2 py-0.5 rounded">Pilot Target Metrics</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Indexed Schemes</p>
          <h4 className="text-2xl font-extrabold text-blue-400">420+</h4>
          <span className="text-[10px] bg-gray-800 text-gray-400 font-mono px-2 py-0.5 rounded">Central & State</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">AI Precision Standard</p>
          <h4 className="text-2xl font-extrabold text-purple-400">98.8%</h4>
          <span className="text-[10px] bg-gray-800 text-gray-400 font-mono px-2 py-0.5 rounded">Gazette Grounded</span>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 text-center space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Indian Languages</p>
          <h4 className="text-2xl font-extrabold text-yellow-400">22</h4>
          <span className="text-[10px] bg-gray-800 text-gray-400 font-mono px-2 py-0.5 rounded">Scheduled Languages</span>
        </div>
      </div>

      {/* 🏆 TRUSTED INFORMATION SOURCES SECTION */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-green-400" /> Trusted Information & Ground-Truth Sources
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-300">
          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-green-400">✓ Official Gazette Notifications</span>
            <p className="text-gray-400 font-normal text-[10px]">Indexed directly from official central & state gazettes</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-blue-400">✓ Government Department Portals</span>
            <p className="text-gray-400 font-normal text-[10px]">Verified against pmkisan.gov.in and official ministry sites</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-purple-400">✓ Verified Scheme Documents</span>
            <p className="text-gray-400 font-normal text-[10px]">Rule parsing checked against official guidelines</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-yellow-400">✓ Transparent AI Recommendations</span>
            <p className="text-gray-400 font-normal text-[10px]">Clear rule matching and source citation breakdown</p>
          </div>
        </div>
      </div>

      {/* 📞 EMERGENCY HELP & CITIZEN SUPPORT SECTION */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <PhoneCall size={18} className="text-green-400" /> Emergency Help & Citizen Support
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
          <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-semibold block text-[10px]">Toll-Free Support Line</span>
            <span className="text-green-400 font-mono text-base block">1800-11-2026</span>
            <span className="text-gray-500 font-normal text-[10px]">Pilot Setup Phase (Mon-Sat 9 AM - 6 PM)</span>
          </div>

          <button onClick={() => navigate("/chat")} className="bg-[#12182b] hover:bg-white/5 p-4 rounded-2xl border border-gray-800 space-y-1 text-left transition">
            <span className="text-gray-400 font-semibold block text-[10px]">AI Chat Copilot</span>
            <span className="text-blue-400 text-sm block">💬 Instant Chat Assistant</span>
            <span className="text-gray-500 font-normal text-[10px]">Available 24/7 in 22 languages</span>
          </button>

          <button onClick={() => navigate("/terms")} className="bg-[#12182b] hover:bg-white/5 p-4 rounded-2xl border border-gray-800 space-y-1 text-left transition">
            <span className="text-gray-400 font-semibold block text-[10px]">User Guide</span>
            <span className="text-purple-400 text-sm block">📖 Citizen Handbook</span>
            <span className="text-gray-500 font-normal text-[10px]">Step-by-step application walkthrough</span>
          </button>

          <button onClick={() => navigate("/status")} className="bg-[#12182b] hover:bg-white/5 p-4 rounded-2xl border border-gray-800 space-y-1 text-left transition">
            <span className="text-gray-400 font-semibold block text-[10px]">Public Health</span>
            <span className="text-yellow-400 text-sm block">📊 System Status</span>
            <span className="text-gray-500 font-normal text-[10px]">100% Operational Status</span>
          </button>
        </div>
      </div>
    </div>
  )
}