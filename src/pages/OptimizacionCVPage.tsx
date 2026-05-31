import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { OPTIMIZACION_CV } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function OptimizacionCVPage() {
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
              {OPTIMIZACION_CV.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-10 max-w-3xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              {OPTIMIZACION_CV.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label="Optimizar mi CV Ahora" href={wa('Hola, vine por el servicio de optimización de CV')} />
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
                  {OPTIMIZACION_CV.problem.title}
                </h2>

                <div className="mb-6">
                  <div
                    className="text-5xl md:text-6xl font-syne font-black mb-3"
                    style={{ color: '#FF6B6B' }}
                  >
                    {OPTIMIZACION_CV.problem.stat}
                  </div>
                  <p
                    className="font-mono text-sm md:text-base leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    {OPTIMIZACION_CV.problem.desc}
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
                    Los sistemas ATS (Applicant Tracking Systems) filtan automáticamente CVs antes de que un humano los vea.
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
                  border: '2px solid #4F7FFF40',
                }}
              >
                <h2
                  className="font-syne font-black uppercase mb-6 tracking-tight gradient-heading"
                  style={{ fontSize: 'clamp(24px,3vw,32px)' }}
                >
                  {OPTIMIZACION_CV.solution.title}
                </h2>

                <p
                  className="font-mono text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text)' }}
                >
                  {OPTIMIZACION_CV.solution.desc}
                </p>

                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: '4F7FFF10',
                    borderLeft: '4px solid #4F7FFF',
                  }}
                >
                  <p
                    className="font-mono text-xs md:text-sm"
                    style={{ color: 'var(--accent2)' }}
                  >
                    ✓ Optimización estratégica que supera filtros de IA y atrae reclutadores reales.
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
              ¿Qué incluye el servicio?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OPTIMIZACION_CV.includes.map((item, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3
                    className="font-syne font-bold tracking-tight uppercase text-sm md:text-base"
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

              <div className="relative z-10 text-center">
                {/* Badge */}
                <span
                  className="inline-block px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase mb-6"
                  style={{ background: '#FF6B6B20', color: '#FF6B6B' }}
                >
                  🎉 Oferta especial
                </span>

                {/* Pricing */}
                <h2
                  className="font-syne font-black mb-4 tracking-tight"
                  style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--white)' }}
                >
                  Optimización Completa
                </h2>

                <div className="mb-8">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span
                      className="font-syne font-bold text-xl line-through"
                      style={{ color: 'var(--muted)' }}
                    >
                      {OPTIMIZACION_CV.pricing.original}
                    </span>
                    <span
                      className="font-syne font-black text-4xl md:text-5xl"
                      style={{ color: 'var(--accent2)' }}
                    >
                      {OPTIMIZACION_CV.pricing.current}
                    </span>
                  </div>
                  <p
                    className="font-mono text-sm"
                    style={{ color: '#FF6B6B' }}
                  >
                    {OPTIMIZACION_CV.pricing.savings}
                  </p>
                </div>

                <p
                  className="font-mono text-sm leading-relaxed mb-8 max-w-md mx-auto"
                  style={{ color: 'var(--text)' }}
                >
                  Incluye diseño profesional, contenido optimizado, análisis ATS y recomendaciones de presentación
                </p>

                <ContactButton label="Reservar Ahora" href={wa('Hola, vine por el servicio de optimización de CV')} />
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
                Garantía de satisfacción
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    100% Confidencial
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    Revisiones ilimitadas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--accent)' }}>✓</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    Soporte continuo
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
              Cómo funciona
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Análisis Inicial',
                desc: 'Revisamos tu CV actual y definimos objetivos',
              },
              {
                step: '2',
                title: 'Optimización Estratégica',
                desc: 'Aplicamos palabras clave y formato ATS optimizado',
              },
              {
                step: '3',
                title: 'Entrega y Soporte',
                desc: 'Recibes tu CV optimizado con recomendaciones de presentación',
              },
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
                      background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                      color: 'white',
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
            ¿Listo para conseguir esa entrevista?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Invierte en tu futuro profesional. Oferta especial disponible por tiempo limitado.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Solicitar Optimización" href={wa('Hola, vine por el servicio de optimización de CV')} />
        </FadeIn>
      </section>
    </main>
  )
}
