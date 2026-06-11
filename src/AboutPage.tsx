import { AboutHero } from './components/AboutHero'
import { MissionSection } from './components/MissionSection'
import { ValuesSection } from './components/ValuesSection'
import { TeamPhotoGrid } from './components/TeamPhotoGrid'
import { HowWeWork } from './components/HowWeWork'
import { GlobalOfficesSection } from './components/GlobalOfficesSection'
import { StatsSection } from './components/StatsSection'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { figmaAssets } from './figmaAssets'
import { useReveal } from './hooks/useReveal'
import styles from './AboutPage.module.css'

const ABOUT_STATS = [
  { value: 134, suffix: '+', label: 'Countries' },
  { value: 749, suffix: 'K+', label: 'Devices Connected' },
  { value: 1000, suffix: '+', label: 'Clients' },
  { value: 22, suffix: '', label: 'Years of Experience' },
]

export function AboutPage() {
  const { ref: footerRef, visible: footerVisible } = useReveal(0.05)

  return (
    <div className={styles.page}>
      <div className={styles.atmosphereRegion}>
        <div className={styles.ellipseTop} aria-hidden>
          <img src={figmaAssets.ellipse4} alt="" />
        </div>
        <div className={styles.ellipse2} aria-hidden>
          <img src={figmaAssets.ellipse2} alt="" />
        </div>

        <SiteHeader variant="dark" />
        <AboutHero />
        <MissionSection />
      </div>

      <main className={styles.main}>
        <ValuesSection />
        <TeamPhotoGrid />
        <HowWeWork />
        <div className={styles.officesWrap}>
          <GlobalOfficesSection />
        </div>
        <StatsSection stats={ABOUT_STATS} />
      </main>

      <SiteFooter
        revealRef={footerRef}
        revealClass={`reveal ${footerVisible ? 'reveal--in' : ''}`}
      />
    </div>
  )
}
