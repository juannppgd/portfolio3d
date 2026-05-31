import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import FadeIn from '../components/FadeIn'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juannppgd', color: '#0A66C2', icon: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com/juannppgd', color: '#E4405F', icon: 'ig' },
]

const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(email)
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
  }, [errors])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const honeypot = (e.currentTarget as any).honeypot?.value ?? ''
    if (honeypot) return

    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Por favor, ingresa tu nombre para continuar.'
    if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio para contactarte.'
    else if (!validateEmail(formData.email)) newErrors.email = 'Ingresa un correo válido (ej: usuario@dominio.com).'
    if (!formData.message.trim()) newErrors.message = 'Cuéntame más sobre tu proyecto o consulta.'
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const emailjs = await import('@emailjs/browser')
      const serviceId = 'service_s5qyr4s'
      const publicKey = 'gUsdYXpB3K94QxqYM'

      await Promise.allSettled([
        emailjs.send(serviceId, 'template_oyoptw3', {
          to_email: formData.email,
          from_name: 'Juan Pablo',
          name: formData.name,
          message: formData.message,
        }, publicKey),
        emailjs.send(serviceId, 'template_1hbf3wn', {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }, publicKey),
      ])

      setFormData({ name: '', email: '', message: '' })
      setShowModal(true)
      setTimeout(() => setShowModal(false), 6000)
    } catch {
      // Silent fail
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])

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
                Contáctame{' '}
                <span className="gradient-heading">¡Asesoría Gratis!</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            <div>
              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  Email
                </span>
                <p className="font-mono text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                  ¿Prefieres contactarme directamente por tu correo? Haz click aquí te responderé en breve:
                </p>
                <a
                  href="mailto:contact.juannppgd@gmail.com"
                  className="inline-flex items-center gap-2 font-syne font-bold text-sm tracking-tight transition-colors duration-200 hover:text-accent mb-10"
                  style={{ color: 'var(--white)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  contact.juannppgd@gmail.com
                </a>
              </FadeIn>

              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  Redes Sociales
                </span>
                <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  Elige tu red social favorita y escríbeme para una consulta gratuita, o simplemente llena el formulario. ¡Estoy aquí para ayudarte a crecer!
                </p>
                <span className="font-mono text-[11px] tracking-widest uppercase block mb-3" style={{ color: 'var(--text)' }}>
                  Conoce mis redes sociales
                </span>
                <div className="flex flex-wrap gap-3 mb-10">
                  {SOCIAL_LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
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
                        {l.label === 'LinkedIn' ? <FaLinkedin size={16} /> : <FaInstagram size={16} />}
                      </div>
                      <span
                        className="font-syne font-bold text-xs uppercase tracking-tight transition-colors duration-300"
                        style={{ color: 'var(--white)' }}
                      >
                        {l.label}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: 'var(--muted)' }}
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </FadeIn>

              <FadeIn y={15}>
                <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--accent2)' }}>
                  Ubicación
                </span>
                <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Desde Colombia, trabajando con clientes globales.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn y={15}>
                <span className="font-syne font-bold uppercase tracking-tight block mb-6" style={{ fontSize: 'clamp(18px,1.8vw,22px)', color: 'var(--white)' }}>
                  Agenda tu asesoría
                </span>
              </FadeIn>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                <FadeIn y={10}>
                  <div>
                    <label className="font-mono text-[11px] tracking-widest uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
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
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tuemail@ejemplo.com"
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
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Cuéntame tu idea o servicio que necesitas. Déjame tu WhatsApp... Páginas web, marketing, IA local, clases de programación, apoyo académico, asesoría en CV, ventas online y plantillas en Excel."
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

                <FadeIn y={10} delay={0.15}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-250 disabled:opacity-50 disabled:pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg,#4F7FFF,#00E5C3)',
                      color: '#FFFFFF',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Mensaje'
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
            className="fixed inset-0 flex items-center justify-center z-[60] px-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-md w-full p-8 rounded-3xl text-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-syne font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>
                ¡Mensaje Enviado!
              </h3>
              <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                Gracias por contactarme. Te responderé a la brevedad posible.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-full font-syne font-bold text-xs tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: '#fff',
                }}
              >
                Cerrar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
