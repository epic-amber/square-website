import { useEffect, useState } from 'react'
import styles from './AboutHero.module.css'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'
import aboutContent from '../content/about.json'
import mediaContent from '../content/media.json'

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
          <p className={styles.eyebrow}>{aboutContent.hero.eyebrow}</p>
          <h1 className={styles.title}>
            {aboutContent.hero.title}
          </h1>
          <p className={styles.subtitle}>
            {aboutContent.hero.subtitle}
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
              alt={mediaContent.aboutHeroPhoto.alt}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
