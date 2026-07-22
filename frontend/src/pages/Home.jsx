import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { SCHEMES_DATABASE } from "../api/schemesData"
import {
  Search,
  Sparkles,
  ArrowRight,
  Users
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    navigate(`/finder?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="space-y-12 pb-12">
      <section className="relative glass p-8 md:p-14 rounded-[40px] text-center border border-gray-800 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-green-400 text-xs font-bold mb-6 border border-green-500/20">
          <Sparkles size={16} /> 🇮🇳 India's #1 AI Government & Student Assistance Platform
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
          Discover Every Government Scheme You & Your Family Deserve
        </h1>

        <p className="mt-6 text-gray-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
          AI-powered natural language scheme finder, step-by-step eligibility checker, regional voice assistant, and 1-click application submission across 10 Indian languages.
        </p>

        <form onSubmit={handleSearchSubmit} className="mt-10 max-w-2xl mx-auto">
          <div className="glass p-2 rounded-2xl flex items-center gap-3 border border-gray-700 shadow-2xl bg-[#12182b]/80">
            <Search size={22} className="text-green-400 ml-2" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-sm px-2 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold px-6 py-3.5 rounded-xl text-xs md:text-sm hover:opacity-90 transition flex items-center gap-2 shadow-lg"
            >
              <Sparkles size={16} /> {t("searchButton")}
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs text-gray-400">
          <span className="font-semibold text-gray-500">Popular Queries:</span>
          {[
            "Farmer in AP with 2 acres",
            "Post-Matric scholarship for SC student",
            "Health insurance for senior citizens",
            "Collateral-free MSME loan"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/finder?q=${encodeURIComponent(prompt)}`)}
              className="glass px-3 py-1 rounded-full hover:bg-white/10 hover:text-green-400 transition"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-gray-800">
          <div className="glass p-4 rounded-2xl">
            <h4 className="text-3xl font-extrabold text-green-400">25+</h4>
            <p className="text-xs text-gray-400 mt-1">Verified Govt Schemes</p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h4 className="text-3xl font-extrabold text-blue-400">10</h4>
            <p className="text-xs text-gray-400 mt-1">Regional Indian Languages</p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h4 className="text-3xl font-extrabold text-pink-400">98%</h4>
            <p className="text-xs text-gray-400 mt-1">AI Eligibility Precision</p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h4 className="text-3xl font-extrabold text-yellow-400">1-Click</h4>
            <p className="text-xs text-gray-400 mt-1">Auto Form Filling</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Built for Every Citizen Household</h2>
          <p className="text-xs text-gray-400 mt-2">End-to-end guidance from scheme discovery to bank transfer tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/finder")}
            className="glass p-6 rounded-3xl border border-gray-800 hover:border-green-500/50 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">AI Scheme Finder</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Describe your situation in simple words or speak in your regional language. AI matches scheme rules instantly.
            </p>
            <span className="text-xs text-green-400 font-bold flex items-center gap-1">Explore Finder <ArrowRight size={14} /></span>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="glass p-6 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Household Family Profiles</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Add parents, spouse, or children. AI checks eligibility for every member of your family simultaneously.
            </p>
            <span className="text-xs text-blue-400 font-bold flex items-center gap-1">Manage Family <ArrowRight size={14} /></span>
          </div>

          <div
            onClick={() => navigate("/chat")}
            className="glass p-6 rounded-3xl border border-gray-800 hover:border-pink-500/50 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">JanAI Copilot</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stateful AI assistant that answers questions, generates document checklists, and explains complex government terms.
            </p>
            <span className="text-xs text-pink-400 font-bold flex items-center gap-1">Chat with Copilot <ArrowRight size={14} /></span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Popular Schemes & Grants</h2>
            <p className="text-xs text-gray-400">Handpicked top Central & State welfare programs.</p>
          </div>
          <button
            onClick={() => navigate("/finder")}
            className="text-xs text-green-400 font-bold hover:underline flex items-center gap-1"
          >
            View All 25+ Schemes <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHEMES_DATABASE.slice(0, 4).map((scheme) => (
            <div key={scheme.id} className="glass p-6 rounded-3xl border border-gray-800 space-y-4 hover:border-gray-700 transition">
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-green-500/20 text-green-300 px-3 py-1 rounded-full uppercase">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-xl">
                  {scheme.benefitAmount}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{scheme.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{scheme.shortDescription}</p>
              </div>

              <div className="text-[11px] text-gray-400 border-t border-gray-800/80 pt-3 flex justify-between">
                <span>Ministry: <strong className="text-gray-200">{scheme.ministry}</strong></span>
                <span>Deadline: <strong className="text-green-400">{scheme.deadline}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}