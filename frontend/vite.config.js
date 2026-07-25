import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import pkg from './package.json'

let gitCommit = '9d5a49a'
try {
  gitCommit = execSync('git rev-parse --short HEAD').toString().trim()
} catch {
  // fallback if git command is unavailable
}

const buildDate = new Date().toISOString().split('T')[0]

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version || '1.0.0'),
    'import.meta.env.VITE_GIT_COMMIT': JSON.stringify(gitCommit),
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate)
  }
})
