/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { TRANSLATIONS } from "../api/translations"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("janai_lang") || "en"
    } catch {
      return "en"
    }
  })
  const [isSpeaking, setIsSpeaking] = useState(false)

  const changeLanguage = (newLang) => {
    setLang(newLang)
    try {
      localStorage.setItem("janai_lang", newLang)
    } catch (e) { console.error(e) }
  }

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en
    return dict[key] || TRANSLATIONS.en[key] || key
  }

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text to speech is not supported in your browser.")
      return
    }
    
    try {
      window.speechSynthesis.cancel()
      if (isSpeaking) {
        setIsSpeaking(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      const langMap = { en: "en-IN", hi: "hi-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN", bn: "bn-IN", mr: "mr-IN", ml: "ml-IN", gu: "gu-IN", pa: "pa-IN" }
      utterance.lang = langMap[lang] || "en-IN"
      
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      setIsSpeaking(true)
      window.speechSynthesis.speak(utterance)
    } catch (err) {
      console.error("Speech synthesis error:", err)
      setIsSpeaking(false)
    }
  }

  return (
    <LanguageContext.Provider value={{ lang: lang || "en", changeLanguage, t, speakText, isSpeaking }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
