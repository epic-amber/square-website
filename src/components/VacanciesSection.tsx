import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import styles from './VacanciesSection.module.css'
import locationPinIcon from '../assets/icon-location-pin.svg'
import vacanciesOvalGradient from '../assets/vacancies-oval-gradient.svg'
import { useReveal } from '../hooks/useReveal'

interface Vacancy {
  id: string
  title: string
  href?: string
  location: string
  level: string
  format: string
  postedAgo: string
}

const VACANCIES: Vacancy[] = [
  {
    id: '82:483',
    title: 'Head of Data Platform',
    location: 'Belgrade, Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '82:533',
    title: 'Senior Backend Developer',
    href: 'https://www.linkedin.com/jobs/view/4382027831/',
    location: 'Belgrade, Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '82:546',
    title: 'Technical Writer (Russian-speaking)',
    location: 'Belgrade, Serbia',
    level: 'Middle',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '82:560',
    title: 'Technical Support Engineer L2',
    href: 'https://www.linkedin.com/jobs/view/4378891572/',
    location: 'Mexico City, Mexico',
    level: 'Senior',
    format: 'Full-time',
    postedAgo: '1 month ago',
  },
]

export function VacanciesSection() {
  const { ref, visible } = useReveal()
  const rc = `reveal${visible ? ' reveal--in' : ''}`
  const s = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` })

  const clearedRef = useRef(false)
  useEffect(() => {
    if (!visible || clearedRef.current) return
    clearedRef.current = true
    // After the reveal stagger completes, remove the inline transitionDelay so
    // hover transitions fire instantly (max stagger 480ms + transition 650ms + buffer)
    const t = setTimeout(() => {
      const cards = Array.from(document.querySelectorAll('[data-vacancy-card]')) as HTMLElement[]
      const btn   = document.querySelector('[data-node-id="82:575"]') as HTMLElement | null
      ;[...cards, btn].forEach(el => { if (el) el.style.transitionDelay = '' })
    }, 1200)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <section ref={ref} className={styles.vacancies} data-node-id="82:574">
      {/* Title — Figma 82:453 */}
      <h2 className={`${styles.title} ${rc}`} style={s(0)} data-node-id="82:453">
        Our vacancies
      </h2>

      {/* Card list — Figma 82:573 + oval-gradient 82:661 */}
      <div className={styles.list}>
        <div className={styles.ovalGradient} aria-hidden data-node-id="82:661">
          <img src={vacanciesOvalGradient} alt="" width={878} height={842} />
        </div>
        {VACANCIES.map((v, i) => {
          const cardDelay = 80 + i * 100
          const inner = (
            <>
              {/* Top row: job title + location */}
              <div className={styles.cardTop}>
                <p className={styles.jobTitle}>{v.title}</p>
                <div className={styles.location}>
                  <img
                    className={styles.locationIcon}
                    src={locationPinIcon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                  />
                  <p className={styles.locationText}>{v.location}</p>
                </div>
              </div>

              {/* Bottom row: tags + date */}
              <div className={styles.cardBottom}>
                <div className={styles.tags}>
                  <p className={styles.tag}>{v.level}</p>
                  <p className={styles.tag}>{v.format}</p>
                </div>
                <p className={styles.date}>{v.postedAgo}</p>
              </div>
            </>
          )

          return v.href ? (
            <a
              key={v.id}
              className={`${styles.card} ${rc}`}
              style={s(cardDelay)}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              data-node-id={v.id}
              data-vacancy-card
            >
              {inner}
            </a>
          ) : (
            <article key={v.id} className={`${styles.card} ${rc}`} style={s(cardDelay)} data-node-id={v.id} data-vacancy-card>
              {inner}
            </article>
          )
        })}
      </div>

      {/* Show more button — Figma 82:575 */}
      <button type="button" className={`${styles.showMore} ${rc}`} style={s(480)} data-node-id="82:575">
        Show more
      </button>
    </section>
  )
}
