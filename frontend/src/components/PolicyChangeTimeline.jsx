import { useState } from "react"
import { History, ExternalLink } from "lucide-react"

export default function PolicyChangeTimeline({ schemeTitle = "PM Mudra Yojana" }) {
  const [timeline] = useState([
    {
      date: "24 Jul 2026",
      effectiveDate: "2026-07-24",
      supersededDate: "Active / Current",
      title: "Tarun Plus Loan Cap Expanded",
      change: "Maximum loan limit under Tarun Plus category increased up to ₹20 Lakhs for entrepreneurs with previous repayment track record.",
      authority: "Ministry of Finance Gazette Circular No. 10/2026",
      link: "https://www.mudra.org.in"
    },
    {
      date: "12 Jun 2026",
      effectiveDate: "2026-06-12",
      supersededDate: "2026-07-23",
      title: "Allied Agriculture Eligibility Expansion",
      change: "Dairy farming, poultry, and fish processing units brought under 0% processing fee guidelines.",
      authority: "DFS MSME Guidelines 2026",
      link: "https://udyamimitra.in"
    },
    {
      date: "15 Mar 2026",
      effectiveDate: "2026-03-15",
      supersededDate: "2026-06-11",
      title: "Udyam Registration Mandate",
      change: "Udyam Registration made mandatory for all online Mudra loan applications above ₹5 Lakhs.",
      authority: "MSME Notification 2026",
      link: "https://udyamregistration.gov.in"
    }
  ])

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-3 py-1 rounded-full uppercase">
            Audit Trail & Policy History
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <History size={16} className="text-yellow-400" /> Policy Change Audit Trail — {schemeTitle}
          </h4>
        </div>

        <span className="text-[10px] text-gray-400 font-mono">
          3 Historical Audits
        </span>
      </div>

      <div className="relative border-l-2 border-yellow-500/40 ml-3 space-y-5 pl-4 text-xs">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative space-y-1.5 bg-[#1b2338]/60 p-3 rounded-2xl border border-gray-800">
            <div className="absolute -left-[23px] top-4 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-yellow-500/20" />

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-1.5">
              <span className="font-mono font-bold text-yellow-400 text-[11px]">{item.title}</span>
              <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                {item.authority}
              </span>
            </div>

            <p className="text-gray-300 text-[11px] leading-relaxed">{item.change}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-gray-400 pt-1">
              <div>
                <span>Effective Date:</span>
                <strong className="text-white block font-mono">{item.effectiveDate}</strong>
              </div>

              <div>
                <span>Status / Superseded:</span>
                <strong className={item.supersededDate === "Active / Current" ? "text-green-400 block font-mono font-bold" : "text-gray-400 block font-mono"}>
                  {item.supersededDate}
                </strong>
              </div>

              <div className="flex items-end justify-end">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline font-bold flex items-center gap-0.5"
                >
                  Official Notification <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
