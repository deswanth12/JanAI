import { useNavigate, useLocation } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import {
  Home,
  LayoutDashboard,
  Search,
  CheckCircle2,
  Bot,
  Scale,
  FileCheck,
  User,
  Building2,
  ShieldCheck,
  BookOpen,
  Shield,
  Activity,
  Landmark
} from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  const { user } = useAuth()

  const isElevatedAdmin = user?.role === "System Admin" || user?.role === "Super Admin" || user?.role === "CEO" || user?.role === "Admin"
  const isPartnerRole = isElevatedAdmin || user?.role === "Partner" || user?.role === "Nodal Officer"

  const coreServices = [
    { label: t("navHome"), icon: Home, path: "/dashboard" },
    { label: t("navDashboard"), icon: LayoutDashboard, path: "/dashboard" },
    { label: t("navFinder"), icon: Search, path: "/finder" },
    { label: t("navEligibility"), icon: CheckCircle2, path: "/eligibility" },
    { label: t("navChat"), icon: Bot, path: "/chat" },
    { label: t("navCompare"), icon: Scale, path: "/compare" },
    { label: t("navApplications"), icon: FileCheck, path: "/applications" },
    { label: t("navProfile"), icon: User, path: "/profile" },
    { label: t("navOffices") || "Govt Office Locator", icon: Landmark, path: "/offices" }
  ]

  const governanceServices = [
    { label: t("navGazette") || "Official Gazette Rules", icon: BookOpen, path: "/status" },
    { label: t("navSecurity") || "Security & Crypto Ledger", icon: Shield, path: "/security" },
    { label: t("navStatus") || "System Health & SLA", icon: Activity, path: "/status" },
    ...(isPartnerRole ? [{ label: "Partner Portal", icon: Building2, path: "/partner" }] : []),
    ...(isElevatedAdmin ? [{ label: t("navAdmin"), icon: ShieldCheck, path: "/admin" }] : [])
  ]

  return (
    <aside className="w-64 bg-[#0d1326]/95 backdrop-blur-xl border-r border-gray-800 hidden md:flex flex-col p-4 justify-between text-xs sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto shrink-0 space-y-4">
      <div className="space-y-4">
        {/* Core Services Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-between">
            <span>Welfare Portals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          {coreServices.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path + item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500/15 to-blue-500/10 text-white border border-green-500/40 shadow-lg shadow-green-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-green-400" : "text-gray-400"} />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Governance & Compliance Section */}
        <div className="space-y-1 pt-2 border-t border-gray-800/80">
          <div className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-between">
            <span>Governance & Rules</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
          {governanceServices.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path + item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/15 to-green-500/10 text-white border border-blue-500/40 shadow-lg shadow-blue-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-blue-400" : "text-gray-400"} />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Citizen Support Quick Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#131b31] to-[#0e1526] border border-gray-800 space-y-2 text-[11px] mt-auto">
        <div className="flex items-center gap-2 text-green-400 font-extrabold text-[10px] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" /> 24/7 Citizen Helpline
        </div>
        <p className="text-gray-300 font-bold">Toll-Free: 1800-11-2026</p>
        <p className="text-[10px] text-gray-400">Regional support in 22 languages</p>
      </div>
    </aside>
  )
}