import styles from './EasyApplyButton.module.css'
import { LINKEDIN_FALLBACK_URL } from '../data/jobs'
import vacancyContent from '../content/vacancy.json'

interface EasyApplyButtonProps {
  /** LinkedIn job posting URL. If not provided — generic LinkedIn search fallback. */
  href?: string
  /** Full width (e.g. for mobile sticky bar, sidebar). */
  fullWidth?: boolean
  /** Optional className passthrough. */
  className?: string
}

/**
 * Easy Apply button — LinkedIn-branded CTA to external job posting.
 *
 * Used in VacancyPage sidebar, bottom CTA card, and mobile sticky bar.
 * Always opens LinkedIn in a new tab. If job.href is missing — falls back
 * to generic LinkedIn search for SquareGPS jobs.
 *
 * Shape matches site primary CTA convention (.loadMore / hero .ctaButton);
 * only background differs (LinkedIn brand blue #0A66C2).
 */
export function EasyApplyButton({
  href,
  fullWidth = false,
  className,
}: EasyApplyButtonProps) {
  const url = href || LINKEDIN_FALLBACK_URL
  const cls = [
    styles.btn,
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={url}
      className={cls}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={vacancyContent.applyAriaLabel}
    >
      {/* LinkedIn glyph — inline SVG, 24px viewBox. */}
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z"
        />
      </svg>
      <span>{vacancyContent.applyButton}</span>
    </a>
  )
}
