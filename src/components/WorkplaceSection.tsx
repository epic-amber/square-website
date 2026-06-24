import type { CSSProperties } from 'react'
import styles from './WorkplaceSection.module.css'
import { useReveal } from '../hooks/useReveal'
import { HeroWaveAccent } from './HeroWaveAccent'
import homeContent from '../content/home.json'
import mediaContent from '../content/media.json'

const benefitByKey = (key: string) => homeContent.workplace.benefits.find(b => b.key === key)!

interface WorkplaceProps {
  imgPresentation: string
  imgTeam: string
  imgTech: string
}

/**
 * "More than a workplace" section — Figma 79:86.
 * Single CSS Grid mirrors Figma's 3-column × 3-row layout exactly:
 *   ┌────────┬─────────┬────────┐
 *   │  hero  │  bLang  │ pLang  │
 *   │  hero  │  pPres  │ bEdu   │
 *   ├────────┼─────────┼────────┤
 *   │  team  │ bHealth │ pTech  │
 *   └────────┴─────────┴────────┘
 */
export function WorkplaceSection({
  imgPresentation,
  imgTeam,
  imgTech,
}: WorkplaceProps) {
  const { ref, visible } = useReveal()
  const rc = `reveal${visible ? ' reveal--in' : ''}`
  const s = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms` })

  return (
    <section ref={ref} className={styles.workplace} data-node-id="79:86">
      <h2 className={`${styles.title} ${rc}`} style={s(0)} data-node-id="79:343">
        {homeContent.workplace.title}
      </h2>

      <div className={styles.grid} data-node-id="79:357">
        {/* Hero — Figma 79:312 (col 1, rows 1-2) */}
        <article className={`${styles.hero} ${rc}`} style={s(60)} data-node-id="79:312">
          {/* Wave accent — mini echo of BrandWaveBackdrop, anchored bottom-right. */}
          <HeroWaveAccent />
          <p className={styles.heroText} data-node-id="79:310">
            {homeContent.workplace.heroText}
          </p>
        </article>

        {/* Language Learning — Figma 79:314 (col 2, row 1) */}
        <article className={`${styles.benefit} ${styles.benefitLang} ${rc}`} style={s(120)} data-node-id="79:314">
          <p className={styles.benefitTitle} data-node-id="79:315">{benefitByKey('language').title}</p>
          <p className={styles.benefitBody} data-node-id="79:316">
            {benefitByKey('language').body}
          </p>
        </article>

        {/* Language video — Figma 80:423 (col 3, row 1) */}
        <div className={`${styles.photo} ${styles.photoLang} ${rc}`} style={s(180)} data-node-id="80:423">
          <video
            src="/workplace-language.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Presentation photo — Figma 80:432 (col 2, row 2) */}
        <div className={`${styles.photo} ${styles.photoPres} ${rc}`} style={s(240)} data-node-id="80:432">
          <img src={imgPresentation} alt={mediaContent.workplacePresentation.alt} />
        </div>

        {/* Education Reimbursement — Figma 79:317 (col 3, row 2) */}
        <article className={`${styles.benefit} ${styles.benefitEdu} ${rc}`} style={s(300)} data-node-id="79:317">
          <p className={styles.benefitTitle} data-node-id="79:318">{benefitByKey('education').title}</p>
          <p className={styles.benefitBody} data-node-id="79:319">
            {benefitByKey('education').body}
          </p>
        </article>

        {/* Team photo — Figma 80:438 (col 1, row 3) */}
        <div className={`${styles.photo} ${styles.teamPhoto} ${rc}`} style={s(360)} data-node-id="80:438">
          <img src={imgTeam} alt={mediaContent.workplaceTeam.alt} />
        </div>

        {/* Health Insurance Support — Figma 79:351 (col 2, row 3) */}
        <article className={`${styles.benefit} ${styles.benefitHealth} ${rc}`} style={s(420)} data-node-id="79:351">
          <p className={styles.benefitTitle} data-node-id="79:352">{benefitByKey('health').title}</p>
          <p className={styles.benefitBody} data-node-id="79:353">
            {benefitByKey('health').body}
          </p>
        </article>

        {/* Tech photo — Figma 80:435 (col 3, row 3) */}
        <div className={`${styles.photo} ${styles.photoTech} ${rc}`} style={s(480)} data-node-id="80:435">
          <img src={imgTech} alt={mediaContent.workplaceTech.alt} />
        </div>
      </div>
    </section>
  )
}
