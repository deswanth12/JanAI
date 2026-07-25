import { useState } from "react"
import { Building2, UserPlus, FileCheck2, BarChart3, CheckCircle2, Search, Send } from "lucide-react"

export default function PartnerPortalLayout() {
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
    { id: "CASE-901", studentName: "Devanth Baskar", scheme: "CM Overseas Scholarship", benefit: "₹10,000 / year", status: "Submitted to Nodal Officer", date: "24 Jul 2026" },
    { id: "CASE-902", studentName: "Pavani Baskar", scheme: "Post-Matric Scholarship", benefit: "₹15,000 / year", status: "Approved & Sanctioned ✓", date: "22 Jul 2026" },
    { id: "CASE-903", studentName: "Ramesh Kumar", scheme: "PM Mudra Loan (Tarun Plus)", benefit: "₹20,000 / year", status: "Under Scrutiny", date: "18 Jul 2026" }
  ])

  const [newApplication, setNewApplication] = useState({
    citizenName: "",
    mobile: "",
    scheme: "Post-Matric Scholarship Scheme",
    district: "Visakhapatnam",
    income: "180000"
  })

  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmitAssisted = (e) => {
    e.preventDefault()
    const createdCase = {
      id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newApplication.citizenName,
      scheme: newApplication.scheme,
      benefit: "₹15,000 / year",
      status: "Submitted via CSC VLE Partner",
      date: "25 Jul 2026"
    }
    setAssistedCases([createdCase, ...assistedCases])
    setSubmitMessage(`Assisted Application for ${newApplication.citizenName} submitted successfully! Reference: ${createdCase.id}`)
    setNewApplication({ citizenName: "", mobile: "", scheme: "Post-Matric Scholarship Scheme", district: "Visakhapatnam", income: "180000" })
    setTimeout(() => setSubmitMessage(""), 4000)
  }

  return (
    <div className="space-y-6 pb-12 text-xs">
      {/* Header Banner */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase border border-blue-500/30 flex items-center gap-1">
              <Building2 size={12} /> External Partner Portal (/partner)
            </span>
            <span className="text-[10px] bg-green-500/20 text-green-400 font-mono px-2 py-0.5 rounded-full font-bold">
              {partnerOrg.cscVleId}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">{partnerOrg.name}</h1>
          <p className="text-xs text-gray-400 mt-1">
            Colleges • NGOs • CSC Operators • District Facilitation Partners
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-green-500/20 text-green-400 border border-green-500/40 px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> {partnerOrg.status}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-gray-400 font-semibold text-[11px]">Assisted Citizens Supported</span>
          <p className="text-3xl font-extrabold text-white">{partnerOrg.assistedApplicationsCount}</p>
          <p className="text-[10px] text-green-400 font-bold">Visakhapatnam District Cohort</p>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-gray-400 font-semibold text-[11px]">Welfare Grants Facilitated</span>
          <p className="text-3xl font-extrabold text-blue-400">{partnerOrg.approvedGrantsAmount}</p>
          <p className="text-[10px] text-blue-400 font-bold">Scholarship & Farmer DBT Value</p>
        </div>

        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-2">
          <span className="text-gray-400 font-semibold text-[11px]">Partner Accreditation</span>
          <p className="text-3xl font-extrabold text-green-400">Class A VLE</p>
          <p className="text-[10px] text-gray-400">Direct Nodal Officer Queue</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#12182b] p-1.5 rounded-2xl border border-gray-800 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "overview" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-gray-400 hover:text-white"
          }`}
        >
          <FileCheck2 size={16} /> Assisted Cases & Tracking
        </button>

        <button
          onClick={() => setActiveTab("new")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "new" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-gray-400 hover:text-white"
          }`}
        >
          <UserPlus size={16} /> Submit Assisted Application
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "analytics" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-gray-400 hover:text-white"
          }`}
        >
          <BarChart3 size={16} /> Organization Telemetry
        </button>
      </div>

      {submitMessage && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-300 font-bold text-center">
          {submitMessage}
        </div>
      )}

      {/* Tab 1: Assisted Cases Table */}
      {activeTab === "overview" && (
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 size={18} className="text-blue-400" /> Assisted Beneficiary Cases Matrix
            </h3>

            <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-2 border border-gray-700 bg-[#12182b]/80 w-full md:w-64">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search Beneficiary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-white text-xs flex-1"
              />
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Case ID</th>
                <th className="pb-3">Beneficiary Student/Citizen</th>
                <th className="pb-3">Welfare Scheme</th>
                <th className="pb-3">Benefit</th>
                <th className="pb-3">Submission Date</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {assistedCases.filter(c => c.studentName.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 font-mono text-blue-400 font-bold">{c.id}</td>
                  <td className="py-3.5 font-bold text-white">{c.studentName}</td>
                  <td className="py-3.5 text-gray-300">{c.scheme}</td>
                  <td className="py-3.5 text-green-400 font-bold">{c.benefit}</td>
                  <td className="py-3.5 font-mono text-gray-400">{c.date}</td>
                  <td className="py-3.5 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${c.status.includes("Approved") ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-300"}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Submit Assisted Application Form */}
      {activeTab === "new" && (
        <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 max-w-2xl mx-auto space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus size={20} className="text-blue-400" /> Submit Assisted Citizen Application
            </h3>
            <p className="text-gray-400 text-xs">Facilitate 1-click application submission for students or villagers without internet access</p>
          </div>

          <form onSubmit={handleSubmitAssisted} className="space-y-4 text-xs">
            <div>
              <label className="text-gray-300 font-semibold block mb-1">Citizen / Student Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Devanth Baskar"
                value={newApplication.citizenName}
                onChange={(e) => setNewApplication({ ...newApplication, citizenName: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Mobile Number (+91)</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9876543210"
                  value={newApplication.mobile}
                  onChange={(e) => setNewApplication({ ...newApplication, mobile: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Annual Household Income (₹)</label>
                <input
                  type="text"
                  required
                  placeholder="180000"
                  value={newApplication.income}
                  onChange={(e) => setNewApplication({ ...newApplication, income: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 font-semibold block mb-1">Select Target Scheme</label>
              <select
                value={newApplication.scheme}
                onChange={(e) => setNewApplication({ ...newApplication, scheme: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#12182b] text-white border border-gray-700 outline-none font-bold cursor-pointer"
              >
                <option value="Post-Matric Scholarship Scheme">Post-Matric Scholarship Scheme (₹15,000/yr)</option>
                <option value="PM-Kisan Samman Nidhi">PM-Kisan Samman Nidhi (₹6,000/yr)</option>
                <option value="PM Mudra Loan (Tarun Plus)">PM Mudra Loan (Tarun Plus) (₹20L max)</option>
                <option value="CM Overseas Scholarship">CM Overseas Scholarship (₹20 Lakhs)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Send size={16} /> Submit Assisted Application Package
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Organization Telemetry */}
      {activeTab === "analytics" && (
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-400" /> Organization Facilitation Performance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#12182b] rounded-2xl border border-gray-800 space-y-2">
              <span className="text-gray-400 font-semibold">Scholarship Disbursal Approval Rate</span>
              <strong className="text-green-400 font-mono text-xl block">96.4% Approval Rate</strong>
              <p className="text-[11px] text-gray-400">Zero rejections due to documentation errors via JanAI pre-flight validation.</p>
            </div>

            <div className="p-4 bg-[#12182b] rounded-2xl border border-gray-800 space-y-2">
              <span className="text-gray-400 font-semibold">CSC VLE Accreditation Rank</span>
              <strong className="text-purple-400 font-mono text-xl block">Top 1% in Visakhapatnam</strong>
              <p className="text-[11px] text-gray-400">Recognized by State Department of Social Welfare.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
