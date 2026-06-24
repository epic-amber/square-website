import styles from './HeroWaveAccent.module.css'
import heroWaveImg from '../assets/hero-wave.png'

/**
 * Hero wave accent — actual wave asset from Figma (node 245:78).
 *
 * Inside the WorkplaceSection hero card. Image is positioned absolute,
 * partially "bleeds" beyond the card edges (overflow:hidden clips it).
 * Pose matches Figma: rotate(-7.29deg) + bleed left/top.
 *
 * Positioning — percentage-based relative to hero, so it scales automatically
 * across all viewports. On tablet/mobile, bleed and rotation are reduced
 * via media queries (see .module.css).
 */
export function HeroWaveAccent() {
  return (
    <div className={styles.accent} aria-hidden="true">
      <img
        src={heroWaveImg}
        alt=""
        className={styles.waveImg}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
