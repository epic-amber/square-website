import styles from './FilterChip.module.css'

interface FilterChipProps {
  label: string
  active?: boolean
  size?: 'md' | 'sm'
  onClick?: () => void
}

/**
 * Reusable chip for filter selectors.
 * Active: slate-700 bg, slate-100 text (Figma "chips-active").
 * Inactive: slate-100 bg, slate-900 text (Figma "chips").
 * Size "md": 95×49px top filter row.
 * Size "sm": 95×43px sidebar filter groups.
 */
export function FilterChip({ label, active = false, size = 'md', onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={[
        styles.chip,
        active ? styles.active : styles.inactive,
        size === 'sm' ? styles.sm : styles.md,
      ].join(' ')}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}
