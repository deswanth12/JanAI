import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import { Sparkles, CheckCircle2, ArrowRight, GraduationCap, Sprout, HeartHandshake, UserCheck, Store, Laptop, IndianRupee, MapPin } from "lucide-react"

const OCCUPATION_OPTIONS = [
  { id: "Student", label: "Student 🎓", icon: GraduationCap, desc: "Scholarships, Fee Reimbursements & Education Grants" },
  { id: "Farmer", label: "Farmer 🌾", icon: Sprout, desc: "PM-Kisan, Rythu Bandhu, Agri Subsidies & Loan Support" },
  { id: "Senior Citizen", label: "Senior Citizen (60+) 👴", icon: HeartHandshake, desc: "Pensions, Ayushman 70+ Cover & Senior Savings" },
  { id: "Women Entrepreneur", label: "Women / Homemaker 👩", icon: UserCheck, desc: "Sukanya Samriddhi, Women Grants & Self-Help Group Loans" },
  { id: "MSME", label: "MSME / Business 🏬", icon: Store, desc: "Mudra Loans, PMEGP Capital Subsidy & Business Grants" },
  { id: "Self-Employed", label: "Self-Employed / Freelancer 💻", icon: Laptop, desc: "Skill Development, Micro Credit & Welfare Cover" }
]

const QUICK_INCOMES = ["100000", "180000", "250000", "500000", "800000"]

export default function CompleteProfile() {
  const navigate = useNavigate()
  const { user, updateUserProfile } = useAuth()

  const [profileData, setProfileData] = useState({
    state: user?.state || "Andhra Pradesh",
    district: user?.district || "Visakhapatnam",
    age: user?.age || 21,
    occupation: user?.occupation || "Student",
    annualIncome: user?.annualIncome || "180000",
    caste: user?.caste || "OBC",
    education: user?.education || "Undergraduate"
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({
      ...profileData,
      role: profileData.occupation,
      isVerified: true
    })
    setSaved(true)
    setTimeout(() => {
      navigate("/dashboard")
    }, 1200)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-xs relative">
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
              Mandatory Citizen Profiling
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Enter Your Role & Family Income</h2>
          </div>

          <span className="text-xs text-gray-400 font-mono font-bold bg-gray-800 px-3 py-1 rounded-xl">
            Required for AI Matching
          </span>
        </div>

        {saved ? (
          <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-3 text-green-400 font-bold">
            <CheckCircle2 size={40} className="mx-auto" />
            <h3 className="text-xl">Profile Confirmed & Saved!</h3>
            <p className="text-gray-300 text-xs font-normal">Redirecting to your personalized AI Scheme Dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Primary Role / Profession Selector Cards */}
            <div className="space-y-2">
              <label className="text-gray-300 font-bold block text-sm">
                1. Select Primary Role / Profession <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {OCCUPATION_OPTIONS.map((opt) => {
                  const isSelected = profileData.occupation === opt.id
                  const Icon = opt.icon
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setProfileData({ ...profileData, occupation: opt.id })}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-1.5 ${
                        isSelected
                          ? "bg-green-500/20 border-green-500 text-white shadow-lg shadow-green-500/10"
                          : "bg-[#1b2338] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon size={18} className={isSelected ? "text-green-400" : "text-gray-400"} />
                        {isSelected && <CheckCircle2 size={14} className="text-green-400" />}
                      </div>
                      <div>
                        <p className="font-bold text-xs leading-tight">{opt.id}</p>
                        <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Annual Family Income Selection */}
            <div className="space-y-2 bg-[#1b2338] p-4 rounded-2xl border border-gray-800">
              <label className="text-gray-300 font-bold block text-xs">
                2. Annual Family Income (₹) <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2 bg-[#12182b] border border-gray-700 px-3 py-2.5 rounded-xl">
                <IndianRupee size={16} className="text-amber-400 shrink-0" />
                <input
                  type="number"
                  required
                  placeholder="e.g. 180000"
                  value={profileData.annualIncome}
                  onChange={(e) => setProfileData({ ...profileData, annualIncome: e.target.value })}
                  className="bg-transparent text-white text-sm font-mono font-bold outline-none w-full"
                />
              </div>

              {/* Quick Income Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] text-gray-400 font-semibold">Quick Select:</span>
                {QUICK_INCOMES.map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setProfileData({ ...profileData, annualIncome: inc })}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition ${
                      profileData.annualIncome === inc
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-[#12182b] text-gray-400 border-gray-700 hover:text-white"
                    }`}
                  >
                    ₹{parseInt(inc, 10).toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Location & Category Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 block mb-1 font-semibold">State of Residence</label>
                <select
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
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
                    value={profileData.district}
                    onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                    className="w-full bg-transparent text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Social Category (Caste)</label>
                <select
                  value={profileData.caste}
                  onChange={(e) => setProfileData({ ...profileData, caste: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                >
                  {CASTE_CATEGORIES.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-2xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-xl shadow-green-500/20"
            >
              <Sparkles size={16} /> Confirm Details & Launch Dashboard <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
