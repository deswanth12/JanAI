import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { askAI } from "../api/gemini"
import { Mic, MicOff, Volume2, X, Sparkles, Send, AlertTriangle } from "lucide-react"

export default function VoiceAssistant({ isOpen, onClose }) {
  const { lang, speakText, isSpeaking } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [micError, setMicError] = useState("")

  if (!isOpen) return null

  const handleClose = () => {
    setTranscript("")
    setAiResponse("")
    setIsListening(false)
    setMicError("")
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    onClose()
  }

  const startVoiceInput = () => {
    setMicError("")
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMicError("Voice microphone recognition is not supported on this browser version. You can type your query below!")
      return
    }

    try {
      const recognition = new SpeechRecognition()
      const langMap = { en: "en-IN", hi: "hi-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN", bn: "bn-IN", mr: "mr-IN", ml: "ml-IN", gu: "gu-IN", pa: "pa-IN" }
      recognition.lang = langMap[lang] || "en-IN"
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
        setMicError("")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = (event) => {
        setIsListening(false)
        console.warn("Speech recognition error:", event.error)
        if (event.error === "not-allowed" || event.error === "permission-denied") {
          setMicError("Microphone permission denied. Please allow microphone access in your browser settings or type below.")
        } else if (event.error === "no-speech") {
          setMicError("No speech detected. Please click the mic and speak clearly into your microphone.")
        } else {
          setMicError(`Voice input issue (${event.error}). You can type your query below!`)
        }
      }

      recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript
        setTranscript(text)
        handleVoiceQuery(text)
      }

      recognition.start()
    } catch (err) {
      console.error("Error initializing speech recognition:", err)
      setIsListening(false)
      setMicError("Could not access microphone. Please type your query below.")
    }
  }

  const handleVoiceQuery = async (queryText) => {
    const q = queryText || transcript
    if (!q.trim()) return
    setLoading(true)
    setAiResponse("")
    setMicError("")
    try {
      const res = await askAI(q, `Language: ${lang}`)
      setAiResponse(res)
      setLoading(false)
      speakText(res.replace(/[#*`]/g, ""))
    } catch (err) {
      console.error("Voice AI Query error:", err)
      setAiResponse("I encountered an issue processing your query. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 glass p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-2xl text-black font-bold">
            <Mic size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              JanAI Voice Assistant <Sparkles size={18} className="text-yellow-400" />
            </h3>
            <p className="text-xs text-gray-400">Speak or type in your language ({lang.toUpperCase()})</p>
          </div>
        </div>

        {/* 🎙️ Voice Microphone Control */}
        <div className="flex flex-col items-center py-4 bg-[#1b2338]/60 rounded-2xl border border-gray-800">
          <button
            onClick={startVoiceInput}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? "bg-red-500 animate-pulse text-white scale-110 shadow-red-500/50"
                : "bg-gradient-to-tr from-green-500 to-emerald-400 text-black hover:scale-105 shadow-green-500/30"
            }`}
          >
            {isListening ? <MicOff size={36} /> : <Mic size={36} />}
          </button>
          <p className="mt-3 text-xs font-bold text-gray-200">
            {isListening ? "🎙️ Listening... Speak now!" : "Tap Mic to Start Speaking"}
          </p>
        </div>

        {/* ⚠️ Mic Error Alert */}
        {micError && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle size={16} className="shrink-0 text-amber-400" />
            <span>{micError}</span>
          </div>
        )}

        {/* 💬 Sample Voice Prompts */}
        <div className="space-y-1.5">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Or Tap Sample Prompt:</p>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            <button
              onClick={() => {
                setTranscript("Post-Matric scholarship eligibility for B.Tech student")
                handleVoiceQuery("Post-Matric scholarship eligibility for B.Tech student")
              }}
              className="px-3 py-1.5 bg-[#1b2338] hover:bg-white/10 rounded-xl text-gray-300 border border-gray-700 transition"
            >
              🎓 B.Tech Scholarship
            </button>
            <button
              onClick={() => {
                setTranscript("PM-Kisan 17th installment land eligibility")
                handleVoiceQuery("PM-Kisan 17th installment land eligibility")
              }}
              className="px-3 py-1.5 bg-[#1b2338] hover:bg-white/10 rounded-xl text-gray-300 border border-gray-700 transition"
            >
              🌾 PM-Kisan Farmer
            </button>
          </div>
        </div>

        {/* ⌨️ Type Query Input (Fallback) */}
        <div className="flex gap-2">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVoiceQuery()}
            placeholder="Type your question if mic is unavailable..."
            className="flex-1 bg-[#1b2338] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white text-xs outline-none focus:border-green-400"
          />
          <button
            onClick={() => handleVoiceQuery()}
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5 shrink-0"
          >
            <Send size={14} /> Send
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-[#1b2338] rounded-2xl text-xs text-gray-300 flex items-center gap-2">
            <Sparkles size={16} className="animate-spin text-green-400" /> Grounding official gazette rules with Gemini AI...
          </div>
        )}

        {aiResponse && (
          <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-700 max-h-48 overflow-y-auto text-xs text-gray-200 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2">
              <span className="font-bold text-green-400 flex items-center gap-1">
                <Sparkles size={14} /> AI Voice Answer
              </span>
              <button
                onClick={() => speakText(aiResponse.replace(/[#*`]/g, ""))}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-bold"
              >
                <Volume2 size={14} /> {isSpeaking ? "Speaking..." : "Read Aloud"}
              </button>
            </div>
            <div className="whitespace-pre-line leading-relaxed">{aiResponse}</div>
          </div>
        )}
      </div>
    </div>
  )
}
