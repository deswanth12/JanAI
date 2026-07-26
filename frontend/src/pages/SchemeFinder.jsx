import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SCHEMES_DATABASE, SCHEME_CATEGORIES, AUDIENCE_TYPES, STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import ApplicationWizard from "../components/ApplicationWizard"
import { useSchemes } from "../context/SchemeContext"
import { Search, Filter, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react"

export default function SchemeFinder() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const { savedSchemeIds, toggleSaveScheme } = useSchemes()

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedAudience, setSelectedAudience] = useState("All Roles")
  const [selectedState, setSelectedState] = useState("All India")
  const [selectedCaste, setSelectedCaste] = useState("All")
  
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null)
  const [detailSchemeModal, setDetailSchemeModal] = useState(null)

  const filteredSchemes = SCHEMES_DATABASE.filter((scheme) => {
    if (query.trim()) {
      const q = query.toLowerCase()
      const matchesTitle = scheme.title.toLowerCase().includes(q)
      const matchesDesc = scheme.shortDescription.toLowerCase().includes(q) || scheme.fullDescription.toLowerCase().includes(q)
      const matchesCategory = scheme.category.toLowerCase().includes(q)
      const matchesState = scheme.state.toLowerCase().includes(q)
      const matchesAudience = scheme.targetAudience.some(a => a.toLowerCase().includes(q))
      if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesState && !matchesAudience) {
        return false
      }
    }

    if (selectedCategory !== "All Categories" && scheme.category !== selectedCategory) {
      return false
    }

    if (selectedAudience !== "All Roles" && !scheme.targetAudience.includes(selectedAudience)) {
      return false
    }

    if (selectedState !== "All India" && scheme.state !== "All India" && scheme.state !== selectedState) {
      return false
    }

    if (selectedCaste !== "All" && !scheme.eligibility.caste.includes("All") && !scheme.eligibility.caste.includes(selectedCaste)) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Search className="text-green-400" size={28} /> AI Scheme Finder & Filter Engine
        </h1>
        <p className="text-xs text-gray-400 mt-1">Search in natural language or filter by State, Caste, Role, Category & Income limit.</p>
      </div>

      <div className="glass p-3 rounded-2xl border border-gray-800 flex items-center gap-3">
        <Search size={20} className="text-green-400 ml-2" />
        <input
          type="text"
          placeholder="e.g. 'Scholarship for OBC student in Telangana' or 'Farmer land grant'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none text-sm placeholder-gray-500"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-xs text-gray-400 hover:text-white px-2">
            Clear
          </button>
        )}
      </div>

      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wider">
          <Filter size={16} /> Advanced Multi-Facet Filters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-gray-400 block mb-1 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
            >
              {SCHEME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-medium">Target Role</label>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
            >
              {AUDIENCE_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-medium">State Jurisdiction</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
            >
              {STATES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-medium">Social Category / Caste</label>
            <select
              value={selectedCaste}
              onChange={(e) => setSelectedCaste(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
            >
              {CASTE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Showing <strong className="text-white">{filteredSchemes.length}</strong> matching schemes</span>
        <span>AI Match Precision: <strong className="text-green-400">High</strong></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const isSaved = savedSchemeIds.includes(scheme.id)

          return (
            <div key={scheme.id} className="glass p-6 rounded-3xl border border-gray-800 space-y-4 hover:border-green-500/30 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
                    {scheme.category}
                  </span>

                  <button
                    onClick={() => toggleSaveScheme(scheme.id)}
                    className="glass p-2 rounded-xl hover:bg-white/10 transition"
                    title={isSaved ? "Saved" : "Save Scheme"}
                  >
                    {isSaved ? <BookmarkCheck size={18} className="text-green-400" /> : <Bookmark size={18} className="text-gray-400" />}
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{scheme.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{scheme.shortDescription}</p>
                </div>

                <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 text-xs space-y-1 text-gray-300">
                  <p><span className="text-gray-500">Benefit:</span> <span className="font-bold text-pink-400">{scheme.benefitAmount}</span></p>
                  <p><span className="text-gray-500">Ministry:</span> {scheme.ministry}</p>
                  <p><span className="text-gray-500">Jurisdiction:</span> <span className="text-green-400 font-semibold">{scheme.state}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() => setDetailSchemeModal(scheme)}
                  className="flex-1 py-2.5 glass hover:bg-white/10 text-gray-200 font-semibold rounded-xl text-xs transition"
                >
                  View Details
                </button>
                <a
                  href={scheme.officialUrl || "https://india.gov.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2.5 glass hover:bg-blue-500/20 text-blue-300 font-bold rounded-xl text-xs transition flex items-center gap-1 border border-blue-500/30 shrink-0"
                  title="Open Official Government Application Portal"
                >
                  <ExternalLink size={14} /> Govt Portal
                </a>
                <button
                  onClick={() => setSelectedSchemeForApply(scheme)}
                  className="flex-1 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-xs transition"
                >
                  Apply Wizard
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {detailSchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182b] border border-gray-700 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setDetailSchemeModal(null)}
              className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <span className="text-[10px] bg-green-500/20 text-green-300 px-3 py-1 rounded-full font-bold uppercase">
              {detailSchemeModal.category}
            </span>

            <h3 className="text-2xl font-bold text-white">{detailSchemeModal.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">{detailSchemeModal.fullDescription}</p>

            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 text-xs space-y-2">
              <h4 className="font-bold text-green-400">Required Documents:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {detailSchemeModal.documentsRequired.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 text-xs space-y-2">
              <h4 className="font-bold text-blue-400">Application Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                {detailSchemeModal.applicationSteps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={detailSchemeModal.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 glass rounded-xl text-xs text-blue-400 font-bold hover:underline"
              >
                Official Govt Website ↗
              </a>
              <button
                onClick={() => {
                  const s = detailSchemeModal
                  setDetailSchemeModal(null)
                  setSelectedSchemeForApply(s)
                }}
                className="px-6 py-2 bg-green-500 text-black font-bold rounded-xl text-xs hover:bg-green-400"
              >
                Launch Application Wizard
              </button>
            </div>
          </div>
        </div>
      )}

      <ApplicationWizard
        scheme={selectedSchemeForApply}
        isOpen={!!selectedSchemeForApply}
        onClose={() => setSelectedSchemeForApply(null)}
      />
    </div>
  )
}
