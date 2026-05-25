import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages sirve el sitio desde: https://juannppgd.github.io/portfolio3d/
  // Esto evita assets rotos con rutas absolutas (/assets/..., /favicon.svg)
  base: '/portfolio3d/',
  plugins: [react()],
})
