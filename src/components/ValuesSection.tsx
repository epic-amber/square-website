import type { CSSProperties } from 'react'
import styles from './ValuesSection.module.css'
import { useReveal } from '../hooks/useReveal'
import iconCommunication from '../assets/icon-open-communication.svg'
import iconExpectations from '../assets/icon-exceed-expectations.svg'
import iconGlobal from '../assets/icon-act-global.svg'
import iconLearning from '../assets/icon-continuous-learning.svg'

interface ValueItem {
  icon: string
  title: string
  description: string
}

const VALUES: ValueItem[] = [
  {
    icon: iconCommunication,
    title: 'Open Communication',
    description: 'Fostering transparent dialogue and honest feedback across all levels',
  },
  {
    icon: iconExpectations,
    title: 'Exceed Expectations',
    description: 'Going beyond what\'s expected to deliver exceptional results',
  },
  {
    icon: iconGlobal,
    title: 'Act Global',
    description: 'Thinking globally and embracing diverse perspectives worldwide',
  },
  {
    icon: iconLearning,
    title: 'Continuous Learning',
    description: 'Constantly growing, adapting, and improving our skills and knowledge',
  },
]

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

        <h2 className={styles.title}>What drives us every day</h2>
      </div>

      <div className={styles.grid}>
        {VALUES.map((v, i) => (
          <article
            key={v.icon}
            className={`${styles.card} ${rc}`}
            style={s(80 + i * 80)}
          >
            <div className={styles.iconWrap}>
              <img src={v.icon} alt="" width={64} height={64} />
            </div>
            <h3 className={styles.cardTitle}>{v.title}</h3>
            <p className={styles.cardDesc}>{v.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
