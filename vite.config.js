import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' is correct for a user GitHub Pages site (jqueja.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
