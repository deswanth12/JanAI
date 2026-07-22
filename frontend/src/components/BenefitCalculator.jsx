import { useAuth } from "../context/AuthContext"
import { DollarSign, ArrowUpRight, Award } from "lucide-react"

export default function BenefitCalculator() {
  const { user, familyMembers } = useAuth()

  // Calculate estimated annual monetary benefits for each household member
  const calculateMemberBenefit = (relation, occupation) => {
    if (occupation === "Farmer" || relation === "Father") return 6000 // PM-Kisan
    if (occupation === "Student" || relation === "Self" || relation === "Sister") return 20000 // Post-Matric Scholarship
    if (relation === "Mother") return 5000 // Women welfare
    return 3000
  }

  const userBenefit = calculateMemberBenefit("Self", user.occupation)
  const familyBenefits = familyMembers.map(m => ({
    ...m,
    estimatedAmount: calculateMemberBenefit(m.relation, m.occupation)
  }))

  const totalHouseholdAmount = userBenefit + familyBenefits.reduce((acc, curr) => acc + curr.estimatedAmount, 0)

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
            Financial Impact Engine
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <DollarSign className="text-green-400" size={22} /> Total Household Annual Benefit Estimator
          </h3>
          <p className="text-xs text-gray-400">Total estimated direct cash & grant benefits for Devanth's family</p>
        </div>

        <div className="bg-[#12182b] border border-green-500/30 px-6 py-3 rounded-2xl text-center">
          <p className="text-[10px] text-gray-400 font-semibold uppercase">Total Annual Benefit</p>
          <p className="text-3xl font-extrabold text-green-400">₹{totalHouseholdAmount.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-gray-500">Credited via DBT to Bank Account</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {/* User Card */}
        <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex justify-between items-center text-gray-400 font-medium">
            <span>{user.name} (Self)</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full">{user.occupation}</span>
          </div>
          <p className="text-lg font-bold text-white">₹{userBenefit.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
            Post-Matric Scholarship <ArrowUpRight size={12} />
          </p>
        </div>

        {/* Family Cards */}
        {familyBenefits.map((m) => (
          <div key={m.id} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-1">
            <div className="flex justify-between items-center text-gray-400 font-medium">
              <span>{m.name} ({m.relation})</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full">{m.occupation}</span>
            </div>
            <p className="text-lg font-bold text-white">₹{m.estimatedAmount.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
              {m.relation === "Father" ? "PM-Kisan Scheme" : m.relation === "Sister" ? "Post-Matric Scholarship" : "Ayushman Bharat + Cash"} <ArrowUpRight size={12} />
            </p>
          </div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-2xl flex items-center justify-between text-xs text-green-300">
        <span className="flex items-center gap-2 font-medium">
          <Award size={18} className="text-green-400" /> All eligible cash benefits are transferred directly to your Aadhaar-linked Bank NPCI account via DBT.
        </span>
      </div>
    </div>
  )
}
