import { useNavigate, useLocation } from "react-router-dom"
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
    { label: t("navHome"), icon: Home, path: "/dashboard" },
    { label: t("navDashboard"), icon: LayoutDashboard, path: "/dashboard" },
    { label: t("navFinder"), icon: Search, path: "/finder" },
    { label: t("navEligibility"), icon: CheckCircle2, path: "/eligibility" },
    { label: t("navChat"), icon: Bot, path: "/chat" },
    { label: t("navCompare"), icon: Scale, path: "/compare" },
    { label: t("navApplications"), icon: FileCheck, path: "/applications" },
    { label: t("navProfile"), icon: User, path: "/profile" },
    { label: "Partner Portal", icon: Building2, path: "/partner" },
    { label: t("navAdmin"), icon: ShieldCheck, path: "/admin" }
  ]

  return (
    <aside className="w-64 bg-[#0d1326] border-r border-gray-800 hidden md:flex flex-col p-4 space-y-2 text-xs">
      <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        Navigation
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition ${
              isActive
                ? "bg-green-500/10 text-green-400 border border-green-500/20 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={16} className={isActive ? "text-green-400" : "text-gray-400"} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </aside>
  )
}