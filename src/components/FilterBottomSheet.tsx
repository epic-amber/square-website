import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './FilterBottomSheet.module.css'
import { FilterChip } from './FilterChip'

/* ── Filter contracts (mirrored from CareersSection types) ─────── */
/* Keep aligned: any change here = sync CareersSection.tsx contracts. */

type LocationFilter = 'All' | 'Serbia' | 'Mexico' | 'USA'
type EmploymentFilter = 'Full-time' | 'Hybrid' | 'Remote' | null
type ExperienceFilter = 'Lead' | 'Senior' | 'Middle' | 'Junior' | null

const LOCATION_FILTERS = ['All', 'Serbia', 'Mexico', 'USA'] as const
const EMPLOYMENT_FILTERS = ['Full-time', 'Hybrid', 'Remote'] as const
const EXPERIENCE_FILTERS = ['Lead', 'Senior', 'Middle', 'Junior'] as const

interface FilterBottomSheetProps {
  open: boolean
  onClose: () => void
  /** Count матчящих cards — для live "Show N roles" footer button.  */
  resultsCount: number
  /** Сколько фильтров реально active (для empty/reset state).        */
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
 * FilterBottomSheet — mobile-only modal с filter UI.
 *
 * Pattern: bottom sheet slides up from viewport edge; instant apply
 * (каждый tap по чипу мгновенно обновляет cards в background).
 * Footer button "Show N roles" обновляет count live и закрывает sheet.
 *
 * Behaviour:
 *  - Body scroll lock пока open (предотвращает background scroll)
 *  - ESC закрывает
 *  - Backdrop click закрывает
 *  - Focus trap внутри sheet (basic — sticks to close button at open)
 *  - Rendered через portal в document.body → escape stacking issues
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

    /* Focus close button после open animation начала (next tick). */
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
      /* Restore focus to trigger button после close. */
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
          {/* Drag handle — visual affordance что sheet swipeable                */}
          {/* (мы не implement'им swipe-to-dismiss в этом раунде, но handle      */}
          {/* sets правильное mental model).                                      */}
          <div className={styles.handle} aria-hidden />

          <div className={styles.headerRow}>
            <h2 id="filter-sheet-title" className={styles.title}>
              Filters
              {activeCount > 0 && (
                <span className={styles.titleCount}>· {activeCount}</span>
              )}
            </h2>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close filters"
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
          <FilterGroup title="Location">
            {LOCATION_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={location === f}
                onClick={() => onLocation(f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Employment">
            {EMPLOYMENT_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={employment === f}
                onClick={() => onEmployment(employment === f ? null : f)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Experience">
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
            Reset
          </button>
          <button
            type="button"
            className={styles.applyBtn}
            onClick={onClose}
          >
            Show {resultsCount} {resultsCount === 1 ? 'role' : 'roles'}
          </button>
        </footer>
      </div>
    </div>
  )

  /* Portal в body → стек поверх любого z-index в page. */
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
