import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { useActiveSection } from '../hooks/useActiveSection'

type Page =
  | 'home'
  | 'apoyo-academico'
  | 'clases-programacion'
  | 'ventas-online'
  | 'optimizacion-cv'
  | 'plantilla-gastos'
  | 'plantilla-habitos'
  | 'ia-local'

interface NavbarProps {
  currentPage: Page
}

const links = [
  { label: 'Sobre mí',      href: '#about'         },
  { label: 'Servicios',     href: '#servicios'      },
  { label: 'Conocimientos', href: '#conocimientos'  },
  { label: 'FAQ',           href: '#faq'            },
  { label: 'Contacto',      href: '#contacto'       },
]

export default function Navbar({ currentPage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme }      = useTheme()
  const activeSection  = useActiveSection()
  const navigate       = useNavigate()
  const isHome         = currentPage === 'home'
  const isDark         = theme === 'dark'

  // ── Helpers ──────────────────────────────────────────────────────────────
  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = () => {
    setMenuOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCTA = () => {
    if (isHome) {
      scrollTo('#contacto')
    } else {
      goHome()
    }
  }

  // ── Hamburger geometry ───────────────────────────────────────────────────
  // Spans: height 1px, gap-[5px] → centers separados por 6px.
  // Para cruzarse perfectamente al rotar: translateY(±6px).
  const barBase  = 'block h-px w-5 rounded-full transition-all duration-300'
  const barStyle = { background: 'var(--text)' }

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Navegación principal"
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y:   0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ── Barra principal ─────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 md:px-10 pt-5 pb-4"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(8,10,15,0.96) 0%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(244,246,250,0.96) 0%, transparent 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Logo ─────────────────────────────────────────────────────────── */}
          <button
            onClick={goHome}
            className="font-syne font-bold text-sm tracking-widest uppercase
                       transition-opacity duration-200 hover:opacity-70
                       focus-visible:outline-none focus-visible:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            juannppgd
          </button>

          {/* Desktop: links de sección (solo en home) ─────────────────────── */}
          {isHome && (
            <nav
              aria-label="Secciones"
              className="hidden min-[990px]:flex items-center gap-1"
            >
              {links.map((l) => {
                const sectionId = l.href.replace('#', '')
                const isActive  = activeSection === sectionId
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                    className="relative font-syne text-xs tracking-widest uppercase
                               px-3 py-2 transition-colors duration-200
                               focus-visible:outline-none"
                    style={{ color: isActive ? 'var(--accent)' : 'var(--muted)' }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)'
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                        style={{ background: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                      />
                    )}
                  </a>
                )
              })}
            </nav>
          )}

          {/* Desktop: "← Volver" en páginas de servicio ───────────────────── */}
          {!isHome && (
            <button
              onClick={goHome}
              className="hidden min-[990px]:flex items-center gap-2
                         font-syne text-xs tracking-widest uppercase
                         px-3 py-2 transition-colors duration-200
                         focus-visible:outline-none"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
            >
              ← Volver
            </button>
          )}

          {/* Derecha: hamburger + theme + CTA ────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger — solo mobile */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="min-[990px]:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-1
                         focus-visible:outline-none rounded"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={barBase}
                style={{
                  ...barStyle,
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className={barBase}
                style={{
                  ...barStyle,
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'none',
                }}
              />
              <span
                className={barBase}
                style={{
                  ...barStyle,
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>

            <ThemeToggle />

            {/* Botón CTA ────────────────────────────────────────────────── */}
            <button
              onClick={handleCTA}
              className="font-syne text-xs font-bold tracking-wider uppercase
                         px-4 sm:px-5 py-2.5 rounded-full
                         transition-all duration-200
                         focus-visible:outline-none
                         max-[350px]:hidden"
              style={{
                border:  '1px solid var(--accent)',
                color:   'var(--accent)',
                /* El hover se gestiona inline para usar CSS vars correctamente */
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.background = 'var(--accent)'
                btn.style.color      = isDark ? '#080A0F' : '#ffffff'
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.background = 'transparent'
                btn.style.color      = 'var(--accent)'
              }}
            >
              {isHome ? 'Hablemos' : 'Inicio'}
            </button>
          </div>
        </div>

        {/* ── Menú mobile ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="menu"
              aria-label="Menú móvil"
              className="min-[990px]:hidden"
              style={{
                background: isDark
                  ? 'rgba(8,10,15,0.98)'
                  : 'rgba(244,246,250,0.98)',
                borderBottom: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y:  0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ul className="flex flex-col px-5 py-5 gap-1">
                {isHome ? (
                  links.map((l, i) => {
                    const sectionId = l.href.replace('#', '')
                    const isActive  = activeSection === sectionId
                    return (
                      <motion.li
                        key={l.href}
                        role="menuitem"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x:   0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <a
                          href={l.href}
                          onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                          className="relative flex items-center font-syne text-sm
                                     tracking-widest uppercase py-3 pl-4
                                     transition-colors duration-200 w-full
                                     focus-visible:outline-none"
                          style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {/* Indicador lateral activo */}
                          {isActive && (
                            <motion.span
                              layoutId="nav-active-mobile"
                              className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                              style={{ background: 'var(--accent)' }}
                              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            />
                          )}
                          {l.label}
                        </a>
                      </motion.li>
                    )
                  })
                ) : (
                  <motion.li
                    role="menuitem"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x:   0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={goHome}
                      className="relative font-syne text-sm tracking-widest uppercase
                                 py-3 pl-4 transition-colors duration-200
                                 text-left w-full focus-visible:outline-none"
                      style={{ color: 'var(--accent)' }}
                    >
                      ← Volver al inicio
                    </button>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Overlay: cierra el menú al tocar fuera ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-40 min-[990px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}