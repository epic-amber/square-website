import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(root, 'src/assets/assets-manifest.json')
const { assets, public: pub } = JSON.parse(readFileSync(manifestPath, 'utf8'))

let errors = 0
for (const { path: p } of assets) {
  const full = join(root, 'src/assets', p)
  if (!existsSync(full)) {
    console.error(`Missing: src/assets/${p}`)
    errors++
  }
}
for (const { path: p } of pub) {
  const full = join(root, p)
  if (!existsSync(full)) {
    console.error(`Missing: ${p}`)
    errors++
  }
}

if (errors) {
  process.exit(1)
}
console.log(`OK: ${assets.length} src/assets + ${pub.length} public file(s) present.`)
