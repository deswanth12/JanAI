import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import DocumentScanner from "../components/DocumentScanner"
import FamilyModal from "../components/FamilyModal"
import { Users, ShieldCheck, FileText, CheckCircle2, Lock } from "lucide-react"

export default function Profile() {
  const { user, updateUserProfile, familyMembers } = useAuth()
  const { documentWallet } = useSchemes()
  const [showFamilyModal, setShowFamilyModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...user })

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateUserProfile(formData)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile & Family Manager</h1>
          <p className="text-xs text-gray-400 mt-1">Manage personal demographic profile, family members, and verified government documents.</p>
        </div>
        <button
          onClick={() => setShowFamilyModal(true)}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition"
        >
          <Users size={16} /> Manage Family Household
        </button>
      </div>

      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center font-bold text-black text-xl">
              {user.name ? user.name[0] : "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {user.name} {user.isVerified && <ShieldCheck className="text-green-400" size={18} />}
              </h2>
              <p className="text-xs text-gray-400">{user.role} • {user.state}, {user.district}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="glass px-4 py-2 rounded-xl text-xs font-semibold text-green-400 hover:bg-white/10 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-gray-400">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400">Annual Income (₹)</label>
              <input
                type="number"
                value={formData.annualIncome}
                onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 mt-1 outline-none"
              />
            </div>
            <div className="md:col-span-3 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-green-500 text-black font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-green-400 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Category / Caste</span>
              <span className="font-bold text-white text-sm">{user.caste}</span>
            </div>
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Annual Income</span>
              <span className="font-bold text-green-400 text-sm">₹{Number(user.annualIncome).toLocaleString()}</span>
            </div>
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Education</span>
              <span className="font-bold text-white text-sm">{user.education}</span>
            </div>
            <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800">
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Land Owned</span>
              <span className="font-bold text-pink-400 text-sm">{user.landOwnershipAcres} Acres</span>
            </div>
          </div>
        )}
      </div>

      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users size={20} className="text-blue-400" /> Family Household ({familyMembers.length} Members)
          </h3>
          <button
            onClick={() => setShowFamilyModal(true)}
            className="text-xs text-green-400 font-bold hover:underline"
          >
            + Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {familyMembers.map((fam) => (
            <div key={fam.id} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{fam.name}</span>
                <span className="bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {fam.relation}
                </span>
              </div>
              <p className="text-gray-400">Occupation: {fam.occupation} • Age: {fam.age}</p>
              <p className="text-gray-400">Income: ₹{Number(fam.annualIncome).toLocaleString()}/yr</p>
            </div>
          ))}
        </div>
      </div>

      <DocumentScanner />

      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock size={20} className="text-yellow-400" /> Verified Document Wallet ({documentWallet.length} Files)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentWallet.map((doc) => (
            <div key={doc.id} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-green-400" />
                <div>
                  <h4 className="font-bold text-white">{doc.name}</h4>
                  <p className="text-gray-400 font-mono text-[11px]">{doc.docNumber}</p>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified
              </span>
            </div>
          ))}
        </div>
      </div>

      <FamilyModal isOpen={showFamilyModal} onClose={() => setShowFamilyModal(false)} />
    </div>
  )
}
