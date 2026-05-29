import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import profileImg from '../assets/profile.jpeg'

const anim = (delay: number, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function HeroSection() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden px-6 md:px-12 pt-20 sm:pt-24 pb-14 md:pb-16"
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

      {/* Desktop spacer - pushes content to bottom on large screens */}
      <div className="hidden lg:block flex-1" />

      {/* Portrait - top center on mobile/tablet, right side on desktop */}
      <div className="relative z-10 flex justify-center items-center lg:absolute lg:right-[4%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[400px] xl:w-[440px] lg:pointer-events-none mt-12 lg:mt-0 mb-4 lg:mb-0">
        <div className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-full">
          {isLight ? (
            <div
              className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-12 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(79,127,255,0.2) 0%, transparent 70%)',
              }}
            />
          ) : (
            <div
              className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-12 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(79,127,255,0.15) 0%, transparent 70%)',
              }}
            />
          )}
          <motion.div
            className="relative rounded-3xl"
            {...anim(0.4, 20)}
            style={{
              animation: 'floatPremium 7s ease-in-out infinite',
              boxShadow: isLight
                ? '0 4px 20px rgba(0,0,0,0.08), 0 0 40px rgba(79,127,255,0.06)'
                : '0 0 40px rgba(79,127,255,0.12), 0 0 80px rgba(0,229,195,0.04)',
            }}
          >
            {isLight ? (
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,127,255,0.04), rgba(0,196,162,0.02))',
                  filter: 'blur(16px)',
                }}
              />
            ) : (
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,127,255,0.08), rgba(0,229,195,0.04))',
                  filter: 'blur(24px)',
                }}
              />
            )}
            <img
              src={profileImg}
              alt="Juan Pablo Gutiérrez Díaz"
              fetchPriority="high"
              decoding="async"
              className="w-full relative z-10"
              style={{
                filter: 'grayscale(10%) contrast(1.05)',
                borderRadius: 'inherit',
                maskImage: isLight ? 'none' : 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: isLight ? 'none' : 'linear-gradient(to bottom, black 80%, transparent 100%)',
                border: isLight ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20">
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
            className="font-syne font-black uppercase leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block" style={{ fontSize: 'clamp(32px,7vw,100px)', color: 'var(--white)' }}>
              Juan
            </span>
            <span className="block gradient-heading" style={{ fontSize: 'clamp(36px,7.5vw,110px)' }}>
              Pablo
            </span>
            <span className="block" style={{ fontSize: 'clamp(20px,4vw,64px)', color: 'var(--white)' }}>
              Gutiérrez
            </span>
            <span className="block" style={{ fontSize: 'clamp(24px,4.5vw,72px)', color: 'var(--white)' }}>
              Díaz
            </span>
          </motion.h1>
        </div>

        {/* Bottom row */}
        <div className="flex gap-6 sm:gap-8">
          <motion.p
            className="font-mono font-light leading-relaxed"
            style={{ fontSize: 'clamp(0.7rem,1.2vw,1rem)', color: 'var(--muted)', maxWidth: 300 }}
            {...anim(0.35, 20)}
          >
            <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Desarrollo web</strong> &amp;{' '}
            <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Marketing digital</strong>
            <br />
            para empresas que quieren crecer en Colombia y Latam.
          </motion.p>
        </div>
      </div>

      {/* Mobile spacer - fills remaining space on mobile */}
      <div className="flex-1 lg:hidden" />

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-14 inset-x-0 flex justify-center flex-col items-center gap-2 z-20"
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
        @keyframes floatPremium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(0.6deg); }
          66% { transform: translateY(-5px) rotate(-0.3deg); }
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
