import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"

export default function DocumentVerificationHub() {
  const { user } = useAuth()
  const { documentWallet } = useSchemes()

  // Dynamically map document wallet items or provide verified citizen documents queue
  const initialDocs = (documentWallet && documentWallet.length > 0)
    ? documentWallet.map((doc, i) => ({
        id: `doc-${901 + i}`,
        citizen: user?.name || "Desvanth",
        docType: doc.name,
        issuedBy: doc.docNumber || "Verified Authority",
        status: doc.verified ? "Approved ✓" : "Pending Manager Review",
        date: doc.dateUploaded || "2026-07-26"
      }))
    : [
        { id: "doc-901", citizen: user?.name || "Desvanth", docType: "Income Certificate (₹1.8 Lakh)", issuedBy: "Tahsildar Visakhapatnam", status: "Approved ✓", date: "26 Jul 2026" },
        { id: "doc-902", citizen: user?.name || "Desvanth", docType: "Aadhaar e-KYC Card", issuedBy: "UIDAI / DigiLocker", status: "Approved ✓", date: "25 Jul 2026" }
      ]

  const [documents, setDocuments] = useState(initialDocs)

  const handleAction = (id, newStatus) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: newStatus } : d))
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">Citizen Document Verification Hub</h3>
          <p className="text-gray-400 text-xs">Manager verification workflow for Aadhaar, Income, Caste, and Educational certificates</p>
        </div>

        <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase border border-green-500/30">
          Manager Verification Queue ({documents.length} Records)
        </span>
      </div>

      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase text-[10px]">
              <th className="pb-3">Doc ID</th>
              <th className="pb-3">Citizen Name</th>
              <th className="pb-3">Document Type</th>
              <th className="pb-3">Issuing Authority</th>
              <th className="pb-3">Submission Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {documents.map((d) => (
              <tr key={d.id} className="hover:bg-white/5 transition">
                <td className="py-3.5 font-mono text-purple-400 font-bold">{d.id}</td>
                <td className="py-3.5 font-bold text-white">{d.citizen}</td>
                <td className="py-3.5 text-gray-300">{d.docType}</td>
                <td className="py-3.5 text-gray-400 text-[11px]">{d.issuedBy}</td>
                <td className="py-3.5 font-mono text-gray-400">{d.date}</td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${d.status.includes("Approved") ? "bg-green-500/20 text-green-400" : d.status.includes("Rejected") ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-300"}`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  {d.status.includes("Pending") ? (
                    <>
                      <button
                        onClick={() => handleAction(d.id, "Approved ✓")}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/40 px-3 py-1.5 rounded-xl font-bold transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(d.id, "Rejected ✗")}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-xl font-bold transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 font-bold text-[11px] italic">Verification Complete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
