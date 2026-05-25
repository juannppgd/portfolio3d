# Juan Pablo Gutiérrez — Portafolio

Portfolio personal construido con React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## 🚀 Inicio rápido (local)

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 📦 Build para producción

```bash
npm run build
# Los archivos quedan en /dist
```

## 🌐 Deploy en GitHub Pages (recomendado)

### Paso 1 — Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repo: `portfolio` (o el que quieras)
3. Déjalo en público, sin README
4. Haz clic en **Create repository**

### Paso 2 — Subir el código

```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "feat: portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages con GitHub Actions

Crea el archivo `.github/workflows/deploy.yml` (ya incluido en el proyecto).

Luego en GitHub:
1. Settings → Pages
2. Source: **GitHub Actions**
3. En unos minutos el sitio estará en `https://TU_USUARIO.github.io/portfolio`

### Paso 4 — Conectar tu dominio propio (juanpablogutierrez.space)

En GitHub → Settings → Pages → Custom domain:
1. Escribe `juanpablogutierrez.space`
2. Habilita **Enforce HTTPS**

En tu proveedor de dominio, agrega estos registros DNS:
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  TU_USUARIO.github.io
```

## 🎨 Personalización

### Cambiar contenido
- **Servicios**: edita `src/data.ts` → array `SERVICES`
- **Proyectos**: edita `src/data.ts` → array `PROJECTS` (reemplaza las URLs por tus imágenes)
- **Foto**: en `src/sections/HeroSection.tsx` cambia la constante `PORTRAIT`
- **Links de contacto**: en `src/sections/ContactSection.tsx` edita el array `LINKS`

### Cambiar colores
Edita las variables en `src/index.css`:
```css
:root {
  --accent: #4F7FFF;   /* azul principal */
  --accent2: #00E5C3;  /* cian neón */
}
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── FadeIn.tsx       # Animación de entrada reutilizable
│   ├── Navbar.tsx       # Barra de navegación
│   └── ContactButton.tsx
├── sections/
│   ├── HeroSection.tsx
│   ├── MarqueeSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
├── data.ts              # Contenido editable (proyectos, servicios, imágenes)
├── App.tsx
├── main.tsx
└── index.css
```

## 🛠 Stack técnico

| Tecnología | Versión |
|------------|---------|
| React | 18.3 |
| Vite | 5.4 |
| TypeScript | 5.5 |
| Tailwind CSS | 3.4 |
| Framer Motion | 12 |
| Lucide React | 0.344 |
