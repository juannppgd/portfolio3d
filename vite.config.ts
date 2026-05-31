import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  base: '/portfolio3d/',
  plugins: [
    react(),
    ViteMinifyPlugin({}),
  ],
  build: {
    cssMinify: 'lightningcss',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
  },
})
