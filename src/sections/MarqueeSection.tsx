import { useEffect, useRef } from 'react'
import { MARQUEE_ROW1, MARQUEE_ROW2 } from '../data'

function buildRow(arr: string[]) {
  return [...arr, ...arr, ...arr]
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return
      const offset = (window.scrollY - sectionRef.current.offsetTop + window.innerHeight) * 0.25
      row1Ref.current.style.transform = `translateX(${offset - 150}px)`
      row2Ref.current.style.transform = `translateX(${-(offset - 150)}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="text-center mb-10 md:mb-14 max-w-[90vw] mx-auto">
        <h2
          className="font-syne font-black uppercase leading-none tracking-tight gradient-heading break-words"
          style={{ fontSize: 'clamp(32px,5vw,80px)' }}
        >
          Proyectos
        </h2>
        <p
          className="font-syne font-bold uppercase tracking-tight mt-2 break-words"
          style={{ fontSize: 'clamp(14px,2.4vw,28px)', color: 'var(--text)' }}
        >
          &amp; referencias visuales
        </p>
      </div>

      {/* Row 1 — moves right */}
      <div className="overflow-hidden mb-4">
        <div ref={row1Ref} className="flex gap-4" style={{ width: 'max-content', willChange: 'transform' }}>
          {buildRow(MARQUEE_ROW1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Proyecto de referencia"
              loading="lazy"
              className="flex-shrink-0 rounded-2xl object-cover"
              style={{
                width: 340,
                height: 210,
                border: '1px solid var(--border)',
                filter: 'brightness(0.8) saturate(0.9)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Row 2 — moves left */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex gap-4" style={{ width: 'max-content', willChange: 'transform' }}>
          {buildRow(MARQUEE_ROW2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Proyecto de referencia"
              loading="lazy"
              className="flex-shrink-0 rounded-2xl object-cover"
              style={{
                width: 340,
                height: 210,
                border: '1px solid var(--border)',
                filter: 'brightness(0.8) saturate(0.9)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
