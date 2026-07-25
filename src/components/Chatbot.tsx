import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_PHONE, CONTACT_EMAIL, SOCIAL } from '../lib/constants'

type Page = 'home' | 'apoyo-academico' | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv' | 'plantilla-gastos' | 'plantilla-habitos' | 'ia-local' | 'ecomp-app'

interface ChatbotProps {
  onShare?: () => void
  onScrollToContact?: () => void
  onScrollToFooter?: () => void
  onNavigateToPage?: (page: Page) => void
  forceOpen?: boolean
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  optionKeys?: string[]
}

interface ResponseEntry {
  textKey: string
  optionKeys: string[]
  action?: 'contact' | 'footer' | 'share' | 'email' | 'whatsapp' | 'youtube'
    | 'plantilla-gastos' | 'plantilla-habitos' | 'apoyo-academico'
    | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv'
    | 'ecomp-app'
  autoClose?: boolean
}

const responseMap: Record<string, ResponseEntry> = {
  services: { textKey: 'chatbot.responses.services.text', optionKeys: ['web_dev', 'digital_marketing', 'ia_local', 'ecomp_app', 'additional_services', 'contact', 'about_me'] },
  web_dev: { textKey: 'chatbot.responses.web_dev.text', optionKeys: ['view_tech', 'dev_timeline', 'hosting_info', 'contact'] },
  digital_marketing: { textKey: 'chatbot.responses.digital_marketing.text', optionKeys: ['email_marketing', 'social_media', 'data_analytics', 'contact', 'youtube_channel'] },
  ia_local: { textKey: 'chatbot.responses.ia_local.text', optionKeys: ['try_ia_local', 'contact', 'services'] },
  try_ia_local: { textKey: 'chatbot.responses.try_ia_local.text', optionKeys: ['back_home'], action: 'contact', autoClose: true },
  ecomp_app: { textKey: 'chatbot.responses.ecomp_app.text', optionKeys: ['view_ecomp_page', 'contact', 'services'] },
  view_ecomp_page: { textKey: 'chatbot.responses.view_ecomp_page.text', optionKeys: ['back_home'], action: 'ecomp-app', autoClose: true },
  contact: { textKey: 'chatbot.responses.contact.text', optionKeys: ['share_web', 'send_email', 'send_message', 'more_info', 'view_social'] },
  view_social: { textKey: 'chatbot.responses.view_social.text', optionKeys: ['back_home'], action: 'footer', autoClose: true },
  view_tech: { textKey: 'chatbot.responses.view_tech.text', optionKeys: ['web_dev', 'view_examples', 'contact'] },
  dev_timeline: { textKey: 'chatbot.responses.dev_timeline.text', optionKeys: ['hosting_info', 'view_tech', 'contact'] },
  hosting_info: { textKey: 'chatbot.responses.hosting_info.text', optionKeys: ['web_dev', 'contact'] },
  email_marketing: { textKey: 'chatbot.responses.email_marketing.text', optionKeys: ['digital_marketing', 'data_analytics', 'contact'] },
  social_media: { textKey: 'chatbot.responses.social_media.text', optionKeys: ['view_social', 'digital_marketing', 'email_marketing', 'contact'] },
  data_analytics: { textKey: 'chatbot.responses.data_analytics.text', optionKeys: ['digital_marketing', 'email_marketing', 'contact'] },
  additional_services: { textKey: 'chatbot.responses.additional_services.text', optionKeys: ['academic_dev', 'cv_advice', 'programming_classes', 'online_sales', 'excel_templates', 'back_services'] },
  academic_dev: { textKey: 'chatbot.responses.academic_dev.text', optionKeys: ['view_academic_page', 'contact', 'additional_services'] },
  programming_classes: { textKey: 'chatbot.responses.programming_classes.text', optionKeys: ['view_classes_page', 'contact', 'additional_services'] },
  online_sales: { textKey: 'chatbot.responses.online_sales.text', optionKeys: ['view_sales_page', 'contact', 'additional_services'] },
  cv_advice: { textKey: 'chatbot.responses.cv_advice.text', optionKeys: ['view_cv_page', 'contact', 'additional_services'] },
  excel_templates: { textKey: 'chatbot.responses.excel_templates.text', optionKeys: ['expense_tracker', 'habit_tracker', 'additional_services'] },
  expense_tracker: { textKey: 'chatbot.responses.expense_tracker.text', optionKeys: ['view_expense_page', 'buy_template', 'excel_templates', 'contact'] },
  habit_tracker: { textKey: 'chatbot.responses.habit_tracker.text', optionKeys: ['view_habit_page', 'buy_template', 'excel_templates', 'contact'] },
  buy_template: { textKey: 'chatbot.responses.buy_template.text', optionKeys: ['contact', 'excel_templates'] },
  view_expense_page: { textKey: 'chatbot.responses.view_expense_page.text', optionKeys: ['back_home'], action: 'plantilla-gastos', autoClose: true },
  view_habit_page: { textKey: 'chatbot.responses.view_habit_page.text', optionKeys: ['back_home'], action: 'plantilla-habitos', autoClose: true },
  view_academic_page: { textKey: 'chatbot.responses.view_academic_page.text', optionKeys: ['back_home'], action: 'apoyo-academico', autoClose: true },
  view_classes_page: { textKey: 'chatbot.responses.view_classes_page.text', optionKeys: ['back_home'], action: 'clases-programacion', autoClose: true },
  view_sales_page: { textKey: 'chatbot.responses.view_sales_page.text', optionKeys: ['back_home'], action: 'ventas-online', autoClose: true },
  view_cv_page: { textKey: 'chatbot.responses.view_cv_page.text', optionKeys: ['back_home'], action: 'optimizacion-cv', autoClose: true },
  back_services: { textKey: 'chatbot.responses.back_services.text', optionKeys: ['web_dev', 'digital_marketing', 'ia_local', 'ecomp_app', 'additional_services', 'contact'] },
  youtube_channel: { textKey: 'chatbot.responses.youtube_channel.text', optionKeys: ['back_home'], action: 'youtube' },
  send_email: { textKey: 'chatbot.responses.send_email.text', optionKeys: ['back_home'], action: 'email', autoClose: true },
  more_info: { textKey: 'chatbot.responses.more_info.text', optionKeys: ['services', 'about_me', 'contact'] },
  view_examples: { textKey: 'chatbot.responses.view_examples.text', optionKeys: ['view_social', 'youtube_channel', 'web_dev', 'digital_marketing', 'contact'] },
  about_me: { textKey: 'chatbot.responses.about_me.text', optionKeys: ['view_tech', 'services', 'contact'] },
  back_home: { textKey: 'chatbot.responses.back_home.text', optionKeys: ['services', 'web_dev', 'digital_marketing', 'ia_local', 'ecomp_app', 'contact', 'faq', 'send_message'] },
  faq: { textKey: 'chatbot.responses.faq.text', optionKeys: ['maintenance', 'payments', 'contact'] },
  maintenance: { textKey: 'chatbot.responses.maintenance.text', optionKeys: ['faq', 'contact'] },
  payments: { textKey: 'chatbot.responses.payments.text', optionKeys: ['faq', 'contact'] },
  share_web: { textKey: 'chatbot.responses.share_web.text', optionKeys: ['back_home'], action: 'share', autoClose: true },
  send_message: { textKey: 'chatbot.responses.send_message.text', optionKeys: ['back_home'], action: 'contact', autoClose: true },
}

