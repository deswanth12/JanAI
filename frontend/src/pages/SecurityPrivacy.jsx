import { useState } from "react"
import {
  Shield,
  Lock,
  KeyRound,
  Fingerprint,
  Eye,
  EyeOff,
  FileCheck,
  Hash,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Server,
  Globe,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react"

// Simulated cryptographic audit ledger entries
const CRYPTO_LEDGER = [
  {
    id: "txn-001",
    timestamp: "2026-07-27 17:30:12 IST",
    action: "Aadhaar e-KYC Hash Verified",
    actor: "DigiLocker Gateway",
    hash: "sha256:a3f8c9d2e1b0...7f4e",
    status: "verified",
    details: "Citizen Aadhaar identity hash validated via DigiLocker UIDAI API. Zero-knowledge proof — no raw Aadhaar stored."
  },
  {
    id: "txn-002",
    timestamp: "2026-07-27 16:45:08 IST",
    action: "Scheme Eligibility Evaluation",
    actor: "JanAI Eligibility Engine",
    hash: "sha256:b7d4e2f1a9c3...8e2a",
    status: "verified",
    details: "PM-Kisan eligibility computed locally. Score: 94%. No citizen PII transmitted to external servers."
  },
  {
    id: "txn-003",
    timestamp: "2026-07-27 14:20:33 IST",
    action: "Document Upload — Income Certificate",
    actor: "Citizen Upload (OCR Scanned)",
    hash: "sha256:c1e5f3a8d7b2...4c9f",
    status: "verified",
    details: "Income certificate uploaded and hashed. Original file encrypted at rest (AES-256-GCM). Hash anchored to immutable ledger."
  },
  {
    id: "txn-004",
    timestamp: "2026-07-26 11:10:45 IST",
    action: "Session JWT Token Issued",
    actor: "Auth Service (RS256)",
    hash: "sha256:d9a2b4c7e8f1...3d7b",
    status: "verified",
    details: "JWT access token signed with RS256 (2048-bit RSA). Token expiry: 24 hours. Refresh token rotation enabled."
  },
  {
    id: "txn-005",
    timestamp: "2026-07-26 09:00:00 IST",
    action: "Privacy Consent Recorded",
    actor: "Citizen Consent Manager",
    hash: "sha256:e4f7a1b3c6d9...5e8c",
    status: "verified",
    details: "Citizen granted consent for: Scheme eligibility evaluation, AI chat assistance, document OCR scanning. Consent is revocable at any time."
  },
  {
    id: "txn-006",
    timestamp: "2026-07-25 18:30:22 IST",
    action: "Data Export Request (DPDP Act)",
    actor: "Privacy Rights Engine",
    hash: "sha256:f2c8d5e9a1b4...6f1d",
    status: "pending",
    details: "Citizen requested full data export under Digital Personal Data Protection Act 2023, Section 11. Processing within 72 hours."
  },
  {
    id: "txn-007",
    timestamp: "2026-07-25 12:15:10 IST",
    action: "AI Chat Query Processed",
    actor: "Gemini 2.5 Flash (Grounded)",
    hash: "sha256:a8b1c4d7e0f3...9a2e",
    status: "verified",
    details: "AI query processed with citation grounding. No PII included in LLM prompt. Response verified against gazette source data."
  }
]

// Privacy controls that citizen can toggle
const PRIVACY_CONTROLS = [
  {
    id: "pc-1",
    title: "AI Scheme Eligibility Evaluation",
    description: "Allow JanAI to evaluate your profile against government scheme eligibility rules.",
    risk: "low",
    defaultOn: true
  },
  {
    id: "pc-2",
    title: "Document OCR Scanning & Storage",
    description: "Allow JanAI to scan uploaded documents using OCR and store encrypted hashes.",
    risk: "low",
    defaultOn: true
  },
  {
    id: "pc-3",
    title: "AI Chat Assistance (Gemini)",
    description: "Allow AI-powered chat to answer scheme questions using your profile context.",
    risk: "medium",
    defaultOn: true
  },
  {
    id: "pc-4",
    title: "WhatsApp / SMS Deadline Alerts",
    description: "Allow JanAI to send scheme deadline reminders via WhatsApp and SMS.",
    risk: "low",
    defaultOn: true
  },
  {
    id: "pc-5",
    title: "Analytics & Usage Telemetry",
    description: "Share anonymized usage patterns to improve JanAI platform experience.",
    risk: "medium",
    defaultOn: false
  },
  {
    id: "pc-6",
    title: "Third-Party Data Sharing",
    description: "Share profile data with partner NGOs or Village Level Entrepreneurs (VLEs).",
    risk: "high",
    defaultOn: false
  }
]

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All citizen data encrypted at rest (AES-256-GCM) and in transit (TLS 1.3). Zero plaintext storage.",
    status: "active"
  },
  {
    icon: Fingerprint,
    title: "Aadhaar e-KYC via DigiLocker",
    description: "Biometric identity verified through UIDAI DigiLocker API. Only cryptographic hash stored — no raw Aadhaar data.",
    status: "active"
  },
  {
    icon: KeyRound,
    title: "JWT RS256 Authentication",
    description: "Session tokens signed with 2048-bit RSA keys. Token rotation & expiry enforced. HttpOnly secure cookies.",
    status: "active"
  },
  {
    icon: Hash,
    title: "Immutable Cryptographic Ledger",
    description: "Every action (login, document upload, eligibility check) anchored to SHA-256 hash chain. Tamper-evident audit trail.",
    status: "active"
  },
  {
    icon: Globe,
    title: "DPDP Act 2023 Compliance",
    description: "Full compliance with India's Digital Personal Data Protection Act. Right to access, correct, erase, and port data.",
    status: "active"
  },
  {
    icon: Server,
    title: "India-Region Data Residency",
    description: "All citizen data hosted exclusively within Indian data centers. No cross-border data transfer.",
    status: "active"
  }
]

