import { useEffect, useRef, useState } from 'react'
import { figmaAssets } from './figmaAssets'
import styles from './SquarePage.module.css'
import { WorkplaceSection } from './components/WorkplaceSection'
import { VacanciesSection } from './components/VacanciesSection'
import { OurProductsSection } from './components/OurProductsSection'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { GlobalOfficesSection } from './components/GlobalOfficesSection'
import { useReveal } from './hooks/useReveal'

import heroVideo from './assets/hero-video.mp4'
import workplacePresentation from './assets/workplace-presentation.png'
import workplaceTeam from './assets/workplace-team.png'
import workplaceTech from './assets/workplace-tech.png'

/* ── Count-up animation ───────────────────────────────────── */

const STAT_APPEAR_BASE_MS = 520
const STAT_APPEAR_STAGGER_MS = 340

const STATS_DATA: { value: number; suffix: string; label: string; nodeValue: string; nodeLabel: string; nodeStat: string }[] = [
  { value: 22,  suffix: '+',  label: 'years in Telematics',  nodeValue: '40:695', nodeLabel: '40:696', nodeStat: '40:694' },
  { value: 134, suffix: '+',  label: 'countries',            nodeValue: '40:698', nodeLabel: '40:699', nodeStat: '40:697' },
  { value: 749, suffix: 'K+', label: 'devices connected',    nodeValue: '40:701', nodeLabel: '40:702', nodeStat: '40:700' },
  { value: 10,  suffix: 'K+', label: 'completed projects',   nodeValue: '55:1201', nodeLabel: '55:1202', nodeStat: '55:1200' },
]

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      setCurrent(Math.round(easeOutQuart(progress) * end))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [trigger, end, duration])

  return current
}

function AnimatedStat({ value, suffix, label, index, visible, nodeValue, nodeLabel, nodeStat }: {
  value: number; suffix: string; label: string; index: number; visible: boolean
  nodeValue: string; nodeLabel: string; nodeStat: string
}) {
  const fadeDelayMs = STAT_APPEAR_BASE_MS + index * STAT_APPEAR_STAGGER_MS
  const [countTrigger, setCountTrigger] = useState(false)

  useEffect(() => {
    if (!visible) {
      setCountTrigger(false)
      return
    }
    const id = window.setTimeout(() => setCountTrigger(true), fadeDelayMs)
    return () => clearTimeout(id)
  }, [visible, fadeDelayMs])

  const count = useCountUp(value, 1800, countTrigger)

  return (
    <div
      className={`${styles.stat} ${visible ? styles.statVisible : ''}`}
      style={{ transitionDelay: `${fadeDelayMs}ms` }}
      data-node-id={nodeStat}
    >
      <p className={styles.statValue} data-node-id={nodeValue}>
        {countTrigger ? `${count}${suffix}` : `0${suffix}`}
      </p>
      <p className={styles.statLabel} data-node-id={nodeLabel}>
        {label}
      </p>
    </div>
  )
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.stats} data-node-id="40:693">
      {STATS_DATA.map((s, i) => (
        <AnimatedStat key={s.nodeStat} {...s} index={i} visible={visible} />
      ))}
    </div>
  )
}

function HeroDecorIcons() {
  return (
    <div className={styles.heroDecorLayer} aria-hidden>
      <div className={styles.heroDecorFrame}>
        <img
          src={figmaAssets.iconSam}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorSam}`}
          data-node-id="74:81"
          width={85}
          height={51}
        />
        <img
          src={figmaAssets.iconNvx}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorNvx}`}
          data-node-id="74:151"
          width={55}
          height={55}
        />
        <img
          src={figmaAssets.iconJose}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorJose}`}
          data-node-id="74:76"
          width={82}
          height={58}
        />
        <img
          src={figmaAssets.iconQuerry}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorQuerry}`}
          data-node-id="74:162"
          width={55}
          height={55}
        />
        <img
          src={figmaAssets.iconLocation}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorLocation}`}
          data-node-id="74:95"
          width={52}
          height={65}
        />
        <img
          src={figmaAssets.iconTelematics}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorTelematics}`}
          data-node-id="74:97"
          width={131}
          height={108}
        />
        <img
          src={figmaAssets.iconMaria}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorMaria}`}
          data-node-id="74:71"
          width={111}
          height={67}
        />
        <img
          src={figmaAssets.iconGlobe}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorGlobe}`}
          data-node-id="66:167"
          width={86}
          height={86}
        />
        <img
          src={figmaAssets.iconCode}
          alt=""
          className={`${styles.heroDecorIcon} ${styles.heroDecorCode}`}
          data-node-id="74:94"
          width={104}
          height={82}
        />
      </div>
    </div>
  )
}

