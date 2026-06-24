import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './FilterBottomSheet.module.css'
import { FilterChip } from './FilterChip'
import careersContent from '../content/careers.json'

/* ── Filter contracts ──────────────────────────────────────────── */

type LocationFilter = string
type EmploymentFilter = string | null
type ExperienceFilter = string | null

const LOCATION_FILTERS = careersContent.filters.locations
const EMPLOYMENT_FILTERS = careersContent.filters.employments
const EXPERIENCE_FILTERS = careersContent.filters.experiences

interface FilterBottomSheetProps {
  open: boolean
  onClose: () => void
  /** Count of matching cards — for the live "Show N roles" footer button. */
  resultsCount: number
  /** How many filters are actually active (for empty/reset state).   */
  activeCount: number

  location: LocationFilter
  employment: EmploymentFilter
  experience: ExperienceFilter

  onLocation: (v: LocationFilter) => void
  onEmployment: (v: EmploymentFilter) => void
  onExperience: (v: ExperienceFilter) => void
  onReset: () => void
}

/**
 * FilterBottomSheet — mobile-only modal with filter UI.
 *
 * Pattern: bottom sheet slides up from viewport edge; instant apply
 * (each tap on a chip instantly updates cards in background).
 * Footer button "Show N roles" updates the count live and closes the sheet.
 *
 * Behaviour:
 *  - Body scroll lock while open (prevents background scroll)
 *  - ESC closes
 *  - Backdrop click closes
 *  - Focus trap inside sheet (basic — sticks to close button on open)
 *  - Rendered via portal into document.body → escape stacking issues
 *
 * Accessibility:
 *  - role="dialog", aria-modal="true", aria-labelledby
 *  - Focus management on open/close
 */
export function FilterBottomSheet({
  open,
  onClose,
  resultsCount,
  activeCount,
  location,
  employment,
  experience,
  onLocation,
  onEmployment,
  onExperience,
  onReset,
}: FilterBottomSheetProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  /* Body scroll lock + ESC handler + focus management. */
  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    /* Focus close button after the open animation starts (next tick). */
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', handleKey)
      window.clearTimeout(focusTimer)
      /* Restore focus to trigger button after close. */
      previouslyFocusedRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  const sheet = (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className={styles.header}>
          {/* Drag handle — visual affordance that the sheet is swipeable.       */}
          {/* We do not implement swipe-to-dismiss in this round, but the       */}
          {/* handle sets the correct mental model.                              */}
          <div className={styles.handle} aria-hidden />

          <div className={styles.headerRow}>
            <h2 id="filter-sheet-title" className={styles.title}>
              {careersContent.results.filtersLabel}
              {activeCount > 0 && (
                <span className={styles.titleCount}>· {activeCount}</span>
              )}
            </h2>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label={careersContent.results.closeFiltersAriaLabel}
            >
              <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div className={styles.body}>
          <FilterGroup title={careersContent.filters.locationTitle}>
            {LOCATION_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={location === f}
                onClick={() => onLocation(f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title={careersContent.filters.employmentTitle}>
            {EMPLOYMENT_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={employment === f}
                onClick={() => onEmployment(employment === f ? null : f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title={careersContent.filters.experienceTitle}>
            {EXPERIENCE_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={experience === f}
                onClick={() => onExperience(experience === f ? null : f)}
              />
            ))}
          </FilterGroup>
        </div>

        {/* Sticky footer — Reset + Apply CTA */}
        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onReset}
            disabled={activeCount === 0}
          >
            {careersContent.results.resetButton}
          </button>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={onClose}
          >
            {careersContent.results.showButton} {resultsCount} {resultsCount === 1 ? careersContent.results.openRole : careersContent.results.openRoles}
          </button>
        </footer>
      </div>
    </div>
  )

  /* Portal into body → stacks above any z-index on the page. */
  return createPortal(sheet, document.body)
}

/* ── FilterGroup — internal layout helper ─────────────────────── */
function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      <div className={styles.groupChips}>{children}</div>
    </div>
  )
}
