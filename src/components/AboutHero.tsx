import { useEffect, useState } from 'react'
import styles from './AboutHero.module.css'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'

function PhotoPlaceholder() {
  return (
    <div className={styles.photoPlaceholder} aria-hidden>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="10" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 30l9-8 6 5 8-9 9 11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
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
      <div className={styles.waveWrap}>
        <BrandWaveBackdrop />
      </div>
      <div className={`${styles.inner} reveal ${visible ? 'reveal--in' : ''}`}>
        {/* Left: text column */}
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>About the company</p>
          <h1 className={styles.title}>
            We're shaping the future of telematics solutions
          </h1>
          <p className={styles.subtitle}>
            SquareGPS connects people, vehicles, and data through smart telematics solutions.
            Since 2005, we've helped companies around the world improve visibility, streamline
            operations, and make better decisions with reliable, intuitive software.
          </p>
        </div>

        {/* Right: two overlapping photo cards (Figma node 282:97) */}
        <div className={styles.imgGroup} aria-hidden>
          {/* photo-02 — large card, background layer (top-right) */}
          <div className={`${styles.slot} ${styles.photo2}`}>
            <PhotoPlaceholder />
          </div>
          {/* photo-01 — smaller card, foreground layer (bottom-left) */}
          <div className={`${styles.slot} ${styles.photo1}`}>
            <PhotoPlaceholder />
          </div>
        </div>
      </div>
    </section>
  )
}
