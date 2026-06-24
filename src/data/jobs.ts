/**
 * Job data module — single source of truth for vacancies.
 * Used in CareersSection (listing) and VacancyPage (detail).
 */

import jobsData from '../content/jobs.json'

interface RawJob {
  id: string
  title: string
  href?: string
  location: string
  country: string
  level: string
  format: string
  postedAt: string
  postedAgo?: string
  description: string
  team: string
  jobType: string
  responsibilities: string[]
  requirements: string[]
  aboutTeam?: string
  inOfficeExpectations?: string
  payAndBenefits?: string
}

export interface Job {
  id: string
  title: string
  /** External LinkedIn job posting URL (if present — Easy Apply links there). */
  href?: string
  location: string
  country: string
  level: string
  format: string
  /** ISO date YYYY-MM-DD — used for sorting. */
  postedAt: string
  /** Computed relative time string ("2 months ago"). */
  postedAgo: string
  /** Short description shown on the list card. */
  description: string

  // ── Detail page fields ───────────────────────────────────────────
  team: string
  jobType: string
  responsibilities: string[]
  requirements: string[]
  aboutTeam?: string
  inOfficeExpectations?: string
  payAndBenefits?: string
}

function formatTimeAgo(dateStr: string): string {
  const posted = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - posted.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  const weeks = Math.floor(diffDays / 7)
  if (weeks < 5) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  const months = Math.floor(diffDays / 30)
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`
  const years = Math.floor(diffDays / 365)
  return years === 1 ? '1 year ago' : `${years} years ago`
}

/**
 * LinkedIn fallback — generic search for vacancies without a specific posting URL.
 */
export const LINKEDIN_FALLBACK_URL = 'https://www.linkedin.com/jobs/squaregps-jobs-worldwide/'

export const JOBS: Job[] = (jobsData as RawJob[]).map((raw) => ({
  ...raw,
  postedAgo: formatTimeAgo(raw.postedAt),
}))

/**
 * Lookup helper — returns a Job by id, or undefined.
 */
export function getJobById(id: string | undefined): Job | undefined {
  if (!id) return undefined
  return JOBS.find((j) => j.id === id)
}
