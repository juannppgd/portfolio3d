import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio3d/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
