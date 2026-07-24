import { useState } from 'react'
import { FaChevronDown, FaClock, FaShield, FaRocket, FaChartLine } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

const BENEFIT_ICONS = [FaClock, FaShield, FaRocket, FaChartLine]

export default function EcompAppPage() {
  const { t } = useTranslation()
  const data = t('servicePages.ecompApp', { returnObjects: true }) as any
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
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, vine por la Ecomp App — Recomposición Corporal y Nutrición')} />
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
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
              className="text-center font-mono text-sm mb-16"
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
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
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

      {/* FAQ */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
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
            {data.faqs.map((faq: { q: string; a: string }, i: number) => {
              const isOpen = expandedFaq === i
              return (
              <FadeIn key={i} delay={0.05 * i}>
                <div
                  className="rounded-2xl transition-all duration-300 overflow-hidden"
                  style={{
                    background: isOpen ? 'var(--bg)' : 'transparent',
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, vine por la Ecomp App — Recomposición Corporal y Nutrición')} />
        </FadeIn>
      </section>
    </main>
  )
}
