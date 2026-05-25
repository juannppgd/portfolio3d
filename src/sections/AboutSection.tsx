import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'

const TEXT =
  'Con más de cinco años creando soluciones digitales, me especializo en desarrollo web, marketing digital y automatización. Trabajo con empresarios y emprendedores que quieren destacar en línea y ver resultados reales. Construyamos algo increíble juntos.'

export default function AboutSection() {
  const paraRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paraRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = TEXT.split('')

  return (
    <section
      id="about"
      className="px-6 md:px-12 py-32 md:py-40 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left heading */}
        <FadeIn y={40}>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight gradient-heading-mono"
            style={{ fontSize: 'clamp(56px,7vw,110px)' }}
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
            className="leading-relaxed mb-10 relative"
            style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'transparent' }}
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
          <div className="flex gap-10 mb-12">
            {[
              { num: '5+', label: 'Años de exp.' },
              { num: '30+', label: 'Proyectos' },
              { num: '100%', label: 'Compromiso' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="font-syne font-black leading-none"
                  style={{ fontSize: 36, color: 'var(--white)' }}
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

          <ContactButton label="Hablemos" />
        </FadeIn>
      </div>
    </section>
  )
}
