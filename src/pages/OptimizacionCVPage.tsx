import { FaCheck, FaFaceSmile } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { useTranslation } from 'react-i18next'
import { wa } from '../lib/whatsapp'

export default function OptimizacionCVPage() {
  const { t } = useTranslation()
  const data = {
    hero: { title: t('servicePages.optimizacionCV.hero.title'), subtitle: t('servicePages.optimizacionCV.hero.subtitle') },
    problem: { title: t('servicePages.optimizacionCV.problem.title'), stat: t('servicePages.optimizacionCV.problem.stat'), desc: t('servicePages.optimizacionCV.problem.desc') },
    solution: { title: t('servicePages.optimizacionCV.solution.title'), desc: t('servicePages.optimizacionCV.solution.desc') },
    includes: t('servicePages.optimizacionCV.includes', { returnObjects: true }) as { title: string; icon: string }[],
    pricing: { original: t('servicePages.optimizacionCV.pricing.original'), current: t('servicePages.optimizacionCV.pricing.current'), savings: t('servicePages.optimizacionCV.pricing.savings') },
    sectionTitles: {
      heroButton: t('servicePages.optimizacionCV.sectionTitles.heroButton'),
      includesTitle: t('servicePages.optimizacionCV.sectionTitles.includes'),
      specialOffer: t('servicePages.optimizacionCV.sectionTitles.pricingBadge'),
      pricingTitle: t('servicePages.optimizacionCV.sectionTitles.pricingTitle'),
      pricingDesc: t('servicePages.optimizacionCV.sectionTitles.pricingDesc'),
      guarantee: t('servicePages.optimizacionCV.sectionTitles.trustTitle'),
      confidential: t('servicePages.optimizacionCV.sectionTitles.trustConfidencial'),
      trustRevisiones: t('servicePages.optimizacionCV.sectionTitles.trustRevisiones'),
      trustSoporte: t('servicePages.optimizacionCV.sectionTitles.trustSoporte'),
      pricingButton: t('servicePages.optimizacionCV.sectionTitles.pricingButton'),
      problemFootnote: t('servicePages.optimizacionCV.sectionTitles.problemFootnote'),
      solutionFootnote: t('servicePages.optimizacionCV.sectionTitles.solutionFootnote'),
      processTitle: t('servicePages.optimizacionCV.sectionTitles.processTitle'),
      processStep1: t('servicePages.optimizacionCV.sectionTitles.processStep1'),
      processStep1Desc: t('servicePages.optimizacionCV.sectionTitles.processStep1Desc'),
      processStep2: t('servicePages.optimizacionCV.sectionTitles.processStep2'),
      processStep2Desc: t('servicePages.optimizacionCV.sectionTitles.processStep2Desc'),
      processStep3: t('servicePages.optimizacionCV.sectionTitles.processStep3'),
      processStep3Desc: t('servicePages.optimizacionCV.sectionTitles.processStep3Desc'),
      ctaTitle: t('servicePages.optimizacionCV.sectionTitles.ctaTitle'),
      ctaDesc: t('servicePages.optimizacionCV.sectionTitles.ctaDesc'),
      ctaButton: t('servicePages.optimizacionCV.sectionTitles.ctaButton'),
    },
  }
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        {/* Gradient background */}
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

          <FadeIn delay={0.3}>
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, vine por el servicio de optimización de CV')} />
          </FadeIn>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Problem */}
            <FadeIn>
              <div
                className="p-8 md:p-12 rounded-2xl"
                style={{
                  background: 'var(--bg)',
                  border: '2px solid #FF6B6B40',
                }}
              >
                <h2
                  className="font-syne font-black uppercase mb-6 tracking-tight"
                  style={{ fontSize: 'clamp(24px,3vw,32px)', color: '#FF6B6B' }}
                >
                  {data.problem.title}
                </h2>

                <div className="mb-6">
                  <div
                    className="text-5xl md:text-6xl font-syne font-black mb-3"
                    style={{ color: '#FF6B6B' }}
                  >
                    {data.problem.stat}
                  </div>
                  <p
                    className="font-mono text-sm md:text-base leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    {data.problem.desc}
                  </p>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: '#FF6B6B10',
                    borderLeft: '4px solid #FF6B6B',
                  }}
                >
                  <p
                    className="font-mono text-xs md:text-sm"
                    style={{ color: 'var(--muted)' }}
                  >
                    {data.sectionTitles.problemFootnote}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Solution */}
            <FadeIn delay={0.15}>
              <div
                className="p-8 md:p-12 rounded-2xl"
                style={{
                  background: 'var(--bg)',
                  border: '2px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                }}
              >
                <h2
                  className="font-syne font-black uppercase mb-6 tracking-tight gradient-heading"
                  style={{ fontSize: 'clamp(24px,3vw,32px)' }}
                >
                  {data.solution.title}
                </h2>

                <p
                  className="font-mono text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text)' }}
                >
                  {data.solution.desc}
                </p>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: 'rgba(79,127,255,0.06)',
                    borderLeft: '4px solid var(--accent)',
                  }}
                >
                  <p
                    className="font-mono text-xs md:text-sm"
                    style={{ color: 'var(--accent2)' }}
                  >
                    <FaCheck size={14} style={{ color: 'var(--accent2)', marginRight: 6 }} /> {data.sectionTitles.solutionFootnote}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.includesTitle}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.includes.map((item, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(236,72,153,0.12)', color: '#EC4899' }}><DataIcon icon={item.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold tracking-tight uppercase text-sm md:text-base text-center"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Card Section */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div
              className="p-8 md:p-12 rounded-3xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(79,127,255,0.1) 0%, rgba(0,229,195,0.1) 100%)',
                border: '2px solid var(--accent)',
              }}
            >
              {/* Decorative blur */}
              <div
                className="pointer-events-none absolute top-0 right-0 w-[300px] h-[300px] rounded-full"
                style={{
                  background: 'radial-gradient(ellipse,rgba(79,127,255,0.1) 0%,transparent 70%)',
                }}
              />

              <div className="relative z-10 text-center px-2">
                {/* Badge */}
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ background: '#FF6B6B20', color: '#FF6B6B' }}
                >
                  <FaFaceSmile size={14} /> {data.sectionTitles.specialOffer}
                </span>

                {/* Pricing */}
                <h2
                  className="font-syne font-black mb-3 tracking-tight"
                  style={{ fontSize: 'clamp(24px,5vw,48px)', color: 'var(--white)' }}
                >
                  {data.sectionTitles.pricingTitle}
                </h2>

                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2">
                    <span
                      className="font-syne font-bold text-lg sm:text-xl line-through"
                      style={{ color: 'var(--muted)' }}
                    >
                      {data.pricing.original}
                    </span>
                    <span
                      className="font-syne font-black text-4xl sm:text-5xl md:text-6xl"
                      style={{ color: 'var(--accent2)' }}
                    >
                      {data.pricing.current}
                    </span>
                  </div>
                  <span
                    className="inline-block font-mono text-xs sm:text-sm px-3 py-1 rounded-full"
                    style={{ background: '#FF6B6B20', color: '#FF6B6B' }}
                  >
                    {data.pricing.savings}
                  </span>
                </div>

                <p
                  className="font-mono text-xs sm:text-sm leading-relaxed mb-8 max-w-md mx-auto"
                  style={{ color: 'var(--text)' }}
                >
                  {data.sectionTitles.pricingDesc}
                </p>

                <ContactButton label={data.sectionTitles.pricingButton} href={wa('Hola, vine por el servicio de optimización de CV')} />
              </div>
            </div>
          </FadeIn>

          {/* Trust badges */}
          <FadeIn delay={0.2}>
            <div className="mt-12 text-center space-y-4">
              <p
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: 'var(--accent2)' }}
              >
                {data.sectionTitles.guarantee}
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaCheck size={12} style={{ color: 'var(--accent)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    {data.sectionTitles.confidential}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck size={12} style={{ color: 'var(--accent)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
{data.sectionTitles.trustRevisiones}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck size={12} style={{ color: 'var(--accent)' }} />
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
{data.sectionTitles.trustSoporte}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
{data.sectionTitles.processTitle}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: data.sectionTitles.processStep1, desc: data.sectionTitles.processStep1Desc },
              { step: '2', title: data.sectionTitles.processStep2, desc: data.sectionTitles.processStep2Desc },
              { step: '3', title: data.sectionTitles.processStep3, desc: data.sectionTitles.processStep3Desc },
            ].map((proc, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-8 rounded-2xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-syne font-bold text-xl mb-4 mx-auto"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: 'var(--on-accent)',
                    }}
                  >
                    {proc.step}
                  </div>
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm"
                    style={{ color: 'var(--white)' }}
                  >
                    {proc.title}
                  </h3>
                  <p
                    className="font-mono text-xs leading-relaxed"
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

      {/* CTA Section */}
      <section
        className="px-6 md:px-12 py-20 md:py-24 text-center"
        style={{
          background: 'var(--surface)',
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, vine por el servicio de optimización de CV')} />
        </FadeIn>
      </section>
    </main>
  )
}
