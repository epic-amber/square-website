import styles from './HeroWaveAccent.module.css'

/**
 * Hero wave accent — мини-«эхо» BrandWaveBackdrop внутри hero-карточки
 * секции WorkplaceSection. Покрывает нижние ~70% карточки целиком (full
 * width), текст hero сидит сверху (z-index выше).
 *
 * 4 SVG-слоя — left teal tail + halo + mid sweep + bright top ribbon —
 * с разной глубиной blur и slow sway. Палитра идентична большому wave
 * под Open roles (navy → sky → cyan) для визуального rhyme через всю
 * главную страницу.
 *
 * preserveAspectRatio="xMidYMax slice" — центрированный по горизонтали,
 * приземлённый снизу. Path span -50..830 в viewBox 800×600 → small bleed
 * на обе стороны, чтобы curve визуально доходил до левого и правого
 * краёв при разных aspect ratios контейнера.
 *
 * Собственные gradient ID (`hero-accent-*`) — избегаем коллизий с
 * BrandWaveBackdrop на той же странице.
 */
export function HeroWaveAccent() {
  return (
    <div className={styles.accent} aria-hidden="true">
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main sweep — abyss navy → sky → cyan на тёмной hero-базе.   */}
          {/* Deep stops 0%-12% (#00132e → #012762) создают темную «тень» */}
          {/* в нижней-левой части ribbon'ов → сильный контраст с яркой   */}
          {/* cyan-частью в верхней-правой. Депт + яркость = brand glow.  */}
          <linearGradient id="hero-accent-warm" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#00132e" />
            <stop offset="12%" stopColor="#012762" />
            <stop offset="30%" stopColor="#075ba7" />
            <stop offset="55%" stopColor="#00a6f4" />
            <stop offset="80%" stopColor="#38B9FF" />
            <stop offset="100%" stopColor="#b4eeff" />
          </linearGradient>

          {/* Soft halo — fades out at edges для smooth integration. */}
          <linearGradient id="hero-accent-soft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#013e87" stopOpacity="0.0" />
            <stop offset="30%"  stopColor="#075ba7" stopOpacity="0.55" />
            <stop offset="70%"  stopColor="#38B9FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#82dcff" stopOpacity="0.0" />
          </linearGradient>

          {/* Left teal tail — navy → sky fading к центру. */}
          <linearGradient id="hero-accent-teal" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="#012762" />
            <stop offset="40%"  stopColor="#00a6f4" />
            <stop offset="100%" stopColor="#38B9FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 3 — halo (largest blur, broadest stroke). */}
      <div className={`${styles.layer} ${styles.layer3}`}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50,420 C 100,300 220,260 360,290 C 480,320 580,400 700,480 C 770,520 810,560 830,610"
            fill="none"
            stroke="url(#hero-accent-soft)"
            strokeWidth="260"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Layer 2 — mid sweep. */}
      <div className={`${styles.layer} ${styles.layer2}`}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -30,440 C 110,310 230,265 370,295 C 490,325 590,408 710,490 C 770,530 815,565 830,610"
            fill="none"
            stroke="url(#hero-accent-warm)"
            strokeWidth="140"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Layer 1 — bright top ribbon. */}
      <div className={`${styles.layer} ${styles.layer1}`}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -10,460 C 120,320 240,275 380,300 C 500,330 600,415 720,498 C 775,535 820,570 830,615"
            fill="none"
            stroke="url(#hero-accent-warm)"
            strokeWidth="65"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Left teal tail — cool tone, расширяет визуальную массу влево. */}
      <div className={`${styles.layer} ${styles.layerLeft}`}>
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -200,560 C -50,440 80,380 220,400 C 320,415 400,475 480,540"
            fill="none"
            stroke="url(#hero-accent-teal)"
            strokeWidth="220"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
