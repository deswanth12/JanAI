import { useState } from "react"
import { MapPin, Phone, Clock, Navigation, Search, Building2, Landmark, ChevronDown, ChevronUp } from "lucide-react"

// Comprehensive database of government offices across key districts
const GOVT_OFFICES = [
  {
    id: "go-1",
    name: "District Collectorate — Visakhapatnam",
    type: "District Administration",
    address: "Collectorate Complex, Near RTC Complex, Visakhapatnam, Andhra Pradesh 530002",
    phone: "+91 891 2564001",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: ["Land Records & Revenue", "Income & Caste Certificates", "Aadhaar Enrollment", "Grievance Redressal", "Disaster Management"],
    mapsUrl: "https://maps.google.com/?q=District+Collectorate+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-2",
    name: "Tahsildar Office — Visakhapatnam Rural",
    type: "Revenue & Certificates",
    address: "Tahsildar Office, Pendurthi, Visakhapatnam, AP 531173",
    phone: "+91 891 2796100",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: ["Income Certificate", "Caste Certificate", "Residence Certificate", "Land Mutation / Pattadar Passbook", "No Objection Certificate (NOC)"],
    mapsUrl: "https://maps.google.com/?q=Tahsildar+Office+Pendurthi+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-3",
    name: "MeeSeva / CSC Common Service Centre",
    type: "Citizen Service Centre",
    address: "CSC Centre, Gajuwaka Junction, Visakhapatnam, AP 530026",
    phone: "+91 891 2555600",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    services: ["Aadhaar Update & Enrollment", "PAN Card Application", "Passport Seva", "Electricity Bill Payment", "Land Registration Slot Booking", "PM-Kisan Registration"],
    mapsUrl: "https://maps.google.com/?q=CSC+Centre+Gajuwaka+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-4",
    name: "Village / Ward Secretariat — Madhurawada",
    type: "Village Secretariat",
    address: "Village Secretariat, Madhurawada, Visakhapatnam, AP 530048",
    phone: "+91 891 2750100",
    hours: "Mon–Sat: 9:30 AM – 5:30 PM",
    services: ["Welfare Scheme Applications (NTR Bharosa, YSR Pension)", "Birth & Death Certificates", "Ration Card Service", "MGNREGA Job Card", "Voter ID Registration"],
    mapsUrl: "https://maps.google.com/?q=Ward+Secretariat+Madhurawada+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-5",
    name: "District Employment Exchange Office",
    type: "Employment & Skill",
    address: "Employment Exchange, Dwaraka Nagar, Visakhapatnam, AP 530016",
    phone: "+91 891 2564020",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: ["Employment Registration", "Skill Development Training", "Job Fair Notifications", "PMEGP/MUDRA Referral", "Unemployment Certificate"],
    mapsUrl: "https://maps.google.com/?q=Employment+Exchange+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-6",
    name: "Sub-Registrar Office (SRO) — Visakhapatnam",
    type: "Registration & Stamps",
    address: "SRO Office, Seethammadhara, Visakhapatnam, AP 530013",
    phone: "+91 891 2564050",
    hours: "Mon–Sat: 10:00 AM – 4:30 PM",
    services: ["Property Registration", "Sale / Gift Deed Registration", "Encumbrance Certificate (EC)", "Marriage Registration", "Stamp Duty Payment"],
    mapsUrl: "https://maps.google.com/?q=Sub+Registrar+Office+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-7",
    name: "District Collectorate — Tirupati",
    type: "District Administration",
    address: "Collectorate Complex, Tirupati, Andhra Pradesh 517501",
    phone: "+91 877 2233500",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: ["Land Records & Revenue", "Income & Caste Certificates", "Aadhaar Enrollment", "Grievance Redressal"],
    mapsUrl: "https://maps.google.com/?q=District+Collectorate+Tirupati",
    state: "Andhra Pradesh",
    district: "Tirupati"
  },
  {
    id: "go-8",
    name: "MRO / Mandal Revenue Office — Hyderabad",
    type: "Revenue & Certificates",
    address: "MRO Office, Secunderabad, Hyderabad, Telangana 500003",
    phone: "+91 40 2770 1234",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: ["Income Certificate", "Caste Certificate (OBC/SC/ST)", "Residence Certificate", "Dharani Land Record Update", "Pahani / ROR Extract"],
    mapsUrl: "https://maps.google.com/?q=MRO+Office+Secunderabad+Hyderabad",
    state: "Telangana",
    district: "Hyderabad"
  },
  {
    id: "go-9",
    name: "Passport Seva Kendra (PSK) — Visakhapatnam",
    type: "Passport & Visa",
    address: "Passport Seva Kendra, Siripuram, Visakhapatnam, AP 530003",
    phone: "+91 891 2564080",
    hours: "Mon–Fri: 9:30 AM – 5:30 PM (By Appointment)",
    services: ["Fresh Passport Application", "Passport Renewal", "Tatkaal Passport", "Police Verification Status", "Passport Document Correction"],
    mapsUrl: "https://maps.google.com/?q=Passport+Seva+Kendra+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  },
  {
    id: "go-10",
    name: "Regional Transport Office (RTO)",
    type: "Transport & Licensing",
    address: "RTO Office, Kancharapalem, Visakhapatnam, AP 530008",
    phone: "+91 891 2564070",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: ["Driving License (Learner's & Permanent)", "Vehicle Registration (RC)", "Vehicle Transfer", "Fitness Certificate", "International Driving Permit"],
    mapsUrl: "https://maps.google.com/?q=RTO+Office+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam"
  }
]

const OFFICE_TYPES = ["All Types", "District Administration", "Revenue & Certificates", "Citizen Service Centre", "Village Secretariat", "Employment & Skill", "Registration & Stamps", "Passport & Visa", "Transport & Licensing"]
const STATES = ["All States", "Andhra Pradesh", "Telangana"]
const DISTRICTS = ["All Districts", "Visakhapatnam", "Tirupati", "Hyderabad"]

export default function GovOfficeLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts")
  const [expandedOffice, setExpandedOffice] = useState(null)

  const filteredOffices = GOVT_OFFICES.filter((office) => {
    const matchesQuery =
      office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "All Types" || office.type === selectedType
    const matchesState = selectedState === "All States" || office.state === selectedState
    const matchesDistrict = selectedDistrict === "All Districts" || office.district === selectedDistrict
    return matchesQuery && matchesType && matchesState && matchesDistrict
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case "District Administration": return "🏛️"
      case "Revenue & Certificates": return "📜"
      case "Citizen Service Centre": return "🖥️"
      case "Village Secretariat": return "🏘️"
      case "Employment & Skill": return "💼"
      case "Registration & Stamps": return "📋"
      case "Passport & Visa": return "🛂"
      case "Transport & Licensing": return "🚗"
      default: return "🏢"
    }
  }

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "District Administration": return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Revenue & Certificates": return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "Citizen Service Centre": return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Village Secretariat": return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Employment & Skill": return "bg-pink-500/20 text-pink-300 border-pink-500/30"
      case "Registration & Stamps": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "Passport & Visa": return "bg-red-500/20 text-red-300 border-red-500/30"
      case "Transport & Licensing": return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6 text-xs pb-12">
      {/* Header */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-gray-800 space-y-4 bg-gradient-to-r from-[#0e1628] via-[#121c35] to-[#0f182e]">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/30">
            Local Civic Infrastructure
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-2 flex items-center gap-3">
            <Landmark size={28} className="text-blue-400" /> Government Office Locator
          </h1>
          <p className="text-gray-400 text-xs">
            Find nearby government offices — District Collectorate, Tahsildar, MeeSeva / CSC Centre, Ward Secretariat, RTO, Passport Seva — with addresses, phone numbers, services, and Google Maps directions.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by office name, service, or area e.g. 'Income Certificate', 'Passport'..."
            className="w-full bg-[#12182b] border border-gray-700 rounded-2xl pl-11 pr-4 py-3 text-white text-xs outline-none focus:border-blue-400 transition"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-gray-400 block mb-1 font-medium">Office Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
            >
              {OFFICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1 font-medium">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
            >
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-400 block mb-1 font-medium">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
            >
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Showing <strong className="text-white">{filteredOffices.length}</strong> government offices</span>
        <span className="text-[10px] bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full font-bold border border-green-500/30">
          📍 Civic Infrastructure Database
        </span>
      </div>

      {/* Office Cards */}
      <div className="space-y-4">
        {filteredOffices.map((office) => {
          const isExpanded = expandedOffice === office.id
          return (
            <div key={office.id} className="glass rounded-3xl border border-gray-800 overflow-hidden hover:border-blue-500/30 transition">
              {/* Card Header */}
              <div
                className="p-5 cursor-pointer flex items-start justify-between gap-4"
                onClick={() => setExpandedOffice(isExpanded ? null : office.id)}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="text-2xl shrink-0 mt-0.5">{getTypeIcon(office.type)}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${getTypeBadgeColor(office.type)}`}>
                        {office.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-tight">{office.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-1 flex items-start gap-1">
                      <MapPin size={12} className="text-blue-400 shrink-0 mt-0.5" /> {office.address}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">
                  {/* Contact & Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 flex items-center gap-2.5">
                      <Phone size={16} className="text-green-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Phone</p>
                        <a href={`tel:${office.phone.replace(/\s+/g, "")}`} className="text-green-300 font-bold text-xs hover:underline">{office.phone}</a>
                      </div>
                    </div>
                    <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 flex items-center gap-2.5">
                      <Clock size={16} className="text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Working Hours</p>
                        <p className="text-amber-300 font-bold text-xs">{office.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2">
                    <h4 className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Services Available at This Office:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, i) => (
                        <span key={i} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-1 rounded-xl text-[10px] font-medium">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                      <Navigation size={14} /> Get Directions
                    </a>
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 font-bold rounded-2xl text-xs transition border border-green-500/40 flex items-center justify-center gap-2"
                    >
                      <Phone size={14} /> Call Office
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Helpful Note */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-start gap-3 text-xs text-blue-300">
        <Building2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-200">Tip: Carry all required documents when visiting a government office.</p>
          <p className="text-[11px] text-blue-300/70 mt-0.5">
            Before visiting, check the "How to Apply" guide in <strong>AI Scheme Finder</strong> for the specific documents you'll need. Most offices require Aadhaar Card, passport photos, and relevant certificates.
          </p>
        </div>
      </div>
    </div>
  )
}
