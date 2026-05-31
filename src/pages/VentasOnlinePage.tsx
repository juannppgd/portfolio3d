import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { VENTAS_ONLINE, TESTIMONIALS } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function VentasOnlinePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-32 pb-20">
        {/* Gradient background */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse,rgba(79,127,255,0.08) 0%,transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1
              className="font-syne font-black uppercase leading-tight tracking-tight break-words gradient-heading mb-6"
              style={{ fontSize: 'clamp(32px,5vw,72px)' }}
            >
              {VENTAS_ONLINE.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-10 max-w-3xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {VENTAS_ONLINE.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label="Conectar con mis Tiendas" href={wa('Hola, vine por el servicio de venta de garaje en línea')} />
          </FadeIn>
        </div>
      </section>

      {/* Verified Stores Section */}
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
              Tiendas Verificadas
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-16"
              style={{ color: 'var(--muted)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Compra con confianza en plataformas consolidadas con alta reputación
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {VENTAS_ONLINE.stores.map((store, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
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
                      ⭐ {store.reputation}
                    </p>
                    <p
                      className="font-mono text-sm flex items-center gap-2"
                      style={{ color: 'var(--muted)' }}
                    >
                      📦 {store.sales}
                    </p>
                  </div>

                  <a
                    href={store.url}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-bold text-sm uppercase tracking-tight text-white transition-transform duration-250 hover:-translate-y-1"
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
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Por qué elegirnos
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAS_ONLINE.whyUs.map((reason, i) => (
              <FadeIn key={i} delay={0.15 * i}>
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
                    {reason.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed"
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
              Lo que dicen nuestros clientes
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} style={{ color: 'var(--accent2)' }}>
                        ⭐
                      </span>
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
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Tu próximo paso
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Elige cómo quieres comenzar tu experiencia de compra
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {VENTAS_ONLINE.ctas.map((cta, i) => {
              const ctaUrl = cta.action === 'buyOnline'
                ? 'https://listado.mercadolibre.com.co/_CustId_458406036?item_id=MCO1405179747&category_id=MCO180874&seller_id=458406036&client=recoview-selleritems&recos_listing=true'
                : cta.action === 'marketplace'
                  ? 'https://www.facebook.com/marketplace/profile/100028152081570/'
                  : wa('Hola, quiero aprender a vender e-commerce')
              return (
                <FadeIn key={i} delay={0.15 * i}>
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 md:p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] text-center group block"
                    style={{
                      background: 'var(--surface)',
                      border: '2px solid var(--accent)',
                    }}
                  >
                    <h3
                      className="font-syne font-bold mb-3 tracking-tight uppercase text-sm md:text-base"
                      style={{ color: 'var(--accent)' }}
                    >
                      {cta.label}
                    </h3>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mx-auto group-hover:translate-x-1 transition-transform duration-300"
                      style={{ color: 'var(--accent)' }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
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
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <FadeIn>
          <h2
            className="font-syne font-black uppercase mb-6 tracking-tight break-words"
            style={{ fontSize: 'clamp(24px,3.5vw,48px)', color: 'var(--white)' }}
          >
            ¿Necesitas asesoría personalizada?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Contacta conmigo y te guiaré para maximizar tus ventas en marketplace
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Consulta Gratuita" href={wa('Hola, vine por el servicio de venta de garaje en línea')} />
        </FadeIn>
      </section>
    </main>
  )
}
