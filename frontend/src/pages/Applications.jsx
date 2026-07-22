import { useSchemes } from "../context/SchemeContext"
import { FileCheck, CheckCircle2, Clock } from "lucide-react"

export default function Applications() {
  const { applications } = useSchemes()

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <FileCheck className="text-green-400" size={28} /> Application Tracker Pipeline
        </h1>
        <p className="text-xs text-gray-400 mt-1">Real-time status updates, milestone timelines, and document verification tracking.</p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{app.schemeTitle}</span>
                  <span className="bg-blue-500/20 text-blue-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                    {app.applicantName} ({app.relation})
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Tracking ID: <span className="font-mono text-white font-bold">{app.id}</span> • Submitted: {app.dateSubmitted}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                  {app.probabilityScore}% AI Approval Chance
                </span>
                <span className="bg-green-500 text-black font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md">
                  {app.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Milestone Timeline Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {app.trackingMilestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs space-y-1 ${
                      m.completed ? "bg-green-500/10 border-green-500/40 text-green-300" : "bg-[#12182b] border-gray-800 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>Step {idx + 1}</span>
                      {m.completed ? <CheckCircle2 size={14} className="text-green-400" /> : <Clock size={14} />}
                    </div>
                    <p className="font-medium text-white text-[11px]">{m.title}</p>
                    <p className="text-[10px] text-gray-400">{m.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
