import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { KeyRound, ArrowRight } from "lucide-react"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 text-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold mx-auto">
          <KeyRound size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
          <p className="text-gray-400 text-xs mt-1">Enter your registered email address to receive password reset instructions</p>
        </div>

        {sent ? (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-bold space-y-2">
            <p>Password reset link successfully sent to {email}!</p>
            <button onClick={() => navigate("/login")} className="text-xs text-white underline block mx-auto">
              Return to Login Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="devanth@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1b2338] text-white border border-gray-700 outline-none text-xs"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              Send Reset Instructions <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
