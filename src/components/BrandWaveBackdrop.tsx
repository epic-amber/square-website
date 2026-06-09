import styles from './BrandWaveBackdrop.module.css'

/**
 * Stripe-style animated wave backdrop — переиспользуемый brand atmosphere.
 *
 * Используется в CareersSection и VacanciesSection (main page) как замена
 * атмосферного градиента. 6 SVG-слоёв (5 S-curves + 1 teal accent), shared
 * gradient defs, sway animations per layer (GPU-accelerated).
 *
 * Colors — brand палитра: navy-deep → sky-500 → bright cyan light tones.
 *
 * Positioning: bottom-anchored within parent section, full-bleed width.
 * preserveAspectRatio="xMidYMax slice" → SVG bottom anchored к низу stage,
 * wave «приземляется» у нижнего края секции.
 *
 * Wave path shifted on +300 в viewBox-space → главная масса волны живёт
 * в нижней половине stage (не перекрывает sidebar/heading зону сверху).
 */
export function BrandWaveBackdrop() {
  return (
    <div className={styles.stage} aria-hidden="true">
      {/* Shared gradient defs — referenced by each layer via url(#id). */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main 6-stop sweep — navy depth → sky → bright cyan light. */}
          <linearGradient id="brand-wave-warm" x1="0%" y1="80%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#012762" />
            <stop offset="14%" stopColor="#013e87" />
            <stop offset="30%" stopColor="#075ba7" />
            <stop offset="50%" stopColor="#00a6f4" />
            <stop offset="74%" stopColor="#38B9FF" />
            <stop offset="100%" stopColor="#82dcff" />
          </linearGradient>

          <linearGradient id="brand-wave-pink" x1="0%" y1="80%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#013e87" />
            <stop offset="18%" stopColor="#0a6bbc" />
            <stop offset="55%" stopColor="#38B9FF" />
            <stop offset="100%" stopColor="#82dcff" />
          </linearGradient>

          <linearGradient id="brand-wave-coral" x1="0%" y1="80%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#075ba7" />
            <stop offset="20%" stopColor="#00a6f4" />
            <stop offset="55%" stopColor="#50c0fc" />
            <stop offset="100%" stopColor="#ADDBF3" />
          </linearGradient>

          <linearGradient id="brand-wave-violet" x1="0%" y1="80%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#012762" />
            <stop offset="22%" stopColor="#0a6bbc" />
            <stop offset="55%" stopColor="#38B9FF" />
            <stop offset="100%" stopColor="#b4eeff" />
          </linearGradient>

          {/* Left teal accent — navy → sky fading out. */}
          <linearGradient id="brand-wave-teal" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#012762" />
            <stop offset="35%" stopColor="#00a6f4" />
            <stop offset="65%" stopColor="#38B9FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38B9FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ViewBox 2184×1415 + transform translate(0, 300) — сдвигает wave  */}
      {/* path в нижнюю часть viewBox, главная масса волны в нижней        */}
      {/* половине section (под sidebar/heading), не пересекает контент.   */}

      {/* Layer 5 — broadest, softest halo (largest blur). */}
      <div className={`${styles.layer} ${styles.layer5}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M 30,560 C 150,440 260,380 380,395 C 510,410 580,510 680,610 C 810,740 950,760 1050,720 C 1180,670 1260,580 1380,560 C 1500,540 1600,650 1700,820 C 1820,1000 1960,1060 2160,1080"
              fill="none"
              stroke="url(#brand-wave-violet)"
              strokeWidth="420"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Layer 4 — wash. */}
      <div className={`${styles.layer} ${styles.layer4}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M 30,580 C 160,460 270,395 390,408 C 520,420 590,520 690,620 C 820,750 960,770 1060,725 C 1190,675 1270,580 1390,560 C 1510,540 1610,660 1710,830 C 1830,1000 1970,1060 2160,1080"
              fill="none"
              stroke="url(#brand-wave-pink)"
              strokeWidth="320"
              strokeOpacity="0.55"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Layer 3 — midweight. */}
      <div className={`${styles.layer} ${styles.layer3}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M 40,560 C 170,450 280,390 400,402 C 530,415 600,515 700,615 C 830,745 970,765 1070,720 C 1200,670 1280,575 1400,555 C 1520,535 1620,655 1720,825 C 1840,995 1980,1055 2160,1075"
              fill="none"
              stroke="url(#brand-wave-coral)"
              strokeWidth="220"
              strokeOpacity="0.7"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Layer 2 — primary sweep. */}
      <div className={`${styles.layer} ${styles.layer2}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M 40,560 C 180,440 290,385 410,398 C 540,410 610,510 710,610 C 840,740 980,760 1080,715 C 1210,665 1290,570 1410,550 C 1530,530 1630,650 1730,820 C 1850,990 1990,1050 2160,1070"
              fill="none"
              stroke="url(#brand-wave-warm)"
              strokeWidth="170"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Layer 1 — brightest, top-most ribbon. */}
      <div className={`${styles.layer} ${styles.layer1}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M 50,560 C 190,440 300,385 420,395 C 550,408 620,508 720,608 C 850,738 990,758 1090,712 C 1220,662 1300,565 1420,548 C 1540,530 1640,650 1740,820 C 1860,985 2000,1045 2160,1065"
              fill="none"
              stroke="url(#brand-wave-warm)"
              strokeWidth="95"
              strokeOpacity="0.95"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Left teal accent — cool tone, widens left visual mass. */}
      <div className={`${styles.layer} ${styles.layerLeft}`}>
        <svg
          viewBox="0 0 2184 1415"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0, 300)">
            <path
              d="M -250,740 C -80,540 160,420 360,440 C 540,460 670,600 810,720"
              fill="none"
              stroke="url(#brand-wave-teal)"
              strokeWidth="560"
              strokeOpacity="0.9"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
