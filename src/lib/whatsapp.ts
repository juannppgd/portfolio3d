const WHATSAPP_NUMBER = '573219541241'

export const wa = (msg: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
