import { useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { MARQUEE_ROW1, MARQUEE_ROW2 } from '../data'

const COPIES = 4

function buildRow(arr: string[]) {
  return [...arr, ...arr, ...arr, ...arr]
}

function wrapOffset(offset: number, singleW: number) {
  if (singleW <= 0) return offset
  return ((offset % singleW) + singleW) % singleW - singleW
}

export default function MarqueeSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  const scrollPart1 = useRef(-150)
  const scrollPart2 = useRef(150)
  const drag1 = useRef(0)
  const drag2 = useRef(0)
  const dragging = useRef<'row1' | 'row2' | null>(null)
  const startX = useRef(0)

  const updateTransform = useCallback(() => {
    if (!row1Ref.current || !row2Ref.current) return
    const w1 = row1Ref.current.scrollWidth / COPIES
    const w2 = row2Ref.current.scrollWidth / COPIES
    const pos1 = wrapOffset(scrollPart1.current + drag1.current, w1)
    const pos2 = wrapOffset(scrollPart2.current + drag2.current, w2)
    row1Ref.current.style.transform = `translateX(${pos1}px)`
    row2Ref.current.style.transform = `translateX(${pos2}px)`
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const offset = (window.scrollY - sectionRef.current.offsetTop + window.innerHeight) * 0.25
      scrollPart1.current = offset - 150
      scrollPart2.current = -(offset - 150)
      updateTransform()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateTransform])

  const onPointerDown = useCallback((e: React.MouseEvent | React.TouchEvent, row: 'row1' | 'row2') => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragging.current = row
    startX.current = clientX
    e.preventDefault()
  }, [])

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging.current) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const delta = clientX - startX.current
    startX.current = clientX
    if (dragging.current === 'row1') drag1.current += delta
    else drag2.current += delta
    updateTransform()
  }, [updateTransform])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    const d = dragging.current === 'row1' ? drag1 : drag2
    const scroll = dragging.current === 'row1' ? scrollPart1 : scrollPart2
    scroll.current += d.current
    d.current = 0
    dragging.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('touchend', onPointerUp)
    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  return (
    <section
      ref={sectionRef}
      className="pt-12 pb-8 overflow-hidden"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="text-center mb-10 md:mb-14 max-w-[90vw] mx-auto">
        <h2
          className="font-syne font-black uppercase leading-none tracking-tight gradient-heading break-words"
          style={{ fontSize: 'clamp(32px,5vw,80px)' }}
        >
          {t('projects.heading')}
        </h2>
        <p
          className="font-syne font-bold uppercase tracking-tight mt-2 break-words"
          style={{ fontSize: 'clamp(14px,2.4vw,28px)', color: 'var(--text)' }}
        >
          {t('projects.subheading')}
        </p>
      </div>

      {/* Row 1 */}
      <div className="overflow-hidden mb-4" style={{ cursor: 'grab' }}>
        <div
          ref={row1Ref}
          className="flex gap-4 select-none"
          style={{ width: 'max-content', willChange: 'transform' }}
          onMouseDown={(e) => onPointerDown(e, 'row1')}
          onTouchStart={(e) => onPointerDown(e, 'row1')}
        >
          {buildRow(MARQUEE_ROW1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={t('projects.alt')}
              loading="eager"
              decoding="async"
              draggable={false}
              className="flex-shrink-0 rounded-2xl object-cover pointer-events-none"
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

      {/* Row 2 */}
      <div className="overflow-hidden" style={{ cursor: 'grab' }}>
        <div
          ref={row2Ref}
          className="flex gap-4 select-none"
          style={{ width: 'max-content', willChange: 'transform' }}
          onMouseDown={(e) => onPointerDown(e, 'row2')}
          onTouchStart={(e) => onPointerDown(e, 'row2')}
        >
          {buildRow(MARQUEE_ROW2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={t('projects.alt')}
              loading="eager"
              decoding="async"
              draggable={false}
              className="flex-shrink-0 rounded-2xl object-cover pointer-events-none"
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

      <div className="flex justify-center mt-8">
        <span
          className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase"
          style={{ color: 'var(--muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
           <path d="M19 12H5" />
           <path d="M12 19l-7-7 7-7" />
          </svg>
          {t('projects.swipeHint')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </section>
  )
}
