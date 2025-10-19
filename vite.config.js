import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/queens-party/', // 👈 removed for Vercel deployment
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline small assets
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})
