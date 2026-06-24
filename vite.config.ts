import { defineConfig, type Plugin } from 'vite'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      const siteUrl = process.env.VITE_SITE_URL || 'https://squaregps.com'
      const distDir = resolve(__dirname, 'dist')
      const jobsPath = resolve(__dirname, 'src/content/jobs.json')
      const jobs: { id: string }[] = JSON.parse(readFileSync(jobsPath, 'utf-8'))
      const today = new Date().toISOString().split('T')[0]

      const staticRoutes = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/about', priority: '0.8', changefreq: 'monthly' },
        { path: '/careers', priority: '0.8', changefreq: 'weekly' },
      ]

      const urls = [
        ...staticRoutes.map(
          (r) =>
            `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
        ),
        ...jobs.map(
          (job) =>
            `  <url>\n    <loc>${siteUrl}/careers/${encodeURIComponent(job.id)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
        ),
      ]

      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
      ].join('\n')

      if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
      writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf-8')
      console.log(`✓ sitemap.xml generated (${staticRoutes.length + jobs.length} URLs)`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
