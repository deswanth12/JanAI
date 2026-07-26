import { useAuth } from "../context/AuthContext"
import { useSchemes } from "../context/SchemeContext"
import { Printer, X, CheckCircle2, ExternalLink } from "lucide-react"

// Scheme-specific official form templates matching real government application formats
const SCHEME_FORM_TEMPLATES = {
  "pm-kisan": {
    formTitle: "PM-KISAN SAMMAN NIDHI YOJANA — NEW FARMER REGISTRATION FORM",
    formNumber: "Form No. PM-KISAN/REG/2026",
    authority: "Ministry of Agriculture & Farmers Welfare, Government of India",
    sections: [
      { label: "1. Farmer's Full Name (as per Aadhaar)", field: "text" },
      { label: "2. Father's / Husband's Name", field: "text" },
      { label: "3. Date of Birth (DD/MM/YYYY)", field: "text" },
      { label: "4. Gender (Male / Female / Other)", field: "text" },
      { label: "5. Aadhaar Number (12-digit)", field: "text" },
      { label: "6. Mobile Number (Aadhaar linked)", field: "text" },
      { label: "7. State", field: "text" },
      { label: "8. District", field: "text" },
      { label: "9. Sub-District / Tehsil", field: "text" },
      { label: "10. Village / Town", field: "text" },
      { label: "11. Total Cultivable Land (in Hectares)", field: "text" },
      { label: "12. Khasra No. / Survey No. of Land", field: "text" },
      { label: "13. Khata / Khatauni Number", field: "text" },
      { label: "14. Bank Name", field: "text" },
      { label: "15. Bank Account Number", field: "text" },
      { label: "16. IFSC Code", field: "text" },
    ],
    documentsChecklist: [
      "Aadhaar Card (self-attested copy)",
      "Land Ownership Documents — Khasra / Khatauni / ROR",
      "Bank Passbook first page (Aadhaar-linked account)",
    ],
    declaration: "I hereby declare that I am a small/marginal landholding farmer and the land particulars given above are true and correct as per revenue records. I am not an income tax payee and do not hold any constitutional post."
  },
  "post-matric-scholarship": {
    formTitle: "POST-MATRIC SCHOLARSHIP APPLICATION FORM — SC/ST/OBC",
    formNumber: "Form No. NSP/PMS/2026-27",
    authority: "Ministry of Social Justice & Empowerment, Government of India",
    sections: [
      { label: "1. Student's Full Name", field: "text" },
      { label: "2. Father's Name", field: "text" },
      { label: "3. Mother's Name", field: "text" },
      { label: "4. Date of Birth (DD/MM/YYYY)", field: "text" },
      { label: "5. Gender", field: "text" },
      { label: "6. Category (SC / ST / OBC)", field: "text" },
      { label: "7. Aadhaar Number", field: "text" },
      { label: "8. Annual Family Income (₹)", field: "text" },
      { label: "9. State / UT of Domicile", field: "text" },
      { label: "10. Institution Name & Address", field: "text" },
      { label: "11. Course Name & Duration", field: "text" },
      { label: "12. Year of Study (1st / 2nd / 3rd / Final)", field: "text" },
      { label: "13. Previous Exam Percentage / CGPA", field: "text" },
      { label: "14. Bank Account Number (Student's Own)", field: "text" },
      { label: "15. IFSC Code", field: "text" },
    ],
    documentsChecklist: [
      "Caste Certificate (issued by competent revenue authority)",
      "Income Certificate (valid for current financial year)",
      "Previous Examination Marksheet",
      "Admission Letter / Bonafide Certificate from institution",
      "Aadhaar Card & Bank Passbook (student's own account)",
      "Passport Size Photograph (2 copies)",
    ],
    declaration: "I certify that the information provided is true and correct. I belong to the category mentioned above and my family income does not exceed the prescribed limit."
  },
  "ayushman-bharat": {
    formTitle: "AYUSHMAN BHARAT PM-JAY — BENEFICIARY REGISTRATION FORM",
    formNumber: "Form No. AB-PMJAY/BEN/2026",
    authority: "National Health Authority, Government of India",
    sections: [
      { label: "1. Beneficiary Full Name", field: "text" },
      { label: "2. Father's / Husband's Name", field: "text" },
      { label: "3. Date of Birth (DD/MM/YYYY)", field: "text" },
      { label: "4. Gender", field: "text" },
      { label: "5. Aadhaar Number", field: "text" },
      { label: "6. Mobile Number", field: "text" },
      { label: "7. Ration Card Number", field: "text" },
      { label: "8. SECC Family ID (if available)", field: "text" },
      { label: "9. State / District", field: "text" },
      { label: "10. Address", field: "text" },
      { label: "11. Family Size (No. of Members)", field: "text" },
    ],
    documentsChecklist: [
      "Aadhaar Card of applicant",
      "Ration Card / Family ID",
      "Mobile Number linked to Aadhaar (for OTP verification)",
    ],
    declaration: "I declare that the information given above is true and I am an eligible beneficiary under PM-JAY / SECC listed family category."
  }
}

