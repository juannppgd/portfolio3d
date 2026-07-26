import { useState, useCallback, useRef, useEffect } from 'react'
import { FaChevronDown, FaClock, FaShield, FaRocket, FaChartLine, FaBan, FaApple, FaGooglePlay, FaPause, FaPlay } from 'react-icons/fa6'
import { FaAppStoreIos } from 'react-icons/fa'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

const BENEFIT_ICONS = [FaClock, FaShield, FaRocket, FaChartLine]
const PLACEHOLDER_BG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMUQyMTMwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNUE2NDc4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+U2NyZWVuc2hvdDwvdGV4dD48L3N2Zz4='
const SPEED = 0.5

export default function RecompAppPage() {
  const { t } = useTranslation()
  const data = t('servicePages.recompApp', { returnObjects: true }) as any
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const handleImageError = useCallback((key: string) => {
    setFailedImages(prev => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }, [])

  // --- Carousel state ---
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const lastDelta = useRef(0)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number>(0)
  const halfWidthRef = useRef(0)

  const computeHalf = useCallback(() => {
    if (!trackRef.current) return
    const total = trackRef.current.scrollWidth
    halfWidthRef.current = total / 2
  }, [])

  const applyTransform = useCallback(() => {
    if (!trackRef.current || halfWidthRef.current === 0) return
    const hw = halfWidthRef.current
    const x = ((offsetRef.current % hw) + hw) % hw - hw
    trackRef.current.style.transform = `translateX(${x}px)`
  }, [])

  useEffect(() => {
    computeHalf()
    window.addEventListener('resize', computeHalf)
    return () => window.removeEventListener('resize', computeHalf)
  }, [computeHalf, data])

  useEffect(() => {
    let lastTime = performance.now()
    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      if (!pausedRef.current && !dragging.current && halfWidthRef.current > 0) {
        offsetRef.current -= SPEED * dt * 0.06
        applyTransform()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [applyTransform])

  const onPointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    startX.current = clientX
    lastDelta.current = 0
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const delta = clientX - startX.current
      startX.current = clientX
      lastDelta.current = delta
      offsetRef.current += delta
      applyTransform()
    }
    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      if (lastDelta.current !== 0) {
        offsetRef.current += lastDelta.current * 8
        applyTransform()
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [applyTransform])

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center px-6 md:px-12 pt-24 md:pt-28 pb-10 md:pb-14 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.08) 0%,transparent 70%)' }}
        />

        <div className="w-full max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1
              className="font-syne font-black uppercase leading-tight tracking-tight break-words gradient-heading mb-4 md:mb-6"
              style={{ fontSize: 'clamp(28px,4.5vw,60px)' }}
            >
              {data.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {data.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, vine por la Recomp — Recomposición Corporal y Nutrición')} />
          </FadeIn>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-6 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(24px,3.5vw,48px)' }}
            >
              {data.screenshots.title}
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="recomp-carousel-track px-6"
              onMouseDown={onPointerDown}
              onTouchStart={onPointerDown}
            >
              {[...data.screenshots.items, ...data.screenshots.items, ...data.screenshots.items].map((shot: { src: string; title: string }, i: number) => {
                const imgKey = `shot-${i}`
                const isFailed = failedImages.has(imgKey)
                return (
                  <div key={i} className="group flex flex-col items-center flex-shrink-0 pointer-events-none" style={{ width: 'clamp(140px, 18vw, 200px)' }}>
                    <div
                      className="relative w-full overflow-hidden transition-shadow duration-300 group-hover:shadow-lg"
                      style={{
                        aspectRatio: '1373/2857',
                        borderRadius: 28,
                        border: '3px solid var(--border)',
                        background: 'var(--surface)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      }}
                    >
                      <img
                        src={isFailed ? PLACEHOLDER_BG : shot.src}
                        alt={shot.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                        onError={() => handleImageError(imgKey)}
                      />
                    </div>
                    <span
                      className="font-mono text-[10px] md:text-[11px] tracking-wide mt-2.5 text-center uppercase"
                      style={{ color: 'var(--muted)' }}
                    >
                      {shot.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 mt-6">
            <span
              className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase"
              style={{ color: 'var(--muted)' }}
            >
              {data.screenshots.swipeHint}
            </span>
            <button
              onClick={togglePause}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid var(--border)',
                color: paused ? 'var(--accent)' : 'var(--muted)',
                background: 'var(--surface)',
              }}
            >
              {paused ? <FaPlay size={10} /> : <FaPause size={10} />}
              {paused ? 'Play' : 'Pausar'}
            </button>
          </div>
        </FadeIn>
      </section>

      {/* No Ads Highlight */}
      <section
        className="px-6 md:px-12 py-10 md:py-14"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.06) 100%)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
            >
              <FaBan size={16} style={{ color: '#10B981' }} />
              <span
                className="font-syne font-bold text-xs tracking-widest uppercase"
                style={{ color: '#10B981' }}
              >
                {data.noAds.title}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {data.noAds.desc}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="font-syne font-black uppercase tracking-tight"
              style={{ fontSize: 'clamp(20px,2.5vw,32px)', color: 'var(--white)' }}
            >
              {data.noAds.lifeChange}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.features}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-8"
              style={{ color: 'var(--muted)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {data.sectionTitles.featuresDesc}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature: { icon: string; title: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(79,127,255,0.12)', color: '#4F7FFF' }}><DataIcon icon={feature.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base text-center"
                    style={{ color: 'var(--white)' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed text-center"
                    style={{ color: 'var(--muted)' }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-6 md:px-12 py-12 md:py-16"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.howItWorks}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: data.sectionTitles.howStep1,
                desc: data.sectionTitles.howStep1Desc,
              },
              {
                step: '2',
                title: data.sectionTitles.howStep2,
                desc: data.sectionTitles.howStep2Desc,
              },
              {
                step: '3',
                title: data.sectionTitles.howStep3,
                desc: data.sectionTitles.howStep3Desc,
              },
              {
                step: '4',
                title: data.sectionTitles.howStep4,
                desc: data.sectionTitles.howStep4Desc,
              },
            ].map((proc, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-syne font-bold text-lg mb-4 mx-auto"
                    style={{
                      background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                      color: 'white',
                    }}
                  >
                    {proc.step}
                  </div>
                  <h3
                    className="font-syne font-bold text-center mb-2 tracking-tight uppercase text-sm"
                    style={{ color: 'var(--white)' }}
                  >
                    {proc.title}
                  </h3>
                  <p
                    className="font-mono text-xs text-center leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {proc.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.benefits}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.benefits.map((benefit: { title: string; desc: string }, i: number) => {
              const Icon = BENEFIT_ICONS[i] || FaRocket
              return (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(0,229,195,0.1)', color: '#00E5C3' }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3
                      className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base"
                      style={{ color: 'var(--white)' }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="font-mono text-sm leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buy APK CTA */}
      <section
        className="px-6 md:px-12 py-10 md:py-14"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase mb-4 tracking-tight break-words"
              style={{ fontSize: 'clamp(22px,3vw,40px)', color: 'var(--white)' }}
            >
              {data.apkPurchase.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm mb-8 max-w-xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {data.apkPurchase.desc}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a
              href={wa('Hola, quiero comprar la Recomp (APK)')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 md:px-12 md:py-6 rounded-full font-syne font-bold text-sm tracking-widest uppercase text-white transition-transform duration-200 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                boxShadow: '0 0 40px rgba(79,127,255,0.25)',
              }}
            >
              {data.apkPurchase.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="px-6 md:px-12 py-12 md:py-16"
        style={{
          background: 'var(--bg)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,56px)', color: 'var(--white)' }}
            >
              {data.sectionTitles.faq}
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {data.faqs.map((faq: { q: string; a: string }, i: number) => {
              const isOpen = expandedFaq === i
              return (
              <FadeIn key={i} delay={0.05 * i}>
                <div
                  className="rounded-2xl transition-all duration-300 overflow-hidden"
                  style={{
                    background: isOpen ? 'var(--surface)' : 'transparent',
                    border: isOpen ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-q-${i}`}
                    className="w-full text-left cursor-pointer bg-transparent border-none p-6"
                  >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="font-syne font-bold text-sm md:text-base tracking-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {faq.q}
                    </h3>
                    <FaChevronDown
                      className="transition-transform duration-300 shrink-0"
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--accent)',
                      }}
                    />
                  </div>
                  </button>

                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '200px' : '0',
                      padding: isOpen ? '0 1.5rem 1.5rem' : '0 1.5rem',
                    }}
                  >
                    <p
                      className="font-mono text-sm leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Store Availability - subtle */}
      <section className="px-6 md:px-12 py-8 md:py-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p
              className="font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--muted)' }}
            >
              {data.storeAvailability.title}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-8 md:gap-12">
              {data.storeAvailability.stores.map((store: string, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                  >
                    {i === 0 ? <FaApple size={20} /> : i === 1 ? <FaGooglePlay size={18} /> : <FaAppStoreIos size={18} />}
                  </div>
                  <span
                    className="font-mono text-[10px] md:text-[11px] tracking-wide"
                    style={{ color: 'var(--muted)' }}
                  >
                    {store}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="font-mono text-[10px] md:text-[11px] tracking-wide mt-8 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              Creada y desarrollada por <span style={{ color: 'var(--text)' }}>Juan Pablo Gutiérrez Díaz</span> — Desarrollo web, Apps Kotlin, Automatización & Marketing digital. Todos los derechos reservados.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-6 md:px-12 py-12 md:py-16 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(79,127,255,0.05) 0%, rgba(0,229,195,0.05) 100%)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <FadeIn>
          <h2
            className="font-syne font-black uppercase mb-6 tracking-tight break-words"
            style={{ fontSize: 'clamp(24px,3.5vw,48px)', color: 'var(--white)' }}
          >
            {data.sectionTitles.ctaTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            {data.sectionTitles.ctaDesc}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, vine por la Recomp — Recomposición Corporal y Nutrición')} />
        </FadeIn>
      </section>
    </main>
  )
}
