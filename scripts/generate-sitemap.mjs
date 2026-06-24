/**
 * Generates sitemap.xml in the build output directory.
 *
 * Reads static routes and dynamic job pages from src/content/jobs.json,
 * then writes a standards-compliant sitemap to dist/sitemap.xml.
 *
 * Can be called standalone (`node scripts/generate-sitemap.mjs`)
 * or from the Vite closeBundle hook.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SITE_URL = process.env.VITE_SITE_URL || 'https://squaregps.com'

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.8', changefreq: 'weekly' },
]

export function generateSitemap(outDir) {
  const distDir = outDir || resolve(ROOT, 'dist')

  const jobsPath = resolve(ROOT, 'src/content/jobs.json')
  const jobs = JSON.parse(readFileSync(jobsPath, 'utf-8'))

  const today = new Date().toISOString().split('T')[0]

  const urls = [
    ...STATIC_ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    ),
    ...jobs.map(
      (job) =>
        `  <url>\n    <loc>${SITE_URL}/careers/${encodeURIComponent(job.id)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    ),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }

  const outPath = resolve(distDir, 'sitemap.xml')
  writeFileSync(outPath, xml, 'utf-8')
  console.log(`✓ sitemap.xml generated (${STATIC_ROUTES.length + jobs.length} URLs) → ${outPath}`)
}

// Allow standalone execution
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
if (isMain) {
  generateSitemap()
}
