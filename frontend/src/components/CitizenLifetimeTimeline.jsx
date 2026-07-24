import { Calendar, CheckCircle2 } from "lucide-react"

export default function CitizenLifetimeTimeline() {
  const milestoneYears = [
    {
      year: "2026",
      title: "Immediate Welfare & Student Grants",
      schemes: ["PM-Kisan Samman Nidhi (Father Baskar)", "Post-Matric Scholarship Scheme (Devanth)"],
      status: "active",
      benefit: "₹51,000 / year"
    },
    {
      year: "2027",
      title: "Higher Education & Skill Development",
      schemes: ["PM Vidya Lakshmi Higher Edu Loan Subsidy", "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)"],
      status: "upcoming",
      benefit: "Up to ₹10 Lakh Collateral-Free"
    },
    {
      year: "2028",
      title: "Startup & Innovation Grants",
      schemes: ["Startup India Seed Fund Scheme", "MSME Credit Guarantee Scheme"],
      status: "future",
      benefit: "₹20 Lakh Seed Grant Potential"
    },
    {
      year: "2030",
      title: "Artisan & Self-Employment Scaling",
      schemes: ["PM Vishwakarma Artisan Scheme", "Pradhan Mantri Awas Yojana (PMAY Urban)"],
      status: "future",
      benefit: "Housing Subsidy + Artisan Loan"
    }
  ]

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
            Multi-Year Citizen Career Roadmap
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Calendar className="text-purple-400" size={22} /> Citizen Lifetime Welfare & Growth Timeline (2026–2030)
          </h3>
          <p className="text-xs text-gray-400">Long-term predictive welfare timeline keeping Devanth's family engaged across life stages</p>
        </div>

        <span className="text-xs text-purple-400 font-bold bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
          5-Year Predictive Engine
        </span>
      </div>

      <div className="relative border-l-2 border-purple-500/40 ml-4 space-y-8 pl-6 text-xs">
        {milestoneYears.map((item, idx) => {
          const isActive = item.status === "active"

          return (
            <div key={idx} className="relative group">
              <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#0b1020] flex items-center justify-center ${
                isActive ? "bg-purple-400 animate-pulse ring-4 ring-purple-500/20" : "bg-gray-700"
              }`} />

              <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2 hover:border-purple-500/40 transition">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-purple-400 font-mono">{item.year}</span>
                  <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                    {item.benefit}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{item.title}</h4>

                <div className="space-y-1 pt-1">
                  {item.schemes.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-gray-300 text-[11px]">
                      <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
