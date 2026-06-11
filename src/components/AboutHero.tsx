import { useEffect, useState } from 'react'
import styles from './AboutHero.module.css'

const HERO_PHOTOS = [
  { id: 1, alt: 'SquareGPS team photo 1', shift: 20, flex: 1.15, ratio: '5 / 3' },
  { id: 2, alt: 'SquareGPS team photo 2', shift: -12, flex: 0.8, ratio: '1 / 1' },
  { id: 3, alt: 'SquareGPS team photo 3', shift: 20, flex: 1.0, ratio: '4 / 3' },
  { id: 4, alt: 'SquareGPS team photo 4', shift: -12, flex: 0.85, ratio: '5 / 4' },
]

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className={styles.photoPlaceholder} aria-hidden>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 24l7-6 5 4 6-7 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className={styles.photoLabel}>{label}</span>
    </div>
  )
}

export function AboutHero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={`${styles.content} reveal ${visible ? 'reveal--in' : ''}`}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            Founded in 2005, we unite people and technology — building the world's most trusted telematics solutions across 134+ countries.
          </p>
        </div>
      </div>

      <div className={`${styles.photoStrip} reveal ${visible ? 'reveal--in' : ''}`}>
        {HERO_PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            className={styles.photoSlot}
            style={{
              transitionDelay: `${120 + i * 60}ms`,
              transform: `translateY(${photo.shift}px)`,
              flex: photo.flex,
              aspectRatio: photo.ratio,
            }}
          >
            <PhotoPlaceholder label={`Photo ${photo.id}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
