import type { Ref } from 'react'
import { Link } from 'react-router-dom'
import styles from './SiteFooter.module.css'
import { figmaAssets } from '../figmaAssets'
import logoColor from '../assets/logo-squaregps.svg'
import linkedinIcon from '../assets/linkedin-icon.svg'
import youtubeIcon from '../assets/youtube-icon.svg'
import globalContent from '../content/global.json'

const socialIcons: Record<string, string> = {
  LinkedIn: linkedinIcon,
  YouTube: youtubeIcon,
}

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
            <img src={logoColor} alt={globalContent.header.logoAriaLabel} data-node-id="40:751" />
          </div>
          <div className={styles.footerCol} data-node-id="40:755">
            <p className={styles.footerHeading} data-node-id="40:757">
              {globalContent.footer.products.title}
            </p>
            <ul className={styles.footerLinks}>
              {globalContent.footer.products.items.map((item) => (
                <li key={item.label}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footerCol} data-node-id="40:761">
            <p className={styles.footerHeading} data-node-id="40:763">
              {globalContent.footer.company.title}
            </p>
            <ul className={styles.footerLinks}>
              {globalContent.footer.company.items.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.footerCol} ${styles.footerColGrow}`} data-node-id="40:767">
            <p className={styles.footerHeading} data-node-id="40:769">
              {globalContent.footer.contact.title}
            </p>
            <ul className={styles.footerLinks}>
              <li><a href={`mailto:${globalContent.footer.contact.email}`}>{globalContent.footer.contact.email}</a></li>
              <li>{globalContent.footer.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className={styles.legalRow} data-node-id="40:773">
          <p className={styles.legal} data-node-id="40:774">
            {globalContent.footer.legal}
          </p>
          <div className={styles.social} data-node-id="40:777">
            {globalContent.footer.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <img src={socialIcons[s.label]} alt="" width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
