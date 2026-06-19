import type { CSSProperties } from 'react'
import styles from './TeamPhotoGrid.module.css'
import { useReveal } from '../hooks/useReveal'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'

const TEAM_MEMBERS = [
  { id: '1', name: 'Alex Johnson',  role: 'CEO & Co-founder' },
  { id: '2', name: 'Maria Perez',   role: 'CTO' },
  { id: '3', name: 'Sam Williams',  role: 'Head of Product' },
  { id: '4', name: 'Jose Martinez', role: 'Head of Engineering' },
  { id: '5', name: 'Anna Schmidt',  role: 'Lead Designer' },
  { id: '6', name: 'Ivan Petrov',   role: 'Backend Engineer' },
  { id: '7', name: 'Li Wei',        role: 'Data Engineer' },
  { id: '8', name: 'Olga Kovaleva', role: 'Product Manager' },
]

function TeamCard({
  member,
  delay,
  rc,
}: {
  member: (typeof TEAM_MEMBERS)[number]
  delay: number
  rc: string
}) {
  return (
    <div
      className={`${styles.card} ${rc}`}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      <div className={styles.photo}>
        {/* swap for <img src={member.photo} alt={member.name} className={styles.photoImg} /> when photos are ready */}
        <div className={styles.photoPlaceholder} aria-hidden />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{member.name}</p>
        <p className={styles.role}>{member.role}</p>
      </div>
    </div>
  )
}

export function TeamPhotoGrid() {
  const { ref, visible } = useReveal(0.1)
  const rc = `reveal${visible ? ' reveal--in' : ''}`

  return (
    <section className={styles.section}>
      <div className={styles.waveWrap}>
        <BrandWaveBackdrop />
      </div>

      <div className={styles.inner}>
        <div ref={ref} className={`${styles.heading} ${rc}`} style={{ transitionDelay: '0ms' }}>
          <h2 className={styles.title}>Our Team</h2>
          <p className={styles.subtitle}>
            Meet the people behind SquareGPS — passionate experts building the future of telematics together
          </p>
        </div>

        <div className={styles.grid}>
          {TEAM_MEMBERS.map((m, i) => (
            <TeamCard key={m.id} member={m} delay={80 + i * 60} rc={rc} />
          ))}
        </div>
      </div>
    </section>
  )
}
