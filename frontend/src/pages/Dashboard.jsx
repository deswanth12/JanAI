import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { SCHEMES_DATABASE } from "../api/schemesData"
import ApplicationWizard from "../components/ApplicationWizard"
import BenefitCalculator from "../components/BenefitCalculator"
import DigiLockerModal from "../components/DigiLockerModal"
import AiCaseWorker from "../components/AiCaseWorker"
import DocumentChecklist from "../components/DocumentChecklist"
import AiExplainWhyPanel from "../components/AiExplainWhyPanel"
import JanAiAutonomousAgent from "../components/JanAiAutonomousAgent"
import AiGoalPlanner from "../components/AiGoalPlanner"
import AiGroundingRagPanel from "../components/AiGroundingRagPanel"
import GovernmentOfficeFinder from "../components/GovernmentOfficeFinder"
import DocumentExpiryMonitor from "../components/DocumentExpiryMonitor"
import CitizenLifetimeTimeline from "../components/CitizenLifetimeTimeline"
import JanAIKnowledgeBase from "../components/JanAIKnowledgeBase"
import PartnerPortal from "../components/PartnerPortal"
import SecurityPrivacyHub from "../components/SecurityPrivacyHub"
import FormValidationModal from "../components/FormValidationModal"
import SchemeMetadataBadge from "../components/SchemeMetadataBadge"
import PolicyChangeTimeline from "../components/PolicyChangeTimeline"
import {
  Search,
  Users,
  FileCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info
} from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, familyMembers } = useAuth()
  const { savedSchemeIds, applications } = useSchemes()
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState(null)
  const [showDigiLocker, setShowDigiLocker] = useState(false)
  const [showPreFlightModal, setShowPreFlightModal] = useState(false)

  const savedSchemes = SCHEMES_DATABASE.filter(s => savedSchemeIds.includes(s.id))

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 md:p-8 rounded-3xl border border-gray-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
              India's AI Citizen Assistant v1.0
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
              Active Case ID: JAN-2026-9041
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1">Welcome Back, {user.name}! 🚀</h1>
          <p className="text-xs text-gray-400 mt-1">
            Managing benefits for <strong className="text-white">Devanth</strong>, <strong className="text-white">Baskar (Father)</strong>, <strong className="text-white">Lalitha (Mother)</strong>, and <strong className="text-white">Pavani (Sister)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreFlightModal(true)}
            className="glass hover:bg-white/10 text-yellow-400 font-bold px-4 py-3 rounded-2xl text-xs transition flex items-center gap-1.5"
          >
            <ShieldCheck size={16} /> Pre-Flight AI Validator
          </button>

          <button
            onClick={() => setShowDigiLocker(true)}
            className="glass hover:bg-white/10 text-blue-400 font-bold px-4 py-3 rounded-2xl text-xs transition flex items-center gap-2"
          >
            <ShieldCheck size={16} /> DigiLocker e-KYC
          </button>
          <button
            onClick={() => navigate("/finder")}
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-2xl text-xs transition flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            <Sparkles size={16} /> AI Scheme Finder
          </button>
        </div>
      </div>

      {/* Official Source Grounded Disclaimer Banner */}
      <div className="p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs text-blue-300">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-blue-400 shrink-0" />
          <p>
            <strong>Official-Source Grounded:</strong> Information is derived from government portals and gazette notifications, including source citations, versioning, and last verification timestamp.
          </p>
        </div>
        <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2.5 py-1 rounded-xl font-bold shrink-0">
          Verified 24 Jul 2026
        </span>
      </div>

      {/* 🌟 1. THE APEX EVOLUTION: JanAI Autonomous Goal Agent */}
      <JanAiAutonomousAgent />

      {/* 2. AI Active Case Worker Guided Progress */}
      <AiCaseWorker onLaunchApply={() => setSelectedSchemeForApply(SCHEMES_DATABASE[0])} />

      {/* 3. Total Household Benefit Impact Engine */}
      <BenefitCalculator />

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2 hover:border-green-500/50 transition">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Household Profiles</span>
            <Users size={18} className="text-green-400" />
          </div>
          <p className="text-4xl font-extrabold text-white">{1 + familyMembers.length}</p>
          <p className="text-[11px] text-gray-500">Devanth, Baskar, Lalitha, Pavani</p>
        </div>

        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2 hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Shortlisted Schemes</span>
            <Search size={18} className="text-blue-400" />
          </div>
          <p className="text-4xl font-extrabold text-blue-400">{savedSchemes.length}</p>
          <p className="text-[11px] text-gray-500">Pre-verified for application</p>
        </div>

        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2 hover:border-pink-500/50 transition">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Submitted Applications</span>
            <FileCheck size={18} className="text-pink-400" />
          </div>
          <p className="text-4xl font-extrabold text-pink-400">{applications.length}</p>
          <p className="text-[11px] text-gray-500">Tracked under Nodal Officer</p>
        </div>

        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-2 hover:border-yellow-500/50 transition">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Approval Probability</span>
            <TrendingUp size={18} className="text-yellow-400" />
          </div>
          <p className="text-4xl font-extrabold text-yellow-400">94% High</p>
          <p className="text-[11px] text-gray-500">Documents pre-verified</p>
        </div>
      </div>

      {/* 4. AI Goal Roadmap Planner */}
      <AiGoalPlanner />

      {/* 5. RAG Source Citation & Grounding Inspector */}
      <AiGroundingRagPanel />

      {/* 6. Historical Policy Change Timeline */}
      <PolicyChangeTimeline schemeTitle="PM Mudra Yojana & PM-Kisan" />

      {/* 7. AI Document Pre-Application Checklist */}
      <DocumentChecklist schemeTitle="Post-Matric Scholarship & PM-Kisan" />

      {/* 8. AI "Explain Why" Trust & Exclusion Panel */}
      <AiExplainWhyPanel userProfile={user} />

      {/* 9. AI Document Expiry Monitor */}
      <DocumentExpiryMonitor />

      {/* 10. Citizen 5-Year Lifetime Welfare Timeline (2026-2030) */}
      <CitizenLifetimeTimeline />

      {/* 11. Local Government Office Finder */}
      <GovernmentOfficeFinder />

      {/* Recommended Schemes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles size={20} className="text-green-400" /> Recommended For Your Household Today
          </h2>
          <button
            onClick={() => navigate("/finder")}
            className="text-xs text-green-400 font-bold hover:underline flex items-center gap-1"
          >
            View All Schemes <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHEMES_DATABASE.slice(0, 2).map((scheme) => (
            <div key={scheme.id} className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <Award size={14} /> 94% Eligibility • High Approval
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{scheme.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{scheme.shortDescription}</p>
              </div>

              {/* Scheme Metadata Badge with Separated Data Verification & AI Confidence */}
              <SchemeMetadataBadge metadata={scheme.metadata} officialUrl={scheme.officialUrl} schemeTitle={scheme.title} />

              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                <span className="text-xs font-bold text-pink-400">{scheme.benefitAmount}</span>
                <button
                  onClick={() => setSelectedSchemeForApply(scheme)}
                  className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1"
                >
                  <CheckCircle2 size={14} /> Launch Guided Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Application Status Tracker */}
      <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock size={20} className="text-pink-400" /> Active Application Tracking Pipeline
          </h2>
          <button
            onClick={() => navigate("/applications")}
            className="text-xs text-green-400 font-bold hover:underline"
          >
            Manage Applications
          </button>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{app.schemeTitle}</span>
                  <span className="bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {app.applicantName} ({app.relation})
                  </span>
                </div>
                <p className="text-gray-400 mt-1">Submitted on {app.dateSubmitted} • Tracking ID: <span className="font-mono text-gray-200">{app.id}</span></p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-xl">
                  {app.probabilityScore}% Approval Score
                </span>
                <span className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-xl">
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12. JanAI Citizen Knowledge Base & Terms Explainer */}
      <JanAIKnowledgeBase />

      {/* 13. B2B Partner Portal */}
      <PartnerPortal />

      {/* 14. Security, Privacy & Consent Hub */}
      <SecurityPrivacyHub />

      {/* Modals */}
      <ApplicationWizard
        scheme={selectedSchemeForApply}
        isOpen={!!selectedSchemeForApply}
        onClose={() => setSelectedSchemeForApply(null)}
      />

      <DigiLockerModal
        isOpen={showDigiLocker}
        onClose={() => setShowDigiLocker(false)}
      />

      <FormValidationModal
        isOpen={showPreFlightModal}
        onClose={() => setShowPreFlightModal(false)}
        onVerifiedSubmit={() => {
          setSelectedSchemeForApply(SCHEMES_DATABASE[0])
        }}
      />
    </div>
  )
}