import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Page = 'home' | 'apoyo-academico' | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv' | 'plantilla-gastos' | 'plantilla-habitos' | 'ia-local'

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
  options?: string[]
}

interface ResponseEntry {
  text: string
  options: string[]
  action?: 'contact' | 'footer' | 'share' | 'email' | 'whatsapp' | 'youtube'
    | 'plantilla-gastos' | 'plantilla-habitos' | 'apoyo-academico'
    | 'clases-programacion' | 'ventas-online' | 'optimizacion-cv'
  autoClose?: boolean
}

const responses: Record<string, ResponseEntry> = {
  'Servicios': {
    text: 'Juan Pablo ofrece servicios principales y adicionales. ¿Sobre cuál te gustaría saber más?',
    options: ['IA Local', 'Servicios Adicionales', 'Desarrollo Web', 'Marketing Digital', 'Contacto', 'Háblame de Juan Pablo'],
  },
  'Desarrollo Web': {
    text: 'Desarrollo páginas web modernas con React, Vite y Tailwind CSS. Sitios 100% personalizados, responsivos y optimizados para convertir visitantes en clientes. Ideales para emprendedores, pymes y profesionales. ¿Qué te gustaría saber?',
    options: ['Ver Tecnologías', 'Tiempos de Desarrollo', '¿Incluye Hosting?', 'Contacto'],
  },
  'Marketing Digital': {
    text: 'Servicios completos de marketing digital: Edición profesional de fotografía y video, campañas de email/SMS, gestión de redes sociales, SEO, SEM y análisis de datos. Estrategias personalizadas para impulsar tu negocio online. ¿Qué aspecto te interesa?',
    options: ['Email Marketing', 'Redes Sociales', 'Análisis de Datos', 'Contacto', 'Ver Canal de YouTube'],
  },
  'IA Local': {
    text: 'IA Local: modelos de lenguaje que corren directamente en tu PC usando GPU o RAM, sin suscripción, sin límites de preguntas y sin que tus datos salgan de tu máquina. Ideal para empresas que valoran privacidad, independencia tecnológica y velocidad local.',
    options: ['Probar IA Local en mi PC', 'Contacto', 'Servicios'],
  },
  'Probar IA Local en mi PC': {
    text: 'Perfecto, te llevo al formulario de contacto para que puedas solicitar tu IA local. Así puedes empezar rápido y sin salir de tu flujo de trabajo.',
    options: ['Volver al Inicio'],
    action: 'contact',
    autoClose: true,
  },
  'Contacto': {
    text: '¡Perfecto! Juan Pablo estará encantado de ayudarte. ¿Cómo prefieres contactarlo?',
    options: ['Compartir esta Web', 'Enviar Email', 'Enviar mensaje', 'Más Información', 'Ver Redes Sociales'],
  },
  'Ver Redes Sociales': {
    text: '¡Excelente! Te llevo a la sección de redes sociales para que conozcas más sobre Juan Pablo y sus proyectos. ¡Síguenos para estar al día!',
    options: ['Volver al Inicio'],
    action: 'footer',
    autoClose: true,
  },
  'Ver Tecnologías': {
    text: 'Stack tecnológico:\n\n• Frontend: React + Vite + Tailwind CSS\n• Backend: Node.js\n• Bases de datos: MySQL\n• Automatización: Python (IA)\n• Control de versiones: Git & GitHub\n• Apps móviles: React Native\n\nTodo para crear soluciones modernas y escalables.',
    options: ['Desarrollo Web', 'Ver Ejemplos', 'Contacto'],
  },
  'Tiempos de Desarrollo': {
    text: 'Los tiempos varían según complejidad:\n\n• Landing page básica: 3-5 días\n• Sitio corporativo: 1-2 semanas\n• E-commerce completo: 3-4 semanas\n\nIncluye consultoría gratuita inicial para definir tu proyecto.',
    options: ['¿Incluye Hosting?', 'Ver Tecnologías', 'Contacto'],
  },
  '¿Incluye Hosting?': {
    text: '¡Sí! El primer año incluye:\n\n✓ Hosting y dominio gratis*\n✓ Correo corporativo\n✓ Configuración DNS\n✓ Certificado SSL\n✓ 3 meses de soporte gratis\n\n*Aplican términos y condiciones',
    options: ['Desarrollo Web', 'Contacto'],
  },
  'Email Marketing': {
    text: 'Campañas de email y SMS marketing con:\n\n• Segmentación de audiencias\n• Pruebas A/B para optimización\n• Automatización con EmailJS\n• Análisis de resultados\n• CRM integrado (HubSpot/Masivian)\n\nAumento de engagement garantizado.',
    options: ['Marketing Digital', 'Análisis de Datos', 'Contacto'],
  },
  'Redes Sociales': {
    text: 'Gestión profesional de redes sociales:\n\n• Creación de contenido atractivo\n• Programación estratégica\n• Análisis de métricas\n• Community management\n• Campañas en Meta Business Suite\n\nConecta mejor con tu audiencia.',
    options: ['Ver Redes Sociales', 'Marketing Digital', 'Email Marketing', 'Contacto'],
  },
  'Análisis de Datos': {
    text: 'Toma decisiones basadas en datos:\n\n• Google Analytics integrado\n• Reportes personalizados\n• Segmentación avanzada\n• Optimización continua\n• KPIs y métricas clave\n\nTransforma datos en resultados.',
    options: ['Marketing Digital', 'Email Marketing', 'Contacto'],
  },
  'Servicios Adicionales': {
    text: 'Además de desarrollo web y marketing, Juan Pablo ofrece servicios adicionales especializados:\n\n• Desarrollo de trabajos y evaluaciones académicas\n• Clases de programación personalizadas\n• Venta de garaje en línea (Marketplace y MercadoLibre)\n• Asesoría para crear CV profesionales\n• Plantillas Excel profesionales\n\n¿Cuál te interesa?',
    options: ['Desarrollo Académico', 'Asesoría CV', 'Clases Programación', 'Venta Online', 'Plantillas Excel', 'Volver a Servicios'],
  },
  'Desarrollo Académico': {
    text: 'Desarrollo de trabajos y evaluaciones\nApoyo profesional en el desarrollo de trabajos académicos, evaluaciones, proyectos y entregables con enfoque en calidad, cumplimiento y resultados.\n\nSolicitar apoyo académico',
    options: ['Ver Página Académica', 'Contacto', 'Servicios Adicionales'],
  },
  'Clases Programación': {
    text: 'Clases de programación personalizadas 1 a 1\nClases personalizadas enfocadas en tu nivel, ritmo y objetivos. Aprende programación de forma práctica y aplicada. Recibes Materiales y Certificado\n\nContáctame haciendo clic aquí',
    options: ['Ver Página Clases', 'Contacto', 'Servicios Adicionales'],
  },
  'Venta Online': {
    text: 'Venta de garaje en línea por Marketplace y MercadoLibre\nConoce mi modalidad de Publicación, gestión y optimización de productos en plataformas de venta online para que adquieras los tuyos completamente garantizados.\n\nExplorar tiendas y aprender a vender',
    options: ['Ver Página Venta', 'Contacto', 'Servicios Adicionales'],
  },
  'Asesoría CV': {
    text: 'Asesoría en creación de tu CV para que entres al trabajo de tus sueños\nCreo tu CV para que entres al trabajo de tus sueños\nDiseño un currículum profesional para un CV estratégico, atractivo y optimizado para procesos de selección laboral, filtros avanzados ATS.\n\nContáctame haciendo clic aquí',
    options: ['Ver Página CV', 'Contacto', 'Servicios Adicionales'],
  },
  'Plantillas Excel': {
    text: 'Plantillas para ti\nHerramientas Excel profesionales para mejorar tu productividad y finanzas personales. Acceso inmediato por solo $5 USD cada una.',
    options: ['Control de Gastos', 'Rastreo de Hábitos', 'Servicios Adicionales'],
  },
  'Control de Gastos': {
    text: 'Control de Gastos\nDomina tus finanzas en 5 min/día con colores inteligentes, gráficos automáticos y la regla 50/30/20.\n\n$7 USD\nVer Plantilla de Gastos',
    options: ['Ver Plantilla de Gastos', 'Comprar Plantilla', 'Plantillas Excel', 'Contacto'],
  },
  'Rastreo de Hábitos': {
    text: 'Rastreo de Hábitos\nRastrea tus hábitos diarios con gráficos dinámicos, rachas y análisis inteligente para 2026.\n\n$7 USD\nVer Plantilla de Hábitos',
    options: ['Ver Plantilla de Hábitos', 'Comprar Plantilla', 'Plantillas Excel', 'Contacto'],
  },
  'Comprar Plantilla': {
    text: '¡Excelente! Para adquirir la plantilla, contáctame directamente. Te enviaré el enlace de pago seguro y acceso inmediato.\n\nMétodos de pago: PayPal, Transferencia, etc.',
    options: ['Contacto', 'Plantillas Excel'],
  },
  'Ver Plantilla de Gastos': {
    text: '¡Excelente! Te llevo directamente a la página de la plantilla de Control de Gastos. ¡Descubre cómo dominar tus finanzas!',
    options: ['Volver al Inicio'],
    action: 'plantilla-gastos',
    autoClose: true,
  },
  'Ver Plantilla de Hábitos': {
    text: '¡Excelente! Te llevo directamente a la página de la plantilla de Rastreo de Hábitos. ¡Mejora tus hábitos diarios!',
    options: ['Volver al Inicio'],
    action: 'plantilla-habitos',
    autoClose: true,
  },
  'Ver Página Académica': {
    text: '¡Perfecto! Te llevo a la página dedicada al servicio académico. ¡Descubre cómo puedo ayudarte con tus trabajos!',
    options: ['Volver al Inicio'],
    action: 'apoyo-academico',
    autoClose: true,
  },
  'Ver Página Clases': {
    text: '¡Genial! Te llevo a la página de clases de programación personalizadas. ¡Aprende a programar de manera efectiva!',
    options: ['Volver al Inicio'],
    action: 'clases-programacion',
    autoClose: true,
  },
  'Ver Página Venta': {
    text: '¡Excelente! Te llevo a la página de venta de garaje en línea. ¡Descubre cómo vender tus productos online!',
    options: ['Volver al Inicio'],
    action: 'ventas-online',
    autoClose: true,
  },
  'Ver Página CV': {
    text: '¡Perfecto! Te llevo a la página de asesoría para crear tu CV. ¡Destaca en el mercado laboral!',
    options: ['Volver al Inicio'],
    action: 'optimizacion-cv',
    autoClose: true,
  },
  'Volver a Servicios': {
    text: '¡Perfecto! ¿Te gustaría conocer más sobre nuestros servicios principales o adicionales?',
    options: ['Desarrollo Web', 'Marketing Digital', 'Servicios Adicionales', 'Contacto'],
  },
  'Ver Canal de YouTube': {
    text: '¡Excelente! Te llevo al canal de YouTube de Juan Pablo para que conozcas más sobre sus servicios y proyectos.',
    options: ['Volver al Inicio'],
    action: 'youtube',
  },
  'Enviar Email': {
    text: 'Te abro el email para que puedas escribir directamente. Juan Pablo responde en menos de 24 horas.',
    options: ['Volver al Inicio'],
    action: 'email',
    autoClose: true,
  },
  'Más Información': {
    text: '¿Qué más te gustaría saber? Puedo contarte sobre:\n\n• Proyectos realizados\n• Experiencia profesional\n• Certificaciones\n• Métodos de pago\n• Trabajo internacional',
    options: ['Servicios', 'Háblame de Juan Pablo', 'Contacto'],
  },
  'Ver Ejemplos': {
    text: 'Juan Pablo tiene diversos proyectos visuales:\n\n• Desarrollo web (landing pages, e-commerce, corporativos)\n• Marketing digital (campañas, redes, contenido)\n• Automatización con IA\n\nPuedes ver ejemplos visuales en sus redes sociales y canal de YouTube.',
    options: ['Ver Redes Sociales', 'Ver Canal de YouTube', 'Desarrollo Web', 'Marketing Digital', 'Contacto'],
  },
  'Háblame de Juan Pablo': {
    text: 'Juan Pablo es desarrollador web full-stack y experto en performance marketing. Experiencia en React, Python (IA), y marketing digital. Trabaja con clientes en toda LATAM desde Colombia. Certificado en múltiples tecnologías y metodologías.',
    options: ['Ver Tecnologías', 'Servicios', 'Contacto'],
  },
  'Volver al Inicio': {
    text: '¡Perfecto! ¿Hay algo más en lo que pueda ayudarte?',
    options: ['Servicios', 'Desarrollo Web', 'Marketing Digital', 'Contacto', 'Preguntas Frecuentes', 'Enviar mensaje'],
  },
  'Preguntas Frecuentes': {
    text: 'Aquí van algunas preguntas frecuentes:\n\n• ¿Trabajas con clientes internacionales? Sí, en toda LATAM.\n• ¿Ofreces mantenimiento? Sí, planes disponibles.\n• ¿Qué métodos de pago aceptas? Transferencia, PayPal, cripto.\n\n¿Cuál te gustaría profundizar?',
    options: ['Mantenimiento', 'Pagos', 'Contacto'],
  },
  'Mantenimiento': {
    text: 'Planes de mantenimiento:\n\n• Básico: Actualizaciones menores\n• Premium: Soporte completo, backups\n• Anual: Descuento disponible\n\nGarantiza que tu sitio esté siempre actualizado.',
    options: ['Preguntas Frecuentes', 'Contacto'],
  },
  'Pagos': {
    text: 'Aceptamos:\n\n• Transferencias bancarias\n• PayPal\n• Mercado Pago\n• Criptomonedas (USDT, BTC)\n\n50% anticipo, 50% al finalizar.',
    options: ['Preguntas Frecuentes', 'Contacto'],
  },
  'Compartir esta Web': {
    text: '¡Perfecto! Abre el modal de compartir para que puedas compartir este portafolio con un amigo. ¡Gracias por ayudar a difundir mi trabajo!',
    options: ['Volver al Inicio'],
    action: 'share',
    autoClose: true,
  },
  'Enviar mensaje': {
    text: 'Te llevo al formulario de contacto para que puedas enviar tu mensaje directamente.',
    options: ['Volver al Inicio'],
    action: 'contact',
    autoClose: true,
  },
}

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

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
      <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z" />
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

