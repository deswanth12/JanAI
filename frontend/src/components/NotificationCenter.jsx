import { useState } from "react"
import { Bell, MessageSquare, Smartphone, Check, X } from "lucide-react"

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [testSent, setTestSent] = useState(false)

  const notifications = [
    {
      id: "n-1",
      title: "PM-Kisan 17th Installment Alert",
      message: "₹2,000 Direct Benefit Transfer scheduled for Father. Aadhaar e-KYC verified.",
      time: "2 hours ago",
      type: "whatsapp"
    },
    {
      id: "n-2",
      title: "Post-Matric Scholarship Deadline Reminder",
      message: "Final date for application submission is 30th August 2026 for SC/ST/OBC students.",
      time: "1 day ago",
      type: "sms"
    },
    {
      id: "n-3",
      title: "Ayushman Bharat Card Generated",
      message: "Health insurance e-card generated for Lalitha (Mother) and Pavani (Sister).",
      time: "3 days ago",
      type: "system"
    }
  ]

  const sendTestAlert = () => {
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition relative"
        title="Deadline & WhatsApp Alerts"
      >
        <Bell size={18} className="text-yellow-400" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#12182b] border border-gray-700 rounded-3xl shadow-2xl p-4 z-50 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Bell size={16} className="text-yellow-400" /> WhatsApp & SMS Alert Center
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xs">
              <X size={16} />
            </button>
          </div>

          {/* Toggle Alert Preferences */}
          <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-800 space-y-2 text-xs">
            <p className="font-bold text-gray-300">Live Channels & Deadline Alerts:</p>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <MessageSquare size={14} className="text-green-400" /> WhatsApp Alerts (+91 7702256073)
              </span>
              <input
                type="checkbox"
                checked={whatsappEnabled}
                onChange={(e) => setWhatsappEnabled(e.target.checked)}
                className="accent-green-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Smartphone size={14} className="text-blue-400" /> Mobile SMS Alerts
              </span>
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
                className="accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Notification feed */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="bg-[#1b2338] p-3 rounded-xl border border-gray-800 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{n.title}</span>
                  <span className="text-[10px] text-gray-500">{n.time}</span>
                </div>
                <p className="text-gray-400 leading-relaxed text-[11px]">{n.message}</p>
              </div>
            ))}
          </div>

          {/* Test Alert Button */}
          <div className="pt-2 border-t border-gray-800">
            {testSent ? (
              <div className="bg-green-500/20 text-green-300 p-2 rounded-xl text-xs text-center font-bold flex items-center justify-center gap-1.5">
                <Check size={14} /> Test WhatsApp Alert Sent to +91 7702256073!
              </div>
            ) : (
              <button
                onClick={sendTestAlert}
                className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} /> Send Sample WhatsApp Scheme Alert
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
