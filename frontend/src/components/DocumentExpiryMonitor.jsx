import { useState } from "react"
import { AlertCircle, Clock, Plus, CheckCircle2 } from "lucide-react"

export default function DocumentExpiryMonitor() {
  const [documents, setDocuments] = useState([
    {
      id: "exp-1",
      name: "Income Certificate (₹1.8L)",
      category: "Financial",
      number: "AP-IC-2026-99",
      expiryDate: "2026-08-15",
      daysLeft: 22,
      status: "warning"
    },
    {
      id: "exp-2",
      name: "Aadhaar Card",
      category: "Identity",
      number: "XXXX-XXXX-9012",
      expiryDate: "2032-12-31",
      daysLeft: 2350,
      status: "valid"
    },
    {
      id: "exp-3",
      name: "Caste Certificate (OBC)",
      category: "Category",
      number: "AP-CC-2025-11",
      expiryDate: "Permanent / Lifetime",
      daysLeft: 9999,
      status: "valid"
    },
    {
      id: "exp-4",
      name: "Driving Licence",
      category: "Permit",
      number: "AP-31-2022-00412",
      expiryDate: "2026-09-01",
      daysLeft: 38,
      status: "warning"
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newDoc, setNewDoc] = useState({ name: "", category: "Financial", number: "", expiryDate: "" })

  const handleAddDocument = (e) => {
    e.preventDefault()
    if (!newDoc.name || !newDoc.expiryDate) return
    
    const expiry = new Date(newDoc.expiryDate)
    const today = new Date()
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const item = {
      id: `exp-${Date.now()}`,
      name: newDoc.name,
      category: newDoc.category,
      number: newDoc.number || "REF-2026-X",
      expiryDate: newDoc.expiryDate,
      daysLeft: diffDays,
      status: diffDays < 30 ? "warning" : "valid"
    }

    setDocuments([item, ...documents])
    setShowAddModal(false)
    setNewDoc({ name: "", category: "Financial", number: "", expiryDate: "" })
  }

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-3 py-1 rounded-full uppercase">
            Proactive Document Renewal
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Clock className="text-yellow-400" size={22} /> AI Document Expiry Monitor
          </h3>
          <p className="text-xs text-gray-400">Track Aadhaar, Passport, Income & Caste certificates with automatic advance renewal alerts</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
        >
          <Plus size={16} /> Track New Document
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {documents.map((doc) => {
          const isWarning = doc.daysLeft <= 45

          return (
            <div
              key={doc.id}
              className={`p-4 rounded-2xl border space-y-3 transition ${
                isWarning
                  ? "bg-yellow-500/10 border-yellow-500/40 text-gray-200 shadow-lg shadow-yellow-500/5"
                  : "bg-[#12182b] border-gray-800 text-gray-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded uppercase">
                  {doc.category}
                </span>
                {isWarning ? (
                  <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle size={12} /> {doc.daysLeft} Days Left
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Valid
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">{doc.number}</p>
              </div>

              <div className="border-t border-gray-800/80 pt-2 flex justify-between items-center text-[11px]">
                <span className="text-gray-500">Expiry Date:</span>
                <strong className={isWarning ? "text-yellow-400" : "text-gray-200"}>{doc.expiryDate}</strong>
              </div>
            </div>
          )
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddDocument} className="bg-[#12182b] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white">Track Document Expiry</h3>

            <div>
              <label className="text-gray-400 block mb-1">Document Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Passport / Disability Cert"
                value={newDoc.name}
                onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Category</label>
              <select
                value={newDoc.category}
                onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
              >
                {["Financial", "Identity", "Category", "Permit", "Passport", "Health"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={newDoc.expiryDate}
                onChange={(e) => setNewDoc({ ...newDoc, expiryDate: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 glass rounded-xl text-gray-400 hover:text-white font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl"
              >
                Save Tracked Document
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
