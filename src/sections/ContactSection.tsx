import FadeIn from '../components/FadeIn'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/juanpablogutierrez', color: '#0A66C2', icon: 'in' },
  { label: 'GitHub', href: 'https://github.com/juannppgd', color: '#181717', icon: 'gh' },
  { label: 'Instagram', href: 'https://instagram.com/juanpablogutierrez', color: '#E4405F', icon: 'ig' },
]

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="px-6 md:px-12 pt-20 md:pt-16 lg:pt-20 pb-10 relative z-30"
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-10 lg:mb-14">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase leading-none tracking-tight mb-4 break-words"
              style={{ fontSize: 'clamp(24px,4.2vw,60px)', color: 'var(--white)', maxWidth: '90vw' }}
            >
              Contáctame{' '}
              <span className="gradient-heading">¡Asesoría Gratis!</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Info */}
          <div>
            {/* Email */}
            <FadeIn y={15}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                Email
              </span>
              <p className="font-mono text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                ¿Prefieres contactarme directamente por tu correo? Haz click aquí te responderé en breve:
              </p>
              <a
                href="mailto:contact.juannppgd@gmail.com"
                className="inline-flex items-center gap-2 font-syne font-bold text-sm tracking-tight transition-colors duration-200 hover:text-accent mb-10"
                style={{ color: 'var(--white)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                contact.juannppgd@gmail.com
              </a>
            </FadeIn>

            {/* Social */}
            <FadeIn y={15}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                Redes Sociales
              </span>
              <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                Elige tu red social favorita y escríbeme para una consulta gratuita, o simplemente llena el formulario. ¡Estoy aquí para ayudarte a crecer!
              </p>
              <span className="font-mono text-[11px] tracking-widest uppercase block mb-3" style={{ color: 'var(--text)' }}>
                Conoce mis redes sociales
              </span>
              <div className="flex flex-wrap gap-3 mb-10">
                {SOCIAL_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = l.color
                      e.currentTarget.style.background = l.color + '18'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-syne font-black uppercase transition-transform duration-300 group-hover:scale-110"
                      style={{ background: l.color + '20', color: l.color }}
                    >
                      {l.label[0]}
                    </div>
                    <span
                      className="font-syne font-bold text-xs uppercase tracking-tight transition-colors duration-300"
                      style={{ color: 'var(--white)' }}
                    >
                      {l.label}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: 'var(--muted)' }}
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Location */}
            <FadeIn y={15}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                Ubicación
              </span>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Desde Colombia, trabajando con clientes globales.
              </p>
            </FadeIn>
          </div>

          {/* Right: Form */}
          <div>
            <FadeIn y={15}>
              <span className="font-syne font-bold uppercase tracking-tight block mb-6" style={{ fontSize: 'clamp(18px,1.8vw,22px)', color: 'var(--white)' }}>
                Agenda tu asesoría
              </span>
            </FadeIn>

            <form className="space-y-4">
              <FadeIn y={10}>
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none transition-colors duration-200 focus:border-accent"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                    }}
                  />
                </div>
              </FadeIn>

              <FadeIn y={10} delay={0.05}>
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none transition-colors duration-200 focus:border-accent"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                    }}
                  />
                </div>
              </FadeIn>

              <FadeIn y={10} delay={0.1}>
                <div>
                  <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntame tu idea o servicio que necesitas. Déjame tu WhatsApp... Páginas web, marketing, IA local, clases de programación, apoyo académico, asesoría en CV, ventas online y plantillas en Excel."
                    className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none resize-none transition-colors duration-200 focus:border-accent"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                    }}
                  />
                </div>
              </FadeIn>

              <FadeIn y={10} delay={0.15}>
                <button
                  type="submit"
                  className="w-full font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-250 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                    color: '#FFFFFF',
                  }}
                >
                  Enviar Mensaje
                </button>
              </FadeIn>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
