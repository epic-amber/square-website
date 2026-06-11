import type { CSSProperties } from 'react'
import styles from './TeamPhotoGrid.module.css'
import { useReveal } from '../hooks/useReveal'

/* 6 bento slots — replace inner content with <img src={...} alt="" /> when photos ready */
const BENTO_PHOTOS = [
  { id: 'main', area: 'main' },
  { id: 'topRight', area: 'topRight' },
  { id: 'midRight', area: 'midRight' },
  { id: 'bottomLeft', area: 'bottomLeft' },
  { id: 'bottomMid', area: 'bottomMid' },
  { id: 'bottomRight', area: 'bottomRight' },
] as const

function PhotoPlaceholder() {
  return (
    <div className={styles.placeholder} aria-hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="10" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 30l8-7 6 5 7-8 9 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function TeamPhotoGrid() {
  const { ref, visible } = useReveal(0.1)
  const rc = `reveal${visible ? ' reveal--in' : ''}`
  const s = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` })

  return (
    <section className={styles.section}>
      <div ref={ref} className={`${styles.heading} ${rc}`} style={s(0)}>
        <h2 className={styles.title}>Our Team</h2>
        <p className={styles.subtitle}>
          Meet the people behind SquareGPS — passionate experts building the future of telematics together
        </p>
      </div>

      <div className={styles.bento}>
        {BENTO_PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className={`${styles.cell} ${styles[photo.area]} ${rc}`}
            style={s(80 + i * 70)}
          >
            <PhotoPlaceholder />
          </div>
        ))}
      </div>
    </section>
  )
}
