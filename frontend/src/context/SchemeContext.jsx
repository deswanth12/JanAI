/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"

const SchemeContext = createContext()

const INITIAL_APPLICATIONS = [
  {
    id: "APP-2026-8812",
    schemeId: "post-matric-scholarship",
    schemeTitle: "Post-Matric Scholarship Scheme for SC/ST/OBC Students",
    applicantName: "Deshu",
    relation: "Self",
    dateSubmitted: "2026-07-10",
    status: "Under Review",
    probabilityScore: 92,
    trackingMilestones: [
      { title: "Application Drafted & Verified", date: "2026-07-09", completed: true },
      { title: "Submitted to Nodal Officer", date: "2026-07-10", completed: true },
      { title: "State Department Scrutiny", date: "2026-07-18", completed: true },
      { title: "Direct Benefit Transfer Sanction", date: "Pending", completed: false }
    ],
    verifiedDocuments: ["Aadhaar Card", "Caste Certificate", "10th Marksheet"]
  },
  {
    id: "APP-2026-4419",
    schemeId: "pm-kisan",
    schemeTitle: "PM-Kisan Samman Nidhi Yojana",
    applicantName: "Rameshwar Rao",
    relation: "Father",
    dateSubmitted: "2026-06-01",
    status: "Approved",
    probabilityScore: 96,
    trackingMilestones: [
      { title: "Land Passbook Verified", date: "2026-06-02", completed: true },
      { title: "Aadhaar e-KYC Done", date: "2026-06-05", completed: true },
      { title: "DBT Installment Credited (₹2,000)", date: "2026-06-15", completed: true }
    ],
    verifiedDocuments: ["Aadhaar Card", "Pattadar Land Passbook"]
  }
]

const INITIAL_DOCUMENTS = [
  { id: "doc-1", name: "Aadhaar Card", type: "Identity", docNumber: "XXXX-XXXX-9012", verified: true, dateUploaded: "2026-01-15" },
  { id: "doc-2", name: "Caste Certificate (OBC)", type: "Category", docNumber: "AP-CC-2025-11", verified: true, dateUploaded: "2026-02-10" },
  { id: "doc-3", name: "Income Certificate (₹1.8 Lakh)", type: "Financial", docNumber: "AP-IC-2026-99", verified: true, dateUploaded: "2026-03-01" },
  { id: "doc-4", name: "Class 10th Marksheet", type: "Education", docNumber: "SSLC-2020-4412", verified: true, dateUploaded: "2026-01-20" }
]

export function SchemeProvider({ children }) {
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem("janai_saved_schemes")
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn("Error parsing janai_saved_schemes:", e)
    }
    return ["pm-kisan", "post-matric-scholarship"]
  })

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem("janai_applications")
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn("Error parsing janai_applications:", e)
    }
    return INITIAL_APPLICATIONS
  })

  const [documentWallet, setDocumentWallet] = useState(() => {
    try {
      const saved = localStorage.getItem("janai_documents")
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.warn("Error parsing janai_documents:", e)
    }
    return INITIAL_DOCUMENTS
  })

  useEffect(() => {
    try {
      if (savedSchemeIds) localStorage.setItem("janai_saved_schemes", JSON.stringify(savedSchemeIds))
    } catch (e) { console.error(e) }
  }, [savedSchemeIds])

  useEffect(() => {
    try {
      if (applications) localStorage.setItem("janai_applications", JSON.stringify(applications))
    } catch (e) { console.error(e) }
  }, [applications])

  useEffect(() => {
    try {
      if (documentWallet) localStorage.setItem("janai_documents", JSON.stringify(documentWallet))
    } catch (e) { console.error(e) }
  }, [documentWallet])

  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds(prev => {
      const list = Array.isArray(prev) ? prev : []
      return list.includes(schemeId) ? list.filter(id => id !== schemeId) : [...list, schemeId]
    })
  }

  const submitNewApplication = (applicationData) => {
    const newApp = {
      id: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "Submitted",
      trackingMilestones: [
        { title: "Application Drafted & Verified", date: new Date().toISOString().split("T")[0], completed: true },
        { title: "Submitted to Nodal Officer", date: new Date().toISOString().split("T")[0], completed: true },
        { title: "State Department Scrutiny", date: "Pending", completed: false },
        { title: "Final Sanction & DBT Transfer", date: "Pending", completed: false }
      ],
      ...applicationData
    }
    setApplications(prev => [newApp, ...(Array.isArray(prev) ? prev : INITIAL_APPLICATIONS)])
    return newApp
  }

  const uploadDocumentToWallet = (doc) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      verified: true,
      dateUploaded: new Date().toISOString().split("T")[0],
      ...doc
    }
    setDocumentWallet(prev => [newDoc, ...(Array.isArray(prev) ? prev : INITIAL_DOCUMENTS)])
  }

  const safeSavedIds = Array.isArray(savedSchemeIds) ? savedSchemeIds : ["pm-kisan", "post-matric-scholarship"]
  const safeApps = Array.isArray(applications) ? applications : INITIAL_APPLICATIONS
  const safeDocs = Array.isArray(documentWallet) ? documentWallet : INITIAL_DOCUMENTS

  return (
    <SchemeContext.Provider
      value={{
        savedSchemeIds: safeSavedIds,
        toggleSaveScheme,
        applications: safeApps,
        submitNewApplication,
        documentWallet: safeDocs,
        uploadDocumentToWallet
      }}
    >
      {children}
    </SchemeContext.Provider>
  )
}

export const useSchemes = () => useContext(SchemeContext)
