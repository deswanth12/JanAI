import { useState } from "react"
import { Lock, Shield, FileText, Trash2, CheckCircle2 } from "lucide-react"

export default function SecurityPrivacyHub() {
  const [deletionRequested, setDeletionRequested] = useState(false)
  const [activeConsent, setActiveConsent] = useState({
    aadhaarKyc: true,
    schemeScrutiny: true,
    dbtBankLookup: true
  })

  const auditLogs = [
    { event: "DigiLocker e-KYC Verification", timestamp: "2026-07-24 14:02:11", status: "Encrypted AES-256" },
    { event: "Household Eligibility Scrutiny", timestamp: "2026-07-24 12:15:40", status: "Anonymized RAG Query" },
    { event: "Application PDF Generated", timestamp: "2026-07-22 18:30:00", status: "Signed & Stored" }
  ]

  const handleRequestDataDeletion = () => {
    setDeletionRequested(true)
    setTimeout(() => setDeletionRequested(false), 4000)
  }

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-red-500/20 text-red-300 font-bold px-3 py-1 rounded-full uppercase">
            Privacy & Trust Architecture
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Lock className="text-red-400" size={22} /> Security, Consent & Audit Trail Hub
          </h3>
          <p className="text-xs text-gray-400">End-to-end encryption, digital consent manager, and GDPR/DPDP data deletion controls</p>
        </div>

        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/20 flex items-center gap-1">
          <Shield size={14} /> AES-256 Encrypted
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Consent Manager */}
        <div className="bg-[#12182b] p-5 rounded-2xl border border-gray-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
            <FileText size={16} className="text-blue-400" /> Digital Consent Manager (DPDP Act Compliant)
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center bg-[#1b2338] p-2.5 rounded-xl">
              <span className="text-gray-300">Aadhaar e-KYC Verification</span>
              <input
                type="checkbox"
                checked={activeConsent.aadhaarKyc}
                onChange={(e) => setActiveConsent({ ...activeConsent, aadhaarKyc: e.target.checked })}
                className="accent-green-500 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center bg-[#1b2338] p-2.5 rounded-xl">
              <span className="text-gray-300">Household Scheme Rule Scrutiny</span>
              <input
                type="checkbox"
                checked={activeConsent.schemeScrutiny}
                onChange={(e) => setActiveConsent({ ...activeConsent, schemeScrutiny: e.target.checked })}
                className="accent-green-500 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center bg-[#1b2338] p-2.5 rounded-xl">
              <span className="text-gray-300">DBT Bank Account Verification</span>
              <input
                type="checkbox"
                checked={activeConsent.dbtBankLookup}
                onChange={(e) => setActiveConsent({ ...activeConsent, dbtBankLookup: e.target.checked })}
                className="accent-green-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-[#12182b] p-5 rounded-2xl border border-gray-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
            <Shield size={16} className="text-green-400" /> Immutable Access Audit Logs
          </h4>

          <div className="space-y-2">
            {auditLogs.map((log, i) => (
              <div key={i} className="bg-[#1b2338] p-2.5 rounded-xl flex justify-between items-center text-[11px]">
                <div>
                  <p className="font-bold text-white">{log.event}</p>
                  <span className="text-gray-500">{log.timestamp}</span>
                </div>
                <span className="text-[10px] bg-green-500/20 text-green-300 font-mono px-2 py-0.5 rounded">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Deletion Control */}
      <div className="bg-[#12182b] p-4 rounded-2xl border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <h4 className="font-bold text-red-400 text-sm flex items-center gap-1">
            <Trash2 size={16} /> Right to be Forgotten (Data Purge Request)
          </h4>
          <p className="text-gray-400 text-[11px]">Permanently erase all stored document backups, profile records, and audit logs.</p>
        </div>

        {deletionRequested ? (
          <div className="text-green-400 font-bold bg-green-500/20 px-4 py-2 rounded-xl flex items-center gap-1">
            <CheckCircle2 size={16} /> Data Wipe Request Submitted!
          </div>
        ) : (
          <button
            onClick={handleRequestDataDeletion}
            className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold border border-red-500/40 rounded-xl transition"
          >
            Request Permanent Data Deletion
          </button>
        )}
      </div>
    </div>
  )
}
