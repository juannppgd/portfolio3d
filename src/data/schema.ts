import { SITE_URL } from '../lib/constants'
const BASE = ''

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
    'https://www.linkedin.com/in/juannppgd',
    'https://www.instagram.com/juannppgd',
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
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: SITE_URL + BASE + path,
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

export function itemListSchema(items: { name: string; url: string }[], itemType: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': itemType,
        name: item.name,
        url: item.url,
      },
    })),
  }
}
