import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn, UserPlus, Eye } from "lucide-react"

export default function GuestModeBanner({ isGuest = true }) {
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState(false)

  if (!isGuest || dismissed) return null

  return (
    <div className="bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-indigo-900/60 p-4 rounded-3xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold shrink-0">
          <Eye size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            Anonymous Guest Exploration Mode Active
          </h4>
          <p className="text-gray-300 text-[11px] mt-0.5">
            You can freely search schemes, ask AI questions, and explore welfare rules. Login is only required to save schemes, upload documents, or submit applications.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md"
        >
          <LogIn size={14} /> Sign In
        </button>

        <button
          onClick={() => navigate("/register")}
          className="glass hover:bg-white/10 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
        >
          <UserPlus size={14} /> Create Account
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-white text-[11px] px-2"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
