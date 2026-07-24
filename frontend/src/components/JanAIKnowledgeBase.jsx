import { useState } from "react"
import { HelpCircle, ChevronDown, ChevronUp, Search, BookOpen } from "lucide-react"

export default function JanAIKnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedIdx, setExpandedIdx] = useState(0)

  const faqs = [
    {
      q: "What is an Income Certificate and why is it needed?",
      a: "An Income Certificate is an official document issued by the State Revenue Department (MRO / Tahsildar) stating your total annual family income. It is mandatory to claim scholarships, fee reimbursements, and financial assistance."
    },
    {
      q: "What is an EWS (Economically Weaker Section) Certificate?",
      a: "EWS Certificate provides 10% reservation in Central & State Government jobs and education for General Category citizens whose family annual income is below ₹8 Lakh per year."
    },
    {
      q: "How do I get a Caste Certificate in Andhra Pradesh / Telangana / India?",
      a: "Apply online via MeeSeva or visit your local Gram Sachivalayam / Tahsildar office with your Aadhaar Card, Ration Card, and school Leaving Certificate. Process time is usually 7-15 days."
    },
    {
      q: "What is Direct Benefit Transfer (DBT)?",
      a: "DBT is a government system that sends financial grant money directly into your bank account linked to your Aadhaar card, eliminating middlemen, delays, and corruption."
    },
    {
      q: "What is e-KYC and why does JanAI use DigiLocker?",
      a: "e-KYC allows electronic verification of your identity using Aadhaar OTP. DigiLocker stores official digital copies of your certificates directly verified by MeitY."
    }
  ]

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
            Plain Language Vernacular Dictionary
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <BookOpen className="text-blue-400" size={22} /> JanAI Citizen Knowledge Base & Terms Explainer
          </h3>
          <p className="text-xs text-gray-400">Simple 5th-grade plain language answers to complex government certificates & bureaucracy jargon</p>
        </div>

        <div className="glass px-3 py-1.5 rounded-xl border border-gray-700 flex items-center gap-2 text-xs">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs e.g. 'DBT', 'Income'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white outline-none placeholder-gray-500"
          />
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {filteredFaqs.map((item, idx) => {
          const isExpanded = expandedIdx === idx

          return (
            <div
              key={idx}
              className="bg-[#12182b] rounded-2xl border border-gray-800 overflow-hidden transition"
            >
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className="w-full p-4 text-left font-bold text-white flex justify-between items-center hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle size={16} className="text-green-400 shrink-0" />
                  {item.q}
                </span>
                {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 text-gray-300 border-t border-gray-800/60 leading-relaxed bg-[#1b2338]/40">
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
