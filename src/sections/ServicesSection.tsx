import { useEffect, useState } from 'react'
import {
  FaGraduationCap, FaLaptopCode, FaStore, FaFileAlt,
  FaClock, FaLaptop, FaChartLine, FaServer, FaComments,
  FaWallet, FaCalendarCheck, FaBrain, FaCheck, FaCircle,
} from 'react-icons/fa'
import FadeIn from '../components/FadeIn'
import { MAIN_SERVICES, SERVICE_BENEFITS, ADDITIONAL_SERVICES, TEMPLATES, LOCAL_AI } from '../data'

type Page = 'home' | 'apoyo-academico' | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv' | 'plantilla-gastos' | 'plantilla-habitos' | 'ia-local'

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
  return <span className="tabular-nums inline-flex items-center gap-1"><FaClock size={12} /> {time}</span>
}

const getServicePage = (title: string): Page | null => {
  if (title.includes('Desarrollo de trabajos') || title.includes('académicos')) return 'apoyo-academico'
  if (title.includes('Clases de programación')) return 'clases-programacion'
  if (title.includes('Venta de garaje') || title.includes('Marketplace')) return 'ventas-online'
  if (title.includes('CV') || title.includes('Hoja de Vida')) return 'optimizacion-cv'
  if (title.includes('Control de Gastos') || title.includes('Gastos')) return 'plantilla-gastos'
  if (title.includes('Rastreo de Hábitos') || title.includes('Hábitos')) return 'plantilla-habitos'
  if (title.includes('IA Local') || title.includes('IA local')) return 'ia-local'
  return null
}

const openPage = (page: Page) => {
  window.open(`/${page}`, '_blank', 'noopener,noreferrer')
}

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="px-6 md:px-12 py-12 md:py-10 lg:py-12 relative z-10"
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
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  }}
                >
                  {svc.id === 'web' ? <FaLaptop size={26} className="text-white" /> : <FaChartLine size={26} className="text-white" />}
                </div>
                <span
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg,rgba(79,127,255,0.15),rgba(0,229,195,0.1))',
                    color: 'var(--accent2)',
                    border: '1px solid rgba(0,229,195,0.2)',
                  }}
                >
                  <span style={{ color: 'var(--accent)' }}>¡{svc.discount}!</span> <CountdownTimer />
                </span>
              </div>

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

              <ul className="space-y-1.5 mb-4 flex-1">
                {svc.targets.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
                    <FaCircle size={5} style={{ color: 'var(--accent)', marginTop: 7 }} />
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
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="self-center font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-250 hover:-translate-y-0.5"
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
                className="p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    }}
                  >
                    {b.title.includes('Hosting') ? <FaServer size={22} className="text-white" /> : <FaComments size={22} className="text-white" />}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold uppercase text-sm tracking-tight" style={{ color: 'var(--white)' }}>
                      {b.title}
                    </h4>
                    <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                      {b.subtitle}
                    </span>
                  </div>
                </div>
                  <ul className="space-y-2 flex-1">
                    {b.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
                        <FaCheck size={12} style={{ color: 'var(--accent2)', marginTop: 3 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
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
          {ADDITIONAL_SERVICES.map((svc, i) => {
            const servicePage = getServicePage(svc.title)
            return (
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
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto my-3"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    }}
                  >
                    {svc.title.includes('Desarrollo') ? (
                      <FaGraduationCap size={24} className="text-white" />
                    ) : svc.title.includes('Clases') ? (
                      <FaLaptopCode size={24} className="text-white" />
                    ) : svc.title.includes('Venta') ? (
                      <FaStore size={24} className="text-white" />
                    ) : (
                      <FaFileAlt size={24} className="text-white" />
                    )}
                  </div>
                  <p
                    className="font-mono font-light leading-relaxed mb-4 flex-1"
                    style={{ fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: 'var(--muted)' }}
                  >
                    {svc.desc}
                  </p>
                  <button
                    onClick={() => { if (servicePage) openPage(servicePage) }}
                    className="self-center font-syne font-bold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-250 hover:-translate-y-0.5 mt-auto"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: '#fff',
                    }}
                  >
                    {svc.cta}
                  </button>
                </div>
              </FadeIn>
            )
          })}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TEMPLATES.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.1} y={20}>
              <div
                className="p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,127,255,0.15), rgba(0,229,195,0.1))',
                    color: 'var(--accent2)',
                  }}
                >
                  {t.title.includes('Gastos') ? <FaWallet size={22} /> : <FaCalendarCheck size={22} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-syne font-bold uppercase tracking-tight" style={{ color: 'var(--white)' }}>
                      {t.title}
                    </h4>
                    <span
                      className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: 'rgba(79,127,255,0.1)', color: 'var(--accent)' }}
                    >
                      {t.price}
                    </span>
                  </div>
                  <p
                    className="font-mono font-light leading-relaxed mb-3 text-sm"
                    style={{ color: 'var(--muted)' }}
                  >
                    {t.desc}
                  </p>
                  <button
                    onClick={() => {
                      const page = getServicePage(t.title)
                      if (page) openPage(page)
                    }}
                    className="font-syne font-bold text-[11px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-250"
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
            <h3
              className="font-syne font-bold uppercase tracking-tight mb-3 flex items-center justify-between gap-3"
              style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--white)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,127,255,0.15), rgba(0,229,195,0.1))',
                    color: 'var(--accent2)',
                  }}
                >
                  <FaBrain size={20} />
                </div>
                IA Local
              </div>
              <button
                type="button"
                onClick={() => openPage('ia-local')}
                className="font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-200 hover:text-accent shrink-0"
                style={{ color: 'var(--accent)' }}
              >
                Conocer más
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </h3>
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
