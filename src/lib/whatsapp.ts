import { WHATSAPP_USERNAME } from './constants'

export const wa = (msg: string): string =>
  `https://wa.me/${WHATSAPP_USERNAME}?text=${encodeURIComponent(msg)}`
