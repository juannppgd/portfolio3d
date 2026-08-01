import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaGraduationCap, FaLaptopCode, FaStore, FaFileAlt,
  FaClock, FaLaptop, FaChartLine,
  FaWallet, FaCalendarCheck, FaBrain, FaCheck, FaCircle,
} from 'react-icons/fa'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import DataIcon from '../components/DataIcon'

type Page = 'home' | 'apoyo-academico' | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv' | 'plantilla-gastos' | 'plantilla-habitos' | 'ia-local' | 'recomp-app' | 'ia-apps'

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

const servicePageMap: (Page | null)[] = [
  'apoyo-academico',
  'clases-programacion',
  'ventas-online',
  'optimizacion-cv',
]

const templatePageMap: (Page | null)[] = [
  'plantilla-gastos',
  'plantilla-habitos',
]

const getServicePage = (index: number): Page | null => {
  return servicePageMap[index] ?? null
}

const openPage = (page: Page) => {
  window.open(`/${page}`, '_blank', 'noopener,noreferrer')
}

export default function ServicesSection() {
  const { t } = useTranslation()

  const mainServices = t('data.mainServices', { returnObjects: true }) as any[]
  const recompApp = t('data.recompApp', { returnObjects: true }) as any
  const additionalServices = t('data.additionalServices', { returnObjects: true }) as any[]
  const templates = t('data.templates', { returnObjects: true }) as any[]
  const localAi = t('data.localAi', { returnObjects: true }) as any

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
            {t('services.heading')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm leading-relaxed mt-3"
            style={{ color: 'var(--muted)' }}
          >
            {t('services.subtitle')}
          </p>
        </FadeIn>
      </div>

      {/* === MAIN SERVICES === */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 md:gap-4 lg:gap-6 mb-10 md:mb-8 lg:mb-12">
        {mainServices.map((svc: any, i: number) => (
          <FadeIn key={svc.id} delay={i * 0.1} y={30}>
            <div
              className="group relative p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
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
                  className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: svc.id === 'web' ? 'rgba(79,127,255,0.12)' : 'rgba(0,229,195,0.12)',
                    color: svc.id === 'web' ? 'var(--accent)' : 'var(--accent2)',
                  }}
                >
                  {svc.id === 'web' ? <FaLaptop size={26} /> : <FaChartLine size={26} />}
                </div>
                <span
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg,rgba(79,127,255,0.15),rgba(0,229,195,0.1))',
                    color: 'var(--accent2)',
                    border: '1px solid rgba(0,229,195,0.2)',
                  }}
                >
                  <span style={{ color: 'var(--accent)' }}>{t('services.discountFormat', { discount: svc.discount })}</span> <CountdownTimer />
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
                {svc.targets.map((target: string) => (
                  <li key={target} className="flex items-start gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
                    <FaCircle size={5} style={{ color: 'var(--accent)', marginTop: 7 }} />
                    {target}
                  </li>
                ))}
              </ul>

              <p
                className="font-syne font-bold text-xs tracking-widest uppercase mb-2 text-center"
                style={{ color: 'var(--accent2)' }}
              >
                {svc.benefitsTitle}
              </p>

              <ul className="space-y-1 mb-4 flex-1">
                {svc.benefits.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 font-mono text-xs" style={{ color: 'var(--text)' }}>
                    <FaCheck size={10} style={{ color: 'var(--accent2)', marginTop: 3 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="self-center font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: 'var(--on-accent)',
                }}
              >
                {svc.cta}
              </button>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* === APPS CON IA === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <div
            className="group relative p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 32,
              background: 'var(--bg)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)' }}
            />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(79,127,255,0.08) 0%, rgba(0,229,195,0.05) 50%, transparent 70%)' }}
            />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.14), rgba(236,72,153,0.12))',
                    color: '#A855F7',
                  }}
                >
                  <FaWandMagicSparkles size={22} />
                </div>
                <span
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(168,85,247,0.15)',
                    color: '#A855F7',
                    border: '1px solid rgba(168,85,247,0.25)',
                  }}
                >
                  <FaBrain size={11} />
                  {recompApp.badge}
                </span>
              </div>

              <h3
                className="font-syne font-bold uppercase tracking-tight mb-2"
                style={{ fontSize: 'clamp(18px,1.8vw,26px)', color: 'var(--white)' }}
              >
                {recompApp.title}
              </h3>
              <p
                className="font-mono text-xs tracking-wide mb-3"
                style={{ color: 'var(--accent2)' }}
              >
                {recompApp.subtitle}
              </p>
              <p
                className="font-mono font-light leading-relaxed mb-6 text-sm max-w-3xl"
                style={{ color: 'var(--muted)' }}
              >
                {recompApp.description}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
                {recompApp.apps.map((app: { name: string; icon: string; color: string }, j: number) => (
                  <div
                    key={app.name}
                    className="group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = app.color }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${app.color}18`, color: app.color }}
                    >
                      <DataIcon icon={app.icon} size={20} />
                    </div>
                    <span
                      className="font-syne font-bold uppercase tracking-tight text-[10px] sm:text-[11px] text-center leading-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => window.open('/ia-apps', '_blank')}
                className="inline-flex items-center gap-3 font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg,#A855F7,#EC4899)',
                  color: '#0A0D14',
                  boxShadow: '0 0 30px rgba(168,85,247,0.25)',
                }}
              >
                {recompApp.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* === ADDITIONAL SERVICES === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <h3
            className="font-syne font-black uppercase tracking-tight mb-6 md:mb-4 lg:mb-6"
            style={{ fontSize: 'clamp(24px,3vw,40px)', color: 'var(--white)' }}
          >
            <span className="gradient-heading">{t('services.additionalTitle')}</span> {t('services.additionalTitleSuffix')}
          </h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {additionalServices.map((svc: any, i: number) => {
            const servicePage = getServicePage(i)
            return (
              <FadeIn key={svc.title} delay={i * 0.08} y={20}>
                <div
                  className="group p-5 md:p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    background: 'var(--bg)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: i === 0 ? 'rgba(168,85,247,0.12)' : i === 1 ? 'rgba(245,158,11,0.12)' : i === 2 ? 'rgba(16,185,129,0.12)' : 'rgba(236,72,153,0.12)',
                        color: i === 0 ? '#A855F7' : i === 1 ? '#F59E0B' : i === 2 ? '#10B981' : '#EC4899',
                      }}
                    >
                      {i === 0 ? (
                        <FaGraduationCap size={20} />
                      ) : i === 1 ? (
                        <FaLaptopCode size={20} />
                      ) : i === 2 ? (
                        <FaStore size={20} />
                      ) : (
                        <FaFileAlt size={20} />
                      )}
                    </div>
                    <h4
                      className="font-syne font-bold uppercase tracking-tight"
                      style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--white)' }}
                    >
                      {svc.title}
                    </h4>
                  </div>
                  <p
                    className="font-mono font-light leading-relaxed mb-4 flex-1"
                    style={{ fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: 'var(--muted)' }}
                  >
                    {svc.desc}
                  </p>
                  <button
                    onClick={() => { if (servicePage) openPage(servicePage) }}
                    className="self-center font-syne font-bold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 mt-auto"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: 'var(--on-accent)',
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

      {/* === AUTOMATIZACIÓN CON IA === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <div
            className="group p-6 md:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 32,
              background: 'var(--bg)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(16,185,129,0.12)',
                      color: '#10B981',
                    }}
                  >
                    <FaBrain size={22} />
                  </div>
                  <span
                    className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10B981',
                      border: '1px solid rgba(16,185,129,0.25)',
                    }}
                  >
                    {t('services.automationSubtitle')}
                  </span>
                </div>

                <h3
                  className="font-syne font-bold uppercase tracking-tight mb-1"
                  style={{ fontSize: 'clamp(18px,1.8vw,24px)', color: 'var(--white)' }}
                >
                  {t('services.automationTitle')}
                </h3>
                <p
                  className="font-mono font-light leading-relaxed mb-4 text-sm"
                  style={{ color: 'var(--muted)' }}
                >
                  {t('services.automationDesc')}
                </p>

                <button
                  type="button"
                  onClick={() => openPage('ia-local')}
                  className="font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg,#10B981,#06B6D4)',
                    color: '#0A0D14',
                  }}
                >
                  {t('services.automationCta')}
                </button>
              </div>

              <ul className="space-y-2.5 flex-1 min-w-0">
                {localAi.features.map((feat: { icon: string; text: string }) => (
                  <li key={feat.text} className="flex items-center gap-3 font-mono text-xs" style={{ color: 'var(--text)' }}>
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        color: '#10B981',
                      }}
                    >
                      <DataIcon icon={feat.icon} size={14} />
                    </div>
                    {feat.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* === TEMPLATES === */}
      <div className="max-w-5xl mx-auto mb-10 md:mb-8 lg:mb-12">
        <FadeIn y={20}>
          <h3
            className="font-syne font-bold uppercase tracking-tight text-center mb-3"
            style={{ fontSize: 'clamp(20px,2.2vw,28px)', color: 'var(--white)' }}
          >
            {t('services.templatesTitle')}
          </h3>
          <p
            className="font-mono text-sm text-center mb-8"
            style={{ color: 'var(--muted)' }}
          >
            {t('services.templatesDesc')}
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {templates.map((tpl: any, i: number) => {
            const templatePage = templatePageMap[i] ?? null
            return (
            <FadeIn key={tpl.title} delay={i * 0.1} y={20}>
                <div
                  className="group p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 24,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: i === 0 ? 'rgba(79,127,255,0.12)' : 'rgba(0,229,195,0.12)',
                      color: i === 0 ? 'var(--accent)' : 'var(--accent2)',
                    }}
                  >
                    {i === 0 ? <FaWallet size={22} /> : <FaCalendarCheck size={22} />}
                  </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-syne font-bold uppercase tracking-tight" style={{ color: 'var(--white)' }}>
                      {tpl.title}
                    </h4>
                    <span
                      className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: 'rgba(79,127,255,0.1)', color: 'var(--accent)' }}
                    >
                      {tpl.price}
                    </span>
                  </div>
                  <p
                    className="font-mono font-light leading-relaxed mb-3 text-sm"
                    style={{ color: 'var(--muted)' }}
                  >
                    {tpl.desc}
                  </p>
                  <button
                    onClick={() => {
                      if (templatePage) openPage(templatePage)
                    }}
                    className="font-syne font-bold text-[11px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-200"
                    style={{
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)',
                      background: 'transparent',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
                  >
                    {tpl.cta}
                  </button>
                </div>
              </div>
            </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
