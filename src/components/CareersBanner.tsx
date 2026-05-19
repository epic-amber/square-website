import { useEffect, useRef } from 'react'
import styles from './CareersBanner.module.css'
import waveLeft from '../assets/careers-banner-wave-left.png'
import waveRight from '../assets/careers-banner-wave-right.png'
import actGlobal from '../assets/careers-banner-act-global.png'
import cursorBubble from '../assets/careers-banner-cursor.png'
import locationPin from '../assets/careers-banner-pin.png'

/** Careers page banner — Figma node 117:964, 1920×328px */
export function CareersBanner() {
  const bannerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLImageElement>(null)
  const cursorRef = useRef<HTMLImageElement>(null)
  const actGlobalRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = bannerRef.current
    const pin = pinRef.current
    const cursor = cursorRef.current
    const actG = actGlobalRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cs = window.getComputedStyle(el)
    // #region agent log
    fetch('http://127.0.0.1:7467/ingest/5f799d40-434e-4d5d-8163-90401f235ed6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1ec3b5'},body:JSON.stringify({sessionId:'1ec3b5',runId:'run2',hypothesisId:'B_C_D',location:'CareersBanner.tsx:useEffect',message:'banner rendered dims + bg',data:{width:rect.width,height:rect.height,bgColor:cs.backgroundColor,bgImage:cs.backgroundImage.slice(0,80),pinRect:pin?pin.getBoundingClientRect():null,cursorRect:cursor?cursor.getBoundingClientRect():null,actGlobalRect:actG?actG.getBoundingClientRect():null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [])

  return (
    <section ref={bannerRef} className={styles.banner} data-node-id="117:964" aria-label="Careers at SquareGPS">
      {/* Wave layers — no text baked in */}
      <img className={styles.waveLeft} src={waveLeft} alt="" aria-hidden fetchPriority="high" />
      <img className={styles.waveRight} src={waveRight} alt="" aria-hidden />

      {/* Gradient overlays (CSS) */}
      <div className={styles.gradientLeft} aria-hidden />
      <div className={styles.gradientRight} aria-hidden />

      {/* Text content */}
      <div className={styles.content} data-node-id="117:1180">
        <p className={styles.eyebrow} data-node-id="117:1181">Careers at Squaregos</p>
        <h1 className={styles.heading} data-node-id="117:1182">
          Find the role that&apos;s right for you
        </h1>
      </div>

      {/* Decorative — hidden on mobile */}
      <img
        ref={pinRef}
        className={`${styles.decor} ${styles.decorPin}`}
        src={locationPin}
        alt=""
        aria-hidden
        data-node-id="117:1171"
      />
      <img
        ref={cursorRef}
        className={`${styles.decor} ${styles.decorCursor}`}
        src={cursorBubble}
        alt=""
        aria-hidden
        data-node-id="117:1172"
      />
      <img
        ref={actGlobalRef}
        className={`${styles.decor} ${styles.decorActGlobal}`}
        src={actGlobal}
        alt=""
        aria-hidden
        data-node-id="117:1165"
      />
    </section>
  )
}
