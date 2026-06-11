import styles from './MissionSection.module.css'
import { useReveal } from '../hooks/useReveal'

export function MissionSection() {
  const { ref, visible } = useReveal(0.2)

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.content} reveal ${visible ? 'reveal--in' : ''}`}
      >
        <p className={styles.eyebrow}>Our Mission</p>
        <p className={styles.text}>
          Transforming enterprise mobility and empowering companies with real-time data, digital workflow and automated business operations
        </p>
      </div>
    </section>
  )
}
