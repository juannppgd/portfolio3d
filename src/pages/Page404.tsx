import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import SEOHead from '../components/SEOHead'

export default function Page404() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <SEOHead title={t('page404.title')} description={t('page404.description')} noindex />
      <div className="text-center max-w-md">
        <FadeIn>
          <h1
            className="font-syne font-black uppercase mb-4 gradient-heading"
            style={{ fontSize: 'clamp(48px,10vw,96px)' }}
          >
            404
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-mono text-sm mb-8" style={{ color: 'var(--muted)' }}>
            {t('page404.description')}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <button
            onClick={() => navigate('/')}
            className="font-syne font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: 'var(--on-accent)',
            }}
          >
            {t('page404.cta')}
          </button>
        </FadeIn>
      </div>
    </main>
  )
}
