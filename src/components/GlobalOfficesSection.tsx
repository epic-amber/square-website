import { lazy, Suspense } from 'react'
import styles from './GlobalOfficesSection.module.css'
import { useReveal } from '../hooks/useReveal'

const OfficesMap = lazy(() =>
  import('./OfficesMap').then((m) => ({ default: m.OfficesMap })),
)

const FLAG_US = 'https://flagcdn.com/w80/us.png'
const FLAG_RS = 'https://flagcdn.com/w80/rs.png'
const FLAG_MX = 'https://flagcdn.com/w80/mx.png'

export function GlobalOfficesSection() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      className={`${styles.offices} reveal ${visible ? 'reveal--in' : ''}`}
      data-node-id="40:730"
    >
      <h2 className={styles.officesTitle} data-node-id="40:731">
        Global Offices
      </h2>
      <div className={styles.officesInner}>
        <div className={styles.officeCards} data-node-id="49:91">
          <article className={styles.officeCard} data-node-id="49:92">
            <img className={styles.flag} src={FLAG_US} width={36} height={24} alt="" />
            <h3 className={styles.officeCity} data-node-id="49:94">
              Westlake Village, USA
            </h3>
            <p className={styles.officeAddr} data-node-id="49:95">
              2945 Townsgate Rd, Suite 200 Westlake Village, CA 91361
            </p>
          </article>
          <article className={styles.officeCard} data-node-id="49:96">
            <img className={styles.flag} src={FLAG_RS} width={36} height={24} alt="" />
            <h3 className={styles.officeCity} data-node-id="49:97">
              Belgrade, Serbia
            </h3>
            <p className={styles.officeAddr} data-node-id="49:98">
              Kneza Mihaila 3, 5. sprat, Poslovna zgrada Zepter, Beograd
            </p>
          </article>
          <article className={styles.officeCard} data-node-id="49:99">
            <img className={styles.flag} src={FLAG_MX} width={36} height={24} alt="" />
            <h3 className={styles.officeCity} data-node-id="49:100">
              Mexico City, Mexico
            </h3>
            <p className={styles.officeAddr} data-node-id="49:101">
              Av. Benjamín Franklin 235, Piso 3, Mexico City
            </p>
          </article>
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
