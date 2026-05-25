import { motion } from 'framer-motion'

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-5 pb-4"
      style={{ background: 'linear-gradient(180deg,rgba(8,10,15,0.95) 0%,transparent 100%)', backdropFilter: 'blur(2px)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="font-syne font-bold text-sm tracking-widest uppercase text-accent">JP·GD</span>

      <div className="hidden md:flex gap-10">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
            className="font-syne text-xs font-medium tracking-widest uppercase text-muted hover:text-text-primary transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => scrollTo('#contacto')}
        className="font-syne text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-250"
      >
        Hablemos
      </button>
    </motion.nav>
  )
}
