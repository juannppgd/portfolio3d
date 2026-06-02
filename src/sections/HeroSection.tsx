import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import profileWebp230 from '../assets/juanpablogutierrez-230w.webp'
import profileWebp400 from '../assets/juanpablogutierrez-400w.webp'
import profileWebp440 from '../assets/juanpablogutierrez-440w.webp'
import profileFallback from '../assets/juanpablogutierrez.jpeg'

const anim = (delay: number, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

const RADIUS = '22px'

export default function HeroSection() {
  const { t }         = useTranslation()
  const { theme }     = useTheme()
  const isLight       = theme === 'light'
  const reducedMotion = useReducedMotion()
  const floatRef      = useRef<HTMLDivElement>(null)

  const onEntranceDone = () => {
    if (reducedMotion || !floatRef.current) return
    floatRef.current.style.animation = 'hero-float 7s ease-in-out infinite'
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ padding: 'clamp(80px, 12vw, 96px) clamp(20px, 5vw, 48px) 88px' }}
    >
      {/* ── Ambient glow superior ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(79,127,255,0.08) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #1C2130, transparent)' }}
      />

      {/*
        ── Glow central pulsante ────────────────────────────────────────────
        Posicionado en la zona intermedia entre texto e imagen en desktop.
        En mobile queda centrado verticalmente (no interfiere con la lectura
        porque está detrás del contenido, z-0).
        Opacidad moderada: dark máx 0.45, light máx 0.18. Escala sutil: 1.08.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          /*
            En mobile: centro de la pantalla.
            En desktop el glow se orienta hacia la zona derecha donde está la imagen.
            Lo logramos con left: 55% en desktop via CSS.
          */
          top:       '50%',
          left:      '50%',
          transform: 'translate(-50%, -50%)',
          width:     'clamp(280px, 45vw, 560px)',
          height:    'clamp(280px, 45vw, 560px)',
          background: isLight
            ? 'radial-gradient(circle, rgba(79,127,255,0.10) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(79,127,255,0.20) 0%, transparent 70%)',
          animation: reducedMotion ? 'none' : 'glowPulse 6s ease-in-out infinite',
        }}
      />

      {/* ── Desktop spacer ───────────────────────────────────────────────── */}
      <div className="hidden lg:block flex-1" aria-hidden="true" />

      {/* ── Portrait ─────────────────────────────────────────────────────── */}
      {/*
        · Mobile/tablet (<lg): flujo normal, centrado, encima del texto.
        · Desktop (≥lg): absoluto a la derecha, centrado verticalmente.

        FIX COLISIÓN:
        Antes el breakpoint de la imagen absoluta era lg=1024px.
        Entre 1024–1140px la imagen y el texto se solapaban porque
        el texto no tenía espacio reservado a la derecha.
        Solución: subimos el breakpoint de la imagen a xl=1280px.
        Entre 1024–1279px se mantiene el layout mobile (imagen arriba,
        texto abajo) que NO tiene colisión.
        En ≥1280px hay suficiente ancho para que coexistan sin tocarse.
      */}
      <div
        className="
          relative z-10 flex justify-center
          mt-6 sm:mt-8 mb-10 sm:mb-12
          xl:absolute xl:right-[4%] xl:top-1/2 xl:-translate-y-1/2
          xl:w-[400px] 2xl:w-[440px]
          xl:mt-0 xl:mb-0 xl:pointer-events-none
        "
      >
        {/* Halo ambiental detrás de la foto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full"
          style={{
            inset:      '-22%',
            background:  isLight
              ? 'radial-gradient(ellipse at 55% 40%, rgba(79,127,255,0.18) 0%, transparent 65%)'
              : 'radial-gradient(ellipse at 55% 40%, rgba(79,127,255,0.13) 0%, transparent 65%)',
            opacity:     isLight ? 0.5 : 0.65,
          }}
        />

        <motion.div
          className="hero-portrait-wrapper"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onAnimationComplete={onEntranceDone}
          style={{ position: 'relative' }}
        >
          {/*
            boxShadow y border-radius van en el div que realmente flota,
            no en el motion.div estático. Si el shadow está en el wrapper
            estático y la imagen sube con el float, el shadow se queda
            abajo y se ve el fondo de la página entre la imagen y la sombra.
          */}
          <div
            ref={floatRef}
            className="hero-portrait-float"
            style={{
              borderRadius: RADIUS,
              overflow:     'hidden',
              boxShadow:    isLight
                ? '0 4px 32px rgba(0,0,0,0.10), 0 0 56px rgba(79,127,255,0.07)'
                : '0 0 56px rgba(79,127,255,0.14), 0 0 100px rgba(0,229,195,0.04)',
            }}
          >

            <picture>
              <source
                type="image/webp"
                srcSet={`${profileWebp230} 230w, ${profileWebp400} 400w, ${profileWebp440} 440w`}
                sizes="(min-width: 1536px) 440px, (min-width: 1280px) 400px, 230px"
              />
              <img
                src={profileFallback}
                alt={t('hero.alt')}
                decoding="async"
                loading="eager"
                width={440}
                height={440}
                style={{
                  display:  'block',
                  width:     '100%',
                  height:    'auto',
                  filter:   'grayscale(10%) contrast(1.05)',
                  maskImage:         isLight
                    ? 'none'
                    : 'linear-gradient(to bottom, black 76%, transparent 100%)',
                  WebkitMaskImage:   isLight
                    ? 'none'
                    : 'linear-gradient(to bottom, black 76%, transparent 100%)',
                  border:            isLight ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}
              />
            </picture>
          </div>
        </motion.div>
      </div>

      {/* ── Contenido de texto ────────────────────────────────────────────── */}
      {/*
        FIX COLISIÓN (segunda capa de protección):
        En desktop (≥xl=1280px) el texto tiene padding-right reservado
        para que el h1 nunca invada el espacio de la imagen.
        La imagen ocupa ~400px + right:4% ≈ 456px desde la derecha.
        Con padding-right: clamp(0px, 38vw, 480px) en xl+ dejamos margen suficiente.
        En <xl no hay imagen flotante, así que padding-right es 0.
      */}
      <div className="relative z-20 hero-text-content">
        {/* Tag */}
        <motion.div
          className="flex items-center gap-3 font-mono uppercase mb-5 sm:mb-6"
          style={{
            color:         'var(--accent2)',
            fontSize:      '11px',
            letterSpacing: '0.15em',
          }}
          {...anim(0)}
        >
          <span
            aria-hidden="true"
            className="h-px shrink-0"
            style={{ width: 'clamp(24px, 3vw, 40px)', background: 'var(--accent2)' }}
          />
          {t('hero.available')}
        </motion.div>

        {/* H1 */}
        <div className="overflow-hidden mb-7 sm:mb-9" style={{ paddingBottom: '0.06em' }}>
          <motion.h1
            className="font-syne font-black uppercase tracking-tight"
            style={{ lineHeight: 0.92 }}
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block" style={{ fontSize: 'clamp(44px, 12vw, 100px)', color: 'var(--white)' }}>
              {t('hero.firstName')}
            </span>
            <span className="block gradient-heading" style={{ fontSize: 'clamp(47px, 13vw, 110px)' }}>
              {t('hero.middleName')}
            </span>
            <span className="block" style={{ fontSize: 'clamp(26px, 7vw, 64px)', color: 'var(--white)' }}>
              {t('hero.lastName')}
            </span>
            <span className="block" style={{ fontSize: 'clamp(30px, 8vw, 72px)', color: 'var(--white)' }}>
              {t('hero.secondLastName')}
            </span>
          </motion.h1>
        </div>

        {/* Descripción */}
        <motion.p
          className="font-mono font-light"
          style={{
            fontSize:   'clamp(13px, 1.8vw, 15px)',
            lineHeight:  1.75,
            color:       'var(--muted)',
            maxWidth:   'min(85%, 300px)',
          }}
          {...anim(0.35, 20)}
        >
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>{t('hero.devWeb')}</strong>
          {', '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>{t('hero.automation')}</strong>
          {' & '}
          <strong style={{ color: 'var(--text)', fontWeight: 400 }}>{t('hero.marketingDigital')}</strong>
          <br />
          {t('hero.tagline')}
        </motion.p>
      </div>

      {/* ── Spacer mobile ─────────────────────────────────────────────────── */}
      <div className="xl:hidden" style={{ minHeight: '56px' }} aria-hidden="true" />

      {/* ── Scroll hint ──────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 flex flex-col items-center gap-2 z-20"
        style={{
          bottom: 'clamp(18px, 4vh, 32px)',
          color:   'var(--muted)',
        }}
        {...anim(1.2)}
      >
        <div
          className="w-px"
          style={{
            height:     'clamp(32px, 5vh, 52px)',
            background: 'linear-gradient(180deg, var(--muted), transparent)',
            animation:   reducedMotion ? 'none' : 'scrollLine 2s 1.5s infinite',
          }}
        />
        <span
          className="font-mono uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.18em' }}
        >
          {t('hero.scroll')}
        </span>
      </motion.div>

      <style>{`
        /*
          Desktop: recorrido completo (-10px).
          Mobile: keyframe propio con -5px máximo para que
          la imagen no choque con el navbar al flotar.
          Se asigna vía media query sobreescribiendo la animation.
        */
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px)   rotate(0deg);    }
          33%       { transform: translateY(-10px) rotate(0.45deg); }
          66%       { transform: translateY(-5px)  rotate(-0.2deg); }
        }

        @keyframes hero-float-mobile {
          0%, 100% { transform: translateY(0px)  rotate(0deg);    }
          33%       { transform: translateY(-5px) rotate(0.3deg);  }
          66%       { transform: translateY(-3px) rotate(-0.15deg);}
        }

        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top;    }
          50%  { transform: scaleY(1); transform-origin: top;    }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /*
          Glow central pulsante — restaurado con parámetros moderados:
          · Opacidad: 0.2 → 0.45 (dark) / 0.05 → 0.18 (light). No más de 0.45.
          · Escala: 0.95 → 1.08. Sutil, no invasivo.
          · Duración: 6s — más lento = más elegante.
        */
        @keyframes glowPulse {
          0%, 100% {
            opacity:   0.2;
            transform: translate(-50%, -50%) scale(0.96);
          }
          50% {
            opacity:   0.45;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        /* Mobile-first: ancho relativo al viewport */
        .hero-portrait-wrapper {
          width: clamp(148px, 42vw, 230px);
        }

        /*
          En mobile/tablet (<xl) usa el float suave para no chocar con el navbar.
          El JS asigna 'hero-float' por defecto; aquí lo sobreescribimos en mobile.
        */
        @media (max-width: 1279px) {
          .hero-portrait-float {
            animation-name: hero-float-mobile !important;
          }
        }

        /* Desktop (≥xl): imagen ocupa el 100% del contenedor absoluto */
        @media (min-width: 1280px) {
          .hero-portrait-wrapper {
            width: 100% !important;
          }
          /*
            Texto: reserva espacio a la derecha para no chocar con la imagen.
            La imagen está en right:4% con width 400px → ocupa los últimos ~456px.
            padding-right: 460px deja ~20px de aire entre texto e imagen.
            Se aplica solo desde xl en adelante.
          */
          .hero-text-content {
            padding-right: 460px;
          }
        }

        @media (min-width: 1536px) {
          /*
            2xl: imagen 440px + right 4% de 1536px ≈ 501px desde el borde.
            Ajustamos padding-right acorde.
          */
          .hero-text-content {
            padding-right: 500px;
          }
        }

        /* Galaxy Fold y pantallas ≤ 359px */
        @media (max-width: 359px) {
          #hero h1 span {
            font-size: clamp(38px, 12vw, 44px) !important;
          }
          #hero h1 .gradient-heading {
            font-size: clamp(42px, 13vw, 47px) !important;
          }
        }

        /* prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-portrait-wrapper *,
          #hero .w-px {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}