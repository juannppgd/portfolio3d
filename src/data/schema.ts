const SITE_URL = 'https://juanpablogutierrez.space'
const BASE = '/portfolio3d'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Juan Pablo Gutiérrez Díaz',
  givenName: 'Juan Pablo',
  familyName: 'Gutiérrez Díaz',
  jobTitle: 'Desarrollador Web & Marketing Digital',
  description: 'Desarrollo web, Automatización & Marketing digital para profesionales, emprendedores y Pymes que quieren crecer en Internet.',
  url: SITE_URL + BASE,
  image: SITE_URL + '/apple-touch-icon.png',
  sameAs: [
    'https://www.linkedin.com/in/juanpablogutierrez',
    'https://www.instagram.com/juanpablogutierrez',
    'https://www.facebook.com/juannppgd',
    'https://x.com/juannppgd',
  ],
  knowsAbout: [
    'Desarrollo Web',
    'Marketing Digital',
    'React',
    'JavaScript',
    'Python',
    'SEO',
    'Automatización',
    'Inteligencia Artificial',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tunja',
    addressRegion: 'Boyacá',
    addressCountry: 'CO',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Juan Pablo Gutiérrez — Dev & Marketing Digital',
  url: SITE_URL + BASE,
  description: 'Desarrollo web, Automatización & Marketing digital para profesionales, emprendedores y Pymes.',
  inLanguage: 'es-CO',
}

export function professionalServiceSchema(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: title,
    description,
    url: SITE_URL + BASE + path,
    provider: {
      '@type': 'Person',
      name: 'Juan Pablo Gutiérrez Díaz',
    },
    areaServed: ['CO', 'LATAM', 'ES'],
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: SITE_URL + BASE + path },
  }
}

export function productSchema(
  name: string,
  description: string,
  price: string,
  priceCurrency: string = 'USD',
  path: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: SITE_URL + '/apple-touch-icon.png',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: SITE_URL + BASE + path,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
  }
}

export function faqPageSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
