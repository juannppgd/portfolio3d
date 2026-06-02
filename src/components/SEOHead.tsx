import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://juanpablogd.com'
const BASE = ''
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`

interface SEOHeadProps {
  title: string
  description: string
  path?: string
  ogImage?: string
  ogType?: string
  keywords?: string
}

export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords,
}: SEOHeadProps) {
  const fullUrl = `${SITE_URL}${BASE}${path}`
  const fullTitle = `${title} | Juan Pablo Gutiérrez`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
