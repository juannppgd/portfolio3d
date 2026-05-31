import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaServer, FaCode, FaBullhorn, FaMobileAlt, FaNewspaper,
  FaLaptop, FaChartLine, FaRocket, FaAd, FaChartBar, FaGlobe, FaShieldAlt, FaHeartbeat,
} from 'react-icons/fa'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { FORMAL_EDUCATION, CERTIFICATIONS } from '../data'

const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  FaServer, FaCode, FaBullhorn, FaMobileAlt, FaNewspaper,
  FaLaptop, FaChartLine, FaRocket, FaAd, FaChartBar, FaGlobe, FaShieldAlt, FaHeartbeat,
}

const TEXT =
  'Con más de cinco años creando soluciones digitales, me especializo en desarrollo web, marketing digital y automatización. Trabajo con empresarios y emprendedores que quieren destacar en línea y ver resultados reales.'

export default function AboutSection() {
  const paraRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paraRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = TEXT.split('')
  const [showAllCerts, setShowAllCerts] = useState(false)
  const visibleCerts = showAllCerts ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 3)

  return (
    <section
      id="about"
      className="px-6 md:px-12 pt-12 md:pt-10 lg:pt-12 pb-20 md:pb-16 lg:pb-20 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-6 lg:gap-12 items-center">
        {/* Left heading */}
        <FadeIn y={40}>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight gradient-heading-mono break-words"
            style={{ fontSize: 'clamp(42px,7vw,110px)' }}
          >
            Sobre<br />mí.
          </h2>
        </FadeIn>

        {/* Right content */}
        <FadeIn delay={0.15} y={30}>
          <span
            className="font-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: 'var(--accent2)' }}
          >
            // Quién soy
          </span>

          {/* Animated character-by-character text */}
          <p
            ref={paraRef}
            className="leading-relaxed mb-8 relative break-words overflow-hidden"
            style={{ fontSize: 'clamp(0.85rem,2.5vw,1.15rem)', color: 'transparent', maxWidth: '100%' }}
            aria-label={TEXT}
          >
            {chars.map((char, i) => {
              const start = i / chars.length
              const end = Math.min(1, (i + 8) / chars.length)
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
              return (
                <motion.span
                  key={i}
                  style={{ opacity, color: 'var(--text)' }}
                >
                  {char}
                </motion.span>
              )
            })}
          </p>

          {/* Stats */}
          <div className="flex gap-4 md:gap-10 mb-2 flex-wrap">
            {[
              { num: '5+', label: 'Años de exp.' },
              { num: '30+', label: 'Proyectos' },
              { num: '100%', label: 'Compromiso' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-syne font-black leading-none"
                  style={{ fontSize: 'clamp(28px,6vw,36px)', color: 'var(--white)' }}
                >
                  {s.num}
                </div>
                <div
                  className="font-mono text-[10px] tracking-widest uppercase mt-1"
                  style={{ color: 'var(--muted)' }}
                >
                  {s.label}
                </div>
                </div>
              ))}
            </div>

        </FadeIn>
      </div>

      {/* Formación Académica & Certificaciones */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-6 lg:mt-10 pt-8 md:pt-6 lg:pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-6 lg:gap-10">
          {/* Formal Education */}
          <FadeIn y={30}>
            <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
              // Formación Académica
            </span>
            <div className="space-y-5">
              {FORMAL_EDUCATION.map((item) => {
                const EduIcon = item.icon ? ICONS[item.icon] : null
                return (
                <div key={item.title} className="pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 font-syne font-bold tracking-tight" style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--white)' }}>
                    {EduIcon && <span style={{ color: 'var(--accent)' }}><EduIcon size={16} /></span>}
                    {item.title}
                  </div>
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: item.status === 'En curso' ? 'var(--accent)' : 'var(--muted)' }}>
                    {item.status}
                  </span>
                </div>
              )})}
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn y={30} delay={0.1}>
            <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
              // Certificaciones & Cursos
            </span>
            <div className="space-y-5">
              {visibleCerts.map((group) => (
                <div key={group.category}>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>
                    {(() => {
                      const CatIcon = group.icon ? ICONS[group.icon] : null
                      return CatIcon ? <CatIcon size={12} /> : null
                    })()}
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full transition-colors duration-200"
                        style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {CERTIFICATIONS.length > 3 && (
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mt-5 transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--muted)' }}
              >
                {showAllCerts ? '▲ Mostrar menos' : '▼ Ver más'}
              </button>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
