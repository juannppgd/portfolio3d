import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { FAQ, REVIEWS } from '../data'

function AccordionItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-accent"
        style={{ color: 'var(--text)' }}
      >
        <span className="font-syne font-bold text-sm uppercase tracking-tight">{q}</span>
        <span
          className="font-mono text-lg flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', color: 'var(--accent)' }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="font-mono font-light leading-relaxed pb-5 text-sm" style={{ color: 'var(--muted)' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [reviewIndex, setReviewIndex] = useState(0)
  const current = REVIEWS[reviewIndex]

  const next = () => setReviewIndex((i) => (i + 1) % REVIEWS.length)
  const prev = () => setReviewIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)

  return (
    <section
      id="faq"
      className="px-6 md:px-12 py-20 md:py-16 lg:py-20 relative z-30"
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: -40,
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-6 lg:gap-12">
          {/* Left: FAQ */}
          <div>
            <FadeIn>
              <h2
                className="font-syne font-black uppercase leading-none tracking-tight mb-3"
                style={{ fontSize: 'clamp(34px,4vw,64px)', color: 'var(--white)' }}
              >
                FAQ.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="font-mono text-sm leading-relaxed mb-6 md:mb-4 lg:mb-6" style={{ color: 'var(--muted)', maxWidth: 360 }}>
                Respuestas rápidas a las dudas más frecuentes.
              </p>
            </FadeIn>

            <FadeIn y={20}>
              <div>
                {FAQ.map((item, i) => (
                  <AccordionItem
                    key={i}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndex === i}
                    toggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Reviews */}
          <div>
            <FadeIn>
              <h3
                className="font-syne font-black uppercase leading-none tracking-tight mb-3"
                style={{ fontSize: 'clamp(28px,3.5vw,40px)', color: 'var(--white)' }}
              >
                Reseñas de{' '}
                <span className="gradient-heading">Clientes.</span>
              </h3>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 300 }}>
                Lo que dicen las personas con las que he trabajado.
              </p>
            </FadeIn>

            <FadeIn y={15} key={reviewIndex}>
              <div
                className="p-5 rounded-xl"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-syne font-bold text-xs"
                    style={{
                      background: 'linear-gradient(135deg,rgba(79,127,255,0.2),rgba(0,229,195,0.1))',
                      border: '1px solid rgba(79,127,255,0.2)',
                      color: 'var(--accent)',
                    }}
                  >
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[11px] uppercase tracking-tight" style={{ color: 'var(--white)' }}>
                      {current.name}
                    </div>
                    <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                      {current.role}
                    </div>
                  </div>
                </div>
                <p className="font-mono font-light leading-relaxed text-sm" style={{ color: 'var(--muted)' }}>
                  &ldquo;{current.text}&rdquo;
                </p>
                <div className="flex gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[11px]" style={{ color: 'var(--accent)' }}>★</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === reviewIndex ? 24 : 10,
                      height: 10,
                      background: i === reviewIndex ? 'var(--accent)' : 'var(--border)',
                    }}
                    aria-label={`Ver reseña ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:text-accent hover:border-accent"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  aria-label="Reseña anterior"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:text-accent hover:border-accent"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  aria-label="Siguiente reseña"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
