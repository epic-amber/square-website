import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styles from './VacanciesSection.module.css'
import arrowForward from '../assets/arrow-forward.svg'
import { useReveal } from '../hooks/useReveal'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'
import { JobCard } from './JobCard'
import { JOBS } from '../data/jobs'
import homeContent from '../content/home.json'
import careersContent from '../content/careers.json'

/* Main page shows the first 3 vacancies from shared JOBS data. Order    */
/* matches the array → edits in data/jobs.ts automatically sync with     */
/* the main page without changes here.                                    */
const FEATURED_VACANCIES = JOBS.slice(0, 3)

export function VacanciesSection() {
  const { ref, visible } = useReveal()
  const rc = `reveal${visible ? ' reveal--in' : ''}`
  const s = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` })

  const clearedRef = useRef(false)
  useEffect(() => {
    if (!visible || clearedRef.current) return
    clearedRef.current = true
    const t = setTimeout(() => {
      const cards = Array.from(document.querySelectorAll('[data-vacancy-card]')) as HTMLElement[]
      const btn = document.querySelector('[data-node-id="82:575"]') as HTMLElement | null
      ;[...cards, btn].forEach(el => {
        if (el) el.style.transitionDelay = ''
      })
    }, 1200)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <section ref={ref} className={styles.vacancies} data-node-id="82:441">
      {/* Stripe-style animated wave backdrop — shared with CareersSection. */}
      <BrandWaveBackdrop />

      <div className={styles.inner}>
        {/* Heading block */}
        <div className={`${styles.headingBlock} ${rc}`} style={s(0)}>
          <h2 className={styles.title} data-node-id="82:453">
            {homeContent.vacanciesPreview.title}
          </h2>
          <p className={styles.subtitle} data-node-id="192:1497">
            {homeContent.vacanciesPreview.subtitle}
          </p>
        </div>

        {/* Card grid */}
        <div className={styles.grid} data-node-id="82:573">
          {FEATURED_VACANCIES.map((v, i) => (
            <div
              key={v.id}
              className={rc}
              style={s(80 + i * 100)}
              data-vacancy-card
            >
              <JobCard job={v} viewRoleLabel={careersContent.viewRole} />
            </div>
          ))}
        </div>

        {/* CTA */}
          <Link
          to="/careers"
          className={`${styles.ctaButton} ${rc}`}
          style={s(480)}
          data-node-id="82:575"
        >
          <span>{homeContent.vacanciesPreview.cta}</span>
          <img
            className={styles.ctaArrow}
            src={arrowForward}
            alt=""
            width={20}
            height={20}
            aria-hidden
          />
        </Link>
      </div>
    </section>
  )
}
