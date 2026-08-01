import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import FadeIn from '../components/FadeIn'
import { EMAILJS, CONTACT_EMAIL, SOCIAL } from '../lib/constants'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: SOCIAL.LINKEDIN, color: '#0A66C2' },
  { label: 'Instagram', href: SOCIAL.INSTAGRAM, color: '#E4405F' },
  { label: 'WhatsApp', href: SOCIAL.WHATSAPP, color: '#25D366' },
]

const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(email)
}

export default function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const modalRefC = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showModal) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false)
    }
    document.addEventListener('keydown', handleKey)
    modalRefC.current?.focus()
    return () => document.removeEventListener('keydown', handleKey)
  }, [showModal])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
  }, [errors])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const honeypot = (form.querySelector<HTMLInputElement>('input[name="honeypot"]')?.value ?? '')
    if (honeypot) return

    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = t('contact.errorName')
    if (!formData.email.trim()) newErrors.email = t('contact.errorEmail')
    else if (!validateEmail(formData.email)) newErrors.email = t('contact.errorEmailInvalid')
    if (!formData.message.trim()) newErrors.message = t('contact.errorMessage')
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const emailjs = await import('@emailjs/browser')

      await Promise.allSettled([
        emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_AUTO_REPLY, {
          to_email: formData.email,
          from_name: 'Juan Pablo',
          name: formData.name,
          message: formData.message,
        }, EMAILJS.PUBLIC_KEY),
        emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_NOTIFICATION, {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }, EMAILJS.PUBLIC_KEY),
      ])

      setFormData({ name: '', email: '', message: '' })
      setSubmitError('')
      setShowModal(true)
      setTimeout(() => setShowModal(false), 6000)
    } catch {
      setSubmitError(t('contact.errorSubmit', { email: CONTACT_EMAIL }))
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, t])

  return (
    <>
      <section
        id="contacto"
        className="px-6 md:px-12 pt-12 md:pt-10 lg:pt-12 pb-10 relative z-30"
        style={{
          background: 'var(--surface)',
          borderRadius: '40px 40px 0 0',
          marginTop: -40,
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-10 lg:mb-14">
            <FadeIn>
              <h2
                className="font-syne font-black uppercase leading-none tracking-tight mb-4 break-words"
                style={{ fontSize: 'clamp(24px,4.2vw,60px)', color: 'var(--white)', maxWidth: '90vw' }}
              >
                {t('contact.heading')}
                <span className="gradient-heading">{t('contact.headingHighlight')}</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            <div>
              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  {t('contact.emailLabel')}
                </span>
                <p className="font-mono text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                  {t('contact.emailDesc')}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 font-syne font-bold text-sm tracking-tight transition-colors duration-200 hover:text-accent mb-10"
                  style={{ color: 'var(--white)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {CONTACT_EMAIL}
                </a>
              </FadeIn>

              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  {t('contact.socialLabel')}
                </span>
                <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {t('contact.socialDesc')}
                </p>
                <span className="font-mono text-[11px] tracking-widest uppercase block mb-3" style={{ color: 'var(--text)' }}>
                  {t('contact.socialSubtext')}
                </span>
                <div className="flex flex-wrap gap-3 mb-10">
                  {SOCIAL_LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={l.label}
                      className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        border: '1px solid var(--border)',
                        background: 'transparent',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = l.color
                        e.currentTarget.style.background = l.color + '18'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <div
                        className="flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ background: l.color + '20', color: l.color }}
                      >
                        {l.label === 'LinkedIn' ? <FaLinkedin size={16} /> : l.label === 'Instagram' ? <FaInstagram size={16} /> : <FaWhatsapp size={16} />}
                      </div>
                    </a>
                  ))}
                </div>
              </FadeIn>

              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  {t('contact.locationLabel')}
                </span>
                <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {t('contact.locationText')}
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn y={15}>
                <span className="font-syne font-bold uppercase tracking-tight block mb-6" style={{ fontSize: 'clamp(18px,1.8vw,22px)', color: 'var(--white)' }}>
                  {t('contact.formTitle')}
                </span>
              </FadeIn>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                <FadeIn y={10}>
                  <div>
                    <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                      {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.formNamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none transition-colors duration-200"
                      style={{
                        border: errors.name ? '1px solid #EF4444' : '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                      }}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[11px] mt-1.5"
                        style={{ color: '#EF4444' }}
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                </FadeIn>

                <FadeIn y={10} delay={0.05}>
                  <div>
                    <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                      {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.formEmailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none transition-colors duration-200"
                      style={{
                        border: errors.email ? '1px solid #EF4444' : '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                      }}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[11px] mt-1.5"
                        style={{ color: '#EF4444' }}
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </FadeIn>

                <FadeIn y={10} delay={0.1}>
                  <div>
                    <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                      {t('contact.formMessage')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={t('contact.formMessagePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl font-mono text-sm outline-none resize-none transition-colors duration-200"
                      style={{
                        border: errors.message ? '1px solid #EF4444' : '1px solid var(--border)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                      }}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[11px] mt-1.5"
                        style={{ color: '#EF4444' }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>
                </FadeIn>

                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-center"
                    style={{ color: '#EF4444' }}
                  >
                    {submitError}
                  </motion.p>
                )}

                <FadeIn y={10} delay={0.15}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                      color: 'var(--on-accent)',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        {t('contact.formSubmitting')}
                      </span>
                    ) : (
                      t('contact.formSubmit')
                    )}
                  </motion.button>
                </FadeIn>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('contact.modalTitle')}
            className="fixed inset-0 flex items-center justify-center z-[60] px-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              ref={modalRefC}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-md w-full p-8 rounded-3xl text-center outline-none"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-syne font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>
                {t('contact.modalTitle')}
              </h3>
              <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {t('contact.modalDesc')}
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-full font-syne font-bold text-xs tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: 'var(--on-accent)',
                }}
              >
                {t('contact.modalClose')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
