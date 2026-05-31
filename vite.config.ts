import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { copyFileSync } from 'fs'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    ViteMinifyPlugin({}),
    {
      name: 'copy-index-to-404',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
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
          'router': ['react-router-dom'],
          'helmet': ['react-helmet-async'],
          'icons': ['react-icons'],
        },
      },
    },
  },
})
