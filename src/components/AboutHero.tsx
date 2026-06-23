import { useEffect, useState } from 'react'
import styles from './AboutHero.module.css'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'

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

        {/* Right: two overlapping media cards */}
        <div className={styles.imgGroup} aria-hidden>
          {/* photo-02 — looping video, background layer (top-right) */}
          <div className={`${styles.slot} ${styles.photo2}`}>
            <video
              className={styles.media}
              src="/about-hero-02.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          {/* photo-01 — photo, foreground layer (bottom-left) */}
          <div className={`${styles.slot} ${styles.photo1}`}>
            <img
              className={styles.media}
              src="/about-hero-01.png"
              alt="Team member at conference"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
