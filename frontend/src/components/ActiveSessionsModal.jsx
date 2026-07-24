import { useState } from "react"
import { Monitor, Smartphone, LogOut, X } from "lucide-react"

export default function ActiveSessionsModal({ isOpen, onClose }) {
  const [sessions, setSessions] = useState([
    {
      id: "sess-1",
      device: "Windows 11 PC",
      browser: "Chrome 126",
      location: "Visakhapatnam, AP",
      ip: "157.48.91.12",
      isCurrent: true,
      lastActive: "Active Now"
    },
    {
      id: "sess-2",
      device: "Android 14 Mobile App",
      browser: "JanAI Native App",
      location: "Hyderabad, TS",
      ip: "106.208.45.88",
      isCurrent: false,
      lastActive: "Yesterday, 14:20 IST"
    }
  ])

  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const handleRevokeAllOtherSessions = () => {
    setSessions(sessions.filter(s => s.isCurrent))
    setMessage("Logged out from all other active devices successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-6 text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass p-2 rounded-full text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <Monitor size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Active Device Sessions</h3>
            <p className="text-gray-400 text-[11px]">Manage logged-in devices and revoke unauthorized access</p>
          </div>
        </div>

        {message && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 font-bold text-center">
            {message}
          </div>
        )}

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div key={sess.id} className="p-3.5 bg-[#1b2338] rounded-2xl border border-gray-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-800 text-gray-300">
                  {sess.device.includes("Android") || sess.device.includes("Mobile") ? (
                    <Smartphone size={20} />
                  ) : (
                    <Monitor size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-xs">{sess.device}</strong>
                    {sess.isCurrent && (
                      <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">
                        Current Device
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-[11px] mt-0.5">{sess.browser} • {sess.location} • <span className="font-mono text-gray-300">{sess.ip}</span></p>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Last Active: {sess.lastActive}</p>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  onClick={() => setSessions(sessions.filter(s => s.id !== sess.id))}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-xl text-xs font-bold transition"
                  title="Revoke Session"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
          <button
            onClick={handleRevokeAllOtherSessions}
            className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Logout From All Other Devices
          </button>
        </div>
      </div>
    </div>
  )
}
