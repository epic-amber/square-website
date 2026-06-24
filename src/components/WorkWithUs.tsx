import { Link } from 'react-router-dom'
import styles from './WorkWithUs.module.css'
import { useReveal } from '../hooks/useReveal'
import { figmaAssets } from '../figmaAssets'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'
import aboutPresentation from '../assets/about-presentation.png'
import aboutContent from '../content/about.json'
import mediaContent from '../content/media.json'

export function WorkWithUs() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section className={styles.section}>
      <div className={styles.waveWrap} aria-hidden>
        <BrandWaveBackdrop />
      </div>
      <div
        ref={ref}
        className={`${styles.inner} reveal ${visible ? 'reveal--in' : ''}`}
      >
        {/* Left: text */}
        <div className={styles.copy}>
          <h2 className={styles.title}>{aboutContent.workWithUs.title}</h2>
          <p className={styles.body}>
            {aboutContent.workWithUs.body}
          </p>
          <Link to="/careers" className={styles.ctaButton}>
            <span>{aboutContent.workWithUs.cta}</span>
            <img
              src={figmaAssets.arrowForward}
              alt=""
              aria-hidden
              width={20}
              height={20}
              className={styles.ctaArrow}
            />
          </Link>
        </div>

        {/* Right: image */}
        <div className={styles.imageWrap}>
          <img
            src={aboutPresentation}
            alt={mediaContent.aboutPresentation.alt}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  )
}