const initialOptionKeys = ['services', 'web_dev', 'digital_marketing', 'ia_local', 'ecomp_app', 'contact', 'additional_services', 'faq']

const floatingVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 40, scale: 0.95 },
}

function BotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function Chatbot({
  onShare,
  onScrollToContact,
  onScrollToFooter,
  onNavigateToPage,
  forceOpen = false,
}: ChatbotProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initialized = useRef(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true
      setMessages([{
        role: 'assistant',
        content: t('chatbot.initial'),
        optionKeys: initialOptionKeys,
      }])
    }
  }, [isOpen, t])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      initialized.current = false
      setMessages([])
    }
    return () => {
      document.body.style.overflow = ''
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const handleOptionClick = useCallback(async (key: string) => {
    if (isLoading) return

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (key === 'restart') {
      setMessages([{
        role: 'assistant',
        content: t('chatbot.initial'),
        optionKeys: initialOptionKeys,
      }])
      return
    }

    const userMessage: Message = {
      role: 'user',
      content: t(`chatbot.optionLabels.${key}`),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 600))

    const response = responseMap[key]
    if (response) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: t(response.textKey),
        optionKeys: response.optionKeys,
      }
      setMessages(prev => [...prev, assistantMessage])

      const action = response.action
      if (action) {
        setTimeout(() => {
          switch (action) {
            case 'email':
              window.open(`mailto:${CONTACT_EMAIL}?subject=Consulta%20desde%20el%20chatbot&body=Hola%20Juan%20Pablo,%0A%0AMe%20contacto%20desde%20tu%20portfolio%20web.`, '_blank')
              break
            case 'whatsapp':
              window.open(`https://wa.me/${WHATSAPP_PHONE}?text=Hola%20Juan%20Pablo,%20me%20contacto%20desde%20tu%20portfolio%20web.`, '_blank')
              break
            case 'youtube':
              window.open(SOCIAL.YOUTUBE, '_blank')
              break
            case 'share':
              onShare?.()
              break
            case 'footer':
              onScrollToFooter?.()
              break
            case 'contact':
              onScrollToContact?.()
              break
            default:
              onNavigateToPage?.(action as Page)
              break
          }
        }, 500)
      }

      if (response.autoClose) {
        closeTimeoutRef.current = setTimeout(() => {
          setIsOpen(false)
        }, 3000)
      }
    }

    setIsLoading(false)
  }, [isLoading, t, onShare, onScrollToContact, onScrollToFooter, onNavigateToPage])

  return (
    <>
      {!isOpen && (
        <motion.button
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          }}
          aria-label={t('chatbot.ariaOpen')}
        >
          <BotIcon />
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 animate-pulse"
            style={{ background: '#10B981', borderColor: 'var(--bg)' }}
          />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 md:bottom-6 md:right-6 md:left-auto w-full md:w-[400px] h-[85vh] md:h-[600px] md:max-h-[85vh] z-50 flex flex-col overflow-hidden rounded-t-3xl md:rounded-2xl shadow-2xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="flex items-center justify-between p-4 md:p-5"
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                  >
                    <BotIcon />
                  </div>
                  <div className="min-w-0">
                    <span className="font-syne font-bold text-sm md:text-base truncate" style={{ color: 'var(--text)' }}>
                      {t('chatbot.title')}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                      <span className="text-xs" style={{ color: 'var(--accent2)' }}>{t('chatbot.status')}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ color: 'var(--muted)' }}
                  aria-label={t('chatbot.ariaClose')}
                >
                  <CloseIcon />
                </motion.button>
              </div>

              <div
                aria-live="polite"
                className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4"
                style={{ background: 'var(--bg)' }}
              >
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[85%] md:max-w-[80%] p-3 md:p-3.5 rounded-2xl"
                      style={
                        msg.role === 'user'
                          ? { background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff' }
                          : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }
                      }
                    >
                      <p className="font-mono font-light text-sm leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </p>
                      {msg.optionKeys && (
                        <div
                          className="flex flex-wrap gap-2 mt-3 pt-3"
                          style={{ borderTop: '1px solid var(--border)' }}
                        >
                          {msg.optionKeys.map((key) => (
                            <motion.button
                              key={key}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleOptionClick(key)}
                              disabled={isLoading}
                              className="px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                              style={{
                                background: 'rgba(79, 127, 255, 0.12)',
                                color: 'var(--accent)',
                                border: '1px solid var(--accent)',
                              }}
                            >
                              {t(`chatbot.optionLabels.${key}`)}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="p-3 md:p-4 rounded-2xl flex items-center gap-3"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <BotIcon />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>{t('chatbot.typing')}</span>
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent2)', animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent2)', animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--accent2)', animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div
                className="p-3 md:p-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
              >
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {t('chatbot.footerPrefix')}
                  <span style={{ color: 'var(--accent)' }} className="font-semibold">{t('chatbot.footerName')}</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOptionClick('restart')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  aria-label={t('chatbot.ariaReset')}
                >
                  {t('chatbot.restart')}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
