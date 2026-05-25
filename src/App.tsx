import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }}>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
