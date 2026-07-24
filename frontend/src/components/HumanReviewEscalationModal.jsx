import { useState } from "react"
import { ShieldAlert, UserCheck, CheckCircle2, X } from "lucide-react"

export default function HumanReviewEscalationModal({ isOpen, onClose }) {
  const [escalated, setEscalated] = useState(false)

  if (!isOpen) return null

  const handleEscalateCase = () => {
    setEscalated(true)
    setTimeout(() => {
      onClose && onClose()
      setEscalated(false)
    }, 2000)
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
          <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Human-in-the-Loop Review Escalation</h3>
            <p className="text-gray-400 text-[11px]">Sub-85% AI confidence detected ➔ Assigning to Nodal Officer / CSC Verifier</p>
          </div>
        </div>

        <div className="bg-[#1b2338] p-4 rounded-2xl border border-yellow-500/30 space-y-2 text-yellow-300">
          <div className="flex justify-between items-center font-bold">
            <span>AI Confidence Score: 78.2%</span>
            <span className="text-[10px] bg-yellow-500/20 px-2 py-0.5 rounded">Low Grounding Margin</span>
          </div>
          <p className="text-gray-300 text-[11px]">
            The Gazette rule regarding land subdivision (0.85 acres vs 1.0 acre limit) requires physical verification by a Human Nodal Officer to eliminate incorrect advice risk.
          </p>
        </div>

        {escalated ? (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-center space-y-1 text-green-400">
            <CheckCircle2 size={24} className="mx-auto" />
            <h4 className="font-bold">Case Assigned to Visakhapatnam MRO Nodal Officer!</h4>
            <p className="text-gray-300 text-[11px]">Citizen will receive SMS notification once verified by human officer.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-[#12182b] p-3 rounded-xl border border-gray-800 text-gray-400 text-[11px] space-y-1">
              <p><strong className="text-white">Assigned Verifier:</strong> Sri K. Rao (Gram Sachivalayam VRO)</p>
              <p><strong className="text-white">SLA Turnaround:</strong> 24 Hours</p>
            </div>

            <button
              onClick={handleEscalateCase}
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition flex items-center justify-center gap-2"
            >
              <UserCheck size={18} /> Escalate Case to Human Verifier
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
