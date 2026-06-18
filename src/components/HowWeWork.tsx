import { Link } from 'react-router-dom'
import styles from './HowWeWork.module.css'
import { useReveal } from '../hooks/useReveal'
import workplaceTeam from '../assets/workplace-team.png'

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
            src={workplaceTeam}
            alt="SquareGPS team collaborating"
            className={styles.image}
          />
        </div>

        {/* Right: text */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2 className={styles.title}>Built for collaboration, driven by purpose</h2>
          <p className={styles.body}>
            We embrace agile methodologies and foster a culture of continuous improvement. Our distributed teams collaborate seamlessly across time zones, united by shared goals and passion for innovation.
          </p>

          <div className={styles.pillRow}>
            <span className={styles.pill}>Agile</span>
            <span className={styles.pill}>Remote-first</span>
            <span className={styles.pill}>Continuous improvement</span>
          </div>

          <Link to="/careers" className={styles.joinLink}>
            <span>Join our team</span>
            <span className={styles.joinArrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
