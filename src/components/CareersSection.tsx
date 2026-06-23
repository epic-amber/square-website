import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CareersSection.module.css'
import { FilterChip } from './FilterChip'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'
import { FilterBottomSheet } from './FilterBottomSheet'
import locationPinIcon from '../assets/icon-location-pin.svg'
import { JOBS, type Job } from '../data/jobs'

/* ── Filter options ──────────────────────────────────────────── */

const LOCATION_FILTERS = ['All', 'Serbia', 'Mexico', 'USA'] as const
type LocationFilter = (typeof LOCATION_FILTERS)[number]

const EMPLOYMENT_FILTERS = ['Full-time', 'Hybrid', 'Remote'] as const
type EmploymentFilter = (typeof EMPLOYMENT_FILTERS)[number] | null

const EXPERIENCE_FILTERS = ['Lead', 'Senior', 'Middle', 'Junior'] as const
type ExperienceFilter = (typeof EXPERIENCE_FILTERS)[number] | null

const PAGE_SIZE = 5

type SortDir = 'newest' | 'oldest'

/* ── JobCard — grid card ────────────────────────────────────── */

function JobCard({ job }: { job: Job }) {
  return (
    <Link className={styles.card} to={`/careers/${encodeURIComponent(job.id)}`} data-node-id={job.id}>
      <div className={styles.cardHeader}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <div className={styles.location}>
          <img className={styles.locationIcon} src={locationPinIcon} alt="" width={18} height={18} aria-hidden />
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
        <span>View role</span>
        <span className={styles.viewRoleArrow}>→</span>
      </p>
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
  const [page, setPage] = useState(1)
  /* Mobile filter sheet open state — desktop sidebar всегда visible. */
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const visibleJobs = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const hasActiveFilters = location !== 'All' || employment !== null || experience !== null

  /* Active filter count для mobile button badge ("Filters · 2").       */
  /* Считаем все три оси: location !== 'All', employment/experience !== null. */
  const activeFilterCount =
    (location !== 'All' ? 1 : 0) +
    (employment !== null ? 1 : 0) +
    (experience !== null ? 1 : 0)

  const handleLocation = (l: LocationFilter) => { setLocation(l); setPage(1) }
  const handleEmployment = (e: EmploymentFilter) => { setEmployment(e); setPage(1) }
  const handleExperience = (e: ExperienceFilter) => { setExperience(e); setPage(1) }
  const handleSort = () => {
    setSort((s) => (s === 'newest' ? 'oldest' : 'newest'))
    setPage(1)
  }
  const handleReset = () => {
    setLocation('All')
    setEmployment(null)
    setExperience(null)
    setPage(1)
  }

  useEffect(() => {
    if (page > 1 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [page])

  return (
    <section ref={sectionRef} className={styles.section} data-node-id="125:1596">
      {/* Animated Stripe-style wave — атмосфера в нижней части section.    */}
      {/* Bottom-anchored, full-bleed. Сидит ПОД sidebar благодаря          */}
      {/* min-height на .inner → не пересекает filter chips.                */}
      <BrandWaveBackdrop />

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

            <div className={styles.resultsActions}>
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

              {/* Mobile-only Filters trigger → opens FilterBottomSheet.        */}
              {/* Hidden on desktop через CSS (.filterTrigger media query).      */}
              <button
                type="button"
                className={styles.filterTrigger}
                onClick={() => setFilterSheetOpen(true)}
                aria-label={`Open filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
                aria-haspopup="dialog"
                aria-expanded={filterSheetOpen}
              >
                <svg
                  viewBox="0 0 20 20"
                  width="16"
                  height="16"
                  aria-hidden
                  className={styles.filterTriggerIcon}
                >
                  <path
                    d="M3 5h14M5.5 10h9M8 15h4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className={styles.filterTriggerBadge}>{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>

          <div className={styles.jobList}>
            {visibleJobs.length > 0 ? (
              visibleJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))
            ) : (
              <div className={styles.empty}>
                <p>No open positions match the selected filters.</p>
                <button type="button" className={styles.emptyResetBtn} onClick={handleReset}>
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageArrow} disabled={page === 1} onClick={() => setPage(p => p - 1)} aria-label="Previous page">←</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} className={page === i + 1 ? styles.pageActive : styles.pageBtn} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className={styles.pageArrow} disabled={page === totalPages} onClick={() => setPage(p => p + 1)} aria-label="Next page">→</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter modal — open via .filterTrigger button. Instant apply: */}
      {/* tap по чипу мгновенно обновляет state → cards в background.          */}
      <FilterBottomSheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        resultsCount={sorted.length}
        activeCount={activeFilterCount}
        location={location}
        employment={employment}
        experience={experience}
        onLocation={handleLocation}
        onEmployment={handleEmployment}
        onExperience={handleExperience}
        onReset={handleReset}
      />
    </section>
  )
}
