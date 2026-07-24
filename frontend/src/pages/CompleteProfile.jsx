import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react"

export default function CompleteProfile() {
  const navigate = useNavigate()
  const { user, updateUserProfile } = useAuth()

  const [profileData, setProfileData] = useState({
    state: user.state || "Andhra Pradesh",
    district: user.district || "Visakhapatnam",
    age: user.age || 21,
    occupation: user.occupation || "Student",
    annualIncome: user.annualIncome || "180000",
    caste: user.caste || "OBC",
    education: user.education || "Undergraduate"
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile(profileData)
    setSaved(true)
    setTimeout(() => {
      navigate("/dashboard")
    }, 1200)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-xl rounded-3xl p-8 shadow-2xl space-y-6 text-xs relative">
        <div className="flex justify-between items-center border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
              Step 3 of 3: Progressive Profiling
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Complete Your Citizen Profile</h2>
          </div>

          <span className="text-xs text-gray-400 font-mono font-bold bg-gray-800 px-3 py-1 rounded-xl">
            Takes ~30 Seconds
          </span>
        </div>

        {saved ? (
          <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-2 text-green-400 font-bold">
            <CheckCircle2 size={32} className="mx-auto" />
            <h3 className="text-lg">Profile Completed & Saved!</h3>
            <p className="text-gray-300 text-xs font-normal">Redirecting to your personalized Household Dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <input
                  type="text"
                  required
                  value={profileData.district}
                  onChange={(e) => setProfileData({ ...profileData, district: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Age (Years)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: parseInt(e.target.value, 10) })}
                  className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Primary Occupation</label>
                <select
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                >
                  {["Student", "Farmer", "MSME / Entrepreneur", "Private Sector", "Government", "Homemaker", "Unemployed"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-semibold">Social Category</label>
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

            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Annual Family Income (₹)</label>
              <input
                type="text"
                required
                value={profileData.annualIncome}
                onChange={(e) => setProfileData({ ...profileData, annualIncome: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles size={16} /> Save Profile & Launch Dashboard <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
