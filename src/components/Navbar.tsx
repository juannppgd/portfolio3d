import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { useActiveSection } from '../hooks/useActiveSection'

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Conocimientos', href: '#conocimientos' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const activeSection = useActiveSection()

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-5 pb-4"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(180deg,rgba(8,10,15,0.95) 0%,transparent 100%)'
          : 'linear-gradient(180deg,rgba(244,246,250,0.95) 0%,transparent 100%)',
        backdropFilter: 'blur(2px)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="font-syne font-bold text-sm tracking-widest uppercase text-accent">JP·GD</span>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {links.map((l) => {
          const sectionId = l.href.replace('#', '')
          const isActive = activeSection === sectionId
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
              className="relative font-syne text-xs tracking-widest uppercase px-3 py-2 transition-colors duration-200"
              style={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--muted)' }}
            >
              {l.label}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú de navegación"
        >
          <span className="block w-5 h-px bg-current transition-transform duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none', color: 'var(--text)' }} />
          <span className="block w-5 h-px bg-current transition-opacity duration-200" style={{ opacity: menuOpen ? 0 : 1, color: 'var(--text)' }} />
          <span className="block w-5 h-px bg-current transition-transform duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none', color: 'var(--text)' }} />
        </button>

        <ThemeToggle />

        <button
          onClick={() => scrollTo('#contacto')}
          className="font-syne text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-250"
        >
          Hablemos
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 md:hidden"
            style={{ background: theme === 'dark' ? 'rgba(8,10,15,0.98)' : 'rgba(244,246,250,0.98)', borderBottom: '1px solid var(--border)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col px-6 py-6 gap-2">
              {links.map((l, i) => {
                const sectionId = l.href.replace('#', '')
                const isActive = activeSection === sectionId
                const itemDelay = i * 0.05
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                    className="relative font-syne text-sm tracking-widest uppercase py-3 pl-4 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemDelay, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-mobile"
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