function MissionText() {
  const { ref, visible } = useReveal(0.2)
  return (
    <div
      ref={ref}
      className={`${styles.missionTextWrap} reveal${visible ? ' reveal--in' : ''}`}
      data-node-id="40:707"
    >
      <p className={styles.missionText} data-node-id="40:708">
        We are passionate about empowering <br aria-hidden="true" />
        our employees to grow, make an impact, and feel confident in shaping both their careers and the future of SquareGPS.
      </p>
    </div>
  )
}

export function SquarePage() {
  // Hero is above the fold — animate on mount
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  const { ref: missionRef, visible: missionVisible } = useReveal()
  const { ref: footerRef, visible: footerVisible } = useReveal(0.05)

  return (
    <div className={styles.page} data-node-id="55:168">
      <div className={styles.inner}>
        <SiteHeader />
        <HeroDecorIcons />

        <div className={styles.stack}>
          <div className={styles.topPageGradient} data-node-id="55:81">
          <div className={styles.bgEllipseTop} aria-hidden data-node-id="55:169">
            <img src={figmaAssets.ellipse4} alt="" />
          </div>
          <div className={styles.bgEllipse2} aria-hidden data-node-id="55:170">
            <img src={figmaAssets.ellipse2} alt="" />
          </div>
          <div className={styles.heroMissionGroup} data-node-id="40:686">
            <section className={styles.heroSection} data-node-id="40:687">
              <div className={`${styles.heroBlock} reveal ${heroVisible ? 'reveal--in' : ''}`} data-node-id="40:688">
                <div className={styles.heroIntro}>
                  <h1 className={styles.heroTitle} data-node-id="40:689">
                    Design and Development <br aria-hidden="true" />
                    of Telematics Solutions
                  </h1>
                  <p className={styles.heroSub} data-node-id="40:690">
                    SquareGPS was founded in 2005 by a team of global experts and innovators passionate to unite people and things together{' '}
                    <br aria-hidden="true" />
                    by developing top-notch software products for Telematics industry.
                  </p>
                </div>
                <button type="button" className={styles.heroCta} data-node-id="40:691">
                  <span data-node-id="40:692">See open roles</span>
                  <img
                    className={styles.heroCtaIcon}
                    src={figmaAssets.arrowForward}
                    alt=""
                    width={20}
                    height={20}
                    data-node-id="53:2204"
                  />
                </button>
              </div>

              <StatsSection />
            </section>

            <section ref={missionRef} className={`${styles.missionWrap} reveal ${missionVisible ? 'reveal--in' : ''}`} data-node-id="40:703">
              <div className={styles.missionInner}>
                <div className={styles.video} data-name="video" data-node-id="40:706">
                  <video
                    className={styles.videoEl}
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                <MissionText />

              </div>
            </section>
          </div>

          <OurProductsSection />
          </div>

          <WorkplaceSection
            imgPresentation={workplacePresentation}
            imgTeam={workplaceTeam}
            imgTech={workplaceTech}
          />

          <div className={styles.lowerRegion}>
            <div className={styles.lowerBackdrop}>
            <GlobalOfficesSection />

            <VacanciesSection />
            </div>

            <SiteFooter
              revealRef={footerRef}
              revealClass={`reveal ${footerVisible ? 'reveal--in' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
