import type { Ref } from 'react'
import styles from './SiteFooter.module.css'
import { figmaAssets } from '../figmaAssets'
import logoColor from '../assets/logo-squaregps.svg'
import linkedinIcon from '../assets/linkedin-icon.svg'
import youtubeIcon from '../assets/youtube-icon.svg'

interface SiteFooterProps {
  revealRef?: Ref<HTMLElement>
  revealClass?: string
}

export function SiteFooter({ revealRef, revealClass = '' }: SiteFooterProps) {
  return (
    <footer
      ref={revealRef}
      className={`${styles.siteFooter}${revealClass ? ` ${revealClass}` : ''}`}
      data-node-id="40:748"
    >
      <div className={styles.bgEllipseFooter} aria-hidden>
        <img src={figmaAssets.ellipse4} alt="" />
      </div>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid} data-node-id="40:749">
          <div className={styles.footerLogo} data-node-id="40:750">
            <img src={logoColor} alt="SquareGPS" data-node-id="40:751" />
          </div>
          <div className={styles.footerCol} data-node-id="40:755">
            <p className={styles.footerHeading} data-node-id="40:757">
              Products
            </p>
            <ul className={styles.footerLinks}>
              <li data-node-id="40:759">
                <a href="https://navixy.com/" target="_blank" rel="noopener noreferrer">Navixy</a>
              </li>
              <li data-node-id="40:760">
                <a href="https://b2field.com/" target="_blank" rel="noopener noreferrer">B2Field</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerCol} data-node-id="40:761">
            <p className={styles.footerHeading} data-node-id="40:763">
              Company
            </p>
            <ul className={styles.footerLinks}>
              <li data-node-id="40:766">Careers</li>
            </ul>
          </div>
          <div className={`${styles.footerCol} ${styles.footerColGrow}`} data-node-id="40:767">
            <p className={styles.footerHeading} data-node-id="40:769">
              Contact
            </p>
            <ul className={styles.footerLinks}>
              <li data-node-id="40:771"><a href="mailto:info@squaregps.com">info@squaregps.com</a></li>
              <li data-node-id="40:772">2945 Townsgate Rd, Suite 200, Westlake Village, CA 91361, USA</li>
            </ul>
          </div>
        </div>

        <div className={styles.legalRow} data-node-id="40:773">
          <p className={styles.legal} data-node-id="40:774">
            Copyright © 2002-2026
          </p>
          <div className={styles.social} data-node-id="40:777">
            <a href="https://www.linkedin.com/company/squaregps" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-node-id="40:778">
              <img src={linkedinIcon} alt="" width={24} height={24} />
            </a>
            <a href="https://www.youtube.com/@Navixy" target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-node-id="40:782">
              <img src={youtubeIcon} alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
