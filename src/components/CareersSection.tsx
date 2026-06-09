import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  postedAt: string  // ISO date YYYY-MM-DD — used for sorting
  postedAgo: string // display string ("1 month ago")
  description: string
}

const JOBS: Job[] = [
  {
    id: '106:90',
    title: 'Head of Data Platform',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAt: '2026-05-08',
    postedAgo: '1 month ago',
    description:
      'Lead the architecture of data systems behind global telematics products. Drive technical strategy and mentor a cross-functional team building scalable pipelines.',
  },
  {
    id: '106:103',
    title: 'Senior Backend Developer',
    href: 'https://www.linkedin.com/jobs/view/4382027831/',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Senior',
    format: 'Hybrid',
    postedAt: '2026-05-12',
    postedAgo: '1 month ago',
    description:
      'Build and scale the backend infrastructure powering real-time fleet tracking for thousands of customers worldwide. Work with modern stack and a senior team.',
  },
  {
    id: '106:115',
    title: 'Technical Writer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Middle',
    format: 'Hybrid',
    postedAt: '2026-05-15',
    postedAgo: '1 month ago',
    description:
      'Create clear, precise documentation for developer APIs and end-user guides across SquareGPS product lines. Collaborate with engineering and product teams.',
  },
  {
    id: '106:127',
    title: 'Technical Support Engineer L2',
    href: 'https://www.linkedin.com/jobs/view/4378891572/',
    location: 'Mexico City, Mexico',
    country: 'Mexico',
    level: 'Senior',
    format: 'Full-time',
    postedAt: '2026-05-05',
    postedAgo: '1 month ago',
    description:
      'Resolve complex technical issues for enterprise clients and collaborate with engineering to continuously improve product reliability and customer experience.',
  },
  {
    id: '127:2040',
    title: 'Product Manager',
    location: 'Westlake Village, USA',
    country: 'USA',
    level: 'Lead',
    format: 'Full-time',
    postedAt: '2026-04-10',
    postedAgo: '2 months ago',
    description:
      'Own the product roadmap for our flagship telematics platform. Partner with design, engineering and customer success to ship features that move the business.',
  },
  {
    id: 'extra:1',
    title: 'Frontend Developer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Middle',
    format: 'Remote',
    postedAt: '2026-05-20',
    postedAgo: '3 weeks ago',
    description:
      'Build delightful, performant interfaces for SquareGPS web products. Work closely with design system, backend, and product to ship polished features end-to-end.',
  },
  {
    id: 'extra:2',
    title: 'Senior DevOps Engineer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Senior',
    format: 'Remote',
    postedAt: '2026-05-22',
    postedAgo: '3 weeks ago',
    description:
      'Own and evolve our cloud infrastructure, CI/CD pipelines, and observability stack. Help engineering teams ship faster with confidence at telematics scale.',
  },
  {
    id: 'extra:3',
    title: 'Product Designer',
    location: 'Belgrade, Serbia',
    country: 'Serbia',
    level: 'Middle',
    format: 'Hybrid',
    postedAt: '2026-05-18',
    postedAgo: '3 weeks ago',
    description:
      'Shape the visual and interaction design of our fleet management products. Partner with product, engineering, and research to deliver intuitive experiences for global customers.',
  },
  {
    id: 'extra:4',
    title: 'Customer Success Manager',
    location: 'Mexico City, Mexico',
    country: 'Mexico',
    level: 'Middle',
    format: 'Hybrid',
    postedAt: '2026-05-02',
    postedAgo: '5 weeks ago',
    description:
      'Build long-term partnerships with enterprise customers. Drive adoption, identify expansion opportunities, and serve as the trusted advisor on telematics best practices.',
  },
  {
    id: 'extra:5',
    title: 'Sales Director, North America',
    location: 'Westlake Village, USA',
    country: 'USA',
    level: 'Lead',
    format: 'Full-time',
    postedAt: '2026-04-25',
    postedAgo: '6 weeks ago',
    description:
      'Lead and scale our North American sales organization. Define go-to-market strategy, build the playbook, and grow a high-performing team across enterprise and mid-market segments.',
  },
]

/* ── Filter options ──────────────────────────────────────────── */

const LOCATION_FILTERS = ['All', 'Serbia', 'Mexico', 'USA'] as const
type LocationFilter = (typeof LOCATION_FILTERS)[number]

const EMPLOYMENT_FILTERS = ['Full-time', 'Hybrid', 'Remote'] as const
type EmploymentFilter = (typeof EMPLOYMENT_FILTERS)[number] | null

const EXPERIENCE_FILTERS = ['Lead', 'Senior', 'Middle', 'Junior'] as const
type ExperienceFilter = (typeof EXPERIENCE_FILTERS)[number] | null

const INITIAL_VISIBLE = 6
const LOAD_STEP = 5

type SortDir = 'newest' | 'oldest'

/* ── JobCard — wide single-column card ──────────────────────── */

function JobCard({ job }: { job: Job }) {
  const inner = (
    <>
      <div className={styles.cardHeader}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <span className={styles.levelPill}>{job.level}</span>
      </div>

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

      <p className={styles.description}>{job.description}</p>

      <div className={styles.cardFooter}>
        <p className={styles.postedDate}>Posted {job.postedAgo}</p>
        <p className={styles.viewRole}>
          <span>View role</span>
          <span className={styles.viewRoleArrow}>→</span>
        </p>
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
        {inner}
      </a>
    )
  }

  return (
    <Link className={styles.card} to="/careers" data-node-id={job.id}>
      {inner}
    </Link>
  )
}

