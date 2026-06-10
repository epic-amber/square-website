import { forwardRef, useEffect, useRef, useState } from 'react'
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

const INITIAL_VISIBLE = 6
const LOAD_STEP = 5

type SortDir = 'newest' | 'oldest'

/* ── JobCard — wide single-column card ──────────────────────── */

interface JobCardProps {
  job: Job
  /** Если true → играем cardEnter animation (только для newly added). */
  isNew?: boolean
  /** Animation delay в секундах для stagger эффекта. */
  enterDelay?: number
}

const JobCard = forwardRef<HTMLAnchorElement, JobCardProps>(
  ({ job, isNew, enterDelay }, ref) => {
    const className = `${styles.card}${isNew ? ` ${styles.cardEnter}` : ''}`
    const style: React.CSSProperties | undefined =
      isNew && enterDelay !== undefined
        ? { animationDelay: `${enterDelay}s` }
        : undefined

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

    /* Все cards теперь ведут на внутреннюю VacancyPage. Кнопка Easy Apply  */
    /* там ведёт на LinkedIn (job.href или generic search fallback).        */
    return (
      <Link
        ref={ref}
        className={className}
        style={style}
        to={`/careers/${encodeURIComponent(job.id)}`}
        data-node-id={job.id}
      >
        {inner}
      </Link>
    )
  },
)
JobCard.displayName = 'JobCard'

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
  /* Mobile filter sheet open state — desktop sidebar всегда visible. */
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  // Tracking для Load more UX:
  //   prevVisibleRef — visibleCount на момент предыдущего render
  //   newCardStartIdx — индекс первой newly added карточки (для animation + scroll)
  //   firstNewCardRef — DOM-ref на первую новую карточку (target для scrollIntoView)
  const prevVisibleRef = useRef(INITIAL_VISIBLE)
  const newCardStartIdx = prevVisibleRef.current
  const firstNewCardRef = useRef<HTMLAnchorElement>(null)

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

  /* Active filter count для mobile button badge ("Filters · 2").       */
  /* Считаем все три оси: location !== 'All', employment/experience !== null. */
  const activeFilterCount =
    (location !== 'All' ? 1 : 0) +
    (employment !== null ? 1 : 0) +
    (experience !== null ? 1 : 0)

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

  // После каждого изменения visibleCount: если он вырос (Load more clicked) —
  // плавно скроллим первую новую карточку в top viewport.
  // resetVisible (filter/sort change) → visibleCount уменьшается → скролл skip.
  useEffect(() => {
    if (visibleCount > prevVisibleRef.current && firstNewCardRef.current) {
      firstNewCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    prevVisibleRef.current = visibleCount
  }, [visibleCount])

  return (
    <section className={styles.section} data-node-id="125:1596">
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
              visibleJobs.map((j, idx) => {
                const isNew = idx >= newCardStartIdx
                const enterDelay = isNew ? (idx - newCardStartIdx) * 0.08 : 0
                return (
                  <JobCard
                    key={j.id}
                    job={j}
                    isNew={isNew}
                    enterDelay={enterDelay}
                    ref={idx === newCardStartIdx ? firstNewCardRef : undefined}
                  />
                )
              })
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
