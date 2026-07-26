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
  const { user, logout, familyMembers, activeProfile, setActiveProfile } = useAuth()
  const { lang, changeLanguage } = useLanguage()
  const { highContrast, toggleHighContrast, textSize, cycleTextSize } = useAccessibility()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [mcpStatus, setMcpStatus] = useState("MCP 2.0 Connected")

  useEffect(() => {
    fetchHealthStatus().then(data => {
      if (data && data.mcp_protocol) {
        setMcpStatus(`${data.mcp_protocol}`)
      }
    })
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-[#090d19]/95 backdrop-blur-xl border-b border-gray-800 px-3 md:px-8 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Official Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => navigate("/")}>
          <img
            src="/janai-logo.jpg"
            alt="JanAI Logo"
            className="h-8 md:h-10 w-auto rounded-xl object-contain shadow-md border border-gray-700/50 bg-white p-0.5"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-blue-400 via-green-400 to-amber-400 text-transparent bg-clip-text leading-none">
                JanAI
              </h1>
              <span className="hidden sm:inline-flex text-[9px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-mono font-bold items-center gap-1">
                <Server size={9} /> {mcpStatus}
              </span>
            </div>
            <span className="hidden sm:block text-[9px] text-green-400 font-bold tracking-tight mt-0.5">
              AI POWERED. CITIZEN FIRST.
            </span>
          </div>
        </div>

        {/* Active Profile Selector (Desktop Only) */}
        {user && (
          <div className="hidden lg:flex items-center gap-2 bg-[#12182b] border border-gray-800 px-3 py-1.5 rounded-xl text-xs">
            <Users size={15} className="text-green-400" />
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

      <div className="flex items-center gap-1.5 md:gap-2.5">
        {/* Voice Assistant Button */}
        <button
          onClick={onOpenVoice}
          className="flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-black px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-xl font-extrabold text-xs hover:opacity-90 transition shadow-lg shadow-green-500/20"
        >
          <Mic size={15} />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 bg-[#12182b] hover:bg-gray-800 text-gray-300 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl border border-gray-800 text-xs transition"
          >
            <Globe size={15} />
            <span className="uppercase font-bold text-[11px]">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#12182b] border border-gray-800 rounded-2xl shadow-2xl z-50 p-1.5 space-y-1 text-xs">
              {LANGUAGES_LIST.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLanguage(l.code)
                    setShowLangMenu(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                    lang === l.code ? "bg-green-500/20 text-green-400 font-bold" : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <span>{l.name}</span>
                  <span className="text-[10px] text-gray-500 uppercase">{l.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Accessibility Tools (Desktop Only) */}
        <div className="hidden md:flex items-center gap-1 border-l border-gray-800 pl-2">
          <button
            onClick={toggleHighContrast}
            title="Toggle High Contrast Mode"
            className={`p-2 rounded-xl border transition ${
              highContrast ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-[#12182b] text-gray-400 border-gray-800 hover:text-white"
            }`}
          >
            <Eye size={15} />
          </button>

          <button
            onClick={cycleTextSize}
            title="Cycle Text Size"
            className="p-2 rounded-xl bg-[#12182b] text-gray-400 border border-gray-800 hover:text-white transition flex items-center gap-0.5 text-[10px] font-bold"
          >
            <Type size={15} />
            <span className="uppercase">{textSize.slice(0, 1)}</span>
          </button>
        </div>

        {/* Profile Dropdown Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-black font-extrabold flex items-center justify-center text-xs shadow-md border border-green-400/50"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#12182b] border border-gray-800 rounded-2xl shadow-2xl z-50 p-4 space-y-3 text-xs">
                <div className="border-b border-gray-800 pb-2.5">
                  <p className="font-bold text-white text-sm">{user.name}</p>
                  <p className="text-[11px] text-gray-400">{user.email || user.phone}</p>
                  <span className="inline-block bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md text-[10px] font-bold mt-1 uppercase">
                    {user.role || "Citizen"}
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      navigate("/profile")
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition flex items-center gap-2"
                  >
                    <User size={15} /> Profile & Family Manager
                  </button>

                  {(user?.role === "System Admin" || user?.role === "Super Admin" || user?.role === "CEO" || user?.role === "Admin") && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        navigate("/admin")
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition flex items-center gap-2"
                    >
                      <Sparkles size={15} className="text-amber-400" /> Admin & MCP Portal
                    </button>
                  )}
                </div>

                <div className="border-t border-gray-800 pt-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false)
                      logout()
                      navigate("/")
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition flex items-center gap-2"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition"
          >
            <LogIn size={15} /> Sign In
          </button>
        )}
      </div>
    </header>
  )
}