/* ── Filter Sidebar (left, sticky on desktop) ──────────────── */

interface FilterSidebarProps {
  location: LocationFilter
  employment: EmploymentFilter
  experience: ExperienceFilter
  onLocation: (v: LocationFilter) => void
  onEmployment: (v: EmploymentFilter) => void
  onExperience: (v: ExperienceFilter) => void
  onReset: () => void
  hasActiveFilters: boolean
}

function FilterSidebar({
  location,
  employment,
  experience,
  onLocation,
  onEmployment,
  onExperience,
  onReset,
  hasActiveFilters,
}: FilterSidebarProps) {
  return (
    <aside className={styles.sidebar} data-node-id="106:188">
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarTitle}>Location</p>
        <div className={styles.sidebarChips}>
          {LOCATION_FILTERS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={location === f}
              onClick={() => onLocation(f)}
            />
          ))}
        </div>
      </div>

      <div className={styles.sidebarDivider} aria-hidden />

      <div className={styles.sidebarSection}>
        <p className={styles.sidebarTitle}>Employment</p>
        <div className={styles.sidebarChips}>
          {EMPLOYMENT_FILTERS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={employment === f}
              onClick={() => onEmployment(employment === f ? null : f)}
            />
          ))}
        </div>
      </div>

      <div className={styles.sidebarDivider} aria-hidden />

      <div className={styles.sidebarSection}>
        <p className={styles.sidebarTitle}>Experience</p>
        <div className={styles.sidebarChips}>
          {EXPERIENCE_FILTERS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={experience === f}
              onClick={() => onExperience(experience === f ? null : f)}
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <div className={styles.sidebarDivider} aria-hidden />
          <button type="button" className={styles.resetBtn} onClick={onReset}>
            Reset all filters
          </button>
        </>
      )}
    </aside>
  )
}

/* ── Main section ────────────────────────────────────────────── */

export function CareersSection() {
  const [location, setLocation] = useState<LocationFilter>('All')
  const [employment, setEmployment] = useState<EmploymentFilter>(null)
  const [experience, setExperience] = useState<ExperienceFilter>(null)
  const [sort, setSort] = useState<SortDir>('newest')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const filtered = JOBS.filter((j) => {
    if (location !== 'All' && j.country !== location) return false
    if (employment && j.format !== employment) return false
    if (experience && j.level !== experience) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const diff = +new Date(b.postedAt) - +new Date(a.postedAt)
    return sort === 'newest' ? diff : -diff
  })

  const visibleJobs = sorted.slice(0, visibleCount)
  const remaining = Math.max(0, sorted.length - visibleCount)
  const hasActiveFilters = location !== 'All' || employment !== null || experience !== null

  // Любая смена filters/sort сбрасывает visibleCount —
  // иначе после "Show more" фильтр может неожиданно показать слишком много.
  const resetVisible = () => setVisibleCount(INITIAL_VISIBLE)

  const handleLocation = (l: LocationFilter) => { setLocation(l); resetVisible() }
  const handleEmployment = (e: EmploymentFilter) => { setEmployment(e); resetVisible() }
  const handleExperience = (e: ExperienceFilter) => { setExperience(e); resetVisible() }
  const handleSort = () => {
    setSort((s) => (s === 'newest' ? 'oldest' : 'newest'))
    resetVisible()
  }
  const handleReset = () => {
    setLocation('All')
    setEmployment(null)
    setExperience(null)
    resetVisible()
  }
  const handleLoadMore = () => {
    setVisibleCount((v) => v + LOAD_STEP)
  }

  return (
    <section className={styles.section} data-node-id="125:1596">
      <div className={styles.inner}>
        <FilterSidebar
          location={location}
          employment={employment}
          experience={experience}
          onLocation={handleLocation}
          onEmployment={handleEmployment}
          onExperience={handleExperience}
          onReset={handleReset}
          hasActiveFilters={hasActiveFilters}
        />

        <div className={styles.contentColumn}>
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              <strong>{sorted.length}</strong> open {sorted.length === 1 ? 'role' : 'roles'}
            </p>

            <button
              type="button"
              className={styles.sortToggle}
              onClick={handleSort}
              aria-label={`Sort by date, currently ${sort === 'newest' ? 'newest first' : 'oldest first'}. Click to switch.`}
            >
              <span className={styles.sortLabel}>Sort:</span>
              <span className={styles.sortValue}>{sort === 'newest' ? 'Newest' : 'Oldest'}</span>
              <span className={styles.sortArrow} aria-hidden>{sort === 'newest' ? '↓' : '↑'}</span>
            </button>
          </div>

          <div className={styles.jobList}>
            {visibleJobs.length > 0 ? (
              visibleJobs.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <div className={styles.empty}>
                <p>No open positions match the selected filters.</p>
                <button type="button" className={styles.emptyResetBtn} onClick={handleReset}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {remaining > 0 && (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={handleLoadMore}
              >
                Show {remaining} more {remaining === 1 ? 'role' : 'roles'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
