import FadeIn from '../components/FadeIn'
import { SERVICES } from '../data'

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="px-6 md:px-12 py-24 md:py-32 relative z-10"
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16 md:mb-24 gap-4">
        <FadeIn>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(48px,6vw,100px)', color: 'var(--white)' }}
          >
            Servicios.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm leading-relaxed md:text-right md:max-w-[200px]"
            style={{ color: 'var(--muted)' }}
          >
            Lo que hago para que tu negocio crezca en digital.
          </p>
        </FadeIn>
      </div>

      {/* List */}
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1}>
            <div
              className="grid gap-5 md:gap-10 py-8 md:py-10 group cursor-default transition-all duration-250"
              style={{
                gridTemplateColumns: '80px 1fr auto',
                borderTop: '1px solid var(--border)',
              }}
            >
              <span className="font-mono text-xs tracking-widest pt-1" style={{ color: 'var(--muted)' }}>
                {s.num}
              </span>
              <div>
                <div
                  className="font-syne font-bold uppercase mb-2 tracking-tight group-hover:text-accent transition-colors duration-250"
                  style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--white)' }}
                >
                  {s.name}
                </div>
                <div
                  className="font-mono font-light leading-relaxed"
                  style={{ fontSize: 'clamp(0.8rem,1.4vw,1rem)', color: 'var(--muted)', maxWidth: 480 }}
                >
                  {s.desc}
                </div>
              </div>
              <span
                className="hidden md:inline-block self-start px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-250 group-hover:border-accent group-hover:text-accent"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                {s.tag}
              </span>
            </div>
          </FadeIn>
        ))}
        {/* Bottom border */}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </div>
    </section>
  )
}
