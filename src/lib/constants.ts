export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://juanpablogd.com'

export const WHATSAPP_USERNAME = import.meta.env.VITE_WHATSAPP_USERNAME || 'juannppgd'

export const GA_ID = 'G-DY35DM1SRJ'

export const EMAILJS = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_s5qyr4s',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'gUsdYXpB3K94QxqYM',
  TEMPLATE_AUTO_REPLY: 'template_oyoptw3',
  TEMPLATE_NOTIFICATION: 'template_1hbf3wn',
} as const

export const SOCIAL = {
  LINKEDIN: 'https://www.linkedin.com/in/juannppgd',
  INSTAGRAM: 'https://www.instagram.com/juannppgd',
  YOUTUBE: 'https://www.youtube.com/@juannppgd',
} as const

export const CONTACT_EMAIL = 'contact.juannppgd@gmail.com'
