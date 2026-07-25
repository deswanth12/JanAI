import { Info } from "lucide-react"

export default function BuildMetadataFooter() {
  const buildInfo = {
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    commit: import.meta.env.VITE_GIT_COMMIT || "ed0d3c9",
    buildDate: import.meta.env.VITE_BUILD_DATE || "2026-07-25",
    environment: import.meta.env.MODE || "production"
  }

  return (
    <footer className="w-full border-t border-gray-800 bg-[#0b1020] py-4 px-6 text-gray-500 text-[10px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Info size={12} className="text-green-400" />
        <span>JanAI Citizen Welfare Platform • Official v{buildInfo.version}</span>
      </div>

      <div className="flex items-center gap-3">
        <span>Commit: <strong className="text-gray-300">{buildInfo.commit}</strong></span>
        <span>•</span>
        <span>Built: <strong className="text-gray-300">{buildInfo.buildDate}</strong></span>
        <span>•</span>
        <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded uppercase font-bold text-[9px]">
          {buildInfo.environment}
        </span>
      </div>
    </footer>
  )
}
