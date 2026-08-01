import { useState, useCallback, useRef } from 'react'
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaWandMagicSparkles, FaAndroid } from 'react-icons/fa6'
import { FaWhatsapp } from 'react-icons/fa'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { wa } from '../lib/whatsapp'

const PLACEHOLDER_BG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMUQyMTMwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjM1NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNUE2NDc4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+U2NyZWVuc2hvdDwvdGV4dD48L3N2Zz4='

function appTextColor(color: string, isDark: boolean) {
  return isDark
    ? `color-mix(in srgb, ${color} 90%, #ffffff)`
    : `color-mix(in srgb, ${color} 62%, #000000)`
}

interface AppItem {
  id: string
  icon: string
  color: string
  platform: string
  shot: string
  highlight?: boolean
  name: string
  tagline: string
  desc: string
  audience: string
}

function GalleryArrow({ dir, onClick, ariaLabel, className }: {
  dir: 'left' | 'right'
  onClick: () => void
  ariaLabel: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${className ?? ''}`}
      style={{
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
    >
      {dir === 'left' ? <FaChevronLeft size={16} /> : <FaChevronRight size={16} />}
    </button>
  )
}

export default function IaAppsPage() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const data = t('servicePages.recompApp', { returnObjects: true }) as any
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const handleImageError = useCallback((key: string) => {
    setFailedImages(prev => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }, [])

  const interestedHref = (name: string) => wa(t('servicePages.recompApp.ctaInterested', { name }))

  const apps: AppItem[] = data.apps.items
  const shots: { src: string; title: string }[] = data.featured.gallery.items
  const total = shots.length

  const prevShot = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  const nextShot = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  const touchStartX = useRef(0)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) < 40) return
    if (delta < 0) nextShot()
    else prevShot()
  }, [nextShot, prevShot])

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center px-6 md:px-12 pt-28 md:pt-32 pb-10 md:pb-14 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.08) 0%,transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-24 w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)' }}
        />

        <div className="w-full max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <span
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full mb-5"
              style={{
                background: 'rgba(168,85,247,0.12)',
                color: '#A855F7',
                border: '1px solid rgba(168,85,247,0.25)',
              }}
            >
              <FaWandMagicSparkles size={13} />
              {data.hero.badge}
            </span>
          </FadeIn>

          <FadeIn delay={0.05}>
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
            <ContactButton label={data.hero.heroButton} href={wa(data.ctaMain)} />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 mt-10 md:mt-12">
              {data.stats.map((s: { value: string; label: string }, i: number) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <span className="hidden sm:block h-10 w-px" style={{ background: 'var(--border)' }} />}
                  <div className="text-center">
                    <div
                      className="font-syne font-black gradient-heading"
                      style={{ fontSize: 'clamp(24px,3vw,36px)' }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="font-mono text-[10px] md:text-xs tracking-widest uppercase mt-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured App: Recomp */}
      <section className="px-6 md:px-12 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div
              className="relative overflow-hidden p-6 md:p-10"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 32,
                background: 'linear-gradient(135deg, rgba(79,127,255,0.08) 0%, rgba(0,229,195,0.05) 50%, rgba(168,85,247,0.06) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute -top-28 -right-28 w-96 h-96 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(79,127,255,0.1) 0%, rgba(0,229,195,0.06) 50%, transparent 70%)' }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(79,127,255,0.15), rgba(0,229,195,0.12))',
                        color: 'var(--accent)',
                      }}
                    >
                      <DataIcon icon="dumbbell" size={22} />
                    </div>
                    <span
                      className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,229,195,0.12)',
                        color: 'var(--accent2)',
                        border: '1px solid rgba(0,229,195,0.25)',
                      }}
                    >
                      {data.featured.badge}
                    </span>
                  </div>

                  <h2
                    className="font-syne font-black uppercase tracking-tight gradient-heading mb-2"
                    style={{ fontSize: 'clamp(26px,3vw,44px)' }}
                  >
                    {data.featured.title}
                  </h2>
                  <p
                    className="font-mono text-xs tracking-wide mb-3"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {data.featured.subtitle}
                  </p>
                  <p
                    className="font-mono font-light leading-relaxed mb-6 text-sm max-w-xl"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.featured.description}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-2.5 mb-8 max-w-xl">
                    {data.featured.features.map((feat: string, j: number) => (
                      <li key={j} className="flex items-center gap-2.5 font-mono text-xs" style={{ color: 'var(--text)' }}>
                        <span
                          className="flex items-center justify-center w-6 h-6 rounded-lg shrink-0"
                          style={{ background: 'rgba(79,127,255,0.12)', color: 'var(--accent)' }}
                        >
                          <FaWandMagicSparkles size={11} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={interestedHref(data.featured.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: 'var(--on-accent)',
                      boxShadow: '0 0 30px rgba(79,127,255,0.25)',
                    }}
                  >
                    <FaWhatsapp size={16} />
                    {data.featured.cta}
                  </a>
                </div>

                {/* Screenshot gallery */}
                <div className="relative flex flex-col items-center">
                  <div className="relative w-[210px] sm:w-[230px] md:w-[250px]">
                    <div
                      className="absolute -left-14 md:-left-16 top-8 w-20 md:w-28 rounded-[20px] md:rounded-[24px] overflow-hidden opacity-60 -rotate-6 hidden sm:block transition-all duration-300"
                      style={{ aspectRatio: '1373/2857', border: '1px solid var(--border)', background: 'var(--bg)' }}
                    >
                      <img
                        src={failedImages.has('gal-prev') ? PLACEHOLDER_BG : shots[(current - 1 + total) % total]?.src}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                        onError={() => handleImageError('gal-prev')}
                      />
                    </div>
                    <div
                      className="absolute -right-14 md:-right-16 top-8 w-20 md:w-28 rounded-[20px] md:rounded-[24px] overflow-hidden opacity-60 rotate-6 hidden sm:block transition-all duration-300"
                      style={{ aspectRatio: '1373/2857', border: '1px solid var(--border)', background: 'var(--bg)' }}
                    >
                      <img
                        src={failedImages.has('gal-next') ? PLACEHOLDER_BG : shots[(current + 1) % total]?.src}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                        onError={() => handleImageError('gal-next')}
                      />
                    </div>

                    <GalleryArrow
                      dir="left"
                      onClick={prevShot}
                      ariaLabel="Anterior"
                      className="left-[-15px] sm:left-[-52px]"
                    />

                    <div
                      className="relative z-10 rounded-[28px] md:rounded-[32px] p-2 md:p-2.5 select-none"
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                      }}
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                    >
                      <div className="overflow-hidden rounded-[20px] md:rounded-[26px]" style={{ aspectRatio: '1373/2857' }}>
                        <img
                          key={current}
                          src={failedImages.has('gal-main') ? PLACEHOLDER_BG : shots[current]?.src}
                          alt={shots[current]?.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                          onError={() => handleImageError('gal-main')}
                        />
                      </div>
                      <div className="flex justify-center mt-2">
                        <span className="w-16 h-1 rounded-full" style={{ background: 'var(--border)' }} />
                      </div>
                    </div>

                    <GalleryArrow
                      dir="right"
                      onClick={nextShot}
                      ariaLabel="Siguiente"
                      className="right-[-15px] sm:right-[-52px]"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 mt-6">
                    {shots.map((shot, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={shot.title}
                        className="h-2 rounded-full cursor-pointer transition-all duration-300"
                        style={{
                          width: i === current ? 24 : 8,
                          background: i === current ? 'var(--accent)' : 'var(--border)',
                        }}
                      />
                    ))}
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase ml-2"
                      style={{ color: 'var(--muted)' }}
                    >
                      {current + 1} / {total}
                    </span>
                  </div>

                  <span
                    className="font-mono text-[10px] tracking-widest uppercase mt-3 text-center"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.featured.gallery.hint}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* All Apps Catalog */}
      <section
        className="px-6 md:px-12 py-12 md:py-16"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.apps.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-10"
              style={{ color: 'var(--muted)', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {data.apps.subtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app: AppItem, i: number) => (
              <FadeIn key={app.id} delay={0.06 * i}>
                <div
                  id={`app-${app.id}`}
                  className="group p-6 h-full flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: app.highlight
                      ? 'linear-gradient(var(--bg), var(--bg)) padding-box, linear-gradient(135deg, #3B82F6, #22D3EE, #A855F7) border-box'
                      : 'var(--bg)',
                    border: app.highlight ? '1.5px solid transparent' : '1px solid var(--border)',
                    scrollMarginTop: 110,
                  }}
                  onMouseEnter={(e) => {
                    if (!app.highlight) e.currentTarget.style.borderColor = app.color
                    e.currentTarget.style.boxShadow = `0 18px 50px -18px ${app.color}66`
                  }}
                  onMouseLeave={(e) => {
                    if (!app.highlight) e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${app.color}1F`, color: appTextColor(app.color, isDark) }}
                    >
                      <DataIcon icon={app.icon} size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-syne font-bold uppercase tracking-tight truncate"
                        style={{ fontSize: 'clamp(14px,1.3vw,16px)', color: 'var(--white)' }}
                      >
                        {app.name}
                      </h3>
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase mt-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        <FaAndroid size={11} />
                        {app.platform}
                      </span>
                    </div>
                  </div>

                  <div className="relative mb-5 mx-auto" style={{ width: '55%' }}>
                    <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '480/999' }}>
                      <img
                        src={failedImages.has(`shot-${app.id}`) ? PLACEHOLDER_BG : app.shot}
                        alt={app.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                        onError={() => handleImageError(`shot-${app.id}`)}
                      />
                      {app.highlight && (
                        <span
                          className="absolute top-2.5 right-2.5 z-10 inline-flex items-center font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: app.color,
                            color: '#0A0D14',
                            boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
                          }}
                        >
                          {data.apps.highlightLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className="font-syne font-bold text-xs uppercase tracking-wide mb-2"
                    style={{ color: appTextColor(app.color, isDark) }}
                  >
                    {app.tagline}
                  </p>

                  <p
                    className="font-mono font-light text-xs leading-relaxed mb-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    {app.desc}
                  </p>

                  <div
                    className="flex items-start gap-2 font-mono text-[11px] mb-5"
                    style={{ color: 'var(--text)' }}
                  >
                    <span className="shrink-0 tracking-widest uppercase" style={{ color: 'var(--accent2)' }}>
                      {data.apps.audienceLabel}:
                    </span>
                    <span>{app.audience}</span>
                  </div>

                  <a
                    href={interestedHref(app.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 font-syne font-bold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `${app.color}1A`,
                      color: appTextColor(app.color, isDark),
                      border: `1px solid ${app.color}40`,
                    }}
                  >
                    <FaWhatsapp size={14} />
                    {data.apps.interested}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.howItWorks.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.howItWorks.steps.map((proc: { icon: string; title: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl h-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: 'var(--on-accent)',
                    }}
                  >
                    <DataIcon icon={proc.icon} size={20} />
                  </div>
                  <div
                    className="font-syne font-black text-lg text-center mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    0{i + 1}
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

      {/* Why These Apps */}
      <section
        className="px-6 md:px-12 py-12 md:py-16"
        style={{
          background: 'linear-gradient(135deg, rgba(79,127,255,0.05) 0%, rgba(0,229,195,0.05) 100%)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,56px)', color: 'var(--white)' }}
            >
              {data.why.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.why.benefits.map((benefit: { icon: string; title: string; desc: string }, i: number) => (
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
                    style={{ background: 'rgba(0,229,195,0.1)', color: 'var(--accent2)' }}
                  >
                    <DataIcon icon={benefit.icon} size={18} />
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,56px)', color: 'var(--white)' }}
            >
              {data.faq.title}
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {data.faq.items.map((faq: { q: string; a: string }, i: number) => {
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
            {data.finalCta.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            {data.finalCta.desc}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label={data.finalCta.button} href={wa(data.ctaMain)} />
        </FadeIn>

        <FadeIn delay={0.3}>
          <p
            className="font-mono text-[10px] md:text-[11px] tracking-wide mt-10 leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {data.footerCreated} <span style={{ color: 'var(--text)' }}>Juan Pablo Gutiérrez Díaz</span>{data.footerSuffix}
          </p>
        </FadeIn>
      </section>
    </main>
  )
}
