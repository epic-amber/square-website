import styles from './MissionSection.module.css'
import { useReveal } from '../hooks/useReveal'
import { figmaAssets } from '../figmaAssets'

export function MissionSection() {
  const { ref, visible } = useReveal(0.2)

  return (
    <section className={styles.section}>
      <div className={styles.decorLayer} aria-hidden>
        <img src={figmaAssets.iconLocation}   className={`${styles.di} ${styles.diLoc}`}   width={44} alt="" />
        <img src={figmaAssets.iconTelematics} className={`${styles.di} ${styles.diTel}`}   width={88} alt="" />
        <img src={figmaAssets.iconCode}       className={`${styles.di} ${styles.diCode}`}  width={75} alt="" />
        <img src={figmaAssets.iconGlobe}      className={`${styles.di} ${styles.diGlobe}`} width={64} alt="" />
        <img src={figmaAssets.iconNvx}        className={`${styles.di} ${styles.diNvx}`}   width={46} alt="" />
        <img src={figmaAssets.iconSam}        className={`${styles.di} ${styles.diSam}`}   width={80} alt="" />
        <img src={figmaAssets.iconQuerry}      className={`${styles.di} ${styles.diJose}`}  width={55} alt="" />
      </div>
      <div
        ref={ref}
        className={`${styles.content} reveal ${visible ? 'reveal--in' : ''}`}
      >
        <p className={styles.eyebrow}>Our Mission</p>
        <p className={styles.text}>
          Our mission is to help companies simplify mobile operations through real-time data, digital workflows, and automation.
        </p>
      </div>
    </section>
  )
}
