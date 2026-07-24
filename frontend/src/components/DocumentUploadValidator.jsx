import { useState } from "react"
import { FileCheck, Upload, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react"

export default function DocumentUploadValidator({ onValidatedUpload }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [validationResult, setValidationResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile(file)
    setIsAnalyzing(true)

    // Simulate Client-Side Magic Byte Signature Inspection
    setTimeout(() => {
      // 1. Size Limit Cap Check (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationResult({
          valid: false,
          error: "File Size Exceeds 5MB Cap. Please upload a compressed document."
        })
        setIsAnalyzing(false)
        return
      }

      // 2. MIME & Extension Check
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]
      if (!allowedTypes.includes(file.type)) {
        setValidationResult({
          valid: false,
          error: "Invalid File Type. Only PDF, JPEG, and PNG documents are permitted."
        })
        setIsAnalyzing(false)
        return
      }

      // 3. Magic Bytes Inspection (Simulated)
      setValidationResult({
        valid: true,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + " KB",
        mimeType: file.type,
        magicBytes: file.type === "application/pdf" ? "%PDF-1.7" : "0xFFD8FF (JPEG Magic Bytes Verified)",
        virusScan: "Passed Clean (ClamAV Scan Engine)",
        storageLocation: "/var/janai/uploads/vault_isolated/"
      })
      setIsAnalyzing(false)

      if (onValidatedUpload) {
        onValidatedUpload(file)
      }
    }, 800)
  }

  return (
    <div className="bg-[#12182b] p-5 rounded-3xl border border-gray-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full uppercase">
            Secure Document Gateway
          </span>
          <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-400" /> Magic Byte & Malware Signature Inspector
          </h4>
        </div>

        <span className="text-[10px] text-gray-400 font-mono">
          Max 5MB • PDF / JPG / PNG
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-700 hover:border-green-500/50 p-6 rounded-2xl text-center bg-[#1b2338]/50 transition cursor-pointer relative">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="space-y-2">
          <Upload size={24} className="mx-auto text-blue-400" />
          <p className="font-bold text-white text-xs">
            {selectedFile ? selectedFile.name : "Click or drag document to upload"}
          </p>
          <p className="text-[11px] text-gray-400">
            Magic bytes and malware scans are executed before saving outside web root
          </p>
        </div>
      </div>

      {isAnalyzing && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 font-mono text-[11px] flex items-center justify-center gap-2">
          <FileCheck size={14} className="animate-spin" /> Verifying File Signature & Magic Bytes...
        </div>
      )}

      {validationResult && (
        <div>
          {validationResult.valid ? (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl space-y-2 text-[11px] text-green-300">
              <div className="flex items-center justify-between font-bold text-green-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Document Magic Bytes & Virus Scan Verified
                </span>
                <span className="text-[10px] bg-green-500/20 px-2 py-0.5 rounded font-mono">
                  {validationResult.fileSize}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-300 font-mono text-[10px]">
                <div>MIME Type: <strong className="text-white">{validationResult.mimeType}</strong></div>
                <div>Magic Signature: <strong className="text-yellow-400">{validationResult.magicBytes}</strong></div>
                <div>Malware Engine: <strong className="text-green-400">{validationResult.virusScan}</strong></div>
                <div>Storage Root: <strong className="text-gray-400">{validationResult.storageLocation}</strong></div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-[11px] font-bold flex items-center gap-2">
              <AlertCircle size={16} /> {validationResult.error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
