import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SCHEMES_DATABASE, SCHEME_CATEGORIES, AUDIENCE_TYPES, STATES_LIST, CASTE_CATEGORIES } from "../api/schemesData"
import { useSchemes } from "../context/SchemeContext"
import PdfFormModal from "../components/PdfFormModal"
import { Search, Bookmark, BookmarkCheck, ExternalLink, BookOpen, CheckCircle2, FileText } from "lucide-react"

export default function SchemeFinder() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const { savedSchemeIds, toggleSaveScheme } = useSchemes()

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedAudience, setSelectedAudience] = useState("All Roles")
  const [selectedState, setSelectedState] = useState("All India")
  const [selectedCaste, setSelectedCaste] = useState("All")
  const [detailSchemeModal, setDetailSchemeModal] = useState(null)
  const [pdfSchemeModal, setPdfSchemeModal] = useState(null)

  const filteredSchemes = SCHEMES_DATABASE.filter((scheme) => {
    const matchesQuery =
      scheme.title.toLowerCase().includes(query.toLowerCase()) ||
      scheme.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      scheme.category.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || scheme.category === selectedCategory
    const matchesAudience = selectedAudience === "All Roles" || scheme.targetAudience.includes(selectedAudience)
    const matchesState = selectedState === "All India" || scheme.state === selectedState || scheme.state === "All India"
    const matchesCaste = selectedCaste === "All" || scheme.eligibility.caste.includes("All") || scheme.eligibility.caste.includes(selectedCaste)

    return matchesQuery && matchesCategory && matchesAudience && matchesState && matchesCaste
  })

  return (
    <div className="space-y-6 text-xs pb-12">
      {/* Search Header */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 space-y-4 bg-gradient-to-r from-[#0e1628] via-[#121c35] to-[#0f182e]">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Vernacular Scheme Guidance Engine
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-2">AI Scheme Finder & Application Guidance</h1>
          <p className="text-gray-400 text-xs">
            Find eligible welfare schemes grounded in official government gazette rules, download printable PDF application forms, and open official portals.
          </p>
        </div>

        {/* Main Search Input */}
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by scheme name or keywords e.g. 'Farmer scholarship', 'Health insurance'..."
            className="w-full bg-[#12182b] border border-gray-700 rounded-2xl pl-11 pr-4 py-3 text-white text-xs outline-none focus:border-green-400 transition"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
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

      {/* Scheme Cards Grid */}
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

              {/* Action Buttons: 1. How to Apply | 2. Printable PDF Form | 3. Official Govt Portal */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() => setDetailSchemeModal(scheme)}
                  className="flex-1 min-w-[120px] py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 font-extrabold rounded-2xl text-xs transition border border-green-500/40 flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <BookOpen size={14} /> How to Apply
                </button>
                <button
                  onClick={() => setPdfSchemeModal(scheme)}
                  className="flex-1 min-w-[120px] py-2.5 glass hover:bg-white/10 text-amber-300 font-extrabold rounded-2xl text-xs transition border border-amber-500/30 flex items-center justify-center gap-1.5 shadow-lg"
                  title="Print / Save Official Application Form PDF"
                >
                  <FileText size={14} className="text-amber-400" /> Printable Form PDF
                </button>
                <a
                  href={scheme.officialUrl || "https://india.gov.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[120px] py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/20"
                  title="Open Official Government Application Portal"
                >
                  <ExternalLink size={14} /> Govt Portal
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step-by-Step Guidance Modal */}
      {detailSchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12182b] border border-gray-700 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5 text-xs">
            <button
              onClick={() => setDetailSchemeModal(null)}
              className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-green-500/20 text-green-300 px-3 py-1 rounded-full font-bold uppercase border border-green-500/30">
                {detailSchemeModal.category}
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold uppercase border border-blue-500/30">
                Jurisdiction: {detailSchemeModal.state}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">{detailSchemeModal.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Ministry: {detailSchemeModal.ministry}</p>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-[#1b2338] p-4 rounded-2xl border border-gray-800">
              {detailSchemeModal.fullDescription}
            </p>

            {/* 📋 Step-by-Step Official Application Instructions */}
            <div className="bg-[#182238] p-5 rounded-2xl border border-amber-500/30 space-y-3">
              <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={16} className="text-amber-400" /> Step-by-Step Application Instructions:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-200">
                {(detailSchemeModal.applicationSteps || [
                  "Visit the official government web portal using the blue button below.",
                  "Click on 'New Registration / Citizen Application'.",
                  "Enter your Aadhaar number and Mobile Number linked with Aadhaar.",
                  "Fill in land, income, or educational details from your JanAI Profile.",
                  "Upload verified document copies (Aadhaar, Income, Marksheet).",
                  "Submit application and save your official Registration Reference Number."
                ]).map((stepText, idx) => (
                  <li key={idx} className="text-[11px] leading-relaxed pl-1">{stepText}</li>
                ))}
              </ol>
            </div>

            {/* Required Documents Checklist */}
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-800 space-y-2">
              <h4 className="font-bold text-green-400 text-xs flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Required Documents Checklist:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {detailSchemeModal.documentsRequired.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            {/* Modal Bottom Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-800">
              <button
                onClick={() => {
                  const s = detailSchemeModal
                  setDetailSchemeModal(null)
                  setPdfSchemeModal(s)
                }}
                className="w-full sm:w-auto px-5 py-3 glass hover:bg-white/10 text-amber-300 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 border border-amber-500/30"
              >
                <FileText size={15} /> Printable Form PDF
              </button>
              <a
                href={detailSchemeModal.officialUrl || "https://india.gov.in"}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition"
              >
                <ExternalLink size={16} /> Open Official Govt Portal ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Printable PDF Application Form Modal */}
      <PdfFormModal
        scheme={pdfSchemeModal}
        isOpen={!!pdfSchemeModal}
        onClose={() => setPdfSchemeModal(null)}
      />
    </div>
  )
}
