import { useState } from 'react'
import { FaCheck, FaChevronDown, FaFire } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

export default function PlantillaGastosPage() {
  const { t } = useTranslation()
  const data = t('servicePages.plantillaGastos', { returnObjects: true }) as any
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.1) 0%,transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
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

          {/* Pricing Card */}
          <FadeIn delay={0.2}>
            <div
              className="inline-block p-6 sm:p-8 md:p-10 rounded-3xl mb-8 w-full sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(79,127,255,0.1) 0%, rgba(0,229,195,0.1) 100%)',
                border: '2px solid var(--accent)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mb-6 w-full">
                <div className="p-4 md:p-6 rounded-2xl" style={{ background: 'rgba(79,127,255,0.08)', border: '1px solid rgba(79,127,255,0.2)' }}>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {data.sectionTitles.pricingColombia}
                  </p>
                  <p
                    className="font-syne font-black text-3xl md:text-4xl"
                    style={{ color: 'var(--white)' }}
                  >
                    {data.pricing.colombia}
                  </p>
                </div>
                <div className="p-4 md:p-6 rounded-2xl" style={{ background: 'rgba(0,229,195,0.08)', border: '1px solid rgba(0,229,195,0.2)' }}>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {data.sectionTitles.pricingInternational}
                  </p>
                  <p
                    className="font-syne font-black text-3xl md:text-4xl"
                    style={{ color: 'var(--white)' }}
                  >
                    {data.pricing.international}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <FaFire size={18} style={{ color: '#FF6B6B' }} />
                <span className="font-mono text-sm" style={{ color: '#FF6B6B' }}>
                  {data.pricing.urgency}
                </span>
              </div>

              <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, quiero la plantilla de control de gastos')} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.features}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature: { title: string; icon: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(79,127,255,0.12)', color: '#4F7FFF' }}><DataIcon icon={feature.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--white)' }}
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
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.previewTitle}
            </h2>
          </FadeIn>

          {/* Monthly View */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                <DataIcon icon="calendar" size={20} style={{ marginRight: 8 }} /> {data.sectionTitles.previewMonthly}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.mockData.categories.map((cat: { name: string; emoji: string; amount: number; status: string }, i: number) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-syne font-bold text-lg flex items-center gap-2"
                          style={{ color: 'var(--white)' }}
                        >
                          <DataIcon icon={cat.emoji} size={20} />
                          {cat.name}
                        </p>
                        <p
                          className="font-mono text-sm"
                          style={{ color: 'var(--text)' }}
                        >
                          ${cat.amount.toLocaleString()}
                        </p>
                      </div>
                      <DataIcon icon={cat.status} size={24} style={{ color: cat.status === 'circleCheck' ? 'var(--accent2)' : '#FF6B6B' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Weekly Progress */}
          <FadeIn delay={0.2}>
            <div className="mb-12">
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                <DataIcon icon="chart" size={20} style={{ marginRight: 8 }} /> {data.sectionTitles.previewWeekly}
              </h3>
              <div className="space-y-3">
                {data.mockData.weekly.map((day: { day: string; percent: number }, i: number) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>
                        {day.day}
                      </p>
                      <p className="font-syne font-bold text-sm" style={{ color: 'var(--accent)' }}>
                        {day.percent}%
                      </p>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        background: 'var(--border)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${day.percent}%`,
                          background: 'linear-gradient(90deg, #4F7FFF, #00E5C3)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Distribution */}
          <FadeIn delay={0.3}>
            <div>
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                <DataIcon icon="scale" size={20} style={{ marginRight: 8 }} /> {data.sectionTitles.previewDistribution}
              </h3>
              <div className="space-y-3">
                {data.mockData.distribution.map((dist: { category: string; percent: number; color: string }, i: number) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>
                        {dist.category}
                      </p>
                    </div>
                    <div
                      className="h-3 rounded-full"
                      style={{
                        background: 'var(--border)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${dist.percent}%`,
                          background: dist.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Transformations */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.transformations}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.transformations.map((trans: { metric: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-2xl md:text-3xl mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {trans.metric}
                  </p>
                  <p
                    className="font-mono text-xs md:text-sm"
                    style={{ color: 'var(--muted)' }}
                  >
                    {trans.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
            {data.testimonialsGastos.map((testimonial: { name: string; badge: string; text: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-tight"
                      style={{ background: 'var(--accent)20', color: 'var(--accent)' }}
                    >
                      {testimonial.badge}
                    </span>
                  </div>
                  <p
                    className="font-mono text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    "{testimonial.text}"
                  </p>
                  <p
                    className="font-syne font-bold text-sm"
                    style={{ color: 'var(--white)' }}
                  >
                    {testimonial.name}
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
                    className="font-syne font-bold mb-3 tracking-tight text-sm"
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

      {/* Payment & Warranty */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h3
              className="font-syne font-black uppercase text-center mb-8 tracking-tight"
              style={{ fontSize: 'clamp(20px,3vw,32px)', color: 'var(--white)' }}
            >
              {data.sectionTitles.paymentMethods}
            </h3>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {data.paymentMethods.map((method: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full font-mono text-xs font-bold tracking-tight uppercase"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="p-8 md:p-10 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,195,0.1) 0%, rgba(79,127,255,0.1) 100%)',
                border: '2px solid var(--accent2)',
              }}
            >
              <p
                className="font-syne font-black text-lg md:text-2xl mb-2"
                style={{ color: 'var(--accent2)' }}
              >
                <FaCheck size={20} style={{ marginRight: 10, verticalAlign: 'middle' }} /> {data.warranty}
              </p>
              <p
                className="font-mono text-sm"
                style={{ color: 'var(--muted)' }}
              >
                {data.sectionTitles.warrantyDesc}
              </p>
            </div>
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, quiero la plantilla de control de gastos')} />
        </FadeIn>
      </section>
    </main>
  )
}
