import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaServer, FaCode, FaBullhorn, FaMobileAlt, FaNewspaper,
  FaLaptop, FaChartLine, FaRocket, FaAd, FaChartBar, FaGlobe, FaShieldAlt, FaHeartbeat,
} from 'react-icons/fa'
import FadeIn from '../components/FadeIn'

const ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  FaServer, FaCode, FaBullhorn, FaMobileAlt, FaNewspaper,
  FaLaptop, FaChartLine, FaRocket, FaAd, FaChartBar, FaGlobe, FaShieldAlt, FaHeartbeat,
}

const MAX_CHARS = 500

export default function AboutSection() {
  const { t } = useTranslation()
  const paraRef = useRef<HTMLParagraphElement>(null)
  const text = t('about.text')
  const chars = text.split('')
  const { scrollYProgress } = useScroll({
    target: paraRef,
    offset: ['start 0.9', 'end 0.1'],
  })

  const charOpacities: any[] = []
  for (let i = 0; i < MAX_CHARS; i++) {
    const start = i / MAX_CHARS
    const end = Math.min(1, (i + 12) / MAX_CHARS)
    charOpacities.push(useTransform(scrollYProgress, [start, end], [0.08, 1]))
  }

  const [showAllCerts, setShowAllCerts] = useState(false)
  const allCerts = t('certifications.categories', { returnObjects: true }) as { category: string; icon: string; items: string[] }[]
  const visibleCerts = showAllCerts ? allCerts : allCerts.slice(0, 3)

  const educationItems = t('education.items', { returnObjects: true }) as { title: string; statusKey: string; icon: string }[]
  const eduStatuses = t('education.statuses', { returnObjects: true }) as Record<string, string>

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
            <span dangerouslySetInnerHTML={{ __html: t('about.heading') }} />
          </h2>
        </FadeIn>

        {/* Right content */}
        <FadeIn delay={0.15} y={30}>
          <span
            className="font-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: 'var(--accent2)' }}
          >
            {t('about.tag')}
          </span>

          {/* Animated character-by-character text */}
          <p
            ref={paraRef}
            className="leading-relaxed mb-8 relative break-words overflow-hidden"
            style={{ fontSize: 'clamp(0.85rem,2.5vw,1.15rem)', color: 'transparent', maxWidth: '100%' }}
            aria-label={text}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                style={{ opacity: charOpacities[i], color: 'var(--text)' }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          {/* Stats */}
          <div className="flex gap-4 md:gap-10 mb-2 flex-wrap">
            {[
              { num: '5+', label: t('about.statYears') },
              { num: '60+', label: t('about.statProjects') },
              { num: '100%', label: t('about.statCommitment') },
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
              {t('about.educationTitle')}
            </span>
            <div className="space-y-5">
              {educationItems.map((item) => {
                const EduIcon = item.icon ? ICONS[item.icon] : null
                const statusText = eduStatuses[item.statusKey] || item.statusKey
                return (
                <div key={item.title} className="pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 font-syne font-bold tracking-tight" style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--white)' }}>
                    {EduIcon && <span style={{ color: 'var(--accent)' }}><EduIcon size={16} /></span>}
                    {item.title}
                  </div>
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: item.statusKey === 'enCurso' || item.statusKey === 'in-progress' ? 'var(--accent)' : 'var(--muted)' }}>
                    {statusText}
                  </span>
                </div>
              )})}
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn y={30} delay={0.1}>
            <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
              {t('about.certsTitle')}
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
            {allCerts.length > 3 && (
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mt-5 transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--muted)' }}
              >
                {showAllCerts ? t('about.showLess') : t('about.showMore')}
              </button>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
