import { lazy, Suspense, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import Chatbot from './components/Chatbot'
import SEOHead from './components/SEOHead'
import JsonLd from './components/JsonLd'
import { PAGE_META } from './data/pageSeo'
import {
  personSchema,
  websiteSchema,
  professionalServiceSchema,
  productSchema,
  faqPageSchema,
} from './data/schema'
import { FAQ } from './data'

const MarqueeSection = lazy(() => import('./sections/MarqueeSection'))
const AboutSection = lazy(() => import('./sections/AboutSection'))
const ServicesSection = lazy(() => import('./sections/ServicesSection'))
const KnowledgeSection = lazy(() => import('./sections/KnowledgeSection'))
const FaqSection = lazy(() => import('./sections/FaqSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

const ApoyoAcademicoPage = lazy(() => import('./pages/ApoyoAcademicoPage'))
const ClasesProgramacionPage = lazy(() => import('./pages/ClasesProgramacionPage'))
const VentasOnlinePage = lazy(() => import('./pages/VentasOnlinePage'))
const OptimizacionCVPage = lazy(() => import('./pages/OptimizacionCVPage'))
const PlantillaGastosPage = lazy(() => import('./pages/PlantillaGastosPage'))
const PlantillaHabitosPage = lazy(() => import('./pages/PlantillaHabitosPage'))
const IaLocalPage = lazy(() => import('./pages/IaLocalPage'))

type Page = 'home' | 'apoyo-academico' | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv' | 'plantilla-gastos' | 'plantilla-habitos' | 'ia-local'

function SectionFallback() {
  return <div className="h-32" />
}

function LoadingScreen() {
  return <div className="min-h-screen" style={{ background: 'var(--bg)' }} />
}

function PageSEO({ page }: { page: Page }) {
  const meta = PAGE_META[page]
  if (!meta) return null

  const schemas: Record<string, unknown>[] = [personSchema, websiteSchema]
  const basePath = meta.path

  if (page === 'plantilla-gastos') {
    schemas.push(productSchema(
      'Plantilla Excel Control de Gastos — Regla 50/30/20',
      'Plantilla Excel profesional para control de gastos personales con la regla 50/30/20. Gráficos automáticos y colores inteligentes.',
      '7', 'USD', meta.path,
    ))
  }

  if (page === 'plantilla-habitos') {
    schemas.push(productSchema(
      'Plantilla Excel Rastreo de Hábitos — Productividad 2026',
      'Plantilla Excel para rastrear hábitos diarios con gráficos dinámicos, rachas y análisis inteligente.',
      '7', 'USD', meta.path,
    ))
  }

  if (page !== 'home') {
    schemas.push(professionalServiceSchema(meta.title, meta.description, basePath))
  }

  if (page === 'home') {
    schemas.push(faqPageSchema(FAQ))
  }

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        ogType={meta.ogType}
      />
      {schemas.map((schema, i) => <JsonLd key={i} data={schema} />)}
    </>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const state = location.state as Record<string, string> | null
    if (state?.scrollTo) {
      const id = state.scrollTo
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
      window.history.replaceState({}, '')
    }
  }, [location.state])

  return (
    <>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}><MarqueeSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><AboutSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><ServicesSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><KnowledgeSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><FaqSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><ContactSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
      <Chatbot
        onShare={() => {
          const url = window.location.href
          if (navigator.share) {
            navigator.share({ title: 'Juan Pablo Portfolio', url })
          } else {
            navigator.clipboard?.writeText(url)
          }
        }}
        onScrollToContact={() => scrollToSection('contacto')}
        onScrollToFooter={() => scrollToSection('footer')}
        onNavigateToPage={(page) => navigate(`/${page}`)}
      />
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const page = location.pathname === '/' ? 'home' : location.pathname.slice(1) as Page

  return (
    <div style={{ overflowX: 'clip' }}>
      <PageSEO page={page} />
      <Navbar currentPage={page} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apoyo-academico" element={<Suspense fallback={<LoadingScreen />}><ApoyoAcademicoPage /></Suspense>} />
          <Route path="/clases-programacion" element={<Suspense fallback={<LoadingScreen />}><ClasesProgramacionPage /></Suspense>} />
          <Route path="/ventas-online" element={<Suspense fallback={<LoadingScreen />}><VentasOnlinePage /></Suspense>} />
          <Route path="/optimizacion-cv" element={<Suspense fallback={<LoadingScreen />}><OptimizacionCVPage /></Suspense>} />
          <Route path="/plantilla-gastos" element={<Suspense fallback={<LoadingScreen />}><PlantillaGastosPage /></Suspense>} />
          <Route path="/plantilla-habitos" element={<Suspense fallback={<LoadingScreen />}><PlantillaHabitosPage /></Suspense>} />
          <Route path="/ia-local" element={<Suspense fallback={<LoadingScreen />}><IaLocalPage /></Suspense>} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
