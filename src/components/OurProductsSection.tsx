import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './OurProductsSection.module.css'
import navixySrc from '../assets/navixy-product-icon.svg'
import b2fieldSrc from '../assets/b2field-product-icon.svg'
import { useReveal } from '../hooks/useReveal'

type ActiveIcon = 'navixy' | 'b2field'

const SWAP_INTERVAL_MS = 4500

const PRODUCTS = {
  navixy: {
    title: 'Navixy',
    desc: 'GPS tracking platform for fleet management and asset monitoring',
    href: 'https://navixy.com/',
    src: navixySrc,
    ariaLabel: 'Navixy — open GPS tracking platform website',
  },
  b2field: {
    title: 'B2Field',
    desc: 'Service for companies managing mobile workforce',
    href: 'https://b2field.com/',
    src: b2fieldSrc,
    ariaLabel: 'B2Field — open mobile workforce management website',
  },
} as const

export function OurProductsSection() {
  const { ref: sectionRef, visible } = useReveal()

  // Which icon is currently "in front"
  const [active, setActive] = useState<ActiveIcon>('navixy')

  // Increments on every swap — used as `key` on the connector SVG
  // to restart the draw-in animation each time.
  const [swapKey, setSwapKey] = useState(0)

  // Pause the swap animation while the user hovers over the visual
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Detect prefers-reduced-motion once on mount
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    [],
  )

  // Start / stop the swap interval based on pause state and motion preference
  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setActive(prev => (prev === 'navixy' ? 'b2field' : 'navixy'))
      setSwapKey(k => k + 1)
    }, SWAP_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPaused, prefersReducedMotion])

  const isNavixyFront = active === 'navixy'

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal ${visible ? 'reveal--in' : ''}`}
      data-node-id="40:709"
    >
      {/* ── Left: text copy ──────────────────────────────────── */}
      <div className={styles.copy}>
        <h2 className={styles.title}>Our Products</h2>
        <p className={styles.desc}>
          Trusted by hundreds of integrators and businesses worldwide. Whether you're building location-based services or managing a mobile workforce, our platforms deliver the reliability and flexibility your operations demand.
        </p>
      </div>

      {/* ── Right: interactive icon stage ──────────────────── */}
      <div
        className={styles.visual}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/*
         * Connector SVG: a thin diagonal line that visually links
         * the label block to the front icon.
         * Coordinates are tuned to match the label position (upper-left)
         * and the base icon position (lower-center of the container).
         */}
        {/*
         * key={swapKey} forces the SVG to remount on each icon swap,
         * which restarts the CSS draw-in animation on the <line>.
         */}
        <svg
          key={swapKey}
          className={styles.connectorSvg}
          viewBox="0 0 340 300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <line
            className={styles.connectorLine}
            x1="152" y1="72"
            x2="208" y2="144"
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        {/* ── Label: Navixy — visible when navixy is front ── */}
        <div
          className={`${styles.labelCard} ${isNavixyFront ? styles.labelVisible : styles.labelHidden}`}
          aria-hidden={!isNavixyFront}
        >
          <p className={styles.labelTitle}>{PRODUCTS.navixy.title}</p>
          <p className={styles.labelDesc}>{PRODUCTS.navixy.desc}</p>
        </div>

        {/* ── Label: B2Field — visible when b2field is front ── */}
        <div
          className={`${styles.labelCard} ${!isNavixyFront ? styles.labelVisible : styles.labelHidden}`}
          aria-hidden={isNavixyFront}
        >
          <p className={styles.labelTitle}>{PRODUCTS.b2field.title}</p>
          <p className={styles.labelDesc}>{PRODUCTS.b2field.desc}</p>
        </div>

        {/* ── Navixy icon ──────────────────────────────────── */}
        <a
          href={PRODUCTS.navixy.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={PRODUCTS.navixy.ariaLabel}
          className={`${styles.icon} ${isNavixyFront ? styles.iconFront : styles.iconBack}`}
        >
          <img src={PRODUCTS.navixy.src} alt="" width={136} height={136} />
        </a>

        {/* ── B2Field icon ─────────────────────────────────── */}
        <a
          href={PRODUCTS.b2field.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={PRODUCTS.b2field.ariaLabel}
          className={`${styles.icon} ${!isNavixyFront ? styles.iconFront : styles.iconBack}`}
        >
          <img src={PRODUCTS.b2field.src} alt="" width={136} height={136} />
        </a>
      </div>
    </section>
  )
}
