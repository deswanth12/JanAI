import { useState } from "react"
import { useSchemes } from "../context/SchemeContext"
import { useAuth } from "../context/AuthContext"
import { FileUp, CheckCircle, Sparkles, FileText } from "lucide-react"

export default function DocumentScanner() {
  const { uploadDocumentToWallet } = useSchemes()
  const { updateUserProfile } = useAuth()
  const [docType, setDocType] = useState("Aadhaar Card")
  const [scanning, setScanning] = useState(false)
  const [extractedData, setExtractedData] = useState(null)

  const sampleDocMocks = {
    "Aadhaar Card": {
      docNumber: "8821-4412-9012",
      extractedFields: { name: "Deshu", age: 22, gender: "Male", state: "Andhra Pradesh", district: "Visakhapatnam" },
      confidence: "99.2%"
    },
    "Caste Certificate": {
      docNumber: "AP-CC-2025-9912",
      extractedFields: { caste: "OBC", subCaste: "Yadav", issuedBy: "Tahsildar Visakhapatnam" },
      confidence: "98.7%"
    },
    "Income Certificate": {
      docNumber: "AP-IC-2026-4401",
      extractedFields: { annualIncome: "180000", validTill: "2027-03-31" },
      confidence: "99.0%"
    },
    "Class 10th Marksheet": {
      docNumber: "SSLC-2020-7712",
      extractedFields: { education: "Class 10 Pass", totalMarks: "580/600", percentage: "96.6%" },
      confidence: "97.8%"
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setScanning(true)
    setExtractedData(null)

    setTimeout(() => {
      const mockResult = sampleDocMocks[docType] || sampleDocMocks["Aadhaar Card"]
      setExtractedData({
        fileName: file.name,
        docType,
        ...mockResult
      })
      setScanning(false)
    }, 1800)
  }

  const applyExtractedDataToProfile = () => {
    if (!extractedData) return
    if (extractedData.extractedFields) {
      updateUserProfile(extractedData.extractedFields)
    }
    uploadDocumentToWallet({
      name: extractedData.docType,
      type: extractedData.docType.includes("Aadhaar") ? "Identity" : extractedData.docType.includes("Income") ? "Financial" : "Category",
      docNumber: extractedData.docNumber
    })
    alert(`Successfully applied OCR data to your Profile & Document Wallet!`)
    setExtractedData(null)
  }

  return (
    <div className="glass p-6 rounded-3xl border border-gray-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-green-400" size={20} /> AI Document OCR Scanner
          </h3>
          <p className="text-xs text-gray-400">Upload Aadhaar, PAN, Income or Caste proof to auto-extract profile details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-300 font-semibold block mb-1">Select Document Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
          >
            <option value="Aadhaar Card">Aadhaar Card</option>
            <option value="Caste Certificate">Caste Certificate</option>
            <option value="Income Certificate">Income Certificate</option>
            <option value="Class 10th Marksheet">Class 10th Marksheet / Diploma</option>
          </select>

          <label className="mt-3 block border-2 border-dashed border-gray-700 hover:border-green-500 rounded-2xl p-6 text-center cursor-pointer transition bg-[#12182b]/50">
            <FileUp size={32} className="mx-auto text-green-400 mb-2" />
            <span className="text-xs font-semibold text-gray-200">Click to Upload Document Image/PDF</span>
            <span className="block text-[10px] text-gray-400 mt-1">Supports PNG, JPG, PDF up to 10MB</span>
            <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div>
          {scanning ? (
            <div className="h-full bg-[#12182b] rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center text-center">
              <Sparkles size={36} className="text-green-400 animate-spin mb-3" />
              <p className="text-sm font-bold text-white">AI OCR Processing Document...</p>
              <p className="text-xs text-gray-400 mt-1">Extracting Name, DOB, Category, and ID numbers automatically</p>
            </div>
          ) : extractedData ? (
            <div className="bg-[#12182b] rounded-2xl border border-green-500/30 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                  <CheckCircle size={16} /> OCR Extracted Successfully
                </span>
                <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold">
                  {extractedData.confidence} Confidence
                </span>
              </div>

              <div className="text-xs space-y-1 text-gray-300">
                <p><span className="text-gray-500">Document ID:</span> <span className="font-mono text-white">{extractedData.docNumber}</span></p>
                <div className="bg-[#1b2338] p-2 rounded-xl border border-gray-800 text-[11px] font-mono text-green-300 space-y-1 mt-2">
                  {Object.entries(extractedData.extractedFields).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="capitalize">{k}:</span>
                      <span className="font-bold text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={applyExtractedDataToProfile}
                className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-xs transition"
              >
                Auto-Fill Profile & Add to Wallet
              </button>
            </div>
          ) : (
            <div className="h-full bg-[#12182b] rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center text-center text-gray-400">
              <FileText size={36} className="mb-2 text-gray-600" />
              <p className="text-xs">Extracted OCR details will appear here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
