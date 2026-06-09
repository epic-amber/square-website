import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styles from './VacanciesSection.module.css'
import locationPinIcon from '../assets/icon-location-pin.svg'
import arrowForward from '../assets/arrow-forward.svg'
import { useReveal } from '../hooks/useReveal'

interface Vacancy {
  id: string
  title: string
  href?: string
  location: string
  level: string
  format: string
  description: string
}

const VACANCIES: Vacancy[] = [
  {
    id: '82:483',
    title: 'Head of Data Platform',
    location: 'Belgrade, Serbia',
    level: 'Senior',
    format: 'Hybrid',
    description:
      'Lead the architecture of data systems behind global telematics products. Drive technical strategy and mentor a cross-functional team.',
  },
  {
    id: '82:533',
    title: 'Senior Backend Developer',
    href: 'https://www.linkedin.com/jobs/view/4382027831/',
    location: 'Belgrade, Serbia',
    level: 'Senior',
    format: 'Hybrid',
    description:
      'Build and scale the backend infrastructure powering real-time fleet tracking for thousands of customers worldwide.',
  },
  {
    id: '82:546',
    title: 'Technical Writer',
    location: 'Belgrade, Serbia',
    level: 'Middle',
    format: 'Hybrid',
    description:
      'Create clear, precise documentation for developer APIs and end-user guides across SquareGPS product lines.',
  },
  {
    id: '82:560',
    title: 'Technical Support Engineer L2',
    href: 'https://www.linkedin.com/jobs/view/4378891572/',
    location: 'Mexico City, Mexico',
    level: 'Senior',
    format: 'Full-time',
    description:
      'Resolve complex technical issues for enterprise clients and collaborate with engineering to improve product reliability.',
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
      {/* Atmospheric gradient background */}
      <div className={styles.gradientBg} aria-hidden />

      <div className={styles.inner}>
        {/* Heading block */}
        <div className={`${styles.headingBlock} ${rc}`} style={s(0)}>
          <h2 className={styles.title} data-node-id="82:453">
            Join the team building the future of telematics
          </h2>
          <p className={styles.subtitle} data-node-id="192:1497">
            SquareGPS was founded in 2005 by a team of global experts and innovators
            passionate to unite people and things together by developing top-notch
            software products for the Telematics industry.
          </p>
        </div>

        {/* Card grid */}
        <div className={styles.grid} data-node-id="82:573">
          {VACANCIES.slice(0, 3).map((v, i) => {
            const cardDelay = 80 + i * 100
            const inner = (
              <>
                <div className={styles.cardHeader}>
                  <p className={styles.jobTitle}>{v.title}</p>
                  <div className={styles.location}>
                    <img
                      className={styles.locationIcon}
                      src={locationPinIcon}
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden
                    />
                    <p className={styles.locationText}>
                      <span>{v.location}</span>
                      <span className={styles.locationDot} aria-hidden>·</span>
                      <span>{v.format}</span>
                    </p>
                  </div>
                </div>

                <p className={styles.description}>{v.description}</p>

                <div className={styles.tags}>
                  <p className={styles.tag}>{v.level}</p>
                </div>

                <p className={styles.viewRole}>
                  <span>View role</span>
                  <span className={styles.viewRoleArrow}>→</span>
                </p>
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
              <Link
                key={v.id}
                to="/careers"
                className={`${styles.card} ${rc}`}
                style={s(cardDelay)}
                data-node-id={v.id}
                data-vacancy-card
              >
                {inner}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
          <Link
          to="/careers"
          className={`${styles.ctaButton} ${rc}`}
          style={s(480)}
          data-node-id="82:575"
        >
          <span>See open roles</span>
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
