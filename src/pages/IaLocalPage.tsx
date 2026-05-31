import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { IA_LOCAL } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function IaLocalPage() {
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
              {IA_LOCAL.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {IA_LOCAL.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactButton label="Probar IA Local en Mi PC" href={wa('Hola, vine por el servicio de IA local')} />
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
              Puntos fuertes
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IA_LOCAL.strengths.map((strength, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl h-full"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-4xl mb-4">{strength.icon}</div>
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--accent)' }}
                  >
                    {strength.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed"
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

      {/* Models Table */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Modelos disponibles
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-12"
              style={{ color: 'var(--muted)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Elige el modelo según tus necesidades y hardware disponible
            </p>
          </FadeIn>

          <div className="space-y-4 max-w-4xl mx-auto">
            {IA_LOCAL.models.map((model, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p
                        className="font-mono text-xs tracking-widest uppercase mb-1"
                        style={{ color: 'var(--accent2)' }}
                      >
                        Modelo
                      </p>
                      <p
                        className="font-syne font-bold text-lg"
                        style={{ color: 'var(--white)' }}
                      >
                        {model.name}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-mono text-xs tracking-widest uppercase mb-1"
                        style={{ color: 'var(--accent2)' }}
                      >
                        RAM Requerida
                      </p>
                      <p
                        className="font-syne font-bold text-lg"
                        style={{ color: 'var(--accent)' }}
                      >
                        {model.ram}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-mono text-xs tracking-widest uppercase mb-1"
                        style={{ color: 'var(--accent2)' }}
                      >
                        Caso de uso
                      </p>
                      <p
                        className="font-mono text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        {model.use}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
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
              Casos de uso
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IA_LOCAL.useCases.map((useCase, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
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

      {/* B2B Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              {IA_LOCAL.b2b.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {IA_LOCAL.b2b.note}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="p-8 md:p-12 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(79,127,255,0.1) 0%, rgba(0,229,195,0.1) 100%)',
                border: '2px solid var(--accent)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    className="font-syne font-bold mb-6 tracking-tight uppercase"
                    style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--accent)' }}
                  >
                    Soluciones personalizadas
                  </h3>
                  <ul className="space-y-3">
                    {IA_LOCAL.b2b.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-mono text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        <span style={{ color: 'var(--accent2)' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center">
                  <a
                    href={wa('Hola, vine por el servicio de IA local (B2B)')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-syne font-bold text-sm tracking-widest uppercase text-white transition-transform duration-250 hover:-translate-y-1 self-start"
                    style={{
                      background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                      boxShadow: '0 0 40px rgba(79,127,255,0.25)',
                    }}
                  >
                    Contactar Consultor de IA
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
              Cómo funciona
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Descargar',
                desc: 'Baja el modelo elegido según tu hardware',
              },
              {
                step: '2',
                title: 'Instalar',
                desc: 'Configuración simple en tu PC (Windows/Mac/Linux)',
              },
              {
                step: '3',
                title: 'Usar',
                desc: 'Ejecuta consultas sin conectarte a internet',
              },
              {
                step: '4',
                title: 'Optimizar',
                desc: 'Personalización para tu caso de negocio',
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
            {IA_LOCAL.faqs.map((faq, i) => (
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
            Revoluciona tu flujo de trabajo
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            IA privada, sin límites y sin suscripciones. Ejecutada completamente en tu máquina.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Comenzar Ahora" href={wa('Hola, vine por el servicio de IA local')} />
        </FadeIn>
      </section>
    </main>
  )
}
