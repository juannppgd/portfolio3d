import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { PROJECTS } from '../data'

interface CardProps {
  project: (typeof PROJECTS)[0]
  index: number
  total: number
}

function ProjectCard({ project, index, total }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const baseScale = 1 - (total - 1 - index) * 0.035
  const scale = useTransform(scrollYProgress, [0, 1], [baseScale, baseScale - 0.04])

  return (
    <div
      ref={cardRef}
      className="min-h-[50vh] md:min-h-[70vh] lg:min-h-[85vh] flex items-start"
    >
      <motion.div
        className="w-full p-6 md:p-8 transition-all duration-300"
        style={{
          position: 'sticky',
          top: `${80 + index * 28}px`,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 32,
          scale,
          transformOrigin: 'top center',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,127,255,0.25)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
              {project.num} / {String(total).padStart(2, '0')}
            </span>
            <span
              className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                color: 'var(--accent2)',
                border: '1px solid rgba(0,229,195,0.2)',
              }}
            >
              {project.cat}
            </span>
            <span
              className="font-syne font-bold tracking-tight"
              style={{ fontSize: 'clamp(20px,2.5vw,32px)', color: 'var(--white)' }}
            >
              {project.name}
            </span>
          </div>
          <button
            className="self-start sm:self-auto flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-250 hover:border-accent hover:text-accent"
            style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'transparent' }}
          >
            ↗ Ver proyecto
          </button>
        </div>

        {/* Images grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3"
          style={{ height: 'clamp(200px,38vh,360px)' }}
        >
          <div className="flex flex-col gap-3">
            {project.col1.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.name} ${i + 1}`}
                loading="lazy"
                className="flex-1 w-full object-cover min-h-0"
                style={{ borderRadius: 20 }}
              />
            ))}
          </div>
          <img
            src={project.col2}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ borderRadius: 20 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="px-6 md:px-12 pt-20 md:pt-16 lg:pt-20 pb-10 md:pb-14 lg:pb-20 relative z-20"
      style={{
        background: 'var(--bg)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-8 lg:mb-12">
        <FadeIn>
          <h2
            className="font-syne font-black uppercase leading-none tracking-tight gradient-heading"
            style={{ fontSize: 'clamp(56px,7vw,120px)' }}
          >
            Proyectos.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <span
            className="font-mono text-xs tracking-widest uppercase cursor-pointer pb-1 transition-colors duration-200 hover:text-accent"
            style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}
          >
            Ver todos →
          </span>
        </FadeIn>
      </div>

      {/* Sticky card stack */}
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  )
}
