import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { PLANTILLA_GASTOS } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function PlantillaGastosPage() {
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
              {PLANTILLA_GASTOS.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {PLANTILLA_GASTOS.hero.subtitle}
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-6">
                <div>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    Colombia
                  </p>
                  <p
                    className="font-syne font-black text-2xl sm:text-3xl md:text-4xl"
                    style={{ color: 'var(--white)' }}
                  >
                    {PLANTILLA_GASTOS.pricing.colombia}
                  </p>
                </div>
                <div
                  className="hidden md:block w-px h-20"
                  style={{ background: 'var(--border)' }}
                />
                <div>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    Internacional
                  </p>
                  <p
                    className="font-syne font-black text-2xl sm:text-3xl md:text-4xl"
                    style={{ color: 'var(--white)' }}
                  >
                    {PLANTILLA_GASTOS.pricing.international}
                  </p>
                </div>
              </div>

              <p
                className="font-mono text-sm mb-6"
                style={{ color: '#FF6B6B' }}
              >
                🔥 {PLANTILLA_GASTOS.pricing.urgency}
              </p>

              <ContactButton label="Comprar Ahora por WhatsApp" href={wa('Hola, quiero la plantilla de control de gastos')} />
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
              Características clave
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANTILLA_GASTOS.features.map((feature, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
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
              Vista previa de la plantilla
            </h2>
          </FadeIn>

          {/* Monthly View */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                📅 Vista Mensual
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PLANTILLA_GASTOS.mockData.categories.map((cat, i) => (
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
                          className="font-syne font-bold text-lg"
                          style={{ color: 'var(--white)' }}
                        >
                          {cat.emoji} {cat.name}
                        </p>
                        <p
                          className="font-mono text-sm"
                          style={{ color: 'var(--text)' }}
                        >
                          ${cat.amount.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-2xl">{cat.status}</span>
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
                📊 Progreso Semanal
              </h3>
              <div className="space-y-3">
                {PLANTILLA_GASTOS.mockData.weekly.map((day, i) => (
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
                ⚖️ Regla 50/30/20
              </h3>
              <div className="space-y-3">
                {PLANTILLA_GASTOS.mockData.distribution.map((dist, i) => (
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
              Transformaciones reales
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLANTILLA_GASTOS.transformations.map((trans, i) => (
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
              Lo que dicen nuestros usuarios
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANTILLA_GASTOS.testimonialsGastos.map((testimonial, i) => (
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
              ¿Por qué funciona?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANTILLA_GASTOS.science.map((item, i) => (
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
              Métodos de pago
            </h3>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {PLANTILLA_GASTOS.paymentMethods.map((method, i) => (
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
                ✓ {PLANTILLA_GASTOS.warranty}
              </p>
              <p
                className="font-mono text-sm"
                style={{ color: 'var(--muted)' }}
              >
                Compra con total confianza. Si no te convence, reembolso inmediato.
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
              Preguntas frecuentes
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {PLANTILLA_GASTOS.faqs.map((faq, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div
                  className="p-6 rounded-2xl cursor-pointer transition-all duration-300"
                  style={{
                    background: expandedFaq === i ? 'var(--surface)' : 'var(--bg)',
                    border: expandedFaq === i ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-syne font-bold text-sm md:text-base tracking-tight"
                      style={{ color: 'var(--white)' }}
                    >
                      {faq.q}
                    </h3>
                    <span
                      className="text-xl transition-transform duration-300"
                      style={{
                        transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--accent)',
                      }}
                    >
                      ▼
                    </span>
                  </div>

                  {expandedFaq === i && (
                    <p
                      className="font-mono text-sm leading-relaxed mt-4"
                      style={{ color: 'var(--muted)' }}
                    >
                      {faq.a}
                    </p>
                  )}
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
            Domina tus finanzas hoy
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Únete a más de 330 personas que ya controlan sus gastos y ahorran más cada mes
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Comprar Plantilla de Gastos" href={wa('Hola, quiero la plantilla de control de gastos')} />
        </FadeIn>
      </section>
    </main>
  )
}