// Default generic government form template for schemes without specific templates
const DEFAULT_TEMPLATE = {
  formTitle: "COMMON APPLICATION FORM — GOVERNMENT WELFARE SCHEME",
  formNumber: "Form No. GOI/CAF/2026",
  authority: "Government of India — State Welfare Portal",
  sections: [
    { label: "1. Applicant's Full Name (as per Aadhaar)", field: "text" },
    { label: "2. Father's / Guardian's Name", field: "text" },
    { label: "3. Mother's Name", field: "text" },
    { label: "4. Date of Birth (DD/MM/YYYY)", field: "text" },
    { label: "5. Gender (Male / Female / Other)", field: "text" },
    { label: "6. Aadhaar Number (12-digit)", field: "text" },
    { label: "7. Mobile Number", field: "text" },
    { label: "8. Category (General / OBC / SC / ST / EWS)", field: "text" },
    { label: "9. Annual Family Income (₹)", field: "text" },
    { label: "10. State & District", field: "text" },
    { label: "11. Full Residential Address", field: "text" },
    { label: "12. Bank Account Number", field: "text" },
    { label: "13. IFSC Code", field: "text" },
    { label: "14. Purpose / Scheme Applied For", field: "text" },
  ],
  documentsChecklist: [
    "Aadhaar Card (self-attested)",
    "Income Certificate",
    "Caste / Category Certificate (if applicable)",
    "Bank Passbook first page",
    "Passport Size Photograph (2 copies)",
  ],
  declaration: "I hereby declare that the particulars given above are true, correct, and complete to the best of my knowledge and belief. Any false information may lead to rejection of my application."
}

