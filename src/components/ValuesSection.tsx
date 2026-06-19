import type { CSSProperties } from 'react'
import styles from './ValuesSection.module.css'
import { useReveal } from '../hooks/useReveal'

interface ValueItem {
  icon: string
  title: string
  description: string
}

const VALUES: ValueItem[] = [
  {
    icon: 'communication',
    title: 'Open Communication',
    description: 'Fostering transparent dialogue and honest feedback across all levels',
  },
  {
    icon: 'expectations',
    title: 'Exceed Expectations',
    description: 'Going beyond what\'s expected to deliver exceptional results',
  },
  {
    icon: 'global',
    title: 'Act Global',
    description: 'Thinking globally and embracing diverse perspectives worldwide',
  },
  {
    icon: 'learning',
    title: 'Continuous Learning',
    description: 'Constantly growing, adapting, and improving our skills and knowledge',
  },
]

/* Placeholder SVG icon — will be replaced with real assets */
function ValueIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    communication: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M4 6h20v14H4V6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 6l10 9 10-9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    expectations: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 4l2.5 7H24l-5.9 4.3 2.2 7L14 18.3 7.7 22.3l2.2-7L4 11h7.5L14 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    global: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 14h20M14 4c-3 3-4.5 6.3-4.5 10s1.5 7 4.5 10M14 4c3 3 4.5 6.3 4.5 10s-1.5 7-4.5 10" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    learning: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 6L3 12l11 6 11-6-11-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 15v5c2 2 4.5 3 7 3s5-1 7-3v-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M25 12v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  }
  return icons[name] ?? null
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
              <ValueIcon name={v.icon} />
            </div>
            <h3 className={styles.cardTitle}>{v.title}</h3>
            <p className={styles.cardDesc}>{v.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
