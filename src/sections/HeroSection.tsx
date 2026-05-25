import { motion } from 'framer-motion'
import ContactButton from '../components/ContactButton'

const PORTRAIT = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

const anim = (delay: number, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-12 pb-14 md:pb-16"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.08) 0%,transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#1C2130,transparent)' }}
      />

      {/* Portrait */}
      <motion.div
        className="absolute right-[6%] md:right-[8%] top-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] md:w-[340px] lg:w-[400px]"
        {...anim(0.6, 30)}
      >
        <img
          src={PORTRAIT}
          alt="Juan Pablo Gutiérrez"
          className="w-full"
          style={{
            filter: 'grayscale(15%) contrast(1.05)',
            animation: 'floatY 6s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* Tag */}
      <motion.div
        className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase mb-5"
        style={{ color: 'var(--accent2)' }}
        {...anim(0)}
      >
        <span className="w-10 h-px" style={{ background: 'var(--accent2)' }} />
        Disponible para proyectos
      </motion.div>

      {/* Heading */}
      <div className="overflow-hidden mb-9">
        <motion.h1
          className="font-syne font-black uppercase leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: 'clamp(60px,9vw,140px)', color: 'var(--white)' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Juan{' '}
          <span className="gradient-heading">Pablo.</span>
        </motion.h1>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between gap-8">
        <motion.p
          className="font-mono font-light leading-relaxed"
          style={{ fontSize: 'clamp(0.75rem,1.3vw,1rem)', color: 'var(--muted)', maxWidth: 280 }}
          {...anim(0.35, 20)}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Desarrollo web</strong> &amp;{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Marketing digital</strong>
          <br />
          para empresas que quieren crecer en Colombia y Latam.
        </motion.p>

        <motion.div {...anim(0.5, 20)}>
          <ContactButton />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--muted)' }}
        {...anim(1.2)}
      >
        <div
          className="w-px h-14"
          style={{ background: 'linear-gradient(180deg,var(--muted),transparent)', animation: 'scrollLine 2s 1.5s infinite' }}
        />
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
