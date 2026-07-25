import { WHATSAPP_PHONE } from './constants'

export const wa = (msg: string): string =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`
