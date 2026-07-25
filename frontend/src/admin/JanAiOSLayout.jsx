import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import ExecutiveDashboard from "./ExecutiveDashboard"
import UserManagement from "./UserManagement"
import SchemeManagement from "./SchemeManagement"
import AiControlCenter from "./AiControlCenter"
import DocumentVerificationHub from "./DocumentVerificationHub"
import AnalyticsEngine from "./AnalyticsEngine"
import SecurityCenter from "./SecurityCenter"
import SystemSettings from "./SystemSettings"
import ApPilotDashboard from "./ApPilotDashboard"
import {
  BarChart3,
  Users,
  FileText,
  Bot,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Settings,
  Lock,
  Crown,
  MapPin
} from "lucide-react"

export default function JanAiOSLayout() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("pilot")

  // Simulate Current User Role (Default to CEO for full demonstration)
  const [userRole, setUserRole] = useState(user?.role === "Admin" ? "CEO" : "CEO")

  const roleBadges = {
    CEO: { label: "👑 CEO (Full Control)", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    Admin: { label: "🏢 System Admin", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
    Manager: { label: "👨‍💼 Verification Manager", color: "bg-green-500/20 text-green-300 border-green-500/40" },
    Moderator: { label: "🛡️ AI Moderator", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" }
  }

  const tabs = [
    { id: "pilot", label: "AP Pilot Telemetry", icon: MapPin, roles: ["CEO", "Admin", "Manager", "Moderator"] },
    { id: "executive", label: "Executive Dashboard", icon: BarChart3, roles: ["CEO", "Admin"] },
    { id: "users", label: "User Management", icon: Users, roles: ["CEO", "Admin", "Manager"] },
    { id: "schemes", label: "Scheme Management", icon: FileText, roles: ["CEO", "Admin", "Manager"] },
    { id: "ai", label: "AI & RAG Control", icon: Bot, roles: ["CEO", "Admin", "Moderator"] },
    { id: "verification", label: "Document Verification", icon: FileCheck, roles: ["CEO", "Admin", "Manager", "Moderator"] },
    { id: "analytics", label: "Analytics & Growth", icon: TrendingUp, roles: ["CEO", "Admin", "Manager"] },
    { id: "security", label: "Security Center", icon: ShieldCheck, roles: ["CEO", "Admin"] },
    { id: "settings", label: "System Settings", icon: Settings, roles: ["CEO"], isCeoOnly: true }
  ]

  const accessibleTabs = tabs.filter(t => t.roles.includes(userRole))

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Role Switcher Banner */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase border border-purple-500/30 flex items-center gap-1">
              <Crown size={12} /> JanAI OS v1.0 Enterprise Internal Operating System
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full font-bold">
              Isolated Admin Route (/admin)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">JanAI OS — Enterprise Command Center</h1>
          <p className="text-xs text-gray-400 mt-1">
            Citizens use JanAI • Your team runs JanAI OS
          </p>
        </div>

        {/* Role Simulator & System Health Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#12182b] p-2.5 rounded-2xl border border-gray-800 flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-semibold">Active Role:</span>
            <select
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value)
                setActiveTab("pilot")
              }}
              className="bg-transparent text-white font-bold outline-none cursor-pointer"
            >
              <option value="CEO" className="bg-[#12182b] text-white">👑 CEO (Full Access)</option>
              <option value="Admin" className="bg-[#12182b] text-white">🏢 System Admin</option>
              <option value="Manager" className="bg-[#12182b] text-white">👨‍💼 Verification Manager</option>
              <option value="Moderator" className="bg-[#12182b] text-white">🛡️ AI Moderator</option>
            </select>
          </div>

          <span className={`text-xs px-3 py-2 rounded-2xl font-bold border ${roleBadges[userRole].color}`}>
            {roleBadges[userRole].label}
          </span>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex bg-[#12182b] p-1.5 rounded-2xl border border-gray-800 overflow-x-auto text-xs gap-1">
        {accessibleTabs.map((t) => {
          const Icon = t.icon
          const isActive = activeTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              <span>{t.label}</span>
              {t.isCeoOnly && (
                <span className="text-[9px] bg-purple-400/20 text-purple-300 font-mono px-1.5 py-0.2 rounded font-extrabold ml-1">
                  CEO
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Dynamic Module Render */}
      <div className="min-h-[600px]">
        {activeTab === "pilot" && <ApPilotDashboard />}
        {activeTab === "executive" && <ExecutiveDashboard />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "schemes" && <SchemeManagement />}
        {activeTab === "ai" && <AiControlCenter />}
        {activeTab === "verification" && <DocumentVerificationHub />}
        {activeTab === "analytics" && <AnalyticsEngine />}
        {activeTab === "security" && <SecurityCenter />}
        {activeTab === "settings" && (
          userRole === "CEO" ? <SystemSettings /> : (
            <div className="p-12 glass rounded-3xl text-center space-y-3">
              <Lock size={36} className="mx-auto text-red-400" />
              <h3 className="text-xl font-bold text-white">CEO Permission Required</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                System settings, feature flags, key rotation, and maintenance mode are strictly restricted to the CEO role.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
