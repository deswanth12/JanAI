import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useLanguage } from "../context/LanguageContext"
import { useAccessibility } from "../context/AccessibilityContext"
import { LANGUAGES_LIST } from "../api/translations"
import { fetchHealthStatus } from "../api/backendApi"
import NotificationCenter from "./NotificationCenter"
import {
  Globe,
  Mic,
  Eye,
  Type,
  Users,
  User,
  Sparkles,
  Server,
  LogOut,
  LogIn
} from "lucide-react"

export default function Navbar({ onOpenVoice }) {
  const navigate = useNavigate()
  const { user, logout, familyMembers, activeProfile, setActiveProfile, getCurrentActiveProfileData } = useAuth()
  const { lang, changeLanguage } = useLanguage()
  const { highContrast, toggleHighContrast, textSize, cycleTextSize } = useAccessibility()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [mcpStatus, setMcpStatus] = useState("MCP 2.0 Connected")

  const activeData = getCurrentActiveProfileData()

  useEffect(() => {
    fetchHealthStatus().then(data => {
      if (data && data.mcp_protocol) {
        setMcpStatus(`${data.mcp_protocol}`)
      }
    })
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-[#0b1020]/90 backdrop-blur-md border-b border-gray-800 px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Official Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/janai-logo.jpg"
            alt="JanAI - AI Powered Citizen First Logo"
            className="h-10 w-auto rounded-xl object-contain shadow-md border border-gray-700/50 bg-white p-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-amber-400 text-transparent bg-clip-text">
                JanAI
              </h1>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-mono font-bold flex items-center gap-1">
                <Server size={10} /> {mcpStatus}
              </span>
            </div>
            <span className="text-[10px] text-green-400 font-bold tracking-tight block">
              AI POWERED. CITIZEN FIRST.
            </span>
          </div>
        </div>

        {/* Active Profile Selector (Only shown when logged in) */}
        {user && (
          <div className="hidden lg:flex items-center gap-2 bg-[#12182b] border border-gray-800 px-3 py-1.5 rounded-xl text-xs">
            <Users size={16} className="text-green-400" />
            <span className="text-gray-400">Active Profile:</span>
            {familyMembers && familyMembers.length > 0 ? (
              <select
                value={activeProfile}
                onChange={(e) => setActiveProfile(e.target.value)}
                className="bg-transparent text-white font-medium outline-none cursor-pointer"
              >
                <option value="self" className="bg-[#12182b] text-white">
                  {user.name} ({user.role || "Self"})
                </option>
                {familyMembers.map((member) => (
                  <option key={member.id} value={member.id} className="bg-[#12182b] text-white">
                    {member.name} ({member.relation})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-white font-bold">{user.name} ({user.role || "Citizen"})</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenVoice}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-black px-3 py-1.5 rounded-xl font-semibold text-xs md:text-sm hover:opacity-90 transition shadow-md"
        >
          <Mic size={16} />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>

        {/* WhatsApp & SMS Notification Center */}
        <NotificationCenter />

        {/* 22 Official Languages Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="glass p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition flex items-center gap-1.5 text-xs"
            title="Select 22 Indian Regional Languages"
          >
            <Globe size={18} className="text-blue-400" />
            <span className="hidden md:inline uppercase font-bold">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#12182b] border border-gray-700 rounded-2xl shadow-2xl p-2 z-50">
              <p className="text-[11px] text-gray-400 px-3 py-1 font-semibold uppercase border-b border-gray-800 flex justify-between items-center">
                <span>22 Scheduled Languages</span>
                <span className="text-[9px] text-green-400 font-mono">MCP Ready</span>
              </p>
              <div className="max-h-72 overflow-y-auto mt-1 space-y-1">
                {LANGUAGES_LIST.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLanguage(l.code)
                      setShowLangMenu(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-xl transition flex justify-between items-center ${
                      lang === l.code ? "bg-green-500 text-black font-bold" : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[9px] opacity-60 font-mono">{l.script}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleHighContrast}
          className={`p-2 rounded-xl transition text-xs flex items-center ${
            highContrast ? "bg-yellow-400 text-black font-bold" : "glass text-gray-300 hover:bg-white/10"
          }`}
          title="Toggle High Contrast Mode"
        >
          <Eye size={18} />
        </button>

        <button
          onClick={cycleTextSize}
          className="glass p-2 rounded-xl text-gray-300 hover:bg-white/10 transition text-xs flex items-center gap-1 font-bold"
          title={`Text Size: ${textSize}`}
        >
          <Type size={18} />
          <span className="uppercase text-[10px]">{textSize[0]}</span>
        </button>

        {/* User Account / Profile Controls */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 glass p-1.5 rounded-xl hover:bg-white/10 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-bold text-sm">
                {activeData.name ? activeData.name[0] : "U"}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#12182b] border border-gray-700 rounded-2xl shadow-2xl p-3 z-50">
                <div className="border-b border-gray-800 pb-2 mb-2">
                  <p className="font-bold text-sm text-white">{activeData.name}</p>
                  <p className="text-xs text-gray-400">{activeData.occupation || "Citizen"}</p>
                </div>
                <button
                  onClick={() => {
                    navigate("/profile")
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left p-2 text-xs rounded-xl hover:bg-white/10 text-gray-200 flex items-center gap-2"
                >
                  <User size={16} /> Profile & Family Manager
                </button>
                <button
                  onClick={() => {
                    navigate("/admin")
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left p-2 text-xs rounded-xl hover:bg-white/10 text-green-400 flex items-center gap-2 font-medium"
                >
                  <Sparkles size={16} /> Admin & MCP Portal
                </button>
                <button
                  onClick={() => {
                    logout()
                    setShowProfileMenu(false)
                    navigate("/")
                  }}
                  className="w-full text-left p-2 text-xs rounded-xl hover:bg-red-500/20 text-red-400 flex items-center gap-2 font-bold mt-1 border-t border-gray-800 pt-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md"
          >
            <LogIn size={15} /> Sign In
          </button>
        )}
      </div>
    </header>
  )
}
