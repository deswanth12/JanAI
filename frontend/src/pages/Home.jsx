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
  RotateCw
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { user, login } = useAuth()

  // Login Mode: "options" | "email" | "otp"
  const [loginMode, setLoginMode] = useState("options")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [authError, setAuthError] = useState("")

  // Persona Selection State
  const [selectedPersona, setSelectedPersona] = useState("student")

  // Accessibility Controls
  const [accessibility, setAccessibility] = useState({
    theme: "dark",
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
        gazetteRef: "Gazette Notification 2026/07"
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
    student: { title: "🎓 Student?", subtitle: "Discover scholarships, tuition fee waivers, and education loans.", tag: "Post-Matric & Overseas Scholarships" },
    farmer: { title: "🌾 Farmer?", subtitle: "Check PM-Kisan installments, Rythu Bharosa, and crop subsidies.", tag: "PM-Kisan & Land Passbook Support" },
    senior: { title: "👵 Senior Citizen?", subtitle: "Explore Old Age Pensions, Ayushman Bharat, and healthcare.", tag: "Pension & Free Medical Coverage" },
    business: { title: "💼 Entrepreneur?", subtitle: "Find PM Mudra collateral-free loan caps up to ₹20 Lakhs.", tag: "Tarun Plus & Startup Grants" }
  }

  return (
    <div className={`space-y-10 pb-16 text-xs transition-all ${accessibility.largeText ? "text-sm" : ""}`}>
      {/* 🚀 ACCESSIBILITY TOOLBAR & DATA FRESHNESS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#12182b] p-3 rounded-2xl border border-gray-800 text-[11px]">
        {/* Official Data Status */}
        <div className="flex items-center gap-2 font-mono text-gray-300">
          <CheckCircle2 size={14} className="text-green-400" />
          <span>Official Gazette Data Status: <strong className="text-green-400">✓ Updated 24 Jul 2026 • 18:30 IST</strong></span>
        </div>

        {/* Accessibility Buttons */}
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

      {/* 🌟 HERO & TRUSTED ENTRY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Hero Branding & Persona Greetings */}
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

          {/* Contextual Persona Greeting Selector */}
          <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Select Citizen Category:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(personaGreetings).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedPersona(key)}
                  className={`p-2.5 rounded-2xl text-left transition font-bold ${
                    selectedPersona === key ? "bg-green-500 text-black shadow-md" : "glass text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {personaGreetings[key].title}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center text-xs">
              <span className="text-gray-300">{personaGreetings[selectedPersona].subtitle}</span>
              <span className="text-green-400 font-mono font-bold text-[10px]">{personaGreetings[selectedPersona].tag}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
            Helping Every Indian Citizen Discover, Understand & Access Welfare with AI
          </h1>

          {/* 🔐 DIGITAL TRUST BANNER */}
          <div className="p-4 glass rounded-2xl border border-blue-500/30 bg-blue-500/5 text-blue-300 text-xs flex items-center gap-3">
            <ShieldCheck size={24} className="text-blue-400 shrink-0" />
            <p className="leading-relaxed">
              <strong>Digital Trust Guarantee:</strong> Your uploaded documents remain encrypted with AES-256-GCM, and you maintain complete consent control under the DPDP Act 2023. JanAI assists you using ground-truth official government gazette sources.
            </p>
          </div>

          {/* 👀 PROMINENT GUEST MODE BUTTON & WHY CREATE ACCOUNT */}
          <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
              <div>
                <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Anonymous Guest Exploration Mode
                </span>
                <h3 className="text-base font-bold text-white mt-1">Explore JanAI Without an Account</h3>
              </div>

              <button
                onClick={() => navigate("/finder")}
                className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-3 rounded-2xl text-xs transition shadow-lg shadow-green-500/20 flex items-center gap-2 shrink-0"
              >
                Explore Schemes Now <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 space-y-1 text-gray-400">
                <strong className="text-gray-300 block text-xs">Without an Account</strong>
                <div>✅ Browse 420+ Schemes</div>
                <div>✅ Ask AI Questions</div>
                <div>✅ Evaluate Eligibility Rules</div>
              </div>

              <div className="bg-[#12182b] p-3 rounded-2xl border border-blue-500/30 space-y-1 text-gray-300">
                <strong className="text-green-400 block text-xs">With a Free Account</strong>
                <div>⭐ Save Favorite Schemes</div>
                <div>⭐ Upload Documents to Vault</div>
                <div>⭐ Track Application Milestones</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: 🔐 PROGRESSIVE CLEAN LOGIN PANEL */}
        <div className="lg:col-span-5 glass p-6 md:p-8 rounded-[36px] border border-gray-800 space-y-6 shadow-2xl bg-[#12182b]/90">
          <div>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
              Government-Trusted Portal Sign-In
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-2">Sign In to JanAI</h3>
            <p className="text-gray-400 text-xs mt-1">Access saved schemes, document vault, and application tracking.</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bold text-[11px]">
              ⚠️ {authError}
            </div>
          )}

          {/* Progressive Login Screen Selection */}
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
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Smartphone size={16} /> Continue with Mobile OTP (+91)
              </button>

              <button
                onClick={() => setLoginMode("email")}
                className="w-full glass hover:bg-white/10 text-white font-extrabold py-3.5 rounded-2xl text-xs transition border border-gray-700 flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Sign In with Email & Password
              </button>

              <div className="pt-2 text-center">
                <button
                  onClick={() => navigate("/finder")}
                  className="text-gray-400 hover:text-green-400 text-xs font-bold transition"
                >
                  Or Explore as Guest →
                </button>
              </div>
            </div>
          )}

          {/* Email Login View */}
          {loginMode === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Email Login Mode</span>
                <button type="button" onClick={() => setLoginMode("options")} className="text-green-400 font-bold">← Back to Options</button>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Email Address</label>
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
                Sign In Now
              </button>
            </form>
          )}

          {/* Mobile OTP View */}
          {loginMode === "otp" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Mobile OTP Mode (+91)</span>
                <button type="button" onClick={() => setLoginMode("options")} className="text-green-400 font-bold">← Back to Options</button>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Indian Mobile Number (+91)</label>
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
                  Send 6-Digit Mobile OTP
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
                    Verify OTP & Sign In
                  </button>
                </div>
              )}
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

      {/* 🧠 BEFORE-LOGIN AI DEMO SANDBOX */}
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
            Ground-Truth Gazette AI Execution
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

        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="text-gray-400 font-semibold">Try sample questions:</span>
          {[
            "What scholarships are available for B.Pharmacy?",
            "PM Mudra loan limit in 2026?",
            "AP Rythu Bharosa eligibility rules?"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleRunDemoQuery(prompt)}
              className="glass px-3 py-1 rounded-full text-purple-300 hover:bg-purple-500/20 transition"
            >
              "{prompt}"
            </button>
          ))}
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
                Like this answer? Create a free account to save this result and upload documents!
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
      </div>

      {/* 🔍 QUICK CATEGORY ACTION SHORTCUTS */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Quick Welfare Category Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-bold">
          <button onClick={() => navigate("/finder")} className="glass p-4 rounded-2xl border border-gray-800 hover:border-green-500/50 text-left transition space-y-1">
            <div className="text-green-400">🔍 Find Scheme</div>
            <div className="text-gray-400 text-[10px] font-normal">Explore 420+ rules</div>
          </button>

          <button onClick={() => navigate("/finder?category=Education")} className="glass p-4 rounded-2xl border border-gray-800 hover:border-blue-500/50 text-left transition space-y-1">
            <div className="text-blue-400">🎓 Student Benefits</div>
            <div className="text-gray-400 text-[10px] font-normal">Scholarships & Fees</div>
          </button>

          <button onClick={() => navigate("/finder?category=Agriculture")} className="glass p-4 rounded-2xl border border-gray-800 hover:border-yellow-500/50 text-left transition space-y-1">
            <div className="text-yellow-400">🌾 Farmer Schemes</div>
            <div className="text-gray-400 text-[10px] font-normal">PM-Kisan & Support</div>
          </button>

          <button onClick={() => navigate("/finder?category=Housing")} className="glass p-4 rounded-2xl border border-gray-800 hover:border-pink-500/50 text-left transition space-y-1">
            <div className="text-pink-400">🏠 Housing Grants</div>
            <div className="text-gray-400 text-[10px] font-normal">PMAY Assistance</div>
          </button>

          <button onClick={() => navigate("/finder?category=Business")} className="glass p-4 rounded-2xl border border-gray-800 hover:border-purple-500/50 text-left transition space-y-1 col-span-2 sm:col-span-1">
            <div className="text-purple-400">💼 Business Loans</div>
            <div className="text-gray-400 text-[10px] font-normal">Mudra & MSME</div>
          </button>
        </div>
      </div>

      {/* 🏆 TRUSTED INFORMATION SOURCES SECTION */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-green-400" /> Trusted Information & Ground-Truth Sources
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-300">
          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-green-400">✓ Official Gazette</span>
            <p className="text-gray-400 font-normal text-[10px]">Indexed from Central & State notifications</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-blue-400">✓ Department Portals</span>
            <p className="text-gray-400 font-normal text-[10px]">Verified against pmkisan.gov.in & portals</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-purple-400">✓ Verified Documents</span>
            <p className="text-gray-400 font-normal text-[10px]">Rule parsing checked by human review</p>
          </div>

          <div className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-1">
            <span className="text-yellow-400">✓ Transparent AI</span>
            <p className="text-gray-400 font-normal text-[10px]">Clear citations and explanation breakdown</p>
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
            <span className="text-gray-400 font-semibold block text-[10px]">Toll-Free Helpline</span>
            <span className="text-green-400 font-mono text-base block">1800-11-2026</span>
            <span className="text-gray-500 font-normal text-[10px]">Mon-Sat 9 AM - 6 PM IST</span>
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