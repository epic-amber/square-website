import { useState, useEffect, useRef } from 'react'
import styles from './CareersSection.module.css'
import { FilterChip } from './FilterChip'
import locationPinIcon from '../assets/icon-location-pin.svg'

/* ── Data types ──────────────────────────────────────────────── */

interface Job {
  id: string
  title: string
  href?: string
  location: string
  country: 'Serbia' | 'Mexico' | 'USA'
  level: string
  format: string
  postedAgo: string
}

/* ── Job data (Figma node 106:186 / 125:1596) ─────────────────── */

const JOBS: Job[] = [
  {
    id: '106:90',
    title: 'Head of Data Platform',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '106:103',
    title: 'Senior Backend Developer',
    href: 'https://www.linkedin.com/jobs/view/4382027831/',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '106:115',
    title: 'Technical Writer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Middle',
    format: 'Hybrid',
    postedAgo: '1 month ago',
  },
  {
    id: '106:127',
    title: 'Technical Support Engineer L2',
    href: 'https://www.linkedin.com/jobs/view/4378891572/',
    location: 'Mexico City, Mexico',
    country: 'Mexico',
    level: 'Senior',
    format: 'Full-time',
    postedAgo: '1 month ago',
  },
  {
    id: '127:2040',
    title: 'Product Manager',
    location: 'Westlake Village, USA',
    country: 'USA',
    level: 'Lead',
    format: 'Full-time',
    postedAgo: '2 months ago',
  },
  {
    id: 'extra:1',
    title: 'Frontend Developer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Middle',
    format: 'Remote',
    postedAgo: '3 weeks ago',
  },
]

/* ── Filter options ──────────────────────────────────────────── */

const LOCATION_FILTERS = ['All', 'Serbia', 'Mexico', 'USA'] as const
type LocationFilter = (typeof LOCATION_FILTERS)[number]

const EMPLOYMENT_FILTERS = ['Full-time', 'Hybrid', 'Remote'] as const
type EmploymentFilter = (typeof EMPLOYMENT_FILTERS)[number] | null

const EXPERIENCE_FILTERS = ['Lead', 'Senior', 'Middle', 'Junior'] as const
type ExperienceFilter = (typeof EXPERIENCE_FILTERS)[number] | null

const ITEMS_PER_PAGE = 5

/* ── Sub-components ─────────────────────────────────────────── */

function JobCard({ job }: { job: Job }) {
  const content = (
    <>
      <div className={styles.cardTop}>
        <p className={styles.jobTitle}>{job.title}</p>
        <div className={styles.location}>
          <img
            className={styles.locationIcon}
            src={locationPinIcon}
            alt=""
            aria-hidden
            width={18}
            height={18}
          />
          <p className={styles.locationText}>{job.location}</p>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.tags}>
          <span className={styles.tag}>{job.level}</span>
          {job.format && <span className={styles.tag}>{job.format}</span>}
        </div>
        <p className={styles.date}>{job.postedAgo}</p>
      </div>
    </>
  )

  if (job.href) {
    return (
      <a
        className={styles.card}
        href={job.href}
        target="_blank"
        rel="noopener noreferrer"
        data-node-id={job.id}
      >
        {content}
      </a>
    )
  }

  return (
    <article className={styles.card} data-node-id={job.id}>
      {content}
    </article>
  )
}

function FilterSidebar({
  employment,
  experience,
  onEmployment,
  onExperience,
}: {
  employment: EmploymentFilter
  experience: ExperienceFilter
  onEmployment: (v: EmploymentFilter) => void
  onExperience: (v: ExperienceFilter) => void
}) {
  return (
    <aside className={styles.sidebar} data-node-id="106:188">
      <div className={styles.sidebarSection} data-node-id="106:170">
        <p className={styles.sidebarTitle} data-node-id="106:158">Employment</p>
        <div className={styles.sidebarChips} data-node-id="106:169">
          {EMPLOYMENT_FILTERS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              size="sm"
              active={employment === f}
              onClick={() => onEmployment(employment === f ? null : f)}
            />
          ))}
        </div>
      </div>
      <div className={styles.sidebarSection} data-node-id="106:171">
        <p className={styles.sidebarTitle} data-node-id="106:172">Experience</p>
        <div className={styles.sidebarChips} data-node-id="106:173">
          {EXPERIENCE_FILTERS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              size="sm"
              active={experience === f}
              onClick={() => onExperience(experience === f ? null : f)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

function Pagination({
  page,
  total,
  onChange,
}: {
  page: number
  total: number
  onChange: (p: number) => void
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <nav className={styles.pagination} aria-label="Job list pages" data-node-id="125:1598">
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${styles.pageItem} ${p === page ? styles.pageItemActive : styles.pageItemInactive}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          data-node-id={p === 1 ? '125:1599' : '125:1601'}
        >
          {p}
        </button>
      ))}
    </nav>
  )
}

/* ── Main section ────────────────────────────────────────────── */

export function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cs = window.getComputedStyle(el)
    // #region agent log
    fetch('http://127.0.0.1:7467/ingest/5f799d40-434e-4d5d-8163-90401f235ed6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1ec3b5'},body:JSON.stringify({sessionId:'1ec3b5',runId:'run2',hypothesisId:'A',location:'CareersSection.tsx:useEffect',message:'section bg color',data:{bgColor:cs.backgroundColor,width:el.offsetWidth,paddingTop:cs.paddingTop},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }, [])
  const [location, setLocation] = useState<LocationFilter>('All')
  const [employment, setEmployment] = useState<EmploymentFilter>(null)
  const [experience, setExperience] = useState<ExperienceFilter>(null)
  const [page, setPage] = useState(1)

  const filtered = JOBS.filter((j) => {
    if (location !== 'All' && j.country !== location) return false
    if (employment && j.format !== employment) return false
    if (experience && j.level !== experience) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const visibleJobs = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleLocation = (l: LocationFilter) => {
    setLocation(l)
    setPage(1)
  }

  const handleEmployment = (e: EmploymentFilter) => {
    setEmployment(e)
    setPage(1)
  }

  const handleExperience = (e: ExperienceFilter) => {
    setExperience(e)
    setPage(1)
  }

  return (
    <section ref={sectionRef} className={styles.section} data-node-id="125:1596">
      <div className={styles.inner}>
        {/* Top location filter row — Figma 106:225 */}
        <div className={styles.topFilter} data-node-id="106:225">
          {LOCATION_FILTERS.map((l) => (
            <FilterChip
              key={l}
              label={l}
              size="md"
              active={location === l}
              onClick={() => handleLocation(l)}
            />
          ))}
        </div>

        {/* Two-column layout: job list + sidebar */}
        <div className={styles.body} data-node-id="106:189">
          {/* Job list — Figma 106:186 */}
          <div className={styles.jobList} data-node-id="106:186">
            {visibleJobs.length > 0 ? (
              visibleJobs.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <p className={styles.empty}>No open positions match the selected filters.</p>
            )}
          </div>

          {/* Sidebar — Figma 106:188 */}
          <FilterSidebar
            employment={employment}
            experience={experience}
            onEmployment={handleEmployment}
            onExperience={handleExperience}
          />
        </div>

        {/* Pagination — shown only when total > 1 page */}
        {totalPages > 1 && (
          <Pagination page={page} total={totalPages} onChange={setPage} />
        )}
      </div>
    </section>
  )
}
