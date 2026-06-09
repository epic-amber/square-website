import { useEffect } from 'react'
import styles from './CareersPage.module.css'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { CareersBanner } from './components/CareersBanner'
import { CareersSection } from './components/CareersSection'
import { useReveal } from './hooks/useReveal'
import { figmaAssets } from './figmaAssets'

export function CareersPage() {
  const { ref: footerRef, visible: footerVisible } = useReveal(0.05)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>
      {/* bgEllipseTop — pixel-perfect reuse of main page asset (Figma      */}
      {/* node 55:169). SVG с baked-in Gaussian blur + mix-blend-mode:      */}
      {/* multiply → мягкая голубая дымка по navbar+top zone. Matches       */}
      {/* SquarePage exactly.                                                */}
      <div className={styles.bgEllipseTop} aria-hidden data-node-id="55:169">
        <img src={figmaAssets.ellipse4} alt="" />
      </div>

      {/* Aurora orbs — 2 neon accents за content area.                     */}
      {/* topRight: accent ниже banner. midLeft: glow за карточками.        */}
      <div className={`${styles.orb} ${styles.orbTopRight}`} aria-hidden />
      <div className={`${styles.orb} ${styles.orbMidLeft}`} aria-hidden />

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
