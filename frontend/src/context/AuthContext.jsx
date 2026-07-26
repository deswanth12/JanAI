/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

const DEFAULT_USER = {
  id: "user-1",
  name: "Desvanth",
  email: "desvanth@example.com",
  phone: "+91 9876543210",
  role: "Student",
  age: 21,
  gender: "Male",
  state: "Andhra Pradesh",
  district: "Visakhapatnam",
  occupation: "Student",
  annualIncome: "180000",
  education: "Undergraduate (B.Tech)",
  caste: "OBC",
  disability: "No",
  category: "Student",
  landOwnershipAcres: "2.5",
  isVerified: true
}

const SAMPLE_DEMO_FAMILY = [
  {
    id: "fam-1",
    relation: "Father",
    name: "Father",
    age: 52,
    gender: "Male",
    occupation: "Farmer",
    annualIncome: "150000",
    education: "Secondary (10th)",
    caste: "OBC",
    disability: "No",
    landOwnershipAcres: "2.5"
  },
  {
    id: "fam-2",
    relation: "Mother",
    name: "Lalitha",
    age: 48,
    gender: "Female",
    occupation: "Homemaker",
    annualIncome: "0",
    education: "Primary (5th)",
    caste: "OBC",
    disability: "No",
    landOwnershipAcres: "0"
  },
  {
    id: "fam-3",
    relation: "Sister",
    name: "Pavani",
    age: 18,
    gender: "Female",
    occupation: "Student",
    annualIncome: "0",
    education: "Undergraduate",
    caste: "OBC",
    disability: "No",
    landOwnershipAcres: "0"
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("janai_user")
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object") {
          const u = { ...DEFAULT_USER, ...parsed }
          if (u.name === "Devanth" || u.name === "Devanth Baskar") u.name = "Desvanth"
          return u
        }
      }
    } catch (err) {
      console.warn("Error parsing janai_user from localStorage:", err)
    }
    return null // 🟢 Null by default for new unauthenticated visitors
  })

  const [familyMembers, setFamilyMembers] = useState(() => {
    try {
      const saved = localStorage.getItem("janai_family")
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          // 🟢 Clear old hardcoded demo family (fam-1, fam-2) so new users start at 0 members
          const isOldDemo = parsed.some(m => m.id === "fam-1" || m.id === "fam-2" || m.id === "fam-3")
          if (!isOldDemo) return parsed
        }
      }
    } catch (err) {
      console.warn("Error parsing janai_family from localStorage:", err)
    }
    return [] // 🟢 Empty array by default for new users (no hardcoded family)
  })

  const [activeProfile, setActiveProfile] = useState("self")

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("janai_user", JSON.stringify(user))
      } else {
        localStorage.removeItem("janai_user")
      }
    } catch (e) {
      console.error(e)
    }
  }, [user])

  useEffect(() => {
    try {
      if (familyMembers) {
        localStorage.setItem("janai_family", JSON.stringify(familyMembers))
      }
    } catch (e) {
      console.error(e)
    }
  }, [familyMembers])

  const login = (userData) => {
    const updated = { ...DEFAULT_USER, ...userData }
    if (updated.name === "Devanth" || updated.name === "Devanth Baskar") updated.name = "Desvanth"
    setUser(updated)
  }

  const loginAsGuest = () => {
    const guestUser = {
      id: `guest-${Date.now()}`,
      name: "Guest Citizen",
      email: "guest@janai.in",
      phone: "+91 9000000000",
      role: "Guest",
      occupation: "Citizen",
      state: "Andhra Pradesh",
      isVerified: false
    }
    setUser(guestUser)
    setFamilyMembers([]) // Clean empty family for guest users
    setActiveProfile("self")
  }

  const loadDemoFamily = () => {
    setFamilyMembers(SAMPLE_DEMO_FAMILY)
  }

  const logout = () => {
    setUser(null)
    setFamilyMembers([])
    setActiveProfile("self")
    try {
      localStorage.removeItem("janai_user")
      localStorage.removeItem("janai_family")
      localStorage.removeItem("janai_tokens")
    } catch (e) {
      console.error(e)
    }
  }

  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...(prev || DEFAULT_USER), ...updatedFields }
      if (updated.name === "Devanth" || updated.name === "Devanth Baskar") updated.name = "Desvanth"
      return updated
    })
  }

  const addFamilyMember = (member) => {
    const newMem = { id: `fam-${Date.now()}`, ...member }
    setFamilyMembers(prev => [...(Array.isArray(prev) ? prev : []), newMem])
  }

  const updateFamilyMember = (id, updatedFields) => {
    setFamilyMembers(prev => (Array.isArray(prev) ? prev : []).map(m => (m.id === id ? { ...m, ...updatedFields } : m)))
  }

  const removeFamilyMember = (id) => {
    setFamilyMembers(prev => (Array.isArray(prev) ? prev : []).filter(m => m.id !== id))
  }

  const safeFamilyMembers = Array.isArray(familyMembers) ? familyMembers : []
  const safeActiveProfile = safeFamilyMembers.length === 0 ? "self" : activeProfile

  const getCurrentActiveProfileData = () => {
    const currentUser = user || { name: "Citizen", occupation: "Visitor" }
    if (safeActiveProfile === "self") return currentUser
    const found = safeFamilyMembers.find(m => m.id === safeActiveProfile)
    return found || currentUser
  }

  const safeUser = user && typeof user === "object" ? user : null

  return (
    <AuthContext.Provider
      value={{
        user: safeUser,
        login,
        loginAsGuest,
        loadDemoFamily,
        logout,
        familyMembers: safeFamilyMembers,
        activeProfile: safeActiveProfile,
        setActiveProfile,
        updateUserProfile,
        addFamilyMember,
        updateFamilyMember,
        removeFamilyMember,
        getCurrentActiveProfileData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
