import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Self-healing auto-repair: purge invalid/corrupted localStorage keys before React renders
try {
  const keysToCheck = ['janai_user', 'janai_family', 'janai_saved_schemes', 'janai_applications', 'janai_documents']
  keysToCheck.forEach(key => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        const parsed = JSON.parse(item)
        if (key === 'janai_user') {
          if (!parsed || typeof parsed !== 'object') localStorage.removeItem(key)
        } else {
          if (!Array.isArray(parsed)) localStorage.removeItem(key)
        }
      } catch {
        localStorage.removeItem(key)
      }
    }
  })
} catch (e) {
  console.warn("Auto-repair script caught exception:", e)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
