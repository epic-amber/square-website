import { useEffect, useRef, useState } from 'react'
import styles from './CareersSection.module.css'
import { FilterChip } from './FilterChip'
import { BrandWaveBackdrop } from './BrandWaveBackdrop'
import { FilterBottomSheet } from './FilterBottomSheet'
import { JobCard } from './JobCard'
import { JOBS } from '../data/jobs'
import careersContent from '../content/careers.json'

/* ── Filter options ──────────────────────────────────────────── */

const LOCATION_FILTERS = careersContent.filters.locations
const EMPLOYMENT_FILTERS = careersContent.filters.employments
const EXPERIENCE_FILTERS = careersContent.filters.experiences

type LocationFilter = string
type EmploymentFilter = string | null
type ExperienceFilter = string | null

const PAGE_SIZE = 5

type SortDir = 'newest' | 'oldest'

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
        <p className={styles.sidebarTitle}>{careersContent.filters.locationTitle}</p>
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
        <p className={styles.sidebarTitle}>{careersContent.filters.employmentTitle}</p>
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
        <p className={styles.sidebarTitle}>{careersContent.filters.experienceTitle}</p>
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
            {careersContent.filters.resetAll}
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
  /* Mobile filter sheet open state — desktop sidebar is always visible. */
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

  /* Active filter count for the mobile button badge ("Filters · 2").   */
  /* Counts all three axes: location !== 'All', employment/experience !== null. */
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
      {/* Animated Stripe-style wave — atmosphere in the lower part of the   */}
      {/* section. Bottom-anchored, full-bleed. Sits BELOW the sidebar      */}
      {/* thanks to min-height on .inner → does not overlap filter chips.   */}
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
              <strong>{sorted.length}</strong> {sorted.length === 1 ? careersContent.results.openRole : careersContent.results.openRoles}
            </p>

            <div className={styles.resultsActions}>
              <button
                type="button"
                className={styles.sortToggle}
                onClick={handleSort}
                aria-label={`${careersContent.results.sortAriaPrefix} ${sort === 'newest' ? 'newest first' : 'oldest first'}. ${careersContent.results.sortAriaSuffix}`}
              >
                <span className={styles.sortLabel}>{careersContent.results.sortLabel}</span>
                <span className={styles.sortValue}>{sort === 'newest' ? careersContent.results.newest : careersContent.results.oldest}</span>
                <span className={styles.sortArrow} aria-hidden>{sort === 'newest' ? '↓' : '↑'}</span>
              </button>

              {/* Mobile-only Filters trigger → opens FilterBottomSheet.        */}
              {/* Hidden on desktop via CSS (.filterTrigger media query).        */}
              <button
                type="button"
                className={styles.filterTrigger}
                onClick={() => setFilterSheetOpen(true)}
                aria-label={`${careersContent.results.openFiltersAriaLabel}${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ''}`}
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
                <span>{careersContent.results.filtersLabel}</span>
                {activeFilterCount > 0 && (
                  <span className={styles.filterTriggerBadge}>{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>

          <div className={styles.jobList}>
            {visibleJobs.length > 0 ? (
              visibleJobs.map((j) => (
                <JobCard key={j.id} job={j} viewRoleLabel={careersContent.viewRole} />
              ))
            ) : (
              <div className={styles.empty}>
                <p>{careersContent.empty.message}</p>
                <button type="button" className={styles.emptyResetBtn} onClick={handleReset}>
                  {careersContent.empty.resetButton}
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageArrow} disabled={page === 1} onClick={() => setPage(p => p - 1)} aria-label={careersContent.results.previousPage}>←</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} className={page === i + 1 ? styles.pageActive : styles.pageBtn} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className={styles.pageArrow} disabled={page === totalPages} onClick={() => setPage(p => p + 1)} aria-label={careersContent.results.nextPage}>→</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter modal — open via .filterTrigger button. Instant apply: */}
      {/* tapping a chip instantly updates state → cards in background.        */}
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
