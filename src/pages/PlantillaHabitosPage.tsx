import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import { PLANTILLA_HABITOS } from './serviceData'
import { wa } from '../lib/whatsapp'

export default function PlantillaHabitosPage() {
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
              {PLANTILLA_HABITOS.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {PLANTILLA_HABITOS.hero.subtitle}
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
              {PLANTILLA_HABITOS.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="font-syne font-black mb-1 md:mb-2"
                    style={{ fontSize: 'clamp(20px,3vw,40px)', color: 'var(--accent)' }}
                  >
                    {stat.value}
                  </div>
                  <p
                    className="font-mono text-[10px] sm:text-xs md:text-sm tracking-tight uppercase leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label="Conseguir Plantilla Ahora" href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="px-6 md:px-12 py-14 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-10 md:mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(24px,4vw,56px)' }}
            >
              Características clave
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {PLANTILLA_HABITOS.features.map((feature, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-4 sm:p-6 md:p-8 rounded-2xl text-center h-full"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-4">{feature.icon}</div>
                  <h3
                    className="font-syne font-bold tracking-tight uppercase text-[11px] sm:text-sm md:text-base leading-tight"
                    style={{ color: 'var(--accent)' }}
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
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase text-center mb-16 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Vista previa interactiva
            </h2>
          </FadeIn>

          {/* Monthly Habits */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <h3
                className="font-syne font-bold uppercase mb-6 tracking-tight"
                style={{ fontSize: 'clamp(18px,2vw,24px)', color: 'var(--accent)' }}
              >
                📅 Visión Mensual con Checkboxes
              </h3>
              <div className="space-y-4">
                {PLANTILLA_HABITOS.mockData.habits.map((habit, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <p
                      className="font-syne font-bold text-lg mb-3"
                      style={{ color: 'var(--white)' }}
                    >
                      {habit.emoji} {habit.name}
                    </p>
                    <div className="flex gap-2">
                      {habit.progress.map((completed, dayIdx) => (
                        <div
                          key={dayIdx}
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300"
                          style={{
                            background: completed ? 'var(--accent)' : 'var(--bg)',
                            border: completed ? 'none' : '2px solid var(--border)',
                            color: completed ? 'white' : 'var(--muted)',
                          }}
                        >
                          {completed ? '✓' : dayIdx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Yearly Metrics */}
          <FadeIn delay={0.2}>
            <div>
              <h3
                className="font-syne font-bold uppercase mb-4 md:mb-6 tracking-tight"
                style={{ fontSize: 'clamp(16px,2vw,24px)', color: 'var(--accent)' }}
              >
                📊 Tablero Anual
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent2)' }}
                  >
                    {PLANTILLA_HABITOS.mockData.yearlyMetrics.currentStreak}
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    Racha actual
                  </p>
                </div>
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {PLANTILLA_HABITOS.mockData.yearlyMetrics.bestMonth}%
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    Mejor mes
                  </p>
                </div>
                <div
                  className="p-3 sm:p-4 md:p-6 rounded-xl text-center"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    className="font-syne font-black text-xl sm:text-2xl md:text-3xl mb-1 md:mb-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    {PLANTILLA_HABITOS.mockData.yearlyMetrics.totalHabits}
                  </p>
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--muted)' }}
                  >
                    Total completados
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
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
              Historias de éxito
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANTILLA_HABITOS.testimonialsHabitos.map((testimonial, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p
                      className="font-syne font-bold text-lg"
                      style={{ color: 'var(--white)' }}
                    >
                      {testimonial.name}
                    </p>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono tracking-tight"
                      style={{ background: 'var(--accent)20', color: 'var(--accent2)' }}
                    >
                      {testimonial.metric}
                    </span>
                  </div>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--text)' }}
                  >
                    "{testimonial.text}"
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
              Basado en ciencia
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANTILLA_HABITOS.science.map((item, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight text-sm uppercase"
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

      {/* Pricing */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2
              className="font-syne font-black uppercase mb-12 tracking-tight break-words"
              style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--white)' }}
            >
              Precio especial
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-6 mb-8">
              <span
                className="font-syne font-bold text-2xl line-through"
                style={{ color: 'var(--muted)' }}
              >
                {PLANTILLA_HABITOS.price.original}
              </span>
              <span
                className="font-syne font-black text-4xl md:text-5xl"
                style={{ color: 'var(--accent2)' }}
              >
                {PLANTILLA_HABITOS.price.current}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="font-mono text-sm mb-8"
              style={{ color: 'var(--muted)' }}
            >
              Acceso inmediato. Sin suscripción. Tuyo para siempre.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ContactButton label="Comprar Plantilla de Hábitos" href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
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
            {PLANTILLA_HABITOS.faqs.map((faq, i) => (
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
            Empieza tu racha hoy
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Únete a cientos de personas construyendo hábitos duraderos. La racha más larga comienza con un solo checkmark.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Obtener Plantilla Ahora" href={wa('Hola, quiero la plantilla de rastreo de hábitos')} />
        </FadeIn>
      </section>
    </main>
  )
}
