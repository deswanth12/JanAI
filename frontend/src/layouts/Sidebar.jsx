import { useNavigate, useLocation } from "react"
import { useLanguage } from "../context/LanguageContext"
import {
  LayoutDashboard,
  Search,
  CheckCircle2,
  Bot,
  FileCheck,
  Scale,
  User,
  ShieldCheck,
  Home,
  Building2
} from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()

  const navItems = [
    { label: t("navHome"), icon: Home, path: "/" },
    { label: t("navDashboard"), icon: LayoutDashboard, path: "/dashboard" },
    { label: t("navFinder"), icon: Search, path: "/finder" },
    { label: t("navEligibility"), icon: CheckCircle2, path: "/eligibility" },
    { label: t("navCopilot"), icon: Bot, path: "/chat" },
    { label: t("navApplications"), icon: FileCheck, path: "/applications" },
    { label: t("navCompare"), icon: Scale, path: "/compare" },
    { label: t("navProfile"), icon: User, path: "/profile" },
    { label: "Partner Portal", icon: Building2, path: "/partner" },
    { label: "JanAI OS (Admin)", icon: ShieldCheck, path: "/admin" }
  ]

  return (
    <aside className="hidden md:flex w-64 glass flex-col justify-between p-4 min-h-[calc(100vh-65px)] border-r border-gray-800">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          JanAI Ecosystem
        </p>

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 text-left p-3 rounded-2xl transition duration-200 text-sm font-medium ${
                isActive
                  ? "bg-green-500 text-black font-bold shadow-lg shadow-green-500/20"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-black" : "text-green-400"} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="glass p-4 rounded-2xl border border-gray-800 text-xs text-gray-400 space-y-1">
        <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
          <span>🇮🇳 JanAI Mission</span>
        </div>
        <p>Empowering 1.4 Billion Indian Citizens to discover and access government benefits seamlessly.</p>
      </div>
    </aside>
  )
}