import { useState } from "react"
import { MapPin, Phone, Clock, ExternalLink, Navigation } from "lucide-react"

export default function GovernmentOfficeFinder() {
  const [selectedOfficeType, setSelectedOfficeType] = useState("All Offices")

  const offices = [
    {
      name: "Gram Sachivalayam / Panchayat Office",
      type: "Panchayat",
      location: "Gajuwaka, Visakhapatnam, Andhra Pradesh",
      distance: "1.2 km away",
      phone: "+91 891 2748800",
      hours: "9:00 AM - 5:00 PM (Mon-Sat)",
      services: ["Income Certificate", "Caste Certificate", "Ration Card KYC"]
    },
    {
      name: "MeeSeva / Common Service Center (CSC)",
      type: "MeeSeva",
      location: "Dwaraka Nagar, Visakhapatnam, Andhra Pradesh",
      distance: "2.8 km away",
      phone: "+91 891 2569911",
      hours: "8:30 AM - 6:30 PM (Mon-Sat)",
      services: ["Aadhaar Update", "Pattadar Passbook", "Birth Certificate"]
    },
    {
      name: "Tahsildar / Revenue Office (MRO)",
      type: "Tahsildar",
      location: "MVP Colony, Visakhapatnam, Andhra Pradesh",
      distance: "4.1 km away",
      phone: "+91 891 2890044",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      services: ["Land Valuation", "Domicile Certificate", "EWS Certificate"]
    },
    {
      name: "District Collectorate Office",
      type: "Collectorate",
      location: "Maharanipeta, Visakhapatnam, Andhra Pradesh",
      distance: "6.5 km away",
      phone: "+91 891 2564801",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      services: ["Grievance Redressal (Spandana)", "Disability Pension", "District Schemes"]
    }
  ]

  const filtered = selectedOfficeType === "All Offices" ? offices : offices.filter(o => o.type === selectedOfficeType)

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
        <div>
          <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase">
            Local Civic Infrastructure
          </span>
          <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <MapPin className="text-green-400" size={22} /> Government Office Locator & Directions
          </h3>
          <p className="text-xs text-gray-400">Locate official MeeSeva, CSC, Panchayat & Tahsildar centers near Visakhapatnam</p>
        </div>

        <div className="flex bg-[#12182b] p-1 rounded-2xl border border-gray-800 text-xs font-semibold">
          {["All Offices", "MeeSeva", "Panchayat", "Tahsildar", "Collectorate"].map(t => (
            <button
              key={t}
              onClick={() => setSelectedOfficeType(t)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedOfficeType === t ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {filtered.map((office, idx) => (
          <div key={idx} className="bg-[#12182b] p-5 rounded-2xl border border-gray-800 space-y-3 hover:border-green-500/40 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded uppercase">
                  {office.type}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{office.name}</h4>
              </div>
              <span className="text-[11px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                {office.distance}
              </span>
            </div>

            <p className="text-gray-300 flex items-center gap-1.5 text-[11px]">
              <MapPin size={14} className="text-gray-400 shrink-0" /> {office.location}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 bg-[#1b2338] p-2.5 rounded-xl border border-gray-800">
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-green-400" /> {office.phone}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-yellow-400" /> {office.hours}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-gray-500 text-[10px] uppercase font-bold">Key Assistance Provided:</span>
              <div className="flex flex-wrap gap-1">
                {office.services.map((s, i) => (
                  <span key={i} className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(office.location)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-1.5"
            >
              <Navigation size={14} /> Get Turn-by-Turn Map Directions <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
