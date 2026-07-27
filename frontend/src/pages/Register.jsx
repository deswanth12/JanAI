import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import { Sparkles, Mail, Lock, User, Phone, Briefcase, IndianRupee, MapPin, ArrowRight } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const { updateUserProfile } = useAuth()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    occupation: "Student",
    annualIncome: "180000",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    caste: "OBC",
    age: "21"
  })

  const [error, setError] = useState("")

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!formData.full_name || !formData.email || !formData.password) {
      setError("Full Name, Email, and Password are required.")
      return
    }
    setError("")
    // Save basic profile details to user context
    updateUserProfile({
      name: formData.full_name,
      email: formData.email,
      phone: formData.phone ? `+91 ${formData.phone}` : "+91 7702256073",
      occupation: formData.occupation,
      role: formData.occupation,
      annualIncome: formData.annualIncome,
      state: formData.state,
      district: formData.district,
      caste: formData.caste,
      age: parseInt(formData.age, 10) || 21,
      isVerified: true
    })

    navigate("/verify-email", { state: { email: formData.email } })
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-xs relative overflow-hidden">
        <div className="text-center space-y-2">
          <img
            src="/janai-logo.jpg"
            alt="JanAI - AI Powered Citizen First Logo"
            className="h-16 w-auto rounded-xl object-contain mx-auto border border-gray-700 bg-white p-0.5"
          />
          <h2 className="text-2xl font-bold text-white mt-1">Create Your Citizen Account</h2>
          <p className="text-gray-400 text-xs">Enter your basic profile details for instant AI scheme eligibility matching</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Full Name</label>
              <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
                <User size={15} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Desvanth"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Email Address</label>
              <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
                <Mail size={15} className="text-gray-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="desvanth@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Mobile Number (+91)</label>
              <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <input
                  type="tel"
                  placeholder="7702256073"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Password</label>
              <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
                <Lock size={15} className="text-gray-400 shrink-0" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Key Eligibility Details Required for Scheme Matching */}
          <div className="p-4 bg-[#1b2338] border border-blue-500/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-xs">
              <Sparkles size={15} className="text-blue-400" />
              <span>Basic Eligibility Profile (Required for AI Matching)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Primary Role / Occupation</label>
                <div className="glass p-2 rounded-xl flex items-center gap-2 border border-gray-700">
                  <Briefcase size={15} className="text-green-400 shrink-0" />
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full bg-transparent text-white outline-none cursor-pointer"
                  >
                    <option value="Student" className="bg-[#12182b]">Student 🎓</option>
                    <option value="Farmer" className="bg-[#12182b]">Farmer 🌾</option>
                    <option value="Senior Citizen" className="bg-[#12182b]">Senior Citizen (60+) 👴</option>
                    <option value="Women Entrepreneur" className="bg-[#12182b]">Women Entrepreneur / Homemaker 👩</option>
                    <option value="MSME" className="bg-[#12182b]">MSME / Business Owner 🏬</option>
                    <option value="Self-Employed" className="bg-[#12182b]">Self-Employed / Freelancer 💻</option>
                    <option value="Unemployed" className="bg-[#12182b]">Unemployed Youth 👤</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Annual Family Income (₹)</label>
                <div className="glass p-2 rounded-xl flex items-center gap-2 border border-gray-700">
                  <IndianRupee size={15} className="text-amber-400 shrink-0" />
                  <input
                    type="number"
                    required
                    placeholder="e.g. 180000"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                    className="w-full bg-transparent text-white outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-semibold">State</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                >
                  {STATES_LIST.filter(s => s !== "All India").map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">District</label>
                <div className="glass p-2 rounded-xl flex items-center gap-2 border border-gray-700">
                  <MapPin size={15} className="text-blue-400 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="Visakhapatnam"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Category (Caste)</label>
                <select
                  value={formData.caste}
                  onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                >
                  {CASTE_CATEGORIES.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles size={16} /> Save Details & Create Account <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-gray-400 border-t border-gray-800 pt-4">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-green-400 font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