export default function SecurityPrivacy() {
  const [privacyToggles, setPrivacyToggles] = useState(
    PRIVACY_CONTROLS.reduce((acc, pc) => ({ ...acc, [pc.id]: pc.defaultOn }), {})
  )
  const [expandedLedger, setExpandedLedger] = useState(null)
  const [showAllLedger, setShowAllLedger] = useState(false)

  const togglePrivacy = (id) => {
    setPrivacyToggles(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const visibleLedger = showAllLedger ? CRYPTO_LEDGER : CRYPTO_LEDGER.slice(0, 4)

  return (
    <div className="space-y-6 text-xs pb-12">
      {/* Header */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 space-y-3 bg-gradient-to-r from-[#0e1628] via-[#121c35] to-[#0f182e]">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/30">
            Zero-Trust Architecture
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-2 flex items-center gap-3">
            <Shield size={28} className="text-emerald-400" /> Security, Privacy & Cryptographic Ledger
          </h1>
          <p className="text-gray-400 text-xs">
            Full transparency into how JanAI protects your data. View encryption standards, manage privacy consent controls, and audit the immutable cryptographic action ledger.
          </p>
        </div>

        {/* Trust Score Banner */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-4 py-2 rounded-2xl flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <div>
              <p className="text-emerald-300 font-extrabold text-sm">Trust Score: 98.7%</p>
              <p className="text-[10px] text-emerald-400/70">DPDP Act 2023 Compliant • ISO 27001 Aligned</p>
            </div>
          </div>
          <div className="bg-blue-500/15 border border-blue-500/30 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Lock size={16} className="text-blue-400" />
            <p className="text-blue-300 font-bold text-[11px]">Encryption: AES-256-GCM + TLS 1.3</p>
          </div>
        </div>
      </div>

      {/* ═══ Section 1: Security Infrastructure ═══ */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-white flex items-center gap-2 px-1">
          <Lock size={16} className="text-emerald-400" /> Security Infrastructure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECURITY_FEATURES.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div key={idx} className="glass p-5 rounded-2xl border border-gray-800 flex items-start gap-3 hover:border-emerald-500/30 transition">
                <div className="w-10 h-10 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs">{feat.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{feat.description}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-500/30">
                    <CheckCircle2 size={10} /> Active & Enforced
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══ Section 2: Privacy Consent Controls ═══ */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-white flex items-center gap-2 px-1">
          <Eye size={16} className="text-blue-400" /> Privacy Consent Controls
        </h2>
        <p className="text-[11px] text-gray-400 px-1">
          You have full control over what data JanAI can access and process. Toggle any permission below. Changes take effect immediately.
        </p>
        <div className="glass p-5 rounded-3xl border border-gray-800 space-y-3">
          {PRIVACY_CONTROLS.map((pc) => (
            <div key={pc.id} className="flex items-center justify-between gap-4 py-3 border-b border-gray-800/60 last:border-b-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-xs">{pc.title}</h4>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                    pc.risk === "low" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    pc.risk === "medium" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                    "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}>
                    {pc.risk === "low" ? "Low Risk" : pc.risk === "medium" ? "Medium Risk" : "High Risk"}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">{pc.description}</p>
              </div>
              <button
                onClick={() => togglePrivacy(pc.id)}
                className={`w-12 h-7 rounded-full transition-all duration-300 shrink-0 relative ${
                  privacyToggles[pc.id] ? "bg-emerald-500" : "bg-gray-700"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md ${
                  privacyToggles[pc.id] ? "left-6" : "left-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Section 3: Cryptographic Audit Ledger ═══ */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-white flex items-center gap-2 px-1">
          <Hash size={16} className="text-purple-400" /> Cryptographic Audit Ledger
        </h2>
        <p className="text-[11px] text-gray-400 px-1">
          Every action on your account is recorded in a tamper-proof SHA-256 hash chain. Click any entry to view details.
        </p>

        <div className="space-y-2">
          {visibleLedger.map((entry) => {
            const isExpanded = expandedLedger === entry.id
            return (
              <div key={entry.id} className="glass rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-500/30 transition">
                <div
                  className="p-4 cursor-pointer flex items-center justify-between gap-3"
                  onClick={() => setExpandedLedger(isExpanded ? null : entry.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      entry.status === "verified" ? "bg-green-500/15 border border-green-500/30" : "bg-amber-500/15 border border-amber-500/30"
                    }`}>
                      {entry.status === "verified" ? (
                        <CheckCircle2 size={16} className="text-green-400" />
                      ) : (
                        <AlertTriangle size={16} className="text-amber-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-xs truncate">{entry.action}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock size={10} /> {entry.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20 hidden sm:inline">
                      {entry.hash}
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2 border-t border-gray-800 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-[#12182b] p-3 rounded-xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Actor / Service</p>
                        <p className="text-white font-bold text-xs mt-0.5">{entry.actor}</p>
                      </div>
                      <div className="bg-[#12182b] p-3 rounded-xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">SHA-256 Hash</p>
                        <p className="text-purple-300 font-mono text-[11px] mt-0.5 break-all">{entry.hash}</p>
                      </div>
                    </div>
                    <div className="bg-[#12182b] p-3 rounded-xl border border-gray-800">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Details</p>
                      <p className="text-gray-300 text-[11px] mt-0.5 leading-relaxed">{entry.details}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-bold border ${
                        entry.status === "verified"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}>
                        {entry.status === "verified" ? "✓ Hash Verified — Tamper-Proof" : "⏳ Processing"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!showAllLedger && CRYPTO_LEDGER.length > 4 && (
          <button
            onClick={() => setShowAllLedger(true)}
            className="w-full py-2.5 glass hover:bg-white/5 text-gray-300 font-bold rounded-2xl text-xs transition border border-gray-800"
          >
            Show All {CRYPTO_LEDGER.length} Ledger Entries
          </button>
        )}
      </div>

      {/* ═══ Section 4: Your Data Rights (DPDP Act) ═══ */}
      <div className="glass p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 space-y-4">
        <h2 className="text-sm font-black text-white flex items-center gap-2">
          <FileCheck size={16} className="text-blue-400" /> Your Data Rights — DPDP Act 2023
        </h2>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Under India's <strong className="text-blue-300">Digital Personal Data Protection Act 2023</strong>, you have the following enforceable rights over your personal data stored on JanAI:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Right to Access", desc: "Request a copy of all personal data JanAI holds about you.", icon: Eye },
            { title: "Right to Correction", desc: "Request correction of inaccurate or incomplete personal data.", icon: FileCheck },
            { title: "Right to Erasure", desc: "Request permanent deletion of your account and all associated data.", icon: EyeOff },
            { title: "Right to Portability", desc: "Download all your data in machine-readable JSON format.", icon: Globe }
          ].map((right, i) => {
            const Icon = right.icon
            return (
              <div key={i} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 flex items-start gap-3">
                <Icon size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-xs">{right.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{right.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-gray-500 italic">
          To exercise any right, navigate to Profile & Family → Data Rights or contact the Data Protection Officer at <strong className="text-blue-300">dpo@janai.in</strong>.
        </p>
      </div>
    </div>
  )
}
