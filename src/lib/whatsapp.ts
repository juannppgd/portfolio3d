import { WHATSAPP_NUMBER } from './constants'

export const wa = (msg: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
