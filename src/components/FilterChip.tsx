import styles from './FilterChip.module.css'

interface FilterChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

/**
 * Hairline pill chip — single size, modern design.
 * Active: sky-500 brand color + white text.
 * Inactive: hairline border + slate-700 text on subtle white bg.
 */
export function FilterChip({ label, active = false, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={[styles.chip, active ? styles.active : styles.inactive].join(' ')}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}
