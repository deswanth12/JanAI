import { useState } from "react"
import { History } from "lucide-react"

export default function PolicyChangeTimeline({ schemeTitle = "PM Mudra Yojana" }) {
  const [timeline] = useState([
    {
      date: "24 Jul 2026",
      title: "Tarun Plus Loan Cap Expanded",
      change: "Maximum loan limit under Tarun Plus category increased up to ₹20 Lakhs for entrepreneurs with previous repayment track record.",
      authority: "Ministry of Finance Gazette Circular No. 10/2026"
    },
    {
      date: "12 Jun 2026",
      title: "Allied Agriculture Eligibility Expansion",
      change: "Dairy farming, poultry, and fish processing units brought under 0% processing fee guidelines.",
      authority: "DFS MSME Guidelines 2026"
    },
    {
      date: "15 Mar 2026",
      title: "Udyam Registration Mandate",
      change: "Udyam Registration made mandatory for all online Mudra loan applications above ₹5 Lakhs.",
      authority: "MSME Notification 2026"
    }
  ])

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-3 py-1 rounded-full uppercase">
            Historical Policy Tracker
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <History size={16} className="text-yellow-400" /> Policy Change Timeline — {schemeTitle}
          </h4>
        </div>

        <span className="text-[10px] text-gray-400 font-mono">
          3 Historical Audits
        </span>
      </div>

      <div className="relative border-l-2 border-yellow-500/40 ml-3 space-y-4 pl-4 text-xs">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative space-y-1">
            <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-yellow-500/20" />

            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-yellow-400 text-[11px]">{item.date}</span>
              <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                {item.authority}
              </span>
            </div>

            <h5 className="font-bold text-white text-xs">{item.title}</h5>
            <p className="text-gray-300 text-[11px] leading-relaxed">{item.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
