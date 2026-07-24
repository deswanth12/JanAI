import { useState } from "react"
import { Sliders } from "lucide-react"

export default function FeatureFlagManager() {
  const [flags, setFlags] = useState([
    { key: "voice_agent_v2", name: "AI Vernacular Voice Agent", rolloutPct: 25, enabled: true },
    { key: "digilocker_oauth", name: "MeitY DigiLocker Gateway", rolloutPct: 100, enabled: true },
    { key: "real_ocr_tamper", name: "Real OCR & Blur Detector", rolloutPct: 50, enabled: true },
    { key: "autonomous_goal_agent", name: "JanAI Autonomous Goal Agent", rolloutPct: 10, enabled: true }
  ])

  const toggleFlag = (key) => {
    setFlags(flags.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f))
  }

  const updateRollout = (key, val) => {
    setFlags(flags.map(f => f.key === key ? { ...f, rolloutPct: parseInt(val, 10) } : f))
  }

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full uppercase">
            Progressive Feature Rollout Engine
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <Sliders size={16} className="text-purple-400" /> Operational Feature Flag Controller
          </h4>
        </div>

        <span className="text-[10px] text-green-400 bg-green-500/20 px-2.5 py-1 rounded-xl font-mono font-bold">
          4 Active Canary Flags
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {flags.map((flag) => (
          <div key={flag.key} className="bg-[#12182b] p-3.5 rounded-2xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">{flag.name}</span>
              <input
                type="checkbox"
                checked={flag.enabled}
                onChange={() => toggleFlag(flag.key)}
                className="accent-green-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Canary Traffic Allocation</span>
                <strong className="text-purple-400 font-mono">{flag.rolloutPct}% of Users</strong>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={flag.rolloutPct}
                onChange={(e) => updateRollout(flag.key, e.target.value)}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
