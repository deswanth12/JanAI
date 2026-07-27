import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { LanguageProvider } from "./context/LanguageContext"
import { AccessibilityProvider } from "./context/AccessibilityContext"
import { SchemeProvider } from "./context/SchemeContext"
import Navbar from "./components/Navbar"
import Sidebar from "./layouts/Sidebar"
import VoiceAssistant from "./components/VoiceAssistant"
import MaintenanceModeBanner from "./components/MaintenanceModeBanner"
import BuildMetadataFooter from "./components/BuildMetadataFooter"
import { LayoutDashboard, Search, Bot, FileCheck, User } from "lucide-react"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import VerifyEmail from "./pages/VerifyEmail"
import CompleteProfile from "./pages/CompleteProfile"
import ForgotPassword from "./pages/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import SchemeFinder from "./pages/SchemeFinder"
import Eligibility from "./pages/Eligibility"
import Chat from "./pages/Chat"
import Compare from "./pages/Compare"
import Applications from "./pages/Applications"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin"
import PartnerPortal from "./partner/PartnerPortalLayout"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import SystemStatus from "./pages/SystemStatus"
import GovOfficeLocator from "./pages/GovOfficeLocator"
import SecurityPrivacy from "./pages/SecurityPrivacy"

// React Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("JanAI App Error Boundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    localStorage.clear()
    this.setState({ hasError: false, error: null })
    window.location.href = "/"
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1020] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-[#12182b] border border-gray-800 p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
            <p className="text-xs text-gray-400">
              The application encountered a display exception. Click below to clear cache and reload.
            </p>
            {this.state.error && (
              <div className="text-left bg-black/60 p-3 rounded-xl border border-red-500/30 overflow-x-auto max-h-48 text-[11px] font-mono text-red-300">
                <strong>Error: {this.state.error.name || "Error"}</strong>
                <p className="mt-1">{this.state.error.message || String(this.state.error)}</p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl text-xs transition"
            >
              Reset App Cache & Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function AppContent() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)
  const [apiUnavailable, setApiUnavailable] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Hide sidebar on landing and unauthenticated pages
  const hideSidebarRoutes = ["/", "/login", "/register", "/verify-email", "/forgot-password"]
  const showSidebar = !hideSidebarRoutes.includes(location.pathname)

  useEffect(() => {
    // Lightweight API Startup Health Probe
    fetch(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/health` : "http://localhost:8000/health")
      .then(res => {
        if (!res.ok) setApiUnavailable(true)
      })
      .catch(() => setApiUnavailable(true))
  }, [])

  const mobileNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Finder", icon: Search, path: "/finder" },
    { label: "AI Chat", icon: Bot, path: "/chat" },
    { label: "Track", icon: FileCheck, path: "/applications" },
    { label: "Profile", icon: User, path: "/profile" }
  ]

  return (
    <div className="min-h-screen bg-[#090d19] text-white flex flex-col font-sans pb-16 md:pb-0">
      <MaintenanceModeBanner isMaintenanceActive={false} />

      {/* ⚠️ API UNAVAILABLE BANNER */}
      {apiUnavailable && (
        <div className="bg-red-500/20 border-b border-red-500/40 p-2.5 text-center text-red-300 text-xs font-bold">
          ⚠️ JanAI services are operating in local offline mode.
        </div>
      )}

      <Navbar onOpenVoice={() => setIsVoiceOpen(true)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {showSidebar && <Sidebar />}

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/finder" element={<SchemeFinder />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/partner" element={<PartnerPortal />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/status" element={<SystemStatus />} />
            <Route path="/offices" element={<GovOfficeLocator />} />
            <Route path="/security" element={<SecurityPrivacy />} />
          </Routes>
        </main>
      </div>

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR (Android & iPhone Native App Bar) */}
      {showSidebar && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d1326]/95 backdrop-blur-xl border-t border-gray-800 px-2 py-2 flex items-center justify-around text-[10px]">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition ${
                  isActive ? "text-green-400 font-extrabold" : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-green-400 animate-pulse" : "text-gray-400"} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      )}

      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <BuildMetadataFooter />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <AccessibilityProvider>
              <SchemeProvider>
                <AppContent />
              </SchemeProvider>
            </AccessibilityProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}