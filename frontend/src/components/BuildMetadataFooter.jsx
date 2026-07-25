import { useState } from "react"
import { Info, Monitor, ShieldCheck, X } from "lucide-react"

export default function BuildMetadataFooter() {
  const [showAboutModal, setShowAboutModal] = useState(false)

  const buildInfo = {
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    commit: import.meta.env.VITE_GIT_COMMIT || "9d5a49a",
    buildDate: import.meta.env.VITE_BUILD_DATE || "2026-07-25",
    environment: import.meta.env.MODE || "production",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A"
  }

  return (
    <>
      <footer className="w-full border-t border-gray-800 bg-[#0b1020] py-3 px-6 text-gray-500 text-[10px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info size={12} className="text-green-400" />
          <span>JanAI National Citizen Welfare Platform</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Official Build:</span>
          <button
            onClick={() => setShowAboutModal(true)}
            className="text-green-400 hover:underline font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20"
          >
            v{buildInfo.version} (Click for About)
          </button>
        </div>
      </footer>

      {/* ℹ️ ABOUT SYSTEM BUILD DIAGNOSTIC MODAL */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 max-w-md w-full space-y-4 bg-[#12182b] text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-400" />
                <h3 className="font-bold text-sm">About JanAI System Build</h3>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="text-gray-400 hover:text-white font-bold"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="flex justify-between p-2 rounded-xl bg-[#1b2338]">
                <span className="text-gray-400">Platform Version:</span>
                <strong className="text-green-400">v{buildInfo.version}</strong>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-[#1b2338]">
                <span className="text-gray-400">Git Commit Hash:</span>
                <strong className="text-blue-400">{buildInfo.commit}</strong>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-[#1b2338]">
                <span className="text-gray-400">Build Timestamp:</span>
                <strong className="text-purple-300">{buildInfo.buildDate}</strong>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-[#1b2338]">
                <span className="text-gray-400">Active Environment:</span>
                <span className="bg-green-500/20 text-green-300 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                  {buildInfo.environment}
                </span>
              </div>

              <div className="p-3.5 bg-[#1b2338] rounded-xl space-y-1">
                <span className="text-gray-400 flex items-center gap-1.5 text-[10px]">
                  <Monitor size={12} /> Browser Details:
                </span>
                <p className="text-[10px] text-gray-300 break-all leading-tight">
                  {buildInfo.userAgent}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-full py-2.5 bg-green-500 text-black font-extrabold rounded-xl text-xs"
              >
                Close Diagnostic Info
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
