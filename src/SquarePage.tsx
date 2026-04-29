import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { figmaAssets } from './figmaAssets'
import styles from './SquarePage.module.css'
import { WorkplaceSection } from './components/WorkplaceSection'
import { VacanciesSection } from './components/VacanciesSection'

const OfficesMap = lazy(() =>
  import('./components/OfficesMap').then((m) => ({ default: m.OfficesMap })),
)

import logoColor from './assets/logo-squaregps.svg'
import b2field from './assets/B2field.svg'
import navixy from './assets/navixy-icon.svg'
import linkedinIcon from './assets/linkedin.svg'
import youtubeIcon from './assets/youtube.svg'
import heroVideo from './assets/hero-video.mp4'
import workplaceLanguage from './assets/workplace-language.png'
import workplacePresentation from './assets/workplace-presentation.png'
import workplaceTeam from './assets/workplace-team.png'
import workplaceTech from './assets/workplace-tech.png'

const FLAG_US = 'https://flagcdn.com/w80/us.png'
const FLAG_RS = 'https://flagcdn.com/w80/rs.png'
const FLAG_MX = 'https://flagcdn.com/w80/mx.png'

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
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => { setVisible(true); observer.disconnect() }, 1000)
        } else {
          clearTimeout(timer)
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [])

  return (
    <div ref={ref} className={`${styles.missionTextWrap} ${visible ? styles.missionTextVisible : ''}`} data-node-id="40:707">
      <p className={styles.missionText} data-node-id="40:708">
        We are passionate about empowering <br aria-hidden="true" />
        our employees to{' '}
        <span className={`${styles.missionKeyword} ${styles.missionKeywordD1}`}>grow</span>
        , make an{' '}
        <span className={`${styles.missionKeyword} ${styles.missionKeywordD2}`}>impact</span>
        , and feel{' '}
        <span className={`${styles.missionKeyword} ${styles.missionKeywordD3}`}>confident</span>
        {' '}in shaping both their careers and the future of SquareGPS.
      </p>
    </div>
  )
}

export function SquarePage() {

  return (
    <div className={styles.page} data-node-id="55:168">
      <div className={styles.bgEllipseTop} aria-hidden data-node-id="55:169">
        <img src={figmaAssets.ellipse4} alt="" />
      </div>
      <div className={styles.bgEllipse2} aria-hidden data-node-id="55:170">
        <img src={figmaAssets.ellipse2} alt="" />
      </div>

      <HeroDecorIcons />

      <div className={styles.inner}>
        <header className={styles.header} data-node-id="40:675">
          <div className={styles.headerBar}>
            <a className={styles.logo} href="/" data-node-id="40:676">
              <img src={logoColor} alt="SquareGPS" width={145} height={30} />
            </a>
            <nav className={styles.nav} aria-label="Primary" data-node-id="40:681">
              <span data-node-id="40:682">Careers</span>
              <span data-node-id="40:683">About</span>
              <span data-node-id="40:684">Contact</span>
            </nav>
          </div>
        </header>

        <div className={styles.stack}>
          <div className={styles.topPageGradient} data-node-id="55:81">
          <div className={styles.heroMissionGroup} data-node-id="40:686">
            <section className={styles.heroSection} data-node-id="40:687">
              <div className={styles.heroBlock} data-node-id="40:688">
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

            <section className={styles.missionWrap} data-node-id="40:703">
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

          <section className={styles.products} data-node-id="40:709">
            <div className={styles.productsCopy} data-node-id="40:710">
              <h2 className={styles.productsTitle} data-node-id="40:711">
                Our Products
              </h2>
              <p className={styles.productsDesc} data-node-id="40:712">
                Innovative solutions for fleet management and asset monitoring worldwide.
              </p>
            </div>

            <div className={styles.productsVisual} data-node-id="40:713">
              <div className={styles.productsImageFrame} data-node-id="40:714">
                <div className={styles.b2Wrap} data-node-id="53:2094">
                  <div className={styles.b2Inner}>
                    <img src={b2field} alt="" />
                  </div>
                </div>
                <div className={styles.navixyWrap} data-node-id="53:2088">
                  <div className={styles.navixyInner}>
                    <img src={navixy} alt="" />
                  </div>
                </div>
              </div>
              <div className={styles.productCallout} data-node-id="53:2111">
                <div className={styles.calloutText} data-node-id="53:2112">
                  <p className={styles.calloutTitle} data-node-id="53:2113">
                    Navixy
                  </p>
                  <p className={styles.calloutBody} data-node-id="53:2114">
                    GPS tracking platform for fleet management and asset monitoring
                  </p>
                </div>
              </div>
            </div>
          </section>
          </div>

          <WorkplaceSection
            imgLanguage={workplaceLanguage}
            imgPresentation={workplacePresentation}
            imgTeam={workplaceTeam}
            imgTech={workplaceTech}
          />

          <div className={styles.lowerRegion}>
            <div className={styles.lowerBackdrop}>
            <section className={styles.offices} data-node-id="40:730">
              <h2 className={styles.officesTitle} data-node-id="40:731">
                Global Offices
              </h2>
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
              <Suspense fallback={<div className={styles.officesMapFallback} aria-hidden />}>
                <OfficesMap />
              </Suspense>
            </section>

            <VacanciesSection />
            </div>

            <footer className={styles.siteFooter} data-node-id="40:748">
            <div className={styles.footerInner}>
            <div className={styles.footerGrid} data-node-id="40:749">
              <div className={styles.footerLogo} data-node-id="40:750">
                <img src={logoColor} alt="SquareGPS" data-node-id="40:751" />
              </div>
              <div className={styles.footerCol} data-node-id="40:755">
                <p className={styles.footerHeading} data-node-id="40:757">
                  Products
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:759">Navixy</li>
                  <li data-node-id="40:760">B2Field</li>
                </ul>
              </div>
              <div className={styles.footerCol} data-node-id="40:761">
                <p className={styles.footerHeading} data-node-id="40:763">
                  Company
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:765">About</li>
                  <li data-node-id="40:766">Careers</li>
                </ul>
              </div>
              <div className={`${styles.footerCol} ${styles.footerColGrow}`} data-node-id="40:767">
                <p className={styles.footerHeading} data-node-id="40:769">
                  Contact
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:771">info@squaregps.com</li>
                  <li data-node-id="40:772">2945 Townsgate Rd, Suite 200, Westlake Village, CA 91361, USA</li>
                </ul>
              </div>
            </div>

            <div className={styles.legalRow} data-node-id="40:773">
              <p className={styles.legal} data-node-id="40:774">
                Copyright © 2002-2026
              </p>
              <p className={styles.legal} data-node-id="40:775">
                Cookie policy and preferences
              </p>
              <p className={styles.legal} data-node-id="40:776">
                Privacy policy
              </p>
              <div className={styles.social} data-node-id="40:777">
                <a href="https://www.linkedin.com" aria-label="LinkedIn" data-node-id="40:778">
                  <img src={linkedinIcon} alt="" width={24} height={24} />
                </a>
                <a href="https://www.youtube.com" aria-label="YouTube" data-node-id="40:782">
                  <img src={youtubeIcon} alt="" width={24} height={24} />
                </a>
              </div>
            </div>
            </div>
          </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
