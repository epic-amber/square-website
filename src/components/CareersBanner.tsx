import { useEffect, useRef } from 'react'
import styles from './CareersBanner.module.css'

import wave01        from '../assets/cb-wave-01.png'
import wave02        from '../assets/cb-wave-02.png'
import navixyIcon    from '../assets/cb-navixy-icon.png'
import actGlobal     from '../assets/cb-act-global.png'
import iconCode      from '../assets/cb-icon-code.png'
import iconTelematics from '../assets/cb-icon-telematics.png'
import locationPin   from '../assets/cb-location-pin.png'
import iconSam       from '../assets/cb-icon-sam.png'
import danil         from '../assets/cb-danil.png'

/** Careers page banner — Figma node 167:603, 1280×420px */
export function CareersBanner() {
  const bannerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return
    const bRect = banner.getBoundingClientRect()
    const bCs = window.getComputedStyle(banner)
    // #region agent log
    fetch('http://127.0.0.1:7467/ingest/5f799d40-434e-4d5d-8163-90401f235ed6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ec3b5' },
      body: JSON.stringify({
        sessionId: '1ec3b5', runId: 'post-fix-v4', hypothesisId: 'all',
        location: 'CareersBanner.tsx:useEffect',
        message: 'banner final diagnostics',
        data: { bannerW: bRect.width, bannerH: bRect.height, bannerBg: bCs.background.slice(0, 80) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
  }, [])

  return (
    <div className={styles.bannerWrap}>
      <section
        ref={bannerRef}
        className={styles.banner}
        aria-label="Careers at SquareGPS"
        data-node-id="167:603"
      >
        <div className={styles.stage}>
        {/* Wave 01 — Figma 175:1076: left=-333px top=-605px 1946×1228px */}
        <div className={styles.wave01}>
          <img src={wave01} alt="" aria-hidden className={styles.waveImg} />
        </div>

        {/* Wave 02 — Figma 175:1079: left=231px top=-763px 2143×1352px */}
        <div className={styles.wave02}>
          <img src={wave02} alt="" aria-hidden className={styles.waveImg} />
        </div>

        {/* Ellipse glow — Figma 167:1033 — CSS radial gradient */}
        <div className={styles.ellipseGlow} aria-hidden />

        {/* Act global — Figma 167:1017: left=713px top=22px rotate=12.65deg */}
        <img
          src={actGlobal}
          alt=""
          aria-hidden
          className={styles.actGlobal}
          data-node-id="167:1017"
        />

        {/* Navixy icon — Figma 170:1068: left=98px top=83px 107×107px */}
        <img
          src={navixyIcon}
          alt=""
          aria-hidden
          className={styles.navixyIcon}
          data-node-id="170:1068"
        />

        {/* Icon-code — Figma 167:1024: left=375px top=119px 104×91px */}
        <img
          src={iconCode}
          alt=""
          aria-hidden
          className={styles.iconCode}
          data-node-id="167:1024"
        />

        {/* Icon-telematics — Figma 170:1043: left=640px top=248px 131×108px */}
        <img
          src={iconTelematics}
          alt=""
          aria-hidden
          className={styles.iconTelematics}
          data-node-id="170:1043"
        />

        {/* Sam bubble — Figma 167:815: left=1089px top=81px 94×57px */}
        <img
          src={iconSam}
          alt=""
          aria-hidden
          className={styles.iconSam}
          data-node-id="167:815"
        />

        {/* Danil bubble — Figma 170:1053: left=383px top=301px 88×58px */}
        <img
          src={danil}
          alt=""
          aria-hidden
          className={styles.danil}
          data-node-id="170:1053"
        />

        {/* Location pin — Figma 167:822: left=937px top=140px 75×102px rotate=-12.66deg */}
        <img
          src={locationPin}
          alt=""
          aria-hidden
          className={styles.locationPin}
          data-node-id="167:822"
        />

        </div>

        {/* Text — outside .stage so it's not scaled down on mobile */}
        <div className={styles.headingGroup}>
          <h1 className={styles.heading} data-node-id="167:806">Careers</h1>
          <p className={styles.subheading}>Find the role that's right for you</p>
        </div>
      </section>
    </div>
  )
}
