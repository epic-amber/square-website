import { lazy, Suspense } from 'react'
import styles from './GlobalOfficesSection.module.css'
import { useReveal } from '../hooks/useReveal'
import offices from '../content/offices.json'
import aboutContent from '../content/about.json'

const OfficesMap = lazy(() =>
  import('./OfficesMap').then((m) => ({ default: m.OfficesMap })),
)

export function GlobalOfficesSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`${styles.offices} reveal ${visible ? 'reveal--in' : ''}`}
      data-node-id="40:730"
    >
      <h2 className={styles.officesTitle} data-node-id="40:731">
        {aboutContent.globalOffices.title}
      </h2>
      <div className={styles.officesInner}>
        <div className={styles.officeCards} data-node-id="49:91">
          {offices.map((office) => (
            <article key={office.flagCode} className={styles.officeCard}>
              <img className={styles.flag} src={`https://flagcdn.com/w80/${office.flagCode}.png`} width={36} height={24} alt="" />
              <h3 className={styles.officeCity}>
                {office.city}
              </h3>
              <p className={styles.officeAddr}>
                {office.address}
              </p>
            </article>
          ))}
        </div>
        <div className={styles.officesMapWrap}>
          <Suspense fallback={<div className={styles.officesMapFallback} aria-hidden />}>
            <OfficesMap />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
