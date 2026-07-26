/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

const DEFAULT_USER = {
  id: "user-1",
  name: "Devanth",
  email: "devanth@example.com",
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

const DEFAULT_FAMILY = [
  {
    id: "fam-1",
    relation: "Father",
    name: "Baskar",
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
          return { ...DEFAULT_USER, ...parsed }
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
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (err) {
      console.warn("Error parsing janai_family from localStorage:", err)
    }
    return DEFAULT_FAMILY
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
      if (familyMembers) localStorage.setItem("janai_family", JSON.stringify(familyMembers))
    } catch (e) {
      console.error(e)
    }
  }, [familyMembers])

  const login = (userData) => {
    const updated = { ...DEFAULT_USER, ...userData }
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
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("janai_user")
      localStorage.removeItem("janai_tokens")
    } catch (e) {
      console.error(e)
    }
  }

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...(prev || DEFAULT_USER), ...updatedFields }))
  }

  const addFamilyMember = (member) => {
    const newMem = { id: `fam-${Date.now()}`, ...member }
    setFamilyMembers(prev => [...(Array.isArray(prev) ? prev : DEFAULT_FAMILY), newMem])
  }

  const updateFamilyMember = (id, updatedFields) => {
    setFamilyMembers(prev => (Array.isArray(prev) ? prev : DEFAULT_FAMILY).map(m => (m.id === id ? { ...m, ...updatedFields } : m)))
  }

  const removeFamilyMember = (id) => {
    setFamilyMembers(prev => (Array.isArray(prev) ? prev : DEFAULT_FAMILY).filter(m => m.id !== id))
  }

  const getCurrentActiveProfileData = () => {
    const currentUser = user || { name: "Citizen", occupation: "Visitor" }
    if (activeProfile === "self") return currentUser
    const list = Array.isArray(familyMembers) ? familyMembers : DEFAULT_FAMILY
    const found = list.find(m => m.id === activeProfile)
    return found || currentUser
  }

  const safeFamilyMembers = Array.isArray(familyMembers) ? familyMembers : DEFAULT_FAMILY
  const safeUser = user && typeof user === "object" ? user : null

  return (
    <AuthContext.Provider
      value={{
        user: safeUser,
        login,
        loginAsGuest,
        logout,
        familyMembers: safeFamilyMembers,
        activeProfile: activeProfile || "self",
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
