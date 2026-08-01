import { useState } from 'react'
import { FaCheck, FaChevronDown } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

export default function PlantillaHabitosPage() {
  const { t } = useTranslation()
  const data = t('servicePages.plantillaHabitos', { returnObjects: true }) as any
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.08) 0%,transparent 70%)' }}
        />

        <div className="w-full max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1
              className="font-syne font-black uppercase leading-tight tracking-tight break-words gradient-heading mb-4 md:mb-6"
              style={{ fontSize: 'clamp(28px,5vw,72px)' }}
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

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
              {data.stats.map((stat: { value: string; label: string }, i: number) => (
                <div key={i} className="text-center">
                  <div
                    className="font-syne font-black mb-1 md:mb-2"
                    style={{ fontSize: 'clamp(20px,3vw,40px)', color: 'var(--accent)' }}
                  >
                    {stat.value}
                  </div>
                  <p
                    className="font-mono text-[10px] sm:text-xs md:text-sm tracking-tight uppercase leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="px-6 md:px-12 py-14 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-10 md:mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(24px,4vw,56px)' }}
            >
              {data.sectionTitles.features}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {data.features.map((feature: { title: string; icon: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="group p-4 sm:p-6 md:p-8 rounded-2xl text-center h-full"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(0,229,195,0.12)', color: 'var(--accent2)' }}><DataIcon icon={feature.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold tracking-tight uppercase text-[11px] sm:text-sm md:text-base leading-tight"
                    style={{ color: 'var(--accent)' }}
                  >
                    {feature.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.previewTitle}
            </h2>
          </FadeIn>

          {/* Monthly Habits */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                <DataIcon icon="calendar" size={20} style={{ marginRight: 8 }} /> {data.sectionTitles.previewMonthly}
              </h3>
              <div className="space-y-4">
                {data.mockData.habits.map((habit: { name: string; emoji: string; progress: boolean[] }, i: number) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <p
                      className="font-syne font-bold text-lg mb-3"
                      style={{ color: 'var(--white)' }}
                    >
                      <DataIcon icon={habit.emoji} size={20} style={{ marginRight: 8 }} /> {habit.name}
                    </p>
                    <div className="flex gap-2">
                      {habit.progress.map((completed: boolean, dayIdx: number) => (
                        <div
                          key={dayIdx}
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300"
                          style={{
                            background: completed ? 'var(--accent)' : 'var(--bg)',
                            border: completed ? 'none' : '2px solid var(--border)',
                            color: completed ? 'var(--on-accent)' : 'var(--muted)',
                          }}
                        >
                          {completed ? <FaCheck size={12} /> : dayIdx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Yearly Metrics */}
          <FadeIn delay={0.2}>
            <div>
              <h3
                className="font-syne font-bold uppercase mb-4 md:mb-6 tracking-tight"
                style={{ fontSize: 'clamp(16px,2vw,24px)', color: 'var(--accent)' }}
              >
                <DataIcon icon="chart" size={20} style={{ marginRight: 8 }} /> {data.sectionTitles.previewYearlyTitle}
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {data.mockData.yearlyMetrics.currentStreak}
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.sectionTitles.metricStreak}
                  </p>
                </div>
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {data.mockData.yearlyMetrics.bestMonth}%
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.sectionTitles.metricBestMonth}
                  </p>
                </div>
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {data.mockData.yearlyMetrics.totalHabits}
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.sectionTitles.metricTotal}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.testimonials}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.testimonialsHabitos.map((testimonial: { name: string; metric: string; text: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p
                      className="font-syne font-bold text-lg"
                      style={{ color: 'var(--white)' }}
                    >
                      {testimonial.name}
                    </p>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono tracking-tight"
                      style={{ background: 'rgba(79,127,255,0.12)', color: 'var(--accent2)' }}
                    >
                      {testimonial.metric}
                    </span>
                  </div>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    "{testimonial.text}"
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.science}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.science.map((item: { title: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight text-sm uppercase"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase mb-12 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--white)' }}
            >
              {data.sectionTitles.pricingTitle}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-6 mb-8">
              <span
                className="font-syne font-bold text-2xl line-through"
                style={{ color: 'var(--muted)' }}
              >
                {data.price.original}
              </span>
              <span
                className="font-syne font-black text-4xl md:text-5xl"
                style={{ color: 'var(--accent2)' }}
              >
                {data.price.current}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="font-mono text-sm mb-8"
              style={{ color: 'var(--muted)' }}
            >
              {data.sectionTitles.pricingDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label={data.sectionTitles.pricingButton} href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,56px)', color: 'var(--white)' }}
            >
              {data.sectionTitles.faq}
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {data.faqs.map((faq: { q: string; a: string }, i: number) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div
                  className="p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: expandedFaq === i ? 'var(--surface)' : 'var(--bg)',
                    border: expandedFaq === i ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedFaq(expandedFaq === i ? null : i); } }}
                    aria-expanded={expandedFaq === i}
                    className="w-full text-left cursor-pointer bg-transparent border-none p-0"
                    style={{ color: 'inherit' }}
                  >
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-syne font-bold text-sm md:text-base tracking-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {faq.q}
                    </h3>
                    <FaChevronDown
                      className="transition-transform duration-300"
                      size={18}
                      style={{
                        transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--accent)',
                      }}
                    />
                  </div>

                  {expandedFaq === i && (
                    <p
                      className="font-mono text-sm leading-relaxed mt-4"
                      style={{ color: 'var(--muted)' }}
                    >
                      {faq.a}
                    </p>
                  )}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-6 md:px-12 py-20 md:py-24 text-center"
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
        </FadeIn>
      </section>
    </main>
  )
}
