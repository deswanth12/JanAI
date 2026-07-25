import { useState } from "react"
import { MapPin, Award } from "lucide-react"

export default function AnalyticsEngine() {
  const [districtStats] = useState([
    { district: "Visakhapatnam (AP)", activeUsers: 4810, appsSubmitted: 42, topScheme: "Post-Matric Scholarship" },
    { district: "Hyderabad (TS)", activeUsers: 3912, appsSubmitted: 38, topScheme: "PM Mudra Yojana" },
    { district: "Vijayawada (AP)", activeUsers: 2840, appsSubmitted: 24, topScheme: "PM-Kisan Samman Nidhi" },
    { district: "Guntur (AP)", activeUsers: 1910, appsSubmitted: 17, topScheme: "Ayushman Bharat" }
  ])

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">Platform Analytics & District Telemetry</h3>
          <p className="text-gray-400 text-xs">State-wise, district-wise citizen adoption, scheme popularity, and processing latency</p>
        </div>

        <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-3 py-1 rounded-full font-bold">
          Latency: 112ms P95
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* District Telemetry Table */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin size={16} className="text-green-400" /> District-Wise Active Adoption
          </h4>

          <div className="space-y-3">
            {districtStats.map((d, idx) => (
              <div key={idx} className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-white block">{d.district}</strong>
                  <span className="text-gray-400 text-[10px]">Top Scheme: {d.topScheme}</span>
                </div>

                <div className="text-right font-mono">
                  <div className="text-green-400 font-bold">{d.activeUsers.toLocaleString()} Users</div>
                  <div className="text-gray-400 text-[10px]">{d.appsSubmitted} Applications</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheme Popularity & Processing Time */}
        <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Award size={16} className="text-yellow-400" /> Scheme Popularity Index
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>1. Post-Matric Scholarship Scheme</span>
              <strong className="text-purple-400 font-mono">38.4% Searches</strong>
            </div>

            <div className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>2. PM-Kisan Samman Nidhi</span>
              <strong className="text-green-400 font-mono">29.1% Searches</strong>
            </div>

            <div className="p-3.5 bg-[#12182b] rounded-2xl border border-gray-800 flex justify-between items-center">
              <span>3. PM Mudra Yojana (Tarun Plus)</span>
              <strong className="text-yellow-400 font-mono">21.5% Searches</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
