import { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'
import { useReveal } from '../hooks/useReveal'

export interface StatItem {
  value: number
  suffix: string
  label: string
}

interface StatsSectionProps {
  stats: StatItem[]
}

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

function AnimatedStat({
  value,
  suffix,
  label,
  index,
  visible,
}: StatItem & { index: number; visible: boolean }) {
  const fadeDelayMs = 200 + index * 150
  const [countTrigger, setCountTrigger] = useState(false)

  useEffect(() => {
    if (!visible) {
      setCountTrigger(false)
      return
    }
    const id = window.setTimeout(() => setCountTrigger(true), fadeDelayMs)
    return () => clearTimeout(id)
  }, [visible, fadeDelayMs])

  const count = useCountUp(value, 1600, countTrigger)

  return (
    <div
      className={`${styles.stat} ${visible ? styles.statVisible : ''}`}
      style={{ transitionDelay: `${fadeDelayMs}ms` }}
    >
      <p className={styles.statValue}>
        {countTrigger ? `${count}${suffix}` : `0${suffix}`}
      </p>
      <p className={styles.statLabel}>{label}</p>
    </div>
  )
}

export function StatsSection({ stats }: StatsSectionProps) {
  const { ref, visible } = useReveal(0.3)

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>
        {stats.map((stat, i) => (
          <AnimatedStat key={stat.label} {...stat} index={i} visible={visible} />
        ))}
      </div>
    </section>
  )
}
