import { useState, useRef, useEffect } from "react"
import { askAI } from "../api/gemini"
import { useAuth } from "../context/AuthContext"
import { useLanguage } from "../context/LanguageContext"
import Loader from "../components/Loader"
import { Send, Bot, Sparkles, Volume2 } from "lucide-react"

export default function Chat() {
  const { getCurrentActiveProfileData } = useAuth()
  const { speakText } = useLanguage()
  const activeProfileData = getCurrentActiveProfileData()

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hello ${activeProfileData.name}! I am JanAI Copilot, your personalized Indian Government Scheme Assistant. How can I help your household today?`
    }
  ])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (textToSend) => {
    const q = textToSend || input
    if (!q.trim()) return

    const userMsg = { role: "user", text: q }
    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput("")
    setLoading(true)

    const contextStr = `User Profile: Name=${activeProfileData.name}, Occupation=${activeProfileData.occupation}, State=${activeProfileData.state}, Income=₹${activeProfileData.annualIncome}`
    const aiAnswer = await askAI(q, contextStr)

    setMessages(prev => [...prev, { role: "ai", text: aiAnswer }])
    setLoading(false)
  }

  const quickChips = [
    "Which scholarships can I apply for?",
    "Explain PM-Kisan Samman Nidhi",
    "What documents do I need for Mudra Loan?",
    "Compare PM-Kisan vs Rythu Bandhu",
    "Help me generate a document checklist"
  ]

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col glass rounded-3xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#12182b]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-blue-500 flex items-center justify-center text-black font-bold">
            <Bot size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              JanAI Stateful Copilot <Sparkles size={16} className="text-yellow-400" />
            </h2>
            <p className="text-xs text-gray-400">Context: {activeProfileData.name} ({activeProfileData.occupation})</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
              msg.role === "user"
                ? "bg-green-500 text-black font-medium"
                : "bg-[#12182b] text-gray-200 border border-gray-800"
            }`}>
              {msg.role === "ai" && (
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                  <span className="font-bold text-green-400 flex items-center gap-1 text-[11px]">
                    <Sparkles size={14} /> JanAI Assistant
                  </span>
                  <button
                    onClick={() => speakText(msg.text.replace(/[#*`]/g, ""))}
                    className="text-gray-400 hover:text-white flex items-center gap-1 text-[10px]"
                  >
                    <Volume2 size={12} /> Read
                  </button>
                </div>
              )}
              <div className="whitespace-pre-line">{msg.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#12182b] p-4 rounded-2xl border border-gray-800">
              <Loader />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 bg-[#12182b]/50 border-t border-gray-800/80 overflow-x-auto flex gap-2 text-xs">
        {quickChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            className="glass px-3 py-1.5 rounded-full text-gray-300 hover:text-green-400 hover:bg-white/10 transition whitespace-nowrap text-[11px]"
          >
            💡 {chip}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 border-t border-gray-800 bg-[#0b1020]">
        <div className="glass rounded-2xl flex items-center p-2 border border-gray-700">
          <input
            type="text"
            placeholder="Ask JanAI anything about schemes, eligibility, or application forms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none px-3 text-xs placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black p-2.5 rounded-xl transition"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}