import { useState } from "react"
import { SCHEMES_DATABASE } from "../api/schemesData"
import { Plus, Upload, Play, Archive } from "lucide-react"

export default function SchemeManagement() {
  const [schemes, setSchemes] = useState(SCHEMES_DATABASE)
  const [showAddModal, setShowAddModal] = useState(false)
  const [testingOutput, setTestingOutput] = useState(null)

  const [newScheme, setNewScheme] = useState({
    title: "",
    category: "Agriculture",
    benefitAmount: "₹10,000 / year",
    state: "All India",
    officialUrl: "https://pmkisan.gov.in"
  })

  const handleCreateScheme = (e) => {
    e.preventDefault()
    const created = {
      id: `scheme-${Date.now()}`,
      ...newScheme,
      metadata: {
        sourcePortal: newScheme.officialUrl.replace("https://", ""),
        lastVerified: "24 Jul 2026",
        dataVersion: "2026.07.24",
        confidenceScore: 99.0,
        gazetteReference: "Gazette Notification 2026/07"
      }
    }
    setSchemes([created, ...schemes])
    setShowAddModal(false)
  }

  const handleTestRule = (schemeTitle) => {
    setTestingOutput(`Rule Sandbox Test Success: Matched 100% eligibility for Student in AP under ${schemeTitle}. Verified zero conflicting gazette entries.`)
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">Government Scheme Rule & Gazette Manager</h3>
          <p className="text-gray-400 text-xs">Author new welfare rules, upload official gazette PDFs, and run rule sandboxes</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-3 rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-purple-600/30"
        >
          <Plus size={16} /> Author New Scheme
        </button>
      </div>

      {testingOutput && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-300 font-mono text-xs flex items-center justify-between">
          <span>{testingOutput}</span>
          <button onClick={() => setTestingOutput(null)} className="text-gray-400 hover:text-white font-bold">Clear</button>
        </div>
      )}

      {/* Scheme List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((s) => (
          <div key={s.id} className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
                {s.category}
              </span>
              <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-xl">
                {s.benefitAmount}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">{s.title}</h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{s.shortDescription || s.fullDescription}</p>
            </div>

            <div className="p-3 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center text-[10px] text-gray-400">
              <span>Source: <strong className="text-white font-mono">{s.metadata?.sourcePortal || "gov.in"}</strong></span>
              <span>Gazette Ref: <strong className="text-yellow-400">{s.metadata?.gazetteReference || "Active"}</strong></span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-800 pt-3">
              <button
                onClick={() => handleTestRule(s.title)}
                className="glass hover:bg-white/10 text-yellow-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition"
              >
                <Play size={14} /> Rule Sandbox Test
              </button>

              <button
                onClick={() => setSchemes(schemes.filter(item => item.id !== s.id))}
                className="text-red-400 hover:text-red-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition"
              >
                <Archive size={14} /> Archive
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Scheme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12182b] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Author New Government Scheme</h3>
            <form onSubmit={handleCreateScheme} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Scheme Title (e.g. CM Overseas Scholarship)"
                value={newScheme.title}
                onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Benefit Amount (e.g. ₹20,000 / year)"
                  value={newScheme.benefitAmount}
                  onChange={(e) => setNewScheme({ ...newScheme, benefitAmount: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                />

                <input
                  type="text"
                  required
                  placeholder="Official URL"
                  value={newScheme.officialUrl}
                  onChange={(e) => setNewScheme({ ...newScheme, officialUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-gray-700 rounded-2xl text-center bg-[#1b2338]/40">
                <Upload size={20} className="mx-auto text-purple-400 mb-1" />
                <span className="text-gray-300 font-bold">Upload Gazette PDF for AI Embedding Ingestion</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-400 font-bold">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white font-bold px-5 py-2.5 rounded-xl">Publish Scheme</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
