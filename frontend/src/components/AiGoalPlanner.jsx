import { useState } from "react"
import { Target } from "lucide-react"

export default function AiGoalPlanner() {
  const [selectedGoal, setSelectedGoal] = useState("Engineering Degree")

  const roadmaps = {
    "Engineering Degree": [
      { year: "2026", step: "Tuition Fee Reimbursement & Post-Matric Scholarship", benefit: "₹50,000 / year", status: "Ready Now" },
      { year: "2027", step: "PM Vidya Lakshmi Education Loan (0% Interest Subsidy)", benefit: "₹7.5 Lakh Collateral-Free", status: "Upcoming" },
      { year: "2028", step: "AICTE Laptop & Digital Device Subsidy", benefit: "₹35,000 Voucher", status: "Scheduled" },
      { year: "2029", step: "Startup India Seed Fund & Student Incubation Grant", benefit: "₹10 Lakh Grant", status: "Future" }
    ],
    "Dairy Farm Business": [
      { year: "2026", step: "NABARD Dairy Entrepreneurship Development Scheme", benefit: "33% Capital Subsidy", status: "Ready Now" },
      { year: "2027", step: "PM Matsya Sampada & Animal Husbandry Infrastructure", benefit: "Low Interest Loan", status: "Upcoming" }
    ]
  }

  const activeRoadmap = roadmaps[selectedGoal] || roadmaps["Engineering Degree"]

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-3 py-1 rounded-full uppercase">
            AI Life Goal Planner
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Target className="text-pink-400" size={22} /> Goal-Based Multi-Year Roadmap Planner
          </h3>
          <p className="text-xs text-gray-400">Map your life goal to multi-year sequential government support</p>
        </div>

        <div className="flex bg-[#12182b] p-1 rounded-2xl border border-gray-800 text-xs font-bold">
          {["Engineering Degree", "Dairy Farm Business"].map(g => (
            <button
              key={g}
              onClick={() => setSelectedGoal(g)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedGoal === g ? "bg-pink-500 text-black shadow-md" : "text-gray-400 hover:text-white"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {activeRoadmap.map((item, idx) => (
          <div key={idx} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-sm text-pink-400 font-mono">{item.year}</span>
              <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded">
                {item.status}
              </span>
            </div>

            <h4 className="font-bold text-white text-xs leading-snug">{item.step}</h4>
            <p className="text-[11px] font-bold text-yellow-400">{item.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
