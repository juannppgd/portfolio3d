import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://juanpablogutierrez.space'
const BASE = '/portfolio3d'
const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`

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
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="180" />
      <meta property="og:image:height" content="180" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
