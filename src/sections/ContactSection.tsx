import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'

const LINKS = [
  {
    label: 'juanpablo@juanpablogutierrez.space',
    href: 'mailto:juanpablo@juanpablogutierrez.space',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'juanpablogutierrez.space',
    href: 'https://juanpablogutierrez.space',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/juanpablogutierrez',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="px-6 md:px-12 pt-28 pb-10 relative z-30 text-center"
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Eyebrow */}
      <div
        className="flex items-center justify-center gap-4 font-mono text-xs tracking-widest uppercase mb-6"
        style={{ color: 'var(--accent2)' }}
      >
        <span className="w-10 h-px" style={{ background: 'var(--accent2)' }} />
        Siguiente paso
        <span className="w-10 h-px" style={{ background: 'var(--accent2)' }} />
      </div>

      <FadeIn>
        <h2
          className="font-syne font-black uppercase leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(48px,7vw,120px)', color: 'var(--white)' }}
        >
          Trabajemos<br />juntos.
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p
          className="font-mono text-sm leading-relaxed mb-14"
          style={{ color: 'var(--muted)' }}
        >
          Cuéntame tu proyecto y encontremos la mejor solución para tu negocio.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="flex justify-center mb-10">
          <ContactButton label="Escribirme ahora" />
        </div>
      </FadeIn>

      {/* Links */}
      <FadeIn delay={0.2}>
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase px-5 py-3 rounded-full transition-all duration-250 hover:text-accent"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Footer bottom */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
          © 2026 Juan Pablo Gutiérrez Díaz · Todos los derechos reservados
        </span>
        <span className="font-mono text-xs tracking-widest flex items-center gap-2" style={{ color: 'var(--muted)' }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent2)', animation: 'pulse 2s infinite' }}
          />
          Tunja, Boyacá, Colombia
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
