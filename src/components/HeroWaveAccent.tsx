import styles from './HeroWaveAccent.module.css'
import heroWaveImg from '../assets/hero-wave.png'

/**
 * Hero wave accent — реальный wave-asset из Figma (node 245:78).
 *
 * Внутри hero-карточки WorkplaceSection. Image анкорится absolute,
 * частично «вытекает» за края карточки (overflow:hidden обрезает).
 * Pose повторяет Figma: rotate(-7.29deg) + bleed left/top.
 *
 * Positioning — в процентах от hero, чтобы автоматически масштабироваться
 * на всех viewport'ах. На tablet/mobile bleed и rotation уменьшаются
 * через media queries (см. .module.css).
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
