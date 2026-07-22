import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { askAI } from "../api/gemini"
import { Mic, MicOff, Volume2, X, Sparkles } from "lucide-react"

export default function VoiceAssistant({ isOpen, onClose }) {
  const { lang, speakText, isSpeaking } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    setTranscript("")
    setAiResponse("")
    setIsListening(false)
    onClose()
  }

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Please type your query.")
      return
    }

    const recognition = new SpeechRecognition()
    const langMap = { en: "en-IN", hi: "hi-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN", bn: "bn-IN", mr: "mr-IN", ml: "ml-IN", gu: "gu-IN", pa: "pa-IN" }
    recognition.lang = langMap[lang] || "en-IN"
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      handleVoiceQuery(text)
    }

    recognition.start()
  }

  const handleVoiceQuery = async (queryText) => {
    setLoading(true)
    setAiResponse("")
    const res = await askAI(queryText, `Language: ${lang}`)
    setAiResponse(res)
    setLoading(false)
    speakText(res.replace(/[#*`]/g, ""))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 glass p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-tr from-green-500 to-blue-500 rounded-2xl text-black">
            <Mic size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Regional Voice Assistant <Sparkles size={18} className="text-yellow-400" />
            </h3>
            <p className="text-xs text-gray-400">Speak in your language ({lang.toUpperCase()})</p>
          </div>
        </div>

        <div className="flex flex-col items-center my-6">
          <button
            onClick={startVoiceInput}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? "bg-red-500 animate-pulse text-white scale-110 shadow-red-500/50"
                : "bg-gradient-to-tr from-green-500 to-emerald-400 text-black hover:scale-105 shadow-green-500/30"
            }`}
          >
            {isListening ? <MicOff size={40} /> : <Mic size={40} />}
          </button>
          <p className="mt-3 text-xs text-gray-300 font-medium">
            {isListening ? "Listening... Speak now!" : "Click Mic and speak your question"}
          </p>
        </div>

        {transcript && (
          <div className="bg-[#1b2338] p-3 rounded-2xl border border-gray-700 text-xs text-green-400 mb-3">
            <span className="font-bold text-gray-400">You said:</span> "{transcript}"
          </div>
        )}

        {loading ? (
          <div className="p-4 bg-[#1b2338] rounded-2xl text-xs text-gray-300 flex items-center gap-2">
            <Sparkles size={16} className="animate-spin text-green-400" /> Processing voice request with Gemini AI...
          </div>
        ) : (
          aiResponse && (
            <div className="bg-[#1b2338] p-4 rounded-2xl border border-gray-700 max-h-48 overflow-y-auto text-xs text-gray-200 space-y-2">
              <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="font-bold text-green-400 flex items-center gap-1">
                  <Sparkles size={14} /> AI Voice Answer
                </span>
                <button
                  onClick={() => speakText(aiResponse.replace(/[#*`]/g, ""))}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Volume2 size={14} /> {isSpeaking ? "Speaking..." : "Read Aloud"}
                </button>
              </div>
              <div className="whitespace-pre-line leading-relaxed">{aiResponse}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
