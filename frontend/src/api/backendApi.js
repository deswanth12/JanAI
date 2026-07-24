const BACKEND_URL = "http://127.0.0.1:8000"

export async function fetchHealthStatus() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`)
    return await res.json()
  } catch (err) {
    console.warn("Backend server connection offline, falling back:", err)
    return null
  }
}

// --- MODEL CONTEXT PROTOCOL (MCP) CLIENT CALLS ---

export async function fetchMcpTools() {
  try {
    const res = await fetch(`${BACKEND_URL}/mcp/v1/tools`)
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("MCP Server offline:", err)
  }
  return { tools: [] }
}

export async function callMcpTool(name, args) {
  try {
    const res = await fetch(`${BACKEND_URL}/mcp/v1/call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, arguments: args })
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn(`MCP Tool '${name}' execution error:`, err)
  }
  return null
}

export async function simplifyVernacularApi(text, targetLanguage, mode = "village_vernacular") {
  try {
    const res = await fetch(`${BACKEND_URL}/api/multilingual/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLanguage, simplificationMode: mode })
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed vernacular simplification:", err)
  }
  return null
}

// --- CITIZEN & HOUSEHOLD API CALLS ---

export async function fetchUserProfile() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user`)
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to fetch user from backend API:", err)
  }
  return null
}

export async function updateUserProfileApi(userData) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to update user on backend API:", err)
  }
  return null
}

export async function fetchFamilyMembersApi() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/family`)
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to fetch family members from backend API:", err)
  }
  return null
}

export async function addFamilyMemberApi(memberData) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/family`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData)
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to add family member on backend API:", err)
  }
  return null
}

export async function submitApplicationApi(appData) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/applications/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    })
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to submit application to backend API:", err)
  }
  return null
}

export async function fetchApplicationsApi() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/applications`)
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn("Failed to fetch applications from backend API:", err)
  }
  return null
}
