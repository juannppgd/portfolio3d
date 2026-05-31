import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaHtml5, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaMobileAlt, FaPython,
  FaBrain, FaVideo, FaChartBar, FaFlask, FaHandshake, FaCode, FaJsSquare,
  FaEnvelope, FaAd, FaFacebook, FaChartLine, FaCut,
} from 'react-icons/fa'
import { SiVite, SiCanva, SiFigma } from 'react-icons/si'
import FadeIn from '../components/FadeIn'
import { SKILLS, SOFTWARE_TOOLS, DEV_STACK } from '../data'

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

const ICONS: Record<string, IconComponent> = {
  FaHtml5, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaMobileAlt, FaPython,
  FaBrain, FaVideo, FaChartBar, FaFlask, FaHandshake, FaCode, FaJsSquare,
  FaEnvelope, FaAd, FaFacebook, FaChartLine, FaCut,
  SiVite, SiCanva, SiFigma,
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
            Mis <span className="gradient-heading">conocimientos.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm leading-relaxed mb-10 md:mb-8 lg:mb-10"
            style={{ color: 'var(--muted)', maxWidth: 400 }}
          >
            Habilidades, herramientas y tecnologías que domino para crear soluciones digitales completas.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
          {/* === HABILIDADES === */}
          <div>
            <FadeIn y={20}>
              <span className="font-mono text-xs tracking-widest uppercase block mb-6" style={{ color: 'var(--accent2)' }}>
                // Habilidades
              </span>
            </FadeIn>
            <div className="space-y-4">
              {SKILLS.map((s, i) => (
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
                // Software y Herramientas
              </span>
            </FadeIn>
            <div className="grid grid-cols-2 gap-3">
              {SOFTWARE_TOOLS.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.04} y={10}>
                  <div
                    className="flex flex-col p-3.5 rounded-xl min-h-0 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <span className="flex items-center gap-1.5 font-syne font-bold text-[11px] uppercase tracking-tight mb-1.5" style={{ color: 'var(--white)' }}>
                      {(() => {
                        const Ic = t.icon ? ICONS[t.icon] : null
                        return Ic ? <Ic size={12} /> : null
                      })()}
                      {t.name}
                    </span>
                    <span
                      className="self-start font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--muted)',
                      }}
                    >
                      {t.cat}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* === DEV STACK === */}
        <div className="mt-10 md:mt-8 lg:mt-12">
          <FadeIn y={20}>
            <span className="font-mono text-xs tracking-widest uppercase block mb-8" style={{ color: 'var(--accent2)' }}>
              // Mi Stack De Desarrollo
            </span>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {DEV_STACK.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.06} y={15}>
                <div
                  className="p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const Icon = ICONS[item.icon]
                      return Icon ? (
                        <span className="shrink-0" style={{ color: 'var(--accent)' }}>
                          <Icon size={16} />
                        </span>
                      ) : null
                    })()}
                    <div
                      className="font-syne font-bold text-xs uppercase tracking-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {item.name}
                    </div>
                  </div>
                  <p
                    className="font-mono text-xs font-light leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
