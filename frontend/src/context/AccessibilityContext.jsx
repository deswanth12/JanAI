/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"

const AccessibilityContext = createContext()

export function AccessibilityProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("janai_contrast") === "true")
  const [textSize, setTextSize] = useState(() => localStorage.getItem("janai_textsize") || "normal")

  useEffect(() => {
    localStorage.setItem("janai_contrast", highContrast)
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  useEffect(() => {
    localStorage.setItem("janai_textsize", textSize)
    document.documentElement.classList.remove("text-size-normal", "text-size-large", "text-size-xlarge")
    document.documentElement.classList.add(`text-size-${textSize}`)
  }, [textSize])

  const toggleHighContrast = () => setHighContrast(prev => !prev)

  const cycleTextSize = () => {
    if (textSize === "normal") setTextSize("large")
    else if (textSize === "large") setTextSize("xlarge")
    else setTextSize("normal")
  }

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, textSize, cycleTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
