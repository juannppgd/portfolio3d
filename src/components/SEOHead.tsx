import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://juanpablogd.com'
const BASE = ''
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

interface SEOHeadProps {
  title: string
  description: string
  path?: string
  ogImage?: string
  ogType?: string
  keywords?: string
  noindex?: boolean
}

export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords,
  noindex,
}: SEOHeadProps) {
  const { i18n } = useTranslation()
  const fullUrl = `${SITE_URL}${BASE}${path}`
  const fullTitle = `${title} | Juan Pablo Gutiérrez`
  const currentLang = i18n.language?.split('-')[0] || 'es'
  const altLang = currentLang === 'es' ? 'en' : 'es'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hrefLang={currentLang} href={fullUrl} />
      <link rel="alternate" hrefLang={altLang} href={`${SITE_URL}${BASE}${path}?lang=${altLang}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${BASE}${path}`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={currentLang === 'es' ? 'es_CO' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@juannppgd" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
