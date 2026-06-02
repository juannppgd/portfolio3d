import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import {
  FaHtml5, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaMobileAlt, FaPython,
  FaBrain, FaVideo, FaChartBar, FaFlask, FaHandshake, FaCode, FaJsSquare,
  FaEnvelope, FaAd, FaFacebook, FaChartLine, FaCut,
} from 'react-icons/fa'
import { SiVite, SiCanva, SiShopify, SiWordpress } from 'react-icons/si'
import FadeIn from '../components/FadeIn'

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

const ICONS: Record<string, IconComponent> = {
  FaHtml5, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaMobileAlt, FaPython,
  FaBrain, FaVideo, FaChartBar, FaFlask, FaHandshake, FaCode, FaJsSquare,
  FaEnvelope, FaAd, FaFacebook, FaChartLine, FaCut,
  SiVite, SiCanva, SiShopify, SiWordpress,
}

function SkillBar({ name, pct, index, icon }: { name: string; pct: number; index: number; icon?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = icon ? ICONS[icon] : null

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-2 font-mono text-sm" style={{ color: 'var(--text)' }}>
          {Icon && <span style={{ color: 'var(--accent)' }}><Icon size={14} /></span>}
          {name}
        </span>
        <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--accent)' }}>{pct}%</span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg,var(--accent),var(--accent2))',
          }}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${pct}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  )
}

export default function KnowledgeSection() {
  const { t } = useTranslation()

  const skills = t('skills.items', { returnObjects: true }) as any[]
  const softwareTools = t('softwareTools.items', { returnObjects: true }) as any[]
  const devStack = t('devStack.items', { returnObjects: true }) as any[]

  return (
    <section
      id="conocimientos"
      className="px-6 md:px-12 pt-12 md:pt-10 lg:pt-12 pb-20 md:pb-16 lg:pb-20 relative z-20"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight mb-3 break-words"
            style={{ fontSize: 'clamp(22px,4vw,56px)', color: 'var(--white)', maxWidth: '90vw', margin: '0 auto' }}
          >
            {t('knowledge.heading')}<span className="gradient-heading">{t('knowledge.headingHighlight')}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm leading-relaxed mb-10 md:mb-8 lg:mb-10"
            style={{ color: 'var(--muted)', maxWidth: 400 }}
          >
            {t('knowledge.subtitle')}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
          {/* === HABILIDADES === */}
          <div>
            <FadeIn y={20}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
                {t('knowledge.skillsTag')}
              </span>
            </FadeIn>
            <div className="space-y-4">
              {skills.map((s: any, i: number) => (
                <FadeIn key={s.name} delay={i * 0.05} y={10}>
                  <SkillBar name={s.name} pct={s.pct} index={i} icon={s.icon} />
                </FadeIn>
              ))}
            </div>
          </div>

          {/* === SOFTWARE & HERRAMIENTAS === */}
          <div>
            <FadeIn y={20}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
                {t('knowledge.toolsTag')}
              </span>
            </FadeIn>
            <div className="grid grid-cols-2 gap-3">
              {softwareTools.map((st: any, i: number) => {
                const Ic = st.icon ? ICONS[st.icon] : null
                return (
                <FadeIn key={st.name} delay={i * 0.04} y={10}>
                  <div
                    className="group relative p-4 rounded-xl min-h-0 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${st.color}22 0%, transparent 70%)`,
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-1.5 font-syne font-bold text-[11px] uppercase tracking-tight mb-1.5" style={{ color: 'var(--white)' }}>
                      {Ic && (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${st.color}18`, color: st.color }}
                        >
                          <Ic size={14} />
                        </div>
                      )}
                      {st.name}
                    </span>

                  </div>
                </FadeIn>
                )
              })}
            </div>
          </div>
        </div>

        {/* === DEV STACK === */}
        <div className="mt-10 md:mt-8 lg:mt-12">
          <FadeIn y={20}>
            <span className="font-mono text-xs tracking-widest uppercase block mb-8" style={{ color: 'var(--accent2)' }}>
              {t('knowledge.stackTag')}
            </span>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {devStack.map((item: any, i: number) => {
              const Icon = item.icon ? ICONS[item.icon] : null
              return (
                <FadeIn key={item.name} delay={i * 0.06} y={15}>
                  <div
                    className="group relative p-4 sm:p-5 rounded-2xl flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 hover:translate-y-[-6px]"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${item.color}22 0%, transparent 70%)`,
                      }}
                    />
                    {Icon && (
                      <div
                        className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}18`,
                          color: item.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                    )}
                    <span
                      className="relative z-10 font-syne font-bold text-[10px] sm:text-xs leading-tight text-center"
                      style={{ color: 'var(--white)' }}
                    >
                      {item.name}
                    </span>
                    <p
                      className="relative z-10 font-mono text-[9px] sm:text-[10px] leading-relaxed text-center"
                      style={{ color: 'var(--muted)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
