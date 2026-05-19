import { Link } from 'react-router-dom'
import styles from './SiteHeader.module.css'
import logoColor from '../assets/logo-squaregps.svg'

export function SiteHeader() {
  return (
    <header className={styles.header} data-node-id="40:675">
      <div className={styles.headerBar}>
        <Link className={styles.logo} to="/" data-node-id="40:676">
          <img src={logoColor} alt="SquareGPS" width={145} height={30} />
        </Link>
        <nav className={styles.nav} aria-label="Primary" data-node-id="40:681">
          <Link to="/careers" className={styles.navCta} data-node-id="40:682">
            Careers
          </Link>
        </nav>
      </div>
    </header>
  )
}
