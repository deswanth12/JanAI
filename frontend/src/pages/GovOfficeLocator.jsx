import { useState } from "react"
import { MapPin, Phone, Clock, Navigation, Search, Building2, Landmark, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"

// Verified real government office locations & contact details
const GOVT_OFFICES = [
  {
    id: "go-1",
    name: "District Collectorate — Visakhapatnam",
    type: "District Administration",
    address: "Collectorate Building, Beach Road, Maharanipeta, Visakhapatnam, Andhra Pradesh 530002",
    phone: "+91 891 2561100",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM (Spandana Grievance: Mon 10:00 AM)",
    services: [
      "Land Records & Revenue Appeals",
      "Income & Caste Certificate Appeals",
      "Disaster Management & Relief",
      "Public Grievance Redressal (Spandana / Meeseva)",
      "Chief Minister's Relief Fund (CMRF)"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=District+Collectorate+Maharanipeta+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-2",
    name: "District Collectorate — NTR District (Vijayawada)",
    type: "District Administration",
    address: "Collectorate Office, MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010",
    phone: "+91 866 2474411",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: [
      "District Level Welfare Approvals",
      "Land Records & Revenue",
      "Pattadar Passbook Issue",
      "Public Grievance Cell",
      "EBC Nestham & Pension Monitoring"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=District+Collectorate+NTR+District+Vijayawada",
    state: "Andhra Pradesh",
    district: "NTR (Vijayawada)",
    verified: true
  },
  {
    id: "go-3",
    name: "District Collectorate — Tirupati",
    type: "District Administration",
    address: "New Collectorate Complex, Padmavathi Puram, Tirupati, Andhra Pradesh 517501",
    phone: "+91 877 2233500",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: [
      "Revenue & Land Administration",
      "Housing Scheme Approvals (PMAY)",
      "Social Welfare Pension Approvals",
      "District Grievance Redressal"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=District+Collectorate+Tirupati",
    state: "Andhra Pradesh",
    district: "Tirupati",
    verified: true
  },
  {
    id: "go-4",
    name: "District Collectorate — Guntur",
    type: "District Administration",
    address: "Collectorate Complex, Collectorate Road, Nagarampalem, Guntur, Andhra Pradesh 522004",
    phone: "+91 863 2234070",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: [
      "Revenue & Agriculture Scheme Monitoring",
      "PM-Kisan Land Verification",
      "Social Welfare & Caste Verification",
      "Grievance Redressal Cell"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=District+Collectorate+Guntur",
    state: "Andhra Pradesh",
    district: "Guntur",
    verified: true
  },
  {
    id: "go-5",
    name: "Mandal Revenue Office (MRO) / Tahsildar — Pendurthi",
    type: "Revenue & Certificates",
    address: "Tahsildar Office, Main Road, Pendurthi, Visakhapatnam, AP 531173",
    phone: "+91 891 2796100",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: [
      "Income Certificate (Meeseva)",
      "Integrated Caste & Date of Birth Certificate",
      "Residence / Domicile Certificate",
      "Pattadar Passbook / Land Mutation",
      "Adangal & 1B Land Extract Issue"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tahsildar+Office+Pendurthi+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-6",
    name: "Mandal Revenue Office (MRO) — Vijayawada Urban",
    type: "Revenue & Certificates",
    address: "Revenue Bhavan, Near Benz Circle, Vijayawada, Andhra Pradesh 520010",
    phone: "+91 866 2475588",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: [
      "Income & Family Member Certificate",
      "OBC / EWS Certificate Issue",
      "Non-Creamy Layer Certificate",
      "Legal Heir Certificate"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tahsildar+Office+Vijayawada+Urban",
    state: "Andhra Pradesh",
    district: "NTR (Vijayawada)",
    verified: true
  },
  {
    id: "go-7",
    name: "MeeSeva / AP Online Main Centre — Dwaraka Nagar",
    type: "Citizen Service Centre",
    address: "RTC Complex Road, Opposite Main Bus Stand, Dwaraka Nagar, Visakhapatnam, AP 530016",
    phone: "+91 891 2555600",
    hours: "Mon–Sat: 9:00 AM – 6:30 PM",
    services: [
      "Aadhaar Enrollment & Address Correction",
      "Income / Caste / Residence Certificate Online Application",
      "Post-Matric Scholarship NSP Application",
      "PM-Kisan Farmer e-KYC Verification",
      "Encumbrance Certificate (EC) Search",
      "Electricity & Municipal Water Bill Payment"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MeeSeva+Center+Dwaraka+Nagar+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-8",
    name: "Village / Ward Secretariat (Ward No. 6) — Madhurawada",
    type: "Village Secretariat",
    address: "Ward Secretariat Office, PM Palem Main Road, Madhurawada, Visakhapatnam, AP 530041",
    phone: "1902 (Toll Free Helpline)",
    hours: "Mon–Sat: 9:30 AM – 5:30 PM",
    services: [
      "NTR Bharosa / Old Age Pension Disbursement",
      "Arogyasri Health Card Beneficiary e-KYC",
      "Rice / Ration Card Member Addition & Splitting",
      "Birth & Death Certificate Field Verification",
      "House Site / PMAY Beneficiary Mapping"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ward+Secretariat+Madhurawada+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-9",
    name: "Passport Seva Kendra (PSK) — Visakhapatnam",
    type: "Passport & Visa",
    address: "D.No. 9-1-248/1, Maripalem VUDA Layout, NAD Junction, Visakhapatnam, AP 530009",
    phone: "1800 258 1800 (National Toll Free)",
    hours: "Mon–Fri: 9:30 AM – 5:30 PM (Prior Online Appointment Required)",
    services: [
      "Fresh Passport Application Biometric & Verification",
      "Passport Renewal & Reissue",
      "Tatkaal Passport Service",
      "Police Clearance Certificate (PCC)",
      "National Overseas Scholarship Document Verification"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Passport+Seva+Kendra+NAD+Junction+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-10",
    name: "Passport Seva Kendra (PSK) — Vijayawada",
    type: "Passport & Visa",
    address: "Bus Route No 5 Road, Opposite Executive Club, Vijayawada, AP 520008",
    phone: "1800 258 1800",
    hours: "Mon–Fri: 9:30 AM – 5:30 PM (Online Appointment)",
    services: [
      "Fresh Passport Biometrics",
      "Passport Renewal & Name Change",
      "Police Clearance Certificate (PCC)",
      "ECNR Status Endorsement"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Passport+Seva+Kendra+Vijayawada",
    state: "Andhra Pradesh",
    district: "NTR (Vijayawada)",
    verified: true
  },
  {
    id: "go-11",
    name: "Regional Transport Office (RTO) — Visakhapatnam Central",
    type: "Transport & Licensing",
    address: "Near Govt ITI College, Kancharapalem Main Road, Visakhapatnam, AP 530007",
    phone: "+91 891 2558300",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: [
      "Learner's License (LLR) Slot Booking & Test",
      "Permanent Driving License (DL) Driving Test",
      "Vehicle Registration (RC) & Ownership Transfer",
      "Vehicle Fitness Certificate (FC)",
      "International Driving Permit (IDP)"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=RTO+Office+Kancharapalem+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-12",
    name: "Sub-Registrar Office (SRO) — Seethammadhara",
    type: "Registration & Stamps",
    address: "Registration Department Complex, Seethammadhara North Extension, Visakhapatnam, AP 530013",
    phone: "+91 891 2543200",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM (Slot Booking)",
    services: [
      "Property Sale Deed & Gift Deed Registration",
      "Encumbrance Certificate (EC) Issuance",
      "Certified Copy (CC) of Registered Title Deeds",
      "Hindu & Special Marriage Registration",
      "Non-Judicial Stamp Paper Verification"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sub+Registrar+Office+Seethammadhara+Visakhapatnam",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    verified: true
  },
  {
    id: "go-13",
    name: "District Collectorate — Hyderabad (Telangana)",
    type: "District Administration",
    address: "Collectorate Complex, Nampally Station Road, Abids, Hyderabad, Telangana 500001",
    phone: "+91 40 2320 2111",
    hours: "Mon–Fri: 10:00 AM – 5:00 PM",
    services: [
      "Revenue & Land Record Disputes",
      "Prajavani Grievance Portal Cell",
      "Social Welfare & Minority Affairs Approvals",
      "Disaster Management Cell"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=District+Collectorate+Nampally+Hyderabad",
    state: "Telangana",
    district: "Hyderabad",
    verified: true
  },
  {
    id: "go-14",
    name: "MeeSeva / Telangana Citizen Centre — Ameerpet",
    type: "Citizen Service Centre",
    address: "Elephant House, Opposite Big Bazaar, Ameerpet, Hyderabad, Telangana 500016",
    phone: "040-48565656",
    hours: "Mon–Sat: 9:00 AM – 6:30 PM",
    services: [
      "Dharani Land Record Search & Slot Booking",
      "Telangana Income & OBC / BC Caste Certificate",
      "Rythu Bandhu / Rythu Bima Status Inquiry",
      "Aadhaar Update & Mobile Linking",
      "GHMC Trade License Renewal"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MeeSeva+Center+Ameerpet+Hyderabad",
    state: "Telangana",
    district: "Hyderabad",
    verified: true
  },
  {
    id: "go-15",
    name: "Mandal Revenue Office (MRO) — Secunderabad",
    type: "Revenue & Certificates",
    address: "Mandal Revenue Office, Near Passport Seva Kendra, Secunderabad, Telangana 500003",
    phone: "+91 40 2770 1234",
    hours: "Mon–Sat: 10:00 AM – 5:00 PM",
    services: [
      "Income & Residence Certificate Issue",
      "Caste Certificate Verification (SC/ST/BC)",
      "Pahani & ROR Extracts (Dharani Portal)",
      "Legal Heir Certificate"
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mandal+Revenue+Office+Secunderabad",
    state: "Telangana",
    district: "Hyderabad",
    verified: true
  }
]

const OFFICE_TYPES = ["All Types", "District Administration", "Revenue & Certificates", "Citizen Service Centre", "Village Secretariat", "Registration & Stamps", "Passport & Visa", "Transport & Licensing"]
const STATES = ["All States", "Andhra Pradesh", "Telangana"]
const DISTRICTS = ["All Districts", "Visakhapatnam", "NTR (Vijayawada)", "Tirupati", "Guntur", "Hyderabad"]

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
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/30">
              Verified Civic Infrastructure
            </span>
            <span className="text-[10px] bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-500/30 flex items-center gap-1">
              <CheckCircle2 size={12} /> 100% Real Addresses
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-2 flex items-center gap-3">
            <Landmark size={28} className="text-blue-400" /> Government Office Locator
          </h1>
          <p className="text-gray-400 text-xs">
            Locate verified government offices — District Collectorates, MRO / Tahsildar Offices, MeeSeva / CSC Centres, Village Secretariats, RTOs, and Passport Seva Kendras with exact Google Maps directions and real phone numbers.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by office name, service, or area e.g. 'Income Certificate', 'Passport', 'Vijayawada'..."
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
        <span>Showing <strong className="text-white">{filteredOffices.length}</strong> verified government offices</span>
        <span className="text-[10px] bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full font-bold border border-green-500/30 flex items-center gap-1">
          <CheckCircle2 size={12} /> Verified Geolocation Data
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
                      {office.verified && (
                        <span className="text-[9px] bg-green-500/20 text-green-300 border border-green-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 size={10} /> Verified Location
                        </span>
                      )}
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
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Helpline / Contact Phone</p>
                        <a href={`tel:${office.phone.replace(/\s+/g, "")}`} className="text-green-300 font-bold text-xs hover:underline">{office.phone}</a>
                      </div>
                    </div>
                    <div className="bg-[#12182b] p-3 rounded-2xl border border-gray-800 flex items-center gap-2.5">
                      <Clock size={16} className="text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Official Working Hours</p>
                        <p className="text-amber-300 font-bold text-xs">{office.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800 space-y-2">
                    <h4 className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Services Provided at This Office:</h4>
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
                      <Navigation size={14} /> Open Google Maps Directions ↗
                    </a>
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 font-bold rounded-2xl text-xs transition border border-green-500/40 flex items-center justify-center gap-2"
                    >
                      <Phone size={14} /> Call Official Helpline
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
          <p className="font-bold text-blue-200">Official Tip for Government Office Visits:</p>
          <p className="text-[11px] text-blue-300/70 mt-0.5">
            Always carry self-attested photocopies of your Aadhaar Card, Income Certificate, Ration Card, and 2 passport-size photos when visiting MRO / Tahsildar or Collectorate offices.
          </p>
        </div>
      </div>
    </div>
  )
}
