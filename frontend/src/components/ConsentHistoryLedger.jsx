import { useState } from "react"
import { History } from "lucide-react"

export default function ConsentHistoryLedger() {
  const [consentHistory, setConsentHistory] = useState([
    {
      id: "c-103",
      date: "24 Jul 2026 18:30 IST",
      purpose: "AI Scheme Matching & Household Income Scrutiny",
      dataCategories: ["Income Certificate", "Caste Certificate", "Aadhaar e-KYC"],
      status: "Active / Granted",
      version: "DPDP v2.4"
    },
    {
      id: "c-102",
      date: "15 Jun 2026 10:14 IST",
      purpose: "DigiLocker Document Verification",
      dataCategories: ["Class 10th Marksheet", "Income Proof"],
      status: "Active / Granted",
      version: "DPDP v2.3"
    },
    {
      id: "c-101",
      date: "01 May 2026 12:00 IST",
      purpose: "Initial Account Creation & Communication Consent",
      dataCategories: ["Full Name", "Email Address", "Mobile Number"],
      status: "Active / Granted",
      version: "DPDP v2.0"
    }
  ])

  const toggleConsentStatus = (id) => {
    setConsentHistory(consentHistory.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === "Active / Granted" ? "Revoked by User" : "Active / Granted"
        }
      }
      return c
    }))
  }

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
            DPDP Act 2023 Compliance
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <History size={16} className="text-purple-400" /> Explicit Data Processing Consent Audit History
          </h4>
        </div>

        <span className="text-[10px] text-gray-400 font-mono">
          3 Recorded Consents
        </span>
      </div>

      <div className="space-y-3">
        {consentHistory.map((c) => (
          <div key={c.id} className="p-3.5 bg-[#1b2338] rounded-2xl border border-gray-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-purple-400 font-bold text-[11px]">{c.id}</span>
                <h5 className="font-bold text-white text-xs">{c.purpose}</h5>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                  {c.version}
                </span>

                <button
                  onClick={() => toggleConsentStatus(c.id)}
                  className={`text-[10px] px-2.5 py-1 rounded-xl font-bold transition ${
                    c.status === "Active / Granted"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {c.status}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400">
              <div>
                <span>Granted Date:</span>
                <strong className="text-white block font-mono">{c.date}</strong>
              </div>

              <div>
                <span>Consented Categories:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {c.dataCategories.map((cat, idx) => (
                    <span key={idx} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[9px]">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
