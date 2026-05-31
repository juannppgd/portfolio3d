import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { APOYO_ACADEMICO } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function ApoyoAcademicoPage() {
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
              {APOYO_ACADEMICO.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {APOYO_ACADEMICO.hero.subtitle}
            </p>
          </FadeIn>

          {/* Quick Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
              {APOYO_ACADEMICO.quickStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 md:p-6 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                  <p
                    className="font-syne font-bold text-[10px] sm:text-xs md:text-sm tracking-tight uppercase leading-tight"
                    style={{ color: 'var(--white)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label="Solicitar apoyo académico" href={wa('Hola, vine por el servicio de apoyo académico')} />
          </FadeIn>
        </div>
      </section>

      {/* Help With Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              En qué te puedo ayudar
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="text-center font-mono text-sm mb-16"
              style={{ color: 'var(--muted)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Ofrezco apoyo completo en diferentes áreas académicas
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APOYO_ACADEMICO.helpWith.map((item, i) => (
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
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--white)' }}
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

      {/* Value Proposition */}
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
              Mi propuesta de valor
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APOYO_ACADEMICO.valueProposition.map((prop, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div>
                  <h3
                    className="font-syne font-bold mb-4 tracking-tight uppercase"
                    style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--accent)' }}
                  >
                    {prop.title}
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {prop.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
              Proceso de trabajo
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APOYO_ACADEMICO.process.map((proc, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div className="relative">
                  {/* Step number */}
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
                    className="font-syne font-bold text-center mb-3 tracking-tight uppercase text-sm"
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

      {/* Audience Section */}
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
              ¿Para quién es?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APOYO_ACADEMICO.audience.map((aud, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight"
                    style={{ fontSize: 'clamp(14px,1.3vw,18px)', color: 'var(--accent2)' }}
                  >
                    {aud.persona}
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {aud.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Garantías
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APOYO_ACADEMICO.guarantees.map((guar, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div className="text-center">
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--accent)' }}
                  >
                    {guar.title}
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {guar.desc}
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
            ¿Listo para mejorar tu desempeño académico?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Contacta conmigo hoy y descubre cómo puedo ayudarte a alcanzar tus objetivos académicos
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Agendar Consulta Gratuita" href={wa('Hola, vine por el servicio de apoyo académico')} />
        </FadeIn>
      </section>
    </main>
  )
}
