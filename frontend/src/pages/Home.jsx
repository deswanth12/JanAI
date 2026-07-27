import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import {
  Mail,
  ArrowRight,
  Bot,
  PhoneCall,
  RotateCw,
  X,
  UserCheck,
  Sparkles,
  Briefcase,
  IndianRupee,
  MapPin
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { user, login, loginAsGuest } = useAuth()

  // Redirect authenticated citizens to Dashboard when visiting /
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true })
    }
  }, [user, navigate])

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

  // Basic Details for Google Sign In
  const [googleOccupation, setGoogleOccupation] = useState("Student")
  const [googleIncome, setGoogleIncome] = useState("180000")
  const [googleState, setGoogleState] = useState("Andhra Pradesh")
  const [googleDistrict, setGoogleDistrict] = useState("Visakhapatnam")
  const [googleCaste, setGoogleCaste] = useState("OBC")

  // Persona Selection State (Optional)
  const [selectedPersona, setSelectedPersona] = useState("student")

  // Before-Login AI Demo Sandbox State
  const [demoQuery, setDemoQuery] = useState("")
  const [demoResult, setDemoResult] = useState(null)
  const [isSearchingDemo, setIsSearchingDemo] = useState(false)

  const handleRunDemoQuery = (queryText) => {
    const q = queryText || demoQuery
    if (!q) return
    setIsSearchingDemo(true)
    setTimeout(() => {
      setIsSearchingDemo(false)
      setDemoResult({
        matchedCount: 3,
        topScheme: "Post-Matric Scholarship Scheme for SC/ST/OBC Students",
        benefit: "Up to ₹13,500 / year + Full Tuition Fee Waiver",
        reason: "Matched for Student, OBC category, income < ₹2,50,000 in Andhra Pradesh."
      })
    }, 800)
  }

  const handleEmailLoginSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setAuthError("Please enter your email address.")
      return
    }
    login({
      email,
      name: email.split("@")[0],
      role: googleOccupation,
      occupation: googleOccupation,
      annualIncome: googleIncome,
      state: googleState,
      district: googleDistrict,
      caste: googleCaste,
      isVerified: true
    })
    navigate("/dashboard")
  }

  const handleOtpSend = (e) => {
    e.preventDefault()
    if (!phone || phone.length < 10) {
      setAuthError("Please enter a valid 10-digit mobile number.")
      return
    }
    setAuthError("")
    setOtpSent(true)
  }

  const handleOtpVerify = (e) => {
    e.preventDefault()
    if (!otpCode || otpCode.length < 4) {
      setAuthError("Please enter the 6-digit OTP code.")
      return
    }
    login({
      phone: `+91 ${phone}`,
      name: `Citizen (${phone.slice(-4)})`,
      role: googleOccupation,
      occupation: googleOccupation,
      annualIncome: googleIncome,
      state: googleState,
      district: googleDistrict,
      caste: googleCaste,
      isVerified: true
    })
    navigate("/dashboard")
  }

  const handleSelectGoogleAccount = (selectedEmail, selectedName) => {
    const name = selectedName || selectedEmail.split("@")[0].charAt(0).toUpperCase() + selectedEmail.split("@")[0].slice(1)
    login({
      email: selectedEmail,
      name,
      role: googleOccupation,
      occupation: googleOccupation,
      annualIncome: googleIncome,
      state: googleState,
      district: googleDistrict,
      caste: googleCaste,
      isVerified: true
    })
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
    student: "Post-Matric Scholarships & Fee Reimbursements (Up to ₹13,500/yr)",
    farmer: "PM-Kisan ₹6,000/yr Direct Benefit Transfer & Fertilizer Subsidies",
    senior: "Senior Citizen Pension (₹1,000 - ₹3,000/mo) & Ayushman 70+ Cover",
    women: "Sukanya Samriddhi Yojana (8.2% Interest) & Self-Help Group Loans",
    msme: "PMEGP Capital Margin Subsidy up to 35% & Mudra Tarun Plus Loans"
  }

  return (
    <div className="space-y-12 pb-16 text-xs max-w-6xl mx-auto">
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-6 pt-6 md:pt-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-amber-500/10 border border-gray-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
          <img
            src="/janai-logo.jpg"
            alt="JanAI Logo"
            className="h-5 w-auto rounded object-contain"
          />
          <span className="bg-gradient-to-r from-blue-400 via-green-400 to-amber-400 text-transparent bg-clip-text font-black uppercase tracking-wider">
            AI POWERED • CITIZEN FIRST
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Discover & Access <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-amber-400 text-transparent bg-clip-text">
              Government Welfare with AI
            </span>
          </h1>
          <p className="text-gray-300 text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
            Helping every Indian citizen find eligible welfare schemes grounded in official government gazette rules.
          </p>
        </div>

        {/* ⚡ ENTRY BUTTONS CARD */}
        <div className="max-w-md mx-auto glass p-6 rounded-3xl border border-gray-800 space-y-4 shadow-2xl bg-[#12182b]/90">
          {authError && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold text-center">
              {authError}
            </div>
          )}

          {loginMode === "options" && (
            <div className="space-y-3">
              <button
                onClick={() => setShowGoogleModal(true)}
                className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-extrabold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>

              <button
                onClick={() => setLoginMode("email")}
                className="w-full py-3.5 glass hover:bg-white/10 text-white font-bold rounded-2xl text-xs transition border border-gray-700 flex items-center justify-center gap-2"
              >
                <Mail size={15} />
                <span>Sign In with Email</span>
              </button>

              <button
                onClick={handleGuestExplore}
                className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-black font-extrabold rounded-2xl text-xs transition shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
              >
                <span>Explore as Guest (No Account Required)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {loginMode === "email" && (
            <form onSubmit={handleEmailLoginSubmit} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] text-gray-400 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2.5 text-white outline-none text-xs focus:border-green-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-gray-400 font-semibold block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2.5 text-white outline-none text-xs focus:border-green-400"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setLoginMode("options")}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded-xl text-xs transition"
                >
                  Sign In & Launch Dashboard
                </button>
              </div>
            </form>
          )}

          {loginMode === "otp" && (
            <form onSubmit={otpSent ? handleOtpVerify : handleOtpSend} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] text-gray-400 font-semibold block mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  required
                  placeholder="7702256073"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpSent}
                  className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2.5 text-white outline-none text-xs font-mono"
                />
              </div>

              {otpSent && (
                <div>
                  <label className="text-[11px] text-gray-400 font-semibold block mb-1">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    placeholder="904128"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-[#1b2338] border border-gray-700 rounded-xl px-3 py-2.5 text-white outline-none text-xs font-mono tracking-widest text-center text-sm"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setLoginMode("options"); setOtpSent(false); }}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded-xl text-xs transition"
                >
                  {otpSent ? "Verify OTP & Sign In" : "Send 6-Digit OTP"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 🔴 INTERACTIVE GOOGLE ACCOUNT SELECTOR MODAL WITH BASIC DETAILS */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 max-w-lg w-full space-y-4 bg-[#12182b] text-white shadow-2xl text-xs relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <h3 className="font-bold text-sm">Choose a Google Account & Set Profile</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                <X size={16} />
              </button>
            </div>

            {/* Basic Details Entry Section Inside Google Modal */}
            <div className="p-3.5 bg-[#1b2338] border border-blue-500/30 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px]">
                <Sparkles size={14} className="text-blue-400" />
                <span>Basic Eligibility Profile (Required for AI Scheme Matching)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-1">Primary Role / Occupation</label>
                  <div className="glass p-1.5 rounded-xl flex items-center gap-1.5 border border-gray-700">
                    <Briefcase size={13} className="text-green-400 shrink-0" />
                    <select
                      value={googleOccupation}
                      onChange={(e) => setGoogleOccupation(e.target.value)}
                      className="w-full bg-transparent text-white text-[11px] outline-none cursor-pointer"
                    >
                      <option value="Student" className="bg-[#12182b]">Student 🎓</option>
                      <option value="Farmer" className="bg-[#12182b]">Farmer 🌾</option>
                      <option value="Senior Citizen" className="bg-[#12182b]">Senior Citizen (60+) 👴</option>
                      <option value="Women Entrepreneur" className="bg-[#12182b]">Women Entrepreneur / Homemaker 👩</option>
                      <option value="MSME" className="bg-[#12182b]">MSME / Business Owner 🏬</option>
                      <option value="Self-Employed" className="bg-[#12182b]">Self-Employed 💻</option>
                      <option value="Unemployed" className="bg-[#12182b]">Unemployed Youth 👤</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-1">Annual Family Income (₹)</label>
                  <div className="glass p-1.5 rounded-xl flex items-center gap-1.5 border border-gray-700">
                    <IndianRupee size={13} className="text-amber-400 shrink-0" />
                    <input
                      type="number"
                      required
                      placeholder="e.g. 180000"
                      value={googleIncome}
                      onChange={(e) => setGoogleIncome(e.target.value)}
                      className="w-full bg-transparent text-white text-[11px] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-1">State</label>
                  <select
                    value={googleState}
                    onChange={(e) => setGoogleState(e.target.value)}
                    className="w-full p-2 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none text-[11px]"
                  >
                    {STATES_LIST.filter(s => s !== "All India").map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-1">District</label>
                  <div className="glass p-1.5 rounded-xl flex items-center gap-1 border border-gray-700">
                    <MapPin size={12} className="text-blue-400 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="Visakhapatnam"
                      value={googleDistrict}
                      onChange={(e) => setGoogleDistrict(e.target.value)}
                      className="w-full bg-transparent text-white outline-none text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-1">Caste</label>
                  <select
                    value={googleCaste}
                    onChange={(e) => setGoogleCaste(e.target.value)}
                    className="w-full p-2 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none text-[11px]"
                  >
                    {CASTE_CATEGORIES.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-xs font-bold pt-1">
              Select Google Account to Sign In & Apply Basic Details:
            </p>

            <div className="space-y-2">
              {/* Account Option 1: Student Citizen */}
              <button
                onClick={() => handleSelectGoogleAccount("student.citizen@gmail.com", "Student Citizen")}
                className="w-full text-left p-3 rounded-2xl bg-[#1b2338] hover:bg-white/10 border border-gray-700 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs">
                    S
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs group-hover:text-green-400 transition">Student Citizen</p>
                    <p className="text-[10px] text-gray-400">student.citizen@gmail.com</p>
                  </div>
                </div>
                <UserCheck size={16} className="text-green-400 opacity-0 group-hover:opacity-100 transition" />
              </button>

              {/* Account Option 2: Citizen Demo */}
              <button
                onClick={() => handleSelectGoogleAccount("citizen.demo@gmail.com", "Demo Citizen")}
                className="w-full text-left p-3 rounded-2xl bg-[#1b2338] hover:bg-white/10 border border-gray-700 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-black font-bold flex items-center justify-center text-xs">
                    C
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs group-hover:text-green-400 transition">Demo Citizen</p>
                    <p className="text-[10px] text-gray-400">citizen.demo@gmail.com</p>
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
                  placeholder="Your Name (e.g. Desvanth)"
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { id: "student", label: "Student 🎓", desc: "Scholarships & Grants" },
            { id: "farmer", label: "Farmer 🌾", desc: "PM-Kisan & Subsidies" },
            { id: "senior", label: "Senior Citizen 👴", desc: "Pensions & Ayushman" },
            { id: "women", label: "Women 👩", desc: "Sukanya & SHG Loans" },
            { id: "msme", label: "MSME 🏬", desc: "Mudra & Capital Grants" }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-4 rounded-2xl border transition text-left space-y-1.5 ${
                selectedPersona === p.id
                  ? "bg-green-500/20 border-green-500 text-white shadow-lg shadow-green-500/10"
                  : "glass hover:bg-white/5 border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <p className="font-bold text-xs">{p.label}</p>
              <p className="text-[10px] text-gray-400 font-medium">{p.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-green-400 font-bold">
            <Sparkles size={16} />
            <span>{personaGreetings[selectedPersona]}</span>
          </div>
          <button
            onClick={() => navigate(`/finder?role=${selectedPersona}`)}
            className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-5 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 self-start md:self-auto"
          >
            <span>Explore {selectedPersona.toUpperCase()} Schemes</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 3. BEFORE-LOGIN AI DEMO SANDBOX */}
      <div className="glass p-6 md:p-8 rounded-[36px] border border-gray-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/30">
              Interactive AI Demo Sandbox
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2 flex items-center gap-2">
              <Bot size={24} className="text-blue-400" /> Ask JanAI Scheme Assistant
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Try a live query before signing in. Grounded in government gazette notifications.
            </p>
          </div>
        </div>

        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={demoQuery}
              onChange={(e) => setDemoQuery(e.target.value)}
              placeholder="e.g. I am a B.Tech student with family income 1.8 Lakhs in AP. What scholarships can I get?"
              className="flex-1 bg-[#1b2338] border border-gray-700 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-blue-400"
            />
            <button
              onClick={() => handleRunDemoQuery()}
              disabled={isSearchingDemo}
              className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3 rounded-2xl text-xs transition flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-600/20"
            >
              {isSearchingDemo ? (
                <>
                  <RotateCw size={15} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Check Eligibility</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
            <span className="font-semibold">Try sample questions:</span>
            <button
              onClick={() => {
                const q = "Am I eligible for PM-Kisan if I own 2.5 acres land?"
                setDemoQuery(q)
                handleRunDemoQuery(q)
              }}
              className="glass px-2.5 py-1 rounded-full hover:text-white border border-gray-700 transition"
            >
              "PM-Kisan 2.5 acres land eligibility?"
            </button>
            <button
              onClick={() => {
                const q = "What is the senior citizen age limit for Ayushman Bharat?"
                setDemoQuery(q)
                handleRunDemoQuery(q)
              }}
              className="glass px-2.5 py-1 rounded-full hover:text-white border border-gray-700 transition"
            >
              "Ayushman Bharat Senior Citizen 70+ age limit?"
            </button>
          </div>
        </div>

        {demoResult && (
          <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-3xl space-y-3 animate-fade-in">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
              <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2.5 py-0.5 rounded-full">
                ✓ {demoResult.matchedCount} Schemes Matched
              </span>
              <span className="text-[10px] text-blue-300 font-mono">Source: Gazette Notification 2026</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{demoResult.topScheme}</h4>
              <p className="text-green-400 font-extrabold text-xs mt-0.5">{demoResult.benefit}</p>
              <p className="text-gray-300 text-xs mt-1.5 leading-relaxed">{demoResult.reason}</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. EMERGENCY & 24/7 HELPLINE BANNER */}
      <div className="p-6 bg-gradient-to-r from-[#17112b] via-[#1f153a] to-[#141029] border border-purple-500/30 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PhoneCall size={18} className="text-purple-400" />
            <h3 className="font-bold text-white text-sm">24/7 Citizen Helpline & IVRS Support</h3>
          </div>
          <p className="text-gray-400 text-xs">
            Need help via phone call? Dial toll-free helpline for scheme assistance in 22 regional languages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-purple-500/20 border border-purple-500/40 px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] text-gray-400 block font-semibold">Toll Free Helpline</span>
            <span className="text-purple-300 font-mono font-black text-sm">1800-11-2026</span>
          </div>
          <button
            onClick={() => navigate("/offices")}
            className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-5 py-3 rounded-2xl text-xs transition shadow-lg shadow-purple-600/20"
          >
            Locate Govt Office
          </button>
        </div>
      </div>
    </div>
  )
}