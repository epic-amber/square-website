import type { CSSProperties } from 'react'
import styles from './ValuesSection.module.css'
import { useReveal } from '../hooks/useReveal'
import iconCommunication from '../assets/icon-open-communication.svg'
import iconExpectations from '../assets/icon-exceed-expectations.svg'
import iconGlobal from '../assets/icon-act-global.svg'
import iconLearning from '../assets/icon-continuous-learning.svg'
import aboutContent from '../content/about.json'

const VALUE_ICONS: Record<string, string> = {
  communication: iconCommunication,
  expectations: iconExpectations,
  global: iconGlobal,
  learning: iconLearning,
}

export function ValuesSection() {
  const { ref, visible } = useReveal(0.15)
  const rc = `reveal${visible ? ' reveal--in' : ''}`
  const s = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` })

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.heading} ${rc}`}
        style={s(0)}
      >

        <h2 className={styles.title}>{aboutContent.values.title}</h2>
      </div>

      <div className={styles.grid}>
        {aboutContent.values.items.map((v, i) => (
          <article
            key={v.key}
            className={`${styles.card} ${rc}`}
            style={s(80 + i * 80)}
          >
            <div className={styles.iconWrap}>
              <img src={VALUE_ICONS[v.key]} alt="" width={64} height={64} />
            </div>
            <h3 className={styles.cardTitle}>{v.title}</h3>
            <p className={styles.cardDesc}>{v.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
