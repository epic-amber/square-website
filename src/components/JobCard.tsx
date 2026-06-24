import { Link } from 'react-router-dom'
import styles from './JobCard.module.css'
import locationPinIcon from '../assets/icon-location-pin.svg'
import type { Job } from '../data/jobs'

interface JobCardProps {
  job: Job
  viewRoleLabel: string
  className?: string
}

export function JobCard({ job, viewRoleLabel, className }: JobCardProps) {
  return (
    <Link
      className={`${styles.card}${className ? ` ${className}` : ''}`}
      to={`/careers/${encodeURIComponent(job.id)}`}
      data-node-id={job.id}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <div className={styles.location}>
          <img
            className={styles.locationIcon}
            src={locationPinIcon}
            alt=""
            width={18}
            height={18}
            aria-hidden
          />
          <p className={styles.locationText}>
            <span>{job.location}</span>
            <span className={styles.locationDot} aria-hidden>·</span>
            <span>{job.format}</span>
          </p>
        </div>
      </div>
      <p className={styles.description}>{job.description}</p>
      <div className={styles.tags}>
        <span className={styles.levelPill}>{job.level}</span>
      </div>
      <p className={styles.viewRole}>
        <span>{viewRoleLabel}</span>
        <span className={styles.viewRoleArrow}>→</span>
      </p>
    </Link>
  )
}
