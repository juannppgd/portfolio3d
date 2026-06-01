import { SiPython, SiJavascript, SiReact, SiMysql, SiHtml5, SiCss, SiNodedotjs, SiGit, SiGithub, SiVite, SiTailwindcss } from 'react-icons/si'
import { FaFileExcel, FaGears } from 'react-icons/fa6'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import DataIcon from '../components/DataIcon'
import { CLASES_PROGRAMACION } from './serviceData'
import { wa } from '../lib/whatsapp'

const TECH_CARDS = [
  { name: 'HTML5 & CSS', icon: SiHtml5, color: '#E34F26' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'React JS', icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'SQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Git & GitHub', icon: SiGit, color: '#F05032' },
  { name: 'React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Vite + Tailwind', icon: SiVite, color: '#646CFF' },
  { name: 'Excel VBA', icon: FaFileExcel, color: '#217346' },
  { name: 'Power Query', icon: FaGears, color: '#9747FF' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
]

export default function ClasesProgramacionPage() {
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
              {CLASES_PROGRAMACION.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="font-mono text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto px-2"
              style={{ color: 'var(--muted)' }}
            >
              {CLASES_PROGRAMACION.hero.subtitle}
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-2xl mx-auto">
              {CLASES_PROGRAMACION.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="font-syne font-black mb-1 md:mb-2"
                    style={{ fontSize: 'clamp(22px,4vw,48px)', color: 'var(--accent)' }}
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
            <ContactButton label="Agendar Primera Clase" href={wa('Hola, vine por el servicio de clases de programación')} />
          </FadeIn>
        </div>
      </section>

      {/* Featured: Excel Avanzado */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span
                className="font-mono text-xs tracking-widest uppercase inline-block mb-3 px-4 py-2 rounded-full"
                style={{ background: 'var(--bg)', color: 'var(--accent2)' }}
              >
                {CLASES_PROGRAMACION.featured.subtitle}
              </span>
              <h2
                className="font-syne font-black uppercase tracking-tight break-words gradient-heading"
                style={{ fontSize: 'clamp(28px,4vw,56px)' }}
              >
                {CLASES_PROGRAMACION.featured.title}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="p-8 md:p-12 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(79,127,255,0.08) 0%, rgba(0,229,195,0.08) 100%)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3
                    className="font-syne font-bold mb-6 tracking-tight uppercase"
                    style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--accent)' }}
                  >
                    Lo que aprenderás
                  </h3>
                  <ul className="space-y-3">
                    {CLASES_PROGRAMACION.featured.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-mono text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        <span style={{ color: 'var(--accent2)' }}>✓</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className="font-syne font-bold mb-6 tracking-tight uppercase"
                    style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: 'var(--accent)' }}
                  >
                    Bonificaciones
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed mb-8"
                    style={{ color: 'var(--text)' }}
                  >
                    {CLASES_PROGRAMACION.featured.bonuses}
                  </p>
                  <ContactButton label="Conocer Más sobre Excel" href={wa('Hola, vine por el servicio de clases de programación')} />
                </div>
              </div>
            </div>
          </FadeIn>
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
              Beneficios clave
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLASES_PROGRAMACION.benefits.map((benefit, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="group p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:translate-y-[-4px]"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}><DataIcon icon={benefit.icon} size={24} /></div>
                  <h3
                    className="font-syne font-bold mb-2 tracking-tight uppercase text-sm md:text-base text-center"
                    style={{ color: 'var(--white)' }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="font-mono text-xs md:text-sm leading-relaxed text-center"
                    style={{ color: 'var(--muted)' }}
                  >
                    {benefit.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section
        className="px-6 md:px-12 py-20 md:py-24"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <span
              className="font-mono text-xs tracking-widest uppercase inline-block mb-3 px-4 py-2 rounded-full"
              style={{ background: 'var(--bg)', color: 'var(--accent2)' }}
            >
              Stack tecnológico
            </span>
            <h2
              className="font-syne font-black uppercase mb-4 tracking-tight break-words gradient-heading"
              style={{ fontSize: 'clamp(28px,4vw,56px)' }}
            >
              Lenguajes y tecnologías
            </h2>
            <p
              className="font-mono text-sm mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Tecnologías que enseño en mis clases personalizadas
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {TECH_CARDS.map((tech, i) => (
              <FadeIn key={tech.name} delay={0.08 * i}>
                <div
                  className="group relative p-5 sm:p-6 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:translate-y-[-6px]"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Gradient glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${tech.color}22 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icon container */}
                  <div
                    className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${tech.color}18`,
                      color: tech.color,
                    }}
                  >
                    <tech.icon />
                  </div>

                  {/* Name */}
                  <span
                    className="relative z-10 font-syne font-bold text-[11px] sm:text-xs leading-tight"
                    style={{ color: 'var(--white)' }}
                  >
                    {tech.name}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="px-6 md:px-12 py-20 md:py-24">
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
            {CLASES_PROGRAMACION.audience.map((aud, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h3
                    className="font-syne font-bold mb-3 tracking-tight uppercase text-sm md:text-base"
                    style={{ color: 'var(--accent)' }}
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

      {/* Process Section */}
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
              Mi metodología
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLASES_PROGRAMACION.process.map((proc, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <div className="relative">
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

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-20 md:py-24 text-center">
        <FadeIn>
          <h2
            className="font-syne font-black uppercase mb-6 tracking-tight break-words"
            style={{ fontSize: 'clamp(24px,3.5vw,48px)', color: 'var(--white)' }}
          >
            ¿Listo para aprender a programar?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="font-mono text-sm mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--muted)' }}
          >
            Agendar tu primera clase gratuita de diagnóstico y descubre tu ruta de aprendizaje personalizada
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactButton label="Agendar Mi Primera Clase" href={wa('Hola, vine por el servicio de clases de programación')} />
        </FadeIn>
      </section>
    </main>
  )
}
