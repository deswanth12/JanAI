import { ShieldCheck, Lock, Eye, Trash2 } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-xs">
      <div className="glass p-8 rounded-3xl border border-gray-800 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
            DPDP Act 2023 Compliant
          </span>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
            Effective Date: 24 Jul 2026
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">JanAI Citizen Privacy Policy</h1>
        <p className="text-gray-400 text-xs">
          Transparent documentation explaining data collection, purpose, retention, user deletion rights, and access scoping.
        </p>
      </div>

      <div className="space-y-6">
        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye size={18} className="text-green-400" /> 1. Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed">
            To determine your eligibility for Central and State government schemes, JanAI collects minimal necessary information:
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-1">
            <li><strong>Demographic Information:</strong> Full Name, Email, Mobile (+91), Age, Gender, State, District, Occupation, Income, and Category.</li>
            <li><strong>Verification Documents:</strong> Aadhaar numbers (masked), Income Certificates, Caste Certificates, Marksheets, and Land Passbook data.</li>
            <li><strong>Technical Data:</strong> IP address, device session fingerprints, and interaction timestamps.</li>
          </ul>
        </section>

        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={18} className="text-blue-400" /> 2. Purpose of Collection & Storage
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All collected information is used exclusively to evaluate scheme eligibility rules via our grounded RAG engine and to prepare pre-filled application packages for official government portals. We never sell, monetize, or share your data with unauthorized third parties.
          </p>
        </section>

        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-purple-400" /> 3. Data Retention & Encryption
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All PII and uploaded document images are stored with <strong>AES-256-GCM encryption at rest</strong>. Credentials use RS256 RSA JWT tokens with single-use refresh rotation.
          </p>
        </section>

        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trash2 size={18} className="text-red-400" /> 4. Right to Erasure (Data Purge)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Under Section 12 of the Digital Personal Data Protection (DPDP) Act 2023, you have the right to request the complete deletion of your data at any time via the <strong>Security & Privacy Hub</strong> on your dashboard.
          </p>
        </section>
      </div>
    </div>
  )
}
