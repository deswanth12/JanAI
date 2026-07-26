import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Users, Plus, Trash2, Edit3, Check, X, ShieldCheck } from "lucide-react"

export default function FamilyModal({ isOpen, onClose }) {
  const { familyMembers, addFamilyMember, updateFamilyMember, removeFamilyMember } = useAuth()

  const [editingMemberId, setEditingMemberId] = useState(null) // null = adding new, string = editing existing
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    relation: "Father",
    name: "",
    age: "",
    gender: "Male",
    occupation: "Farmer",
    annualIncome: "100000",
    education: "Secondary (10th)",
    caste: "OBC",
    disability: "No",
    landOwnershipAcres: "0"
  })

  if (!isOpen) return null

  const handleStartAdd = () => {
    setEditingMemberId(null)
    setFormData({
      relation: "Father",
      name: "",
      age: "",
      gender: "Male",
      occupation: "Farmer",
      annualIncome: "100000",
      education: "Secondary (10th)",
      caste: "OBC",
      disability: "No",
      landOwnershipAcres: "0"
    })
    setShowForm(true)
  }

  const handleStartEdit = (member) => {
    setEditingMemberId(member.id)
    setFormData({
      relation: member.relation || "Father",
      name: member.name || "",
      age: member.age || "",
      gender: member.gender || "Male",
      occupation: member.occupation || "Farmer",
      annualIncome: member.annualIncome || "0",
      education: member.education || "Secondary (10th)",
      caste: member.caste || "OBC",
      disability: member.disability || "No",
      landOwnershipAcres: member.landOwnershipAcres || "0"
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.age) return

    if (editingMemberId) {
      updateFamilyMember(editingMemberId, {
        ...formData,
        age: parseInt(formData.age, 10)
      })
    } else {
      addFamilyMember({
        ...formData,
        age: parseInt(formData.age, 10)
      })
    }

    setShowForm(false)
    setEditingMemberId(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Household Family Manager</h3>
            <p className="text-xs text-gray-400 mt-0.5">Manage family profiles to auto-scan household scheme eligibility</p>
          </div>
        </div>

        {/* List of current family members */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Current Household Members ({familyMembers.length})
            </h4>

            {!showForm && (
              <button
                onClick={handleStartAdd}
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus size={16} /> Add Family Member
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 flex items-center justify-between gap-4 text-xs hover:border-gray-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{member.name}</span>
                    <span className="bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {member.relation}
                    </span>
                  </div>

                  <p className="text-gray-400">
                    {member.age} yrs • {member.gender} • {member.occupation} • Income: <strong className="text-pink-400">₹{parseInt(member.annualIncome || 0).toLocaleString('en-IN')}</strong>
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    Edu: {member.education} • Caste: {member.caste} • Land: {member.landOwnershipAcres} Acres
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(member)}
                    className="p-2 glass text-blue-400 hover:bg-blue-500/20 rounded-xl transition flex items-center gap-1 text-xs font-semibold"
                    title="Edit Member Details"
                  >
                    <Edit3 size={15} /> Edit
                  </button>
                  <button
                    onClick={() => removeFamilyMember(member.id)}
                    className="p-2 glass text-red-400 hover:bg-red-500/20 rounded-xl transition"
                    title="Remove Member"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#1b2338] p-5 rounded-2xl border border-blue-500/40 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <Edit3 size={16} /> {editingMemberId ? `Edit Details for ${formData.name}` : "Add New Family Member"}
              </h4>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1 font-medium">Relationship to You</label>
                <select
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                >
                  {["Father", "Mother", "Spouse", "Son", "Daughter", "Brother", "Sister", "Grandfather", "Grandmother"].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  required
                  placeholder="52"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Occupation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farmer, Homemaker, Student"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Annual Income (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="150000"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                >
                  {["Primary (5th)", "Secondary (10th)", "Class 12", "Undergraduate", "Postgraduate", "Illiterate"].map(ed => (
                    <option key={ed} value={ed}>{ed}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1 font-medium">Land Ownership (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="2.5"
                  value={formData.landOwnershipAcres}
                  onChange={(e) => setFormData({ ...formData, landOwnershipAcres: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 glass rounded-xl text-gray-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-xs transition flex items-center gap-1.5"
              >
                <Check size={16} /> {editingMemberId ? "Save Member Changes" : "Save New Member"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-300">
          <ShieldCheck size={20} className="text-blue-400 shrink-0" />
          <p>
            Updating family member details recalculates AI scheme eligibility across Central and State government schemes in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