const initialMessage: Message = {
  role: 'assistant',
  content: '¡Hola! Soy el asistente programado de Juan Pablo. ¿En qué puedo ayudarte hoy?',
  options: ['Servicios', 'Desarrollo Web', 'Marketing Digital', 'IA Local', 'Contacto', 'Servicios Adicionales', 'Preguntas Frecuentes'],
}

export default function Chatbot({
  onShare,
  onScrollToContact,
  onScrollToFooter,
  onNavigateToPage,
  forceOpen = false,
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setMessages([initialMessage])
    }
    return () => {
      document.body.style.overflow = ''
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const handleOptionClick = useCallback(async (option: string) => {
    if (isLoading) return

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (option === 'Reiniciar Chat') {
      setMessages([initialMessage])
      return
    }

    const userMessage: Message = { role: 'user', content: option }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 600))

    const response = responses[option]
    if (response) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
        options: response.options,
      }
      setMessages(prev => [...prev, assistantMessage])

      const action = response.action
      if (action) {
        setTimeout(() => {
          switch (action) {
            case 'email':
              window.open('mailto:contact.juannppgd@gmail.com?subject=Consulta%20desde%20el%20chatbot&body=Hola%20Juan%20Pablo,%0A%0AMe%20contacto%20desde%20tu%20portfolio%20web.', '_blank')
              break
            case 'whatsapp':
              window.open('https://wa.me/573219541241?text=Hola%20Juan%20Pablo,%20me%20contacto%20desde%20tu%20portfolio%20web.', '_blank')
              break
            case 'youtube':
              window.open('https://www.youtube.com/@juannppgd', '_blank')
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
  }, [isLoading, onShare, onScrollToContact, onScrollToFooter, onNavigateToPage])

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
          aria-label="Abrir chatbot"
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
                      Asistente Juan Pablo
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                      <span className="text-xs" style={{ color: 'var(--accent2)' }}>En línea</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ color: 'var(--muted)' }}
                  aria-label="Cerrar chatbot"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              <div
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
                      {msg.options && (
                        <div
                          className="flex flex-wrap gap-2 mt-3 pt-3"
                          style={{ borderTop: '1px solid var(--border)' }}
                        >
                          {msg.options.map((option, optIndex) => (
                            <motion.button
                              key={optIndex}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleOptionClick(option)}
                              disabled={isLoading}
                              className="px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                              style={{
                                background: 'rgba(79, 127, 255, 0.12)',
                                color: 'var(--accent)',
                                border: '1px solid var(--accent)',
                              }}
                            >
                              {option}
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
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>Escribiendo</span>
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
                  Asistente programado por{' '}
                  <span style={{ color: 'var(--accent)' }} className="font-semibold">Juan Pablo</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOptionClick('Reiniciar Chat')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  aria-label="Reiniciar chat"
                >
                  Reiniciar
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
