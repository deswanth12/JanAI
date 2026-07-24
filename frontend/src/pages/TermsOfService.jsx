import { ShieldAlert, CheckCircle2, Info } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-xs">
      <div className="glass p-8 rounded-3xl border border-gray-800 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 font-bold px-3 py-1 rounded-full uppercase">
            Official Advisory & Terms
          </span>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
            Effective Date: 24 Jul 2026
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">JanAI Terms of Service</h1>
        <p className="text-gray-400 text-xs">
          Legal terms governing platform usage, government authority disclaimers, and user verification obligations.
        </p>
      </div>

      <div className="space-y-6">
        <section className="glass p-6 rounded-3xl border border-yellow-500/30 bg-yellow-500/5 space-y-3">
          <h2 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
            <ShieldAlert size={18} /> 1. Platform Assistance Disclaimer
          </h2>
          <p className="text-gray-200 leading-relaxed font-medium">
            JanAI is an independent AI-powered citizen assistance platform. JanAI helps citizens discover schemes, calculate eligibility, and prepare application packages. JanAI is not a government department or official ministry organ.
          </p>
        </section>

        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400" /> 2. Final Approval & Disbursal Authority
          </h2>
          <p className="text-gray-300 leading-relaxed">
            All final scheme eligibility determinations, application approvals, and Direct Benefit Transfer (DBT) funds disbursals rest <strong>exclusively with official Nodal Officers and relevant government departments</strong>.
          </p>
        </section>

        <section className="glass p-6 rounded-3xl border border-gray-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Info size={18} className="text-blue-400" /> 3. Dynamic Policy Updates & User Verification
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Government scheme guidelines, budget allocations, and cutoff dates are revised periodically through official gazette notifications. While JanAI's Data Freshness Engine continuously scans official source portals, users are encouraged to verify critical application details directly on official government portals (e.g. <code>pmkisan.gov.in</code>, <code>scholarships.gov.in</code>).
          </p>
        </section>
      </div>
    </div>
  )
}
