import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const url = 'https://juanpablogd.com/'
  const title = 'Juan Pablo Portfolio'

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('footer.shareAriaLabel')}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm p-6 md:p-8 rounded-3xl outline-none"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--muted)' }}
              aria-label={t('shareModal.ariaClose')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <h3 className="font-syne font-black text-xl mb-1" style={{ color: 'var(--text)' }}>
                {t('shareModal.heading')}
                <span className="gradient-heading">{t('shareModal.headingHighlight')}</span>
              </h3>
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                {t('shareModal.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <motion.a
                href={shareLinks.facebook}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  background: 'rgba(24,119,242,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1877F2'
                  e.currentTarget.style.background = 'rgba(24,119,242,0.16)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'rgba(24,119,242,0.08)'
                }}
              >
                <FaFacebook size={24} style={{ color: '#1877F2' }} />
                <span className="font-syne font-bold text-[11px] uppercase tracking-tight text-center" style={{ color: 'var(--text)' }}>
                  Facebook
                </span>
              </motion.a>

              <motion.a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  background: 'rgba(37,211,102,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#25D366'
                  e.currentTarget.style.background = 'rgba(37,211,102,0.16)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'rgba(37,211,102,0.08)'
                }}
              >
                <FaWhatsapp size={24} style={{ color: '#25D366' }} />
                <span className="font-syne font-bold text-[11px] uppercase tracking-tight text-center" style={{ color: 'var(--text)' }}>
                  WhatsApp
                </span>
              </motion.a>

              <motion.a
                href={shareLinks.telegram}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  background: 'rgba(38,165,228,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#26A5E4'
                  e.currentTarget.style.background = 'rgba(38,165,228,0.16)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'rgba(38,165,228,0.08)'
                }}
              >
                <FaTelegram size={24} style={{ color: '#26A5E4' }} />
                <span className="font-syne font-bold text-[11px] uppercase tracking-tight text-center" style={{ color: 'var(--text)' }}>
                  Telegram
                </span>
              </motion.a>

              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200"
                style={{
                  border: copied ? '1px solid var(--accent2)' : '1px solid var(--border)',
                  background: copied ? 'rgba(0,229,195,0.1)' : 'rgba(79,127,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.background = 'rgba(79,127,255,0.16)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'rgba(79,127,255,0.08)'
                  }
                }}
              >
                {copied ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
                <span className="font-syne font-bold text-[11px] uppercase tracking-tight text-center" style={{ color: 'var(--text)' }}>
                  {copied ? t('shareModal.copied') : t('shareModal.copyLink')}
                </span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full mt-4 px-6 py-3 rounded-full font-syne font-bold text-xs tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#fff',
              }}
            >
              {t('shareModal.close')}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
