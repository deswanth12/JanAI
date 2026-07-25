import { useState } from "react"
import { Search, History, CheckCircle2 } from "lucide-react"

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([
    { id: "user-1", name: "Devanth Baskar", email: "devanth@example.com", phone: "+91 9876543210", role: "Citizen", state: "Andhra Pradesh", status: "Active", verified: true },
    { id: "user-2", name: "Baskar (Father)", email: "baskar@example.com", phone: "+91 9876543211", role: "Citizen", state: "Andhra Pradesh", status: "Active", verified: true },
    { id: "user-3", name: "Lalitha (Mother)", email: "lalitha@example.com", phone: "+91 9876543212", role: "Citizen", state: "Andhra Pradesh", status: "Active", verified: true },
    { id: "user-4", name: "Pavani (Sister)", email: "pavani@example.com", phone: "+91 9876543213", role: "Citizen", state: "Andhra Pradesh", status: "Active", verified: true }
  ])

  const [selectedUserLogs, setSelectedUserLogs] = useState(null)

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u))
  }

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-6 rounded-3xl border border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-white">Citizen & User Management Engine</h3>
          <p className="text-gray-400 text-xs">Manage citizen profiles, verify identities, suspend accounts, and view audit history</p>
        </div>

        <div className="glass px-4 py-2.5 rounded-2xl flex items-center gap-2 border border-gray-700 bg-[#12182b]/80 w-full md:w-80">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, Email, or Mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-white text-xs flex-1"
          />
        </div>
      </div>

      {/* User Records Table */}
      <div className="glass p-6 rounded-3xl border border-gray-800 overflow-x-auto space-y-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 font-semibold uppercase text-[10px]">
              <th className="pb-3">User ID</th>
              <th className="pb-3">Full Name & Email</th>
              <th className="pb-3">Mobile (+91)</th>
              <th className="pb-3">State</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Verification</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
              <tr key={u.id} className="hover:bg-white/5 transition">
                <td className="py-3.5 font-mono text-purple-400 font-bold">{u.id}</td>
                <td className="py-3.5">
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-gray-400 text-[11px]">{u.email}</div>
                </td>
                <td className="py-3.5 font-mono text-gray-300">{u.phone}</td>
                <td className="py-3.5 text-gray-300">{u.state}</td>
                <td className="py-3.5">
                  <span className="bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5">
                  <span className="bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1 w-fit">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${u.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => setSelectedUserLogs(u)}
                    className="glass p-2 rounded-xl text-blue-400 hover:text-white text-[11px] font-bold"
                    title="View Audit & Consent History"
                  >
                    <History size={14} />
                  </button>

                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition ${u.status === "Active" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"}`}
                  >
                    {u.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected User Audit Logs Modal */}
      {selectedUserLogs && (
        <div className="p-6 glass rounded-3xl border border-gray-800 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <History size={16} className="text-blue-400" /> Audit & Consent Log History for {selectedUserLogs.name} ({selectedUserLogs.id})
            </h4>
            <button onClick={() => setSelectedUserLogs(null)} className="text-xs text-gray-400 hover:text-white font-bold">Close</button>
          </div>

          <div className="bg-[#12182b] p-4 rounded-2xl space-y-2 font-mono text-[11px]">
            <div className="flex justify-between text-gray-300">
              <span>2026-07-24 18:30:12 IST</span>
              <span className="text-green-400">USER_LOGIN_SUCCESS</span>
              <span>IP: 157.48.91.12</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>2026-07-24 14:15:00 IST</span>
              <span className="text-blue-400">DPDP_CONSENT_GRANTED</span>
              <span>Purpose: Scheme Scrutiny</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
