import { useEffect, useState } from 'react'
import FadeIn from '../components/FadeIn'
import { MAIN_SERVICES, SERVICE_BENEFITS, ADDITIONAL_SERVICES, TEMPLATES, LOCAL_AI } from '../data'

function CountdownTimer() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const end = Date.now() + 24 * 60 * 60 * 1000
    const update = () => {
      const diff = Math.max(0, end - Date.now())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  if (!time) return null
  return <span className="tabular-nums">⏰ {time}</span>
}

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="px-6 md:px-12 py-20 md:py-16 lg:py-20 relative z-10"
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-8 lg:mb-12">
        <FadeIn>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight break-words gradient-heading"
            style={{ fontSize: 'clamp(28px,4.5vw,60px)' }}
          >
            Servicios.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm leading-relaxed mt-3"
            style={{ color: 'var(--muted)' }}
          >
            Lo que hago para que tu negocio crezca en digital.
          </p>
        </FadeIn>
      </div>

      {/* === MAIN SERVICES === */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 md:gap-4 lg:gap-6 mb-10 md:mb-8 lg:mb-12">
        {MAIN_SERVICES.map((svc, i) => (
          <FadeIn key={svc.id} delay={i * 0.1} y={30}>
            <div
              className="relative p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 32,
                background: 'var(--bg)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {/* Discount badge */}
              <span
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full self-start mb-4"
                style={{
                  background: 'linear-gradient(135deg,rgba(79,127,255,0.15),rgba(0,229,195,0.1))',
                  color: 'var(--accent2)',
                  border: '1px solid rgba(0,229,195,0.2)',
                }}
              >
                <span style={{ color: 'var(--accent)' }}>¡{svc.discount}!</span> <CountdownTimer />
              </span>

              <h3
                className="font-syne font-bold uppercase tracking-tight mb-4"
                style={{ fontSize: 'clamp(18px,1.8vw,24px)', color: 'var(--white)' }}
              >
                {svc.title}
              </h3>

              <p
                className="font-mono font-light leading-relaxed mb-4"
                style={{ fontSize: 'clamp(0.75rem,1.1vw,0.9rem)', color: 'var(--muted)' }}
              >
                {svc.description}
              </p>

              {/* Targets */}
              <ul className="space-y-1.5 mb-4 flex-1">
                {svc.targets.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    {t}
                  </li>
                ))}
              </ul>

              <p
                className="font-mono font-light leading-relaxed mb-6 text-sm"
                style={{ color: 'var(--muted)' }}
              >
                {svc.includes}
              </p>

              <button
                className="self-start font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-250 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                  color: '#FFFFFF',
                }}
              >
                {svc.cta}
              </button>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* === BENEFITS === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <h3
            className="font-syne font-bold uppercase tracking-tight text-center mb-6 md:mb-4 lg:mb-6"
            style={{ fontSize: 'clamp(20px,2.2vw,28px)', color: 'var(--white)' }}
          >
            Conoce estos beneficios exclusivos para ti
          </h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {SERVICE_BENEFITS.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.1} y={20}>
              <div
                className="p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-syne font-bold text-lg"
                    style={{
                      background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ✦
                  </span>
                  <div>
                    <h4 className="font-syne font-bold uppercase text-sm tracking-tight" style={{ color: 'var(--white)' }}>
                      {b.title}
                    </h4>
                    <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                      {b.subtitle}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 mb-5">
                  {b.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
                      <span style={{ color: 'var(--accent2)' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent"
                  style={{ color: 'var(--accent2)' }}
                >
                  {b.cta} →
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* === ADDITIONAL SERVICES === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <h3
            className="font-syne font-black uppercase tracking-tight mb-6 md:mb-4 lg:mb-6"
            style={{ fontSize: 'clamp(24px,3vw,40px)', color: 'var(--white)' }}
          >
            <span className="gradient-heading">Servicios</span> adicionales
          </h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {ADDITIONAL_SERVICES.map((svc, i) => (
            <FadeIn key={svc.title} delay={i * 0.08} y={20}>
              <div
                className="p-5 md:p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  background: 'var(--bg)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <h4
                  className="font-syne font-bold uppercase tracking-tight mb-2"
                  style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--white)' }}
                >
                  {svc.title}
                </h4>
                <p
                  className="font-mono font-light leading-relaxed mb-4 flex-1"
                  style={{ fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: 'var(--muted)' }}
                >
                  {svc.desc}
                </p>
                <button
                  className="self-start font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 hover:text-accent"
                  style={{ color: 'var(--accent2)' }}
                >
                  {svc.cta} →
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* === TEMPLATES === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <h3
            className="font-syne font-bold uppercase tracking-tight text-center mb-3"
            style={{ fontSize: 'clamp(20px,2.2vw,28px)', color: 'var(--white)' }}
          >
            Plantillas para ti
          </h3>
          <p
            className="font-mono text-sm text-center mb-8"
            style={{ color: 'var(--muted)' }}
          >
            Herramientas Excel profesionales para mejorar tu productividad y finanzas personales. Acceso inmediato por solo $7 USD cada una.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
          {TEMPLATES.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.1} y={20}>
              <div
                className="p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div
                  className="font-syne font-black text-3xl mb-3"
                  style={{
                    background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t.price}
                </div>
                <h4 className="font-syne font-bold uppercase tracking-tight mb-2" style={{ color: 'var(--white)' }}>
                  {t.title}
                </h4>
                <p
                  className="font-mono font-light leading-relaxed mb-5 text-sm"
                  style={{ color: 'var(--muted)' }}
                >
                  {t.desc}
                </p>
                <button
                  className="font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-250"
                  style={{
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
                >
                  {t.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* === LOCAL AI === */}
      <div className="max-w-5xl mx-auto">
        <FadeIn y={30}>
          <div
            className="p-6 md:p-8"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 24,
              background: 'var(--bg)',
            }}
          >
            <h4
              className="font-syne font-bold uppercase tracking-tight mb-3"
              style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--white)' }}
            >
              IA Local
            </h4>
            <p
              className="font-mono font-light leading-relaxed mb-5 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              Modelos de lenguaje que corren nativamente en tu GPU o RAM. Sin suscripciones. Tus datos nunca salen de tu máquina.
            </p>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              <div
                className="grid grid-cols-3 gap-3 px-4 py-3 font-mono text-[10px] tracking-widest uppercase"
                style={{ background: 'var(--surface)', color: 'var(--muted)' }}
              >
                <span>Modelo</span>
                <span>RAM</span>
                <span>Uso</span>
              </div>
              {LOCAL_AI.models.map((m, i) => (
                <div
                  key={m.name}
                  className="grid grid-cols-3 gap-3 px-4 py-3 font-mono text-xs"
                  style={{
                    borderTop: '1px solid var(--border)',
                    color: 'var(--text)',
                    background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                  }}
                >
                  <span className="font-syne font-bold uppercase tracking-tight">{m.name}</span>
                  <span style={{ color: 'var(--accent)' }}>{m.ram}</span>
                  <span style={{ color: 'var(--muted)' }}>{m.use}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
