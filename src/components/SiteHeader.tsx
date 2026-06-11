import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './SiteHeader.module.css'
import logoColor from '../assets/logo-squaregps.svg'
import logoWhite from '../assets/logo-footer-white.svg'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
]

const SCROLL_THRESHOLD = 60

interface SiteHeaderProps {
  variant?: 'light' | 'dark'
}

export function SiteHeader({ variant = 'light' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isDark = variant === 'dark' && !scrolled
  const logo = isDark ? logoWhite : logoColor

  const headerClass = [
    styles.header,
    scrolled ? styles.headerScrolled : '',
    isDark ? styles.headerDark : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      {/* Spacer prevents layout jump when header becomes fixed */}
      {scrolled && <div className={styles.headerSpacer} />}

      <header className={headerClass} data-node-id="40:675">
        <div className={styles.headerBar}>
          <Link className={styles.logo} to="/" data-node-id="40:676">
            <img src={logo} alt="SquareGPS" width={145} height={30} />
          </Link>

          <nav className={styles.nav} aria-label="Primary" data-node-id="40:681">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineTopOpen : ''}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineMidOpen : ''}`} />
            <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineBotOpen : ''}`} />
          </button>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      <div
        id="mobile-nav"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.overlayTop}>
          <Link className={styles.overlayLogo} to="/" onClick={() => setMenuOpen(false)}>
            <img src={logoWhite} alt="SquareGPS" width={145} height={30} />
          </Link>
          <button
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </button>
        </div>

        <nav className={styles.overlayNav} aria-label="Mobile primary">
          {NAV_LINKS.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              className={styles.overlayLink}
              style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