export default function PdfFormModal({ scheme, isOpen, onClose }) {
  const { user, familyMembers } = useAuth()
  const { documentWallet } = useSchemes()

  if (!isOpen || !scheme) return null

  const template = SCHEME_FORM_TEMPLATES[scheme.id] || {
    ...DEFAULT_TEMPLATE,
    formTitle: `${scheme.title.toUpperCase()} — APPLICATION FORM`,
    authority: scheme.ministry || DEFAULT_TEMPLATE.authority
  }

  const handlePrint = () => {
    window.print()
  }

  // Pre-fill applicant name
  let applicantName = user?.name || "Guest Citizen"
  if (applicantName === "Devanth" || applicantName === "Devanth Baskar") {
    applicantName = "Desvanth"
  }

  const fatherObj = (familyMembers || []).find(m => m.relation?.toLowerCase()?.includes("father"))
  const motherObj = (familyMembers || []).find(m => m.relation?.toLowerCase()?.includes("mother"))

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white text-black w-full max-w-3xl rounded-3xl shadow-2xl relative print:shadow-none print:w-full print:max-w-none print:rounded-none">
        {/* Close button - hidden on print */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full text-gray-700 z-10 print:hidden"
        >
          <X size={18} />
        </button>

        <div className="p-8 space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible">
          {/* ═══ Official Government Header ═══ */}
          <div className="text-center border-b-2 border-black pb-4 space-y-1">
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl">🏛️</div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-600">Government of India</p>
                <p className="text-xs font-bold text-gray-700">{template.authority}</p>
              </div>
              <div className="text-4xl">🏛️</div>
            </div>
            <h2 className="text-sm font-black uppercase tracking-wide mt-2 border border-black inline-block px-4 py-1">
              {template.formTitle}
            </h2>
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-2 px-2">
              <span>{template.formNumber}</span>
              <span>Date: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>

          {/* ═══ Scheme Details Box ═══ */}
          <div className="border border-gray-400 p-3 bg-gray-50 text-xs">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Scheme Applied For:</p>
            <p className="font-bold text-gray-900">{scheme.title}</p>
            <p className="text-gray-600 text-[10px]">Ministry: {scheme.ministry} | Jurisdiction: {scheme.state || "All India"}</p>
          </div>

          {/* ═══ Application Form Fields (Printable Blank Lines) ═══ */}
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase border-b border-gray-400 pb-1 mb-3">Applicant Particulars</h3>
            {template.sections.map((section, idx) => {
              // Pre-fill certain fields from user profile
              let prefill = ""
              const lbl = section.label.toLowerCase()
              if (idx === 0) prefill = applicantName !== "Guest Citizen" ? applicantName : ""
              if (lbl.includes("father")) prefill = fatherObj?.name || ""
              if (lbl.includes("mother")) prefill = motherObj?.name || ""
              if (lbl.includes("aadhaar number")) prefill = user?.aadhaar || ""
              if (lbl.includes("mobile")) prefill = user?.phone || ""
              if (lbl.includes("state") && !lbl.includes("previous")) prefill = user?.state || ""

              return (
                <div key={idx} className="flex items-end gap-2 py-1.5 text-xs">
                  <span className="text-gray-800 font-medium whitespace-nowrap shrink-0 text-[11px]">{section.label}:</span>
                  <div className="flex-1 border-b border-gray-400 min-h-[18px] text-gray-700 font-mono text-[11px] pb-0.5 pl-1">
                    {prefill || ""}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ═══ Documents Checklist ═══ */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase border-b border-gray-400 pb-1">Documents to be Enclosed (Tick ✓ if attached)</h3>
            <div className="space-y-1.5">
              {template.documentsChecklist.map((doc, i) => {
                // Check if user has this document in their wallet
                const hasDoc = (documentWallet || []).some(d =>
                  d.name?.toLowerCase().includes(doc.split("(")[0].trim().toLowerCase().slice(0, 8))
                )
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-gray-800">
                    <div className="w-4 h-4 border border-gray-500 rounded-sm flex items-center justify-center shrink-0 text-[10px]">
                      {hasDoc ? <CheckCircle2 size={12} className="text-green-700" /> : ""}
                    </div>
                    <span>{doc}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ═══ Declaration ═══ */}
          <div className="border-t border-gray-400 pt-4 space-y-4">
            <div className="text-[10px] text-gray-700 leading-relaxed">
              <p className="font-bold text-xs text-gray-900 mb-1">Declaration:</p>
              <p>{template.declaration}</p>
            </div>

            <div className="flex items-end justify-between pt-4">
              <div className="text-[10px] text-gray-500 space-y-1">
                <p>Place: _______________________</p>
                <p>Date: {new Date().toLocaleDateString("en-IN")}</p>
              </div>
              <div className="text-center">
                <div className="border-b border-black w-48 pb-1 mb-1 font-mono text-xs font-bold text-gray-900">
                  {applicantName !== "Guest Citizen" ? applicantName : ""}
                </div>
                <p className="text-[10px] text-gray-500">(Signature / Thumb Impression of Applicant)</p>
              </div>
            </div>
          </div>

          {/* ═══ Office Use Only ═══ */}
          <div className="border border-gray-400 p-3 bg-gray-50 text-[10px] text-gray-500 space-y-1">
            <p className="font-bold text-gray-700 uppercase text-[10px]">For Office Use Only</p>
            <p>Application Received Date: _________________ &nbsp;&nbsp; Received By: _________________</p>
            <p>Verification Status: ☐ Approved &nbsp;&nbsp; ☐ Rejected &nbsp;&nbsp; ☐ Pending Further Documents</p>
            <p>Registration / Reference Number: _________________</p>
            <p>Officer Signature & Seal: _________________</p>
          </div>

          {/* ═══ Action Buttons (hidden on print) ═══ */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200 print:hidden">
            {scheme.officialFormUrl && (
              <a
                href={scheme.officialFormUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} /> Apply Online on Govt Portal
              </a>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold text-gray-700 transition"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Printer size={16} /> Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
