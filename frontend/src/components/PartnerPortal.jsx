import { useState } from "react"
import { Building2, ArrowUpRight } from "lucide-react"

export default function PartnerPortal() {
  const [partnerType, setPartnerType] = useState("College")

  const partners = [
    { type: "College", name: "GITAM University, Visakhapatnam", studentsSupported: 1420, applicationsBulk: 380 },
    { type: "NGO", name: "Rural Empowerment Foundation", citizensSupported: 3200, applicationsBulk: 940 },
    { type: "CSC Operator", name: "Meeseva Center #441", citizensSupported: 5100, applicationsBulk: 1820 },
    { type: "Bank", name: "State Bank of India (DBT Nodal Branch)", accountsLinked: 8900, dbtCredited: "₹4.2 Cr" },
    { type: "Panchayat", name: "Gajuwaka Gram Panchayat", householdsScanned: 2400, schemesEnrolled: 1150 }
  ]

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full uppercase">
            B2B Partner & Enterprise Portal
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Building2 className="text-emerald-400" size={22} /> JanAI B2B Partner Ecosystem
          </h3>
          <p className="text-xs text-gray-400">Enabling Colleges, NGOs, CSC Operators, Banks, and Panchayats to process bulk applications</p>
        </div>

        <div className="flex bg-[#12182b] p-1 rounded-2xl border border-gray-800 text-xs font-bold">
          {["College", "NGO", "CSC Operator", "Bank", "Panchayat"].map(t => (
            <button
              key={t}
              onClick={() => setPartnerType(t)}
              className={`px-3 py-1.5 rounded-xl transition ${partnerType === t ? "bg-emerald-500 text-black shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {partners.filter(p => p.type === partnerType || partnerType === "College").map((p, idx) => (
          <div key={idx} className="bg-[#12182b] p-5 rounded-2xl border border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded uppercase">
                {p.type} Partner
              </span>
              <span className="text-[10px] text-green-400 font-bold">Active SLA</span>
            </div>

            <h4 className="text-sm font-bold text-white">{p.name}</h4>

            <div className="bg-[#1b2338] p-3 rounded-xl border border-gray-800 space-y-1 text-gray-300">
              <p>Citizens / Students Managed: <strong className="text-white">{p.studentsSupported || p.citizensSupported || p.householdsScanned}</strong></p>
              <p>Bulk Applications Processed: <strong className="text-emerald-400">{p.applicationsBulk || p.schemesEnrolled || p.dbtCredited}</strong></p>
            </div>

            <button className="w-full py-2 glass hover:bg-white/10 text-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1">
              Open Bulk Dashboard <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
