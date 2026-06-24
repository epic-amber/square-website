import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './SiteHeader.module.css'
import { LogoSquareGPS } from './LogoSquareGPS'
import globalContent from '../content/global.json'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    if (menuOpen) setMenuOpen(false)
    if (scrolled) setScrolled(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  return (
    <>
      <header className={`${styles.header}${scrolled ? ` ${styles.headerScrolled}` : ''}`} data-node-id="40:675">
        <div className={styles.headerBar}>
          <Link className={styles.logo} to="/" data-node-id="40:676" aria-label={globalContent.header.logoAriaLabel} onClick={() => window.scrollTo(0, 0)}>
            <LogoSquareGPS width={138} height={28} />
          </Link>

          <nav className={styles.nav} aria-label={globalContent.header.navAriaLabel} data-node-id="40:681">
            <Link to="/about" className={styles.navLink} onClick={() => window.scrollTo(0, 0)}>
              {globalContent.header.aboutLink}
            </Link>
            <Link to="/careers" className={styles.cta} onClick={() => window.scrollTo(0, 0)}>
              {globalContent.header.careersLink}
            </Link>
          </nav>

          <button
            className={styles.hamburger}
            aria-label={menuOpen ? globalContent.header.closeMenu : globalContent.header.openMenu}
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

      <div
        id="mobile-nav"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.overlayTop}>
          <Link className={styles.overlayLogo} to="/" aria-label={globalContent.header.logoAriaLabel} onClick={() => { setMenuOpen(false); window.scrollTo(0, 0) }}>
            <LogoSquareGPS width={138} height={28} />
          </Link>
          <button
            className={styles.closeBtn}
            aria-label={globalContent.header.closeMenu}
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.closeLine} />
            <span className={styles.closeLine} />
          </button>
        </div>

        <nav className={styles.overlayNav} aria-label={globalContent.header.mobileNavAriaLabel}>
          <Link
            to="/about"
            className={styles.overlayLink}
            style={{ transitionDelay: menuOpen ? '80ms' : '0ms' }}
            onClick={() => { setMenuOpen(false); window.scrollTo(0, 0) }}
          >
            {globalContent.header.aboutLink}
          </Link>
          <Link
            to="/careers"
            className={styles.overlayLink}
            style={{ transitionDelay: menuOpen ? '140ms' : '0ms' }}
            onClick={() => { setMenuOpen(false); window.scrollTo(0, 0) }}
          >
            {globalContent.header.careersLink}
          </Link>
        </nav>
      </div>
    </>
  )
}
