import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube,
  FaTelegram, FaPinterest, FaSnapchat, FaDiscord, FaWhatsapp,
  FaShareAlt,
} from 'react-icons/fa'
import { SiX, SiKick, SiThreads } from 'react-icons/si'
import FadeIn from './FadeIn'
import { SOCIAL_LINKS_FULL } from '../data'

type IconComponent = React.ComponentType<{ className?: string; size?: number }>

const SOCIAL_ICONS: Record<string, IconComponent> = {
  FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube,
  FaTelegram, FaPinterest, FaSnapchat, FaDiscord, FaWhatsapp,
  SiX, SiKick, SiThreads,
}

const SOCIAL_COLORS: Record<string, string> = {
  Facebook: '#1877F2',
  Instagram: '#E4405F',
  LinkedIn: '#0A66C2',
  X: 'var(--text)',
  TikTok: 'var(--text)',
  YouTube: '#FF0000',
  Telegram: '#26A5E4',
  Pinterest: '#BD081C',
  Snapchat: '#FFFC00',
  Kick: '#53FC18',
  Discord: '#5865F2',
  Threads: 'var(--text)',
  WhatsApp: '#25D366',
}

const SOCIAL_BG: Record<string, string> = {
  Facebook: 'rgba(24,119,242,0.1)',
  Instagram: 'rgba(228,64,95,0.1)',
  LinkedIn: 'rgba(10,102,194,0.1)',
  X: 'rgba(0,0,0,0.08)',
  TikTok: 'rgba(0,0,0,0.08)',
  YouTube: 'rgba(255,0,0,0.1)',
  Telegram: 'rgba(38,165,228,0.1)',
  Pinterest: 'rgba(189,8,28,0.1)',
  Snapchat: 'rgba(255,252,0,0.15)',
  Kick: 'rgba(83,252,24,0.1)',
  Discord: 'rgba(88,101,242,0.1)',
  Threads: 'rgba(0,0,0,0.08)',
  WhatsApp: 'rgba(37,211,102,0.1)',
}

interface FooterProps {
  onShareClick?: () => void
}

export default function Footer({ onShareClick }: FooterProps) {
  const { t } = useTranslation()
  return (
    <footer id="footer"
      className="px-6 md:px-12 pt-12 md:pt-10 lg:pt-12 pb-8 relative z-30"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Top: centrado */}
        <div className="text-center mb-10 md:mb-8 lg:mb-10">
          <FadeIn y={15}>
            <h3
              className="font-syne font-black uppercase leading-none tracking-tight mb-4 break-words"
              style={{ fontSize: 'clamp(22px,4.5vw,40px)', color: 'var(--white)', maxWidth: '90vw', margin: '0 auto' }}
            >
              {t('footer.heading')}
              <span className="gradient-heading">{t('footer.headingHighlight')}</span>
            </h3>
            <p className="font-mono text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
              {t('footer.subtitle')}
            </p>
          </FadeIn>

          {/* Social grid centrado */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-w-2xl mx-auto">
            {SOCIAL_LINKS_FULL.map((s, i) => {
              const brandColor = SOCIAL_COLORS[s.name] || 'var(--accent)'
              const brandBg = SOCIAL_BG[s.name] || 'rgba(79,127,255,0.08)'
              return (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t('footer.socialAriaLabel', { name: s.name })}
                  className="group relative flex flex-col items-center gap-1.5 p-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    overflow: 'hidden',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget
                    card.style.borderColor = brandColor
                    card.style.background = brandBg
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget
                    card.style.borderColor = 'var(--border)'
                    card.style.background = 'transparent'
                  }}
                >
                  {/* Brand icon */}
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: brandBg, color: brandColor }}
                  >
                    {(() => {
                      const Ic = s.icon ? SOCIAL_ICONS[s.icon] : null
                      return Ic ? <Ic size={18} /> : <span className="text-xs font-syne font-black uppercase">{s.name[0]}</span>
                    })()}
                  </div>
                  <span
                    className="font-syne font-bold text-xs uppercase tracking-tight transition-colors duration-300"
                    style={{ color: 'var(--white)' }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase transition-colors duration-300"
                    style={{ color: 'var(--muted)' }}
                  >
                    {s.cat}
                  </span>
                </motion.a>
              )
            })}

            {/* Compartir */}
            <motion.button
              onClick={onShareClick}
              aria-label={t('footer.shareAriaLabel')}
              className="group relative flex flex-col items-center gap-1.5 p-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid var(--border)',
                background: 'transparent',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: SOCIAL_LINKS_FULL.length * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'rgba(79,127,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(79,127,255,0.1)', color: 'var(--accent)' }}
              >
                <FaShareAlt size={18} />
              </div>
              <span
                className="font-syne font-bold text-xs uppercase tracking-tight transition-colors duration-300"
                style={{ color: 'var(--white)' }}
              >
                {t('footer.shareLabel')}
              </span>
              <span
                className="font-mono text-[9px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'var(--muted)' }}
              >
                {t('footer.shareSublabel')}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Middle: dos columnas */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-8 md:mb-6 lg:mb-8">
          {/* Left: crédito */}
          <FadeIn y={15}>
            <p
              className="font-mono font-light leading-relaxed text-sm"
              style={{ color: 'var(--muted)' }}
            >
              {t('footer.credit')}
              <strong className="font-syne font-bold" style={{ color: 'var(--text)' }}>{t('footer.creditName')}</strong>
              {t('footer.creditDesc')}
            </p>
          </FadeIn>

          {/* Right: métodos de pago */}
          <div>
            <FadeIn y={15}>
              <span className="font-mono text-[10px] tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                {t('footer.paymentLabel')}
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {(t('footer.paymentMethods', { returnObjects: true }) as string[]).map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--surface)', color: 'var(--accent)', border: '1px solid var(--border)' }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 mt-3">
                {['about', 'services', 'skills', 'contact'].map((key, i) => {
                  const href = key === 'about' ? '#about' : key === 'skills' ? '#conocimientos' : `#${key === 'services' ? 'servicios' : key === 'contact' ? 'contacto' : key}`
                  return (
                  <a
                    key={key}
                    href={href}
                    className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-200 hover:text-accent"
                    style={{ color: 'var(--muted)' }}
                  >
                    {i > 0 && <span className="mr-3" style={{ color: 'var(--border)' }}>/</span>}
                    {t('nav.' + key)}
                  </a>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <span className="font-mono text-xs tracking-widest text-center sm:text-left" style={{ color: 'var(--muted)' }}>
            {t('footer.copyright')}
          </span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a
              href="mailto:contact.juannppgd@gmail.com"
              className="font-mono text-xs tracking-widest transition-colors duration-200 hover:text-accent"
              style={{ color: 'var(--muted)' }}
            >
              contact.juannppgd@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
