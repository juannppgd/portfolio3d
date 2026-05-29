import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'

const MarqueeSection = lazy(() => import('./sections/MarqueeSection'))
const AboutSection = lazy(() => import('./sections/AboutSection'))
const ServicesSection = lazy(() => import('./sections/ServicesSection'))
const KnowledgeSection = lazy(() => import('./sections/KnowledgeSection'))
const FaqSection = lazy(() => import('./sections/FaqSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return <div className="h-32" />
}

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ overflowX: 'clip' }}>
        <Navbar />
        <HeroSection />
        <Suspense fallback={<SectionFallback />}><MarqueeSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><AboutSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ServicesSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><KnowledgeSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FaqSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ContactSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
      </div>
    </ThemeProvider>
  )
}
