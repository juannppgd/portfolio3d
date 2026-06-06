import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(process.cwd())
const seoFile = path.join(ROOT, 'src', 'data', 'pageSeo.ts')
const outputFile = path.join(ROOT, 'public', 'sitemap.xml')
const SITE_URL = process.env.VITE_SITE_URL || 'https://juanpablogd.com'

const source = fs.readFileSync(seoFile, 'utf8')
const paths = Array.from(source.matchAll(/path\s*:\s*['\"]([^'\"]+)['\"]/g))
  .map((match) => match[1])
  .filter(Boolean)
  .reduce((unique, path) => {
    if (!unique.includes(path)) unique.push(path)
    return unique
  }, [])

if (!paths.includes('/')) {
  paths.unshift('/')
}

const now = new Date().toISOString()
const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]

for (const pathValue of paths) {
  const location = `${SITE_URL}${pathValue}`
  const changefreq = pathValue === '/' ? 'weekly' : 'monthly'
  const priority = pathValue === '/' ? '1.0' : '0.8'

  lines.push('  <url>')
  lines.push(`    <loc>${location}</loc>`)
  lines.push(`    <lastmod>${now}</lastmod>`)
  lines.push(`    <changefreq>${changefreq}</changefreq>`)
  lines.push(`    <priority>${priority}</priority>`)
  lines.push('  </url>')
}

lines.push('</urlset>')
fs.writeFileSync(outputFile, lines.join('\n'), 'utf8')
console.log(`Generated sitemap with ${paths.length} entries: ${outputFile}`)
