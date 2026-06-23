import styles from './HowWeWork.module.css'
import { useReveal } from '../hooks/useReveal'
import aboutCollaboration from '../assets/about-collaboration.png'

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
            alt="SquareGPS team collaborating"
            className={styles.image}
          />
        </div>

        {/* Right: text */}
        <div className={styles.copy}>

          <h2 className={styles.title}>Built for collaboration, driven by purpose</h2>
          <p className={styles.body}>
            We embrace agile methodologies and foster a culture of continuous improvement. Our distributed teams collaborate seamlessly across time zones, united by shared goals and passion for innovation.
          </p>

        </div>
      </div>
    </section>
  )
}
