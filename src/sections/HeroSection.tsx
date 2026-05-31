import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import profileImg from '../assets/juanpablogutierrez.jpeg'

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
      className="relative min-h-screen flex flex-col overflow-hidden px-5 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-20"
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

      {/* Desktop spacer - empuja contenido hacia abajo en pantallas grandes */}
      <div className="hidden lg:block flex-1" />

      {/* Portrait */}
      <div className="
        relative z-10
        flex justify-center items-center
        mt-8 mb-6
        sm:mt-10 sm:mb-8
        lg:absolute lg:right-[4%] lg:top-1/2 lg:-translate-y-1/2
        lg:w-[400px] xl:w-[440px]
        lg:mt-0 lg:mb-0 lg:pointer-events-none
      ">
        {/* Halo glow */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 'clamp(-16px, -4vw, -48px)',
            background: isLight
              ? 'radial-gradient(ellipse at 60% 40%, rgba(79,127,255,0.2) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at 60% 40%, rgba(79,127,255,0.15) 0%, transparent 70%)',
            opacity: isLight ? 0.1 : 0.2,
          }}
        />

        {/* Imagen flotante */}
        <motion.div
          className="relative rounded-3xl hero-portrait"
          {...anim(0.4, 20)}
          style={{
            animation: 'floatPremium 7s ease-in-out infinite',
            boxShadow: isLight
              ? '0 4px 20px rgba(0,0,0,0.08), 0 0 40px rgba(79,127,255,0.06)'
              : '0 0 40px rgba(79,127,255,0.12), 0 0 80px rgba(0,229,195,0.04)',
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: isLight
                ? 'linear-gradient(135deg, rgba(79,127,255,0.04), rgba(0,196,162,0.02))'
                : 'linear-gradient(135deg, rgba(79,127,255,0.08), rgba(0,229,195,0.04))',
              filter: `blur(${isLight ? '16px' : '24px'})`,
            }}
          />
          <img
            src={profileImg}
            alt="Juan Pablo Gutiérrez Díaz — Desarrollador Web y Marketing Digital en Tunja, Colombia"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            width={440}
            height={440}
            className="hero-portrait-img relative z-10"
            style={{
              display: 'block',
              filter: 'grayscale(10%) contrast(1.05)',
              borderRadius: 'inherit',
              maskImage: isLight ? 'none' : 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: isLight ? 'none' : 'linear-gradient(to bottom, black 80%, transparent 100%)',
              border: isLight ? '1px solid rgba(0,0,0,0.06)' : 'none',
            }}
          />
        </motion.div>
      </div>

      {/* Contenido de texto */}
      <div className="relative z-20">
        {/* Tag */}
        <motion.div
          className="flex items-center gap-3 font-mono tracking-widest uppercase mb-4 sm:mb-5"
          style={{ color: 'var(--accent2)', fontSize: 'clamp(9px, 1.8vw, 12px)' }}
          {...anim(0)}
        >
          <span className="w-8 sm:w-10 h-px" style={{ background: 'var(--accent2)' }} />
          Disponible para proyectos
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-6 sm:mb-8 md:mb-9">
          <motion.h1
            className="font-syne font-black uppercase leading-[0.88] tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block" style={{ fontSize: 'clamp(44px, 12vw, 100px)', color: 'var(--white)' }}>
              Juan
            </span>
            <span className="block gradient-heading" style={{ fontSize: 'clamp(50px, 13vw, 110px)' }}>
              Pablo
            </span>
            <span className="block" style={{ fontSize: 'clamp(26px, 7vw, 64px)', color: 'var(--white)' }}>
              Gutiérrez
            </span>
            <span className="block" style={{ fontSize: 'clamp(30px, 8vw, 72px)', color: 'var(--white)' }}>
              Díaz
            </span>
          </motion.h1>
        </div>

        {/* Descripción */}
        <motion.p
          className="font-mono font-light leading-relaxed"
          style={{
            fontSize: 'clamp(11px, 2vw, 16px)',
            color: 'var(--muted)',
            maxWidth: 'clamp(240px, 60vw, 320px)',
          }}
          {...anim(0.35, 20)}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Desarrollo web</strong>
          {', '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Automatización</strong>
          {' & '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>Marketing digital</strong>
          <br />
          Para profesionales, Emprendedores y Pymes que quieren crecer en Internet.
        </motion.p>
      </div>

      {/* Mobile spacer */}
      <div className="flex-1 lg:hidden" />

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 inset-x-0 flex justify-center flex-col items-center gap-2 z-20"
        style={{ color: 'var(--muted)' }}
        {...anim(1.2)}
      >
        <div
          className="w-px h-10 sm:h-14"
          style={{
            background: 'linear-gradient(180deg,var(--muted),transparent)',
            animation: 'scrollLine 2s 1.5s infinite',
          }}
        />
        <span className="font-mono tracking-widest uppercase" style={{ fontSize: 'clamp(8px, 1.5vw, 10px)' }}>
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes floatPremium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(0.6deg); }
          66%       { transform: translateY(-5px) rotate(-0.3deg); }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* Mobile / tablet: imagen centrada con tamaño relativo al viewport */
        .hero-portrait,
        .hero-portrait-img {
          width: clamp(140px, 42vw, 230px);
        }

        /* Desktop: imagen ocupa todo el contenedor absoluto */
        @media (min-width: 1024px) {
          .hero-portrait,
          .hero-portrait-img {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}