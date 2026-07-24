import { useState } from 'react'
import { FaCheck, FaChevronDown } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

export default function IaLocalPage() {
  const { t } = useTranslation()
  const data = t('servicePages.iaLocal', { returnObjects: true }) as any
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(16,185,129,0.08) 0%,transparent 70%)' }}
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
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, vine por el servicio de automatización con agentes de IA')} />
          </FadeIn>
        </div>
      </section>

      {/* Strengths Section */}
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
              {data.sectionTitles.strengths}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.strengths.map((strength: { icon: string; title: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl h-full"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981' }}><DataIcon icon={strength.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base text-center"
                    style={{ color: 'var(--accent)' }}
                  >
                    {strength.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed text-center"
                    style={{ color: 'var(--muted)' }}
                  >
                    {strength.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.useCases}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.useCases.map((useCase: { title: string; desc: string }, i: number) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--accent)' }}
                  >
                    {useCase.title}
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {useCase.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* B2B / Pricing Section */}
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
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.b2b.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {data.b2b.note}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="p-8 md:p-12 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.1) 100%)',
                border: '2px solid #10B981',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    className="font-syne font-bold mb-6 tracking-tight uppercase"
                    style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: '#10B981' }}
                  >
                    {data.sectionTitles.b2bSolutions}
                  </h3>
                  <ul className="space-y-3">
                    {data.b2b.features.map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-mono text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        <FaCheck size={12} style={{ color: '#10B981', marginTop: 3 }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center">
                  <a
                    href={wa('Hola, vine por el servicio de automatización con agentes de IA (presupuesto)')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-syne font-bold text-sm tracking-widest uppercase text-white transition-transform duration-200 hover:-translate-y-1 self-start"
                    style={{
                      background: 'linear-gradient(135deg,#10B981,#06B6D4)',
                      boxShadow: '0 0 40px rgba(16,185,129,0.25)',
                    }}
                  >
                    {data.sectionTitles.b2bButton}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.howItWorks}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-syne font-bold text-lg mb-4 mx-auto"
                    style={{
                      background: 'linear-gradient(135deg,#10B981,#06B6D4)',
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
            {data.faqs.map((faq: { q: string; a: string }, i: number) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div
                  className="p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: expandedFaq === i ? 'var(--bg)' : 'transparent',
                    border: expandedFaq === i ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedFaq(expandedFaq === i ? null : i); } }}
                    aria-expanded={expandedFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full text-left cursor-pointer bg-transparent border-none p-0"
                    style={{ color: 'inherit' }}
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
                        transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--accent)',
                      }}
                    />
                  </div>

                  {expandedFaq === i && (
                    <p
                      id={`faq-answer-${i}`}
                      role="region"
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
          background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(6,182,212,0.05) 100%)',
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, vine por el servicio de automatización con agentes de IA')} />
        </FadeIn>
      </section>
    </main>
  )
}
