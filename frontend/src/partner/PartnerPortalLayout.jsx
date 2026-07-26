import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Building2, UserPlus, FileCheck2, BarChart3, CheckCircle2, Search, Send } from "lucide-react"

export default function PartnerPortalLayout() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const isAuthorizedPartner = user?.role === "Partner" || user?.role === "Nodal Officer" || user?.role === "System Admin" || user?.role === "CEO" || user?.role === "Admin"

  const [partnerOrg] = useState({
    name: "Andhra University CSC Assistance Center",
    type: "College & CSC Partner",
    cscVleId: "VLE-AP-89410",
    district: "Visakhapatnam",
    assistedApplicationsCount: 142,
    approvedGrantsAmount: "₹28.4 Lakhs",
    status: "Verified Accredited Partner"
  })

  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const [assistedCases, setAssistedCases] = useState([
    { id: "CASE-901", studentName: "Desvanth", scheme: "CM Overseas Scholarship", benefit: "₹10,000 / year", status: "Submitted to Nodal Officer", date: "24 Jul 2026" },
    { id: "CASE-902", studentName: "Pavani", scheme: "Post-Matric Scholarship", benefit: "₹15,000 / year", status: "Approved & Sanctioned ✓", date: "22 Jul 2026" },
    { id: "CASE-903", studentName: "Ramesh Kumar", scheme: "PM Mudra Loan (Tarun Plus)", benefit: "₹20,000 / year", status: "Under Scrutiny", date: "18 Jul 2026" }
  ])

  const [newApplication, setNewApplication] = useState({
    citizenName: "",
    mobile: "",
    scheme: "Post-Matric Scholarship Scheme",
    district: "Visakhapatnam",
    income: "180000"
  })

  if (!isAuthorizedPartner) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-3xl font-bold shadow-2xl">
          🏛️
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-black text-white">Partner Portal Access Restricted</h2>
          <p className="text-xs text-gray-400">
            This portal is reserved for accredited Village Secretariat VLEs, College Assistance Centers, and Government Nodal Officers.
          </p>
        </div>

        <div className="glass p-6 rounded-3xl border border-gray-800 max-w-md w-full space-y-4 text-left bg-[#12182b]">
          <p className="text-xs text-gray-300 font-bold uppercase tracking-wider">Demo Partner Credentials:</p>
          <div className="bg-[#1b2338] p-3.5 rounded-2xl border border-gray-700 text-xs space-y-1 font-mono text-gray-300">
            <p>📧 Email: <strong className="text-green-400">partner@janai.in</strong></p>
            <p>🔑 Password: <strong className="text-amber-300">PartnerPass@2026</strong></p>
            <p>🏢 Organization: <strong className="text-blue-300">Andhra University CSC Center</strong></p>
          </div>

          <button
            onClick={() => login({ email: "partner@janai.in", name: "Andhra University Nodal Partner", role: "Partner" })}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3 rounded-2xl text-xs transition shadow-xl shadow-green-500/20"
          >
            Authenticate as Accredited Partner
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-center text-gray-400 hover:text-white text-xs pt-1 block"
          >
            ← Return to Citizen Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleRegisterCitizenCase = (e) => {
    e.preventDefault()
    if (!newApplication.citizenName || !newApplication.mobile) return
    const created = {
      id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newApplication.citizenName,
      scheme: newApplication.scheme,
      benefit: "₹15,000 / year",
      status: "Submitted to Nodal Officer",
      date: new Date().toISOString().split("T")[0]
    }
    setAssistedCases([created, ...assistedCases])
    setNewApplication({ citizenName: "", mobile: "", scheme: "Post-Matric Scholarship Scheme", district: "Visakhapatnam", income: "180000" })
    setActiveTab("assisted-cases")
  }

  return (
    <div className="space-y-8 pb-12 text-xs">
      {/* Header Banner */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-amber-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full uppercase border border-amber-500/30">
            {partnerOrg.status}
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">{partnerOrg.name}</h1>
          <p className="text-gray-400 text-xs mt-1">
            VLE ID: <strong className="text-white font-mono">{partnerOrg.cscVleId}</strong> • District: <strong className="text-white">{partnerOrg.district}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block uppercase">Assisted Applications</span>
            <strong className="text-lg font-bold text-green-400">{partnerOrg.assistedApplicationsCount} Citizens</strong>
          </div>
          <div className="text-right border-l border-gray-800 pl-4">
            <span className="text-[10px] text-gray-400 block uppercase">Grants Disbursed</span>
            <strong className="text-lg font-bold text-amber-300">{partnerOrg.approvedGrantsAmount}</strong>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-gray-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 shrink-0 ${
            activeTab === "overview" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-gray-400 hover:text-white"
          }`}
        >
          <BarChart3 size={15} /> Partner Dashboard Overview
        </button>
        <button
          onClick={() => setActiveTab("register-citizen")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 shrink-0 ${
            activeTab === "register-citizen" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-gray-400 hover:text-white"
          }`}
        >
          <UserPlus size={15} /> Assist & Apply for Citizen
        </button>
        <button
          onClick={() => setActiveTab("assisted-cases")}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 shrink-0 ${
            activeTab === "assisted-cases" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-gray-400 hover:text-white"
          }`}
        >
          <FileCheck2 size={15} /> Assisted Case Directory ({assistedCases.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs">Accredited Role</span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 size={18} className="text-amber-400" /> College & CSC Partner
              </h3>
              <p className="text-[11px] text-gray-500">Authorized to verify physical documents and pre-fill welfare packages.</p>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs">Verification Speed</span>
              <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                <CheckCircle2 size={18} /> Avg 2.4 Hours
              </h3>
              <p className="text-[11px] text-gray-500">Fast-track direct submission to District Nodal Officers.</p>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2">
              <span className="text-gray-400 text-xs">Sanction Success Rate</span>
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                <BarChart3 size={18} /> 96.8% Approval
              </h3>
              <p className="text-[11px] text-gray-500">Zero rejections due to JanAI Grounded Rules Engine.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTER CITIZEN */}
      {activeTab === "register-citizen" && (
        <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 space-y-6 max-w-2xl bg-[#12182b]">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus size={20} className="text-amber-400" /> Assist Citizen Scheme Application
            </h3>
            <p className="text-gray-400 text-xs mt-1">Pre-fill application package for citizens visiting your CSC / College Center.</p>
          </div>

          <form onSubmit={handleRegisterCitizenCase} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1 font-bold uppercase">Citizen Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Desvanth"
                value={newApplication.citizenName}
                onChange={(e) => setNewApplication({ ...newApplication, citizenName: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-1 font-bold uppercase">Mobile (+91)</label>
              <input
                type="tel"
                required
                placeholder="7702256073"
                value={newApplication.mobile}
                onChange={(e) => setNewApplication({ ...newApplication, mobile: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs block mb-1 font-bold uppercase">Target Welfare Scheme</label>
              <select
                value={newApplication.scheme}
                onChange={(e) => setNewApplication({ ...newApplication, scheme: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
              >
                <option>Post-Matric Scholarship Scheme (SC/ST/OBC)</option>
                <option>CM Overseas Education Vidya Deevena</option>
                <option>PM Mudra Micro-Loan (Self-Employed)</option>
                <option>Jagananna Vasathi Deevena Hostel Allowance</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Send size={16} /> Submit Case Package to Nodal Officer
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: ASSISTED CASE DIRECTORY */}
      {activeTab === "assisted-cases" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Assisted Applications Directory</h3>
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search citizen or scheme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12182b] border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-white text-xs outline-none"
              />
            </div>
          </div>

          <div className="glass rounded-3xl border border-gray-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#12182b] text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="p-4 font-bold">Case ID</th>
                  <th className="p-4 font-bold">Citizen Name</th>
                  <th className="p-4 font-bold">Target Scheme</th>
                  <th className="p-4 font-bold">Benefit</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {assistedCases
                  .filter((c) => c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || c.scheme.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition">
                      <td className="p-4 font-mono font-bold text-amber-400">{c.id}</td>
                      <td className="p-4 font-bold text-white">{c.studentName}</td>
                      <td className="p-4 text-gray-300">{c.scheme}</td>
                      <td className="p-4 font-bold text-green-400">{c.benefit}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.status.includes("Approved") ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 font-mono text-[11px]">{c.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
