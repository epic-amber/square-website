import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref to attach to any DOM element and a boolean that becomes true
 * once the element has crossed the viewport threshold.
 *
 * Fires exactly once — a revealed element stays revealed even on scroll back.
 * `revealedRef` guards against React StrictMode double-invoking effects, which
 * would otherwise recreate the observer and re-trigger the animation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useReveal(threshold = 0.12): { ref: React.RefObject<any>; visible: boolean } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const [visible, setVisible] = useState(false)
  const revealedRef = useRef(false)

  useEffect(() => {
    const el = ref.current as Element | null
    if (!el || revealedRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealedRef.current) {
          revealedRef.current = true
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
