import { useEffect } from 'react'
import styles from './CareersPage.module.css'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { CareersBanner } from './components/CareersBanner'
import { CareersSection } from './components/CareersSection'
import { useReveal } from './hooks/useReveal'

export function CareersPage() {
  const { ref: footerRef, visible: footerVisible } = useReveal(0.05)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.main}>
        <CareersBanner />
        <CareersSection />
      </main>
      <SiteFooter
        revealRef={footerRef}
        revealClass={`reveal ${footerVisible ? 'reveal--in' : ''}`}
      />
    </div>
  )
}
