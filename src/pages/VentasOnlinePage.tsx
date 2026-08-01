import { useTranslation } from 'react-i18next'
import { FaStar, FaBox } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { wa } from '../lib/whatsapp'

export default function VentasOnlinePage() {
  const { t } = useTranslation()
  const data = {
    hero: { title: t('servicePages.ventasOnline.hero.title'), subtitle: t('servicePages.ventasOnline.hero.subtitle') },
    stores: t('servicePages.ventasOnline.stores', { returnObjects: true }) as { name: string; reputation: string; sales: string; desc: string; cta: string; url: string; color: string }[],
    whyUs: t('servicePages.ventasOnline.whyUs', { returnObjects: true }) as { title: string; desc: string }[],
    ctas: t('servicePages.ventasOnline.ctas', { returnObjects: true }) as { label: string; desc: string; icon: string; action: string }[],
    testimonials: t('servicePages.ventasOnline.testimonials', { returnObjects: true }) as { name: string; role: string; rating: number; text: string }[],
    sectionTitles: t('servicePages.ventasOnline.sectionTitles', { returnObjects: true }) as Record<string, string>,
  }
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center px-6 md:px-12 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden">
        {/* Gradient background */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.12) 0%,transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <FadeIn>
            <h1
              className="font-syne font-black uppercase leading-tight tracking-tight break-words gradient-heading mb-4 md:mb-6"
              style={{ fontSize: 'clamp(28px,5.5vw,72px)' }}
            >
              {data.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-xs sm:text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {data.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label={data.sectionTitles.heroButton} href={wa('Hola, vine por el servicio de venta de garaje en línea')} />
          </FadeIn>
        </div>
      </section>

      {/* Verified Stores Section */}
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
              className="font-syne font-black uppercase text-center mb-3 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.stores}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-8 md:mb-10"
              style={{ color: 'var(--muted)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {data.sectionTitles.storesDesc}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-2xl mx-auto">
            {data.stores.map((store, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--bg)',
                    border: `1px solid ${store.color}40`,
                  }}
                >
                  <div
                    className="inline-block px-4 py-2 rounded-full font-syne font-bold text-sm mb-4"
                    style={{ background: `${store.color}20`, color: store.color }}
                  >
                    {store.name}
                  </div>

                  <h3
                    className="font-syne font-bold text-lg md:text-xl mb-3 tracking-tight"
                    style={{ color: 'var(--white)' }}
                  >
                    {store.desc}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <p
                      className="font-mono text-sm flex items-center gap-2"
                      style={{ color: 'var(--accent2)' }}
                    >
                      <FaStar size={16} style={{ color: 'var(--accent)' }} /> {store.reputation}
                    </p>
                    <p
                      className="font-mono text-sm flex items-center gap-2"
                      style={{ color: 'var(--muted)' }}
                    >
                      <FaBox size={16} style={{ color: 'var(--muted)', marginRight: 8 }} /> {store.sales}
                    </p>
                  </div>

                  <a
                    href={store.url}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-tight text-white transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      background: store.color,
                      boxShadow: `0 0 30px ${store.color}40`,
                    }}
                  >
                    {store.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-8 md:mb-10 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.whyUs}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {data.whyUs.map((reason, i) => (
              <FadeIn key={i} delay={0.12 * i}>
                <div
                  className="p-5 md:p-6 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-3px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-xs md:text-sm"
                    style={{ color: 'var(--accent)' }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="font-mono text-[11px] md:text-xs leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {reason.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              className="font-syne font-black uppercase text-center mb-8 md:mb-10 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.testimonials}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {data.testimonials.map((testimonial, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-5 md:p-7 rounded-2xl h-full"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <FaStar key={j} size={20} style={{ color: 'var(--accent2)' }} />
                    ))}
                  </div>

                  <p
                    className="font-mono text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    "{testimonial.text}"
                  </p>

                  <div>
                    <p
                      className="font-syne font-bold text-sm tracking-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: 'var(--accent2)' }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-3 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {data.sectionTitles.nextStep}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-8 md:mb-10 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {data.sectionTitles.nextStepDesc}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {data.ctas.map((cta, i) => {
              const ctaUrl = cta.action === 'buyOnline'
                ? 'https://listado.mercadolibre.com.co/_CustId_458406036?item_id=MCO1405179747&category_id=MCO180874&seller_id=458406036&client=recoview-selleritems&recos_listing=true'
                : cta.action === 'marketplace'
                  ? 'https://www.facebook.com/marketplace/profile/100028152081570/'
                  : wa('Hola, quiero aprender a vender e-commerce')
              return (
                <FadeIn key={i} delay={0.12 * i}>
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={cta.label}
                    className="group relative flex flex-col items-center text-center gap-3 p-6 md:p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1 h-full"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.boxShadow = '0 20px 45px -20px rgba(79,127,255,0.45)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                        color: 'var(--on-accent)',
                      }}
                    >
                      <DataIcon icon={cta.icon} size={24} />
                    </div>
                    <h3
                      className="font-syne font-bold uppercase tracking-tight text-sm md:text-base"
                      style={{ color: 'var(--white)' }}
                    >
                      {cta.label}
                    </h3>
                    <p
                      className="font-mono text-xs leading-relaxed flex-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      {cta.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-2 mt-1 font-syne font-bold text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300"
                      style={{
                        background: 'rgba(79,127,255,0.1)',
                        color: 'var(--accent)',
                        border: '1px solid rgba(79,127,255,0.25)',
                      }}
                    >
                      {data.sectionTitles.ctaStart}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </a>
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
          <ContactButton label={data.sectionTitles.ctaButton} href={wa('Hola, vine por el servicio de venta de garaje en línea')} />
        </FadeIn>
      </section>
    </main>
  )
}
