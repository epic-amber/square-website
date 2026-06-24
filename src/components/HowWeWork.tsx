import styles from './HowWeWork.module.css'
import { useReveal } from '../hooks/useReveal'
import aboutCollaboration from '../assets/about-collaboration.png'
import aboutContent from '../content/about.json'
import mediaContent from '../content/media.json'

export function HowWeWork() {
  const { ref, visible } = useReveal(0.15)

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.inner} reveal ${visible ? 'reveal--in' : ''}`}
      >
        {/* Left: image */}
        <div className={styles.imageWrap}>
          <img
            src={aboutCollaboration}
            alt={mediaContent.aboutCollaboration.alt}
            className={styles.image}
          />
        </div>

        {/* Right: text */}
        <div className={styles.copy}>

          <h2 className={styles.title}>{aboutContent.howWeWork.title}</h2>
          <p className={styles.body}>
            {aboutContent.howWeWork.body}
          </p>

        </div>
      </div>
    </section>
  )
}
