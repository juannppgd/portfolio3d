import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'es'

  const toggle = () => {
    const next = current === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
    document.documentElement.lang = next === 'en' ? 'en' : 'es'
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold font-syne uppercase tracking-wider transition-colors duration-200"
      style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.color = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--muted)'
      }}
      aria-label={t('languageToggle.ariaLabel')}
      title={t('languageToggle.title')}
    >
      {current === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
