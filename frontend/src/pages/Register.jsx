import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sparkles, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!formData.full_name || !formData.email || !formData.password) {
      setError("Full Name, Email, and Password are required.")
      return
    }
    setError("")
    navigate("/verify-email", { state: { email: formData.email } })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-[#12182b] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 text-xs relative overflow-hidden">
        <div className="text-center space-y-2">
          <img
            src="/janai-logo.jpg"
            alt="JanAI - AI Powered Citizen First Logo"
            className="h-20 w-auto rounded-xl object-contain mx-auto border border-gray-700 bg-white p-0.5"
          />
          <h2 className="text-2xl font-bold text-white mt-2">Create Your JanAI Account</h2>
          <p className="text-gray-400 text-xs">Collect basic details now — complete your profile after login</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 block mb-1 font-semibold">Full Name</label>
            <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
              <User size={16} className="text-gray-400 ml-1" />
              <input
                type="text"
                required
                placeholder="Desvanth"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-semibold">Email Address</label>
            <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
              <Mail size={16} className="text-gray-400 ml-1" />
              <input
                type="email"
                required
                placeholder="devanth@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-semibold">Mobile Number (+91)</label>
            <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
              <Phone size={16} className="text-gray-400 ml-1" />
              <input
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1 font-semibold">Password</label>
            <div className="glass p-2.5 rounded-xl flex items-center gap-2 border border-gray-700">
              <Lock size={16} className="text-gray-400 ml-1" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold rounded-xl text-xs hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles size={16} /> Create Account & Verify Email <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-gray-400 border-t border-gray-800 pt-4">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-green-400 font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
