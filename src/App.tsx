import { lazy, Suspense, useState, useCallback, useEffect } from 'react'
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

const ALL_PAGES: Page[] = [
  'home', 'apoyo-academico', 'clases-programacion', 'ventas-online',
  'optimizacion-cv', 'plantilla-gastos', 'plantilla-habitos', 'ia-local',
]

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
  const basePath = meta.path.replace('/#/', '/')

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  useEffect(() => {
    const hash = window.location.hash.replace('#/', '')
    if (hash && (ALL_PAGES as readonly string[]).includes(hash)) {
      setCurrentPage(hash as Page)
    }
  }, [])

  const scrollToSection = useCallback((id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentPage])

  const handleShare = useCallback(() => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: 'Juan Pablo Portfolio', url })
    } else {
      navigator.clipboard?.writeText(url)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'apoyo-academico':
        return <Suspense fallback={<LoadingScreen />}><ApoyoAcademicoPage /></Suspense>
      case 'clases-programacion':
        return <Suspense fallback={<LoadingScreen />}><ClasesProgramacionPage /></Suspense>
      case 'ventas-online':
        return <Suspense fallback={<LoadingScreen />}><VentasOnlinePage /></Suspense>
      case 'optimizacion-cv':
        return <Suspense fallback={<LoadingScreen />}><OptimizacionCVPage /></Suspense>
      case 'plantilla-gastos':
        return <Suspense fallback={<LoadingScreen />}><PlantillaGastosPage /></Suspense>
      case 'plantilla-habitos':
        return <Suspense fallback={<LoadingScreen />}><PlantillaHabitosPage /></Suspense>
      case 'ia-local':
        return <Suspense fallback={<LoadingScreen />}><IaLocalPage /></Suspense>
      default:
        return (
          <>
            <HeroSection />
            <Suspense fallback={<SectionFallback />}><MarqueeSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><AboutSection /></Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ServicesSection onNavigateToService={setCurrentPage} />
            </Suspense>
            <Suspense fallback={<SectionFallback />}><KnowledgeSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><FaqSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><ContactSection /></Suspense>
            <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
            <Chatbot
              onShare={handleShare}
              onScrollToContact={() => scrollToSection('contacto')}
              onScrollToFooter={() => scrollToSection('footer')}
              onNavigateToPage={setCurrentPage}
            />
          </>
        )
    }
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div style={{ overflowX: 'clip' }}>
          <PageSEO page={currentPage} />
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </div>
      </ThemeProvider>
    </HelmetProvider>
  )
}
