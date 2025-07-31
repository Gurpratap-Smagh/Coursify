import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API routes to backend
      '/admin': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      },
      '/users': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      }
    }
  }
})
