import { figmaAssets } from './figmaAssets'
import styles from './SquarePage.module.css'

import logoColor from './assets/logo-squaregps.svg'
import b2field from './assets/B2field.svg'
import navixy from './assets/navixy-icon.svg'
import linkedinIcon from './assets/linkedin.svg'
import youtubeIcon from './assets/youtube.svg'

const FLAG_US = 'https://flagcdn.com/w80/us.png'
const FLAG_RS = 'https://flagcdn.com/w80/rs.png'
const FLAG_MX = 'https://flagcdn.com/w80/mx.png'

export function SquarePage() {
  return (
    <div className={styles.page} data-node-id="55:168">
      <div className={styles.bgEllipseTop} aria-hidden data-node-id="55:169">
        <img src={figmaAssets.ellipse4} alt="" />
      </div>
      <div className={styles.bgEllipse2} aria-hidden data-node-id="55:170">
        <img src={figmaAssets.ellipse2} alt="" />
      </div>
      <div className={styles.bgEllipseMidBack} aria-hidden data-node-id="55:182">
        <img src={figmaAssets.ellipse5} alt="" />
      </div>
      <div className={styles.bgEllipseMid} aria-hidden data-node-id="55:183">
        <img src={figmaAssets.ellipse3} alt="" />
      </div>

      <div className={styles.inner}>
        <header className={styles.header} data-node-id="40:675">
          <div className={styles.headerBar}>
            <a className={styles.logo} href="/" data-node-id="40:676">
              <img src={logoColor} alt="SquareGPS" width={145} height={30} />
            </a>
            <nav className={styles.nav} aria-label="Primary" data-node-id="40:681">
              <span data-node-id="40:682">Careers</span>
              <span data-node-id="40:683">About</span>
              <span data-node-id="40:684">Contact</span>
            </nav>
          </div>
        </header>

        <div className={styles.stack}>
          <div className={styles.heroMissionGroup} data-node-id="40:686">
            <section className={styles.heroSection} data-node-id="40:687">
              <div className={styles.heroBlock} data-node-id="40:688">
                <h1 className={styles.heroTitle} data-node-id="40:689">
                  Design and Development <br aria-hidden="true" />
                  of Telematics Solutions
                </h1>
                <p className={styles.heroSub} data-node-id="40:690">
                  SquareGPS was founded in 2005 by a team of global experts and innovators passionate to unite people and things together{' '}
                  <br aria-hidden="true" />
                  by developing top-notch software products for Telematics industry.
                </p>
                <button type="button" className={styles.heroCta} data-node-id="40:691">
                  <span data-node-id="40:692">See open roles</span>
                  <img
                    className={styles.heroCtaIcon}
                    src={figmaAssets.arrowForward}
                    alt=""
                    width={20}
                    height={20}
                    data-node-id="53:2204"
                  />
                </button>
              </div>

              <div className={styles.stats} data-node-id="40:693">
                <div className={styles.stat} data-node-id="40:694">
                  <p className={styles.statValue} data-node-id="40:695">
                    22+
                  </p>
                  <p className={styles.statLabel} data-node-id="40:696">
                    years in Telematics
                  </p>
                </div>
                <div className={styles.stat} data-node-id="40:697">
                  <p className={styles.statValue} data-node-id="40:698">
                    134+
                  </p>
                  <p className={styles.statLabel} data-node-id="40:699">
                    countries
                  </p>
                </div>
                <div className={styles.stat} data-node-id="40:700">
                  <p className={styles.statValue} data-node-id="40:701">
                    749K+
                  </p>
                  <p className={styles.statLabel} data-node-id="40:702">
                    devices connected
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.missionWrap} data-node-id="40:703">
              <div className={styles.missionInner}>
                <div className={styles.missionBlur} data-node-id="55:205" aria-hidden />
                <div className={styles.missionBlurEllipse} data-node-id="40:705" aria-hidden>
                  <img src={figmaAssets.ellipse7} alt="" />
                </div>

                <div className={styles.video} data-name="video" data-node-id="40:706" />

                <div className={styles.missionTextWrap} data-node-id="40:707">
                  <p className={styles.missionText} data-node-id="40:708">
                    We are passionate about empowering <br aria-hidden="true" />
                    our employees to grow, make an impact, and feel confident in shaping both their careers and the future of SquareGPS.
                  </p>
                </div>

                <div className={styles.missionSketch1} data-node-id="49:198" aria-hidden>
                  <img src={figmaAssets.vector213} alt="" />
                </div>
                <div className={styles.missionSketch2} data-node-id="49:201" aria-hidden>
                  <img src={figmaAssets.vector214} alt="" />
                </div>
                <div className={styles.missionSketch3} data-node-id="49:203" aria-hidden>
                  <img src={figmaAssets.vector215} alt="" />
                </div>
              </div>
            </section>
          </div>

          <section className={styles.products} data-node-id="40:709">
            <div className={styles.productsCopy} data-node-id="40:710">
              <h2 className={styles.productsTitle} data-node-id="40:711">
                Our Products
              </h2>
              <p className={styles.productsDesc} data-node-id="40:712">
                Innovative solutions for fleet management and asset monitoring worldwide.
              </p>
            </div>

            <div className={styles.productsVisual} data-node-id="40:713">
              <div className={styles.b2Wrap} data-node-id="53:2094">
                <img src={b2field} alt="" width={155} height={155} />
              </div>
              <div className={styles.navixyWrap} data-node-id="53:2088">
                <img src={navixy} alt="" width={91} height={91} />
              </div>
              <div className={styles.productCallout} data-node-id="53:2111">
                <div className={styles.calloutText} data-node-id="53:2112">
                  <p className={styles.calloutTitle} data-node-id="53:2113">
                    Navixy
                  </p>
                  <p className={styles.calloutBody} data-node-id="53:2114">
                    GPS tracking platform for fleet management and asset monitoring
                  </p>
                </div>
                <div className={styles.calloutLine} data-node-id="53:2115">
                  <img src={figmaAssets.vector216} alt="" />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.careers} data-node-id="40:722">
            <div className={styles.careersImg} data-node-id="49:14">
              <img src={figmaAssets.teamPhoto} alt="" width={592} height={789} />
            </div>
            <div className={styles.careersCopy} data-node-id="40:725">
              <h2 className={styles.careersTitle} data-node-id="40:726">
                Careers at SquareGPS
              </h2>
              <p className={styles.careersDesc} data-node-id="40:727">
                Meet the people behind SquareGPS — passionate experts building the future of telematics together
              </p>
              <button type="button" className={styles.careersCta} data-node-id="40:728">
                See open roles
              </button>
            </div>
          </section>

          <div className={styles.lowerBackdrop}>
            <div className={styles.lowerBackdropGlow} data-node-id="49:113" aria-hidden />

            <section className={styles.offices} data-node-id="40:730">
              <h2 className={styles.officesTitle} data-node-id="40:731">
                Global Offices
              </h2>
              <div className={styles.officeCards} data-node-id="49:91">
                <article className={styles.officeCard} data-node-id="49:92">
                  <img className={styles.flag} src={FLAG_US} width={36} height={24} alt="" />
                  <h3 className={styles.officeCity} data-node-id="49:94">
                    Westlake Village, USA
                  </h3>
                  <p className={styles.officeAddr} data-node-id="49:95">
                    2945 Townsgate Rd, Suite 200 Westlake Village, CA 91361
                  </p>
                </article>
                <article className={styles.officeCard} data-node-id="49:96">
                  <img className={styles.flag} src={FLAG_RS} width={36} height={24} alt="" />
                  <h3 className={styles.officeCity} data-node-id="49:97">
                    Belgrade, Serbia
                  </h3>
                  <p className={styles.officeAddr} data-node-id="49:98">
                    Kneza Mihaila 3, 5. sprat, Poslovna zgrada Zepter, Beograd
                  </p>
                </article>
                <article className={styles.officeCard} data-node-id="49:99">
                  <img className={styles.flag} src={FLAG_MX} width={36} height={24} alt="" />
                  <h3 className={styles.officeCity} data-node-id="49:100">
                    Mexico City, Mexico
                  </h3>
                  <p className={styles.officeAddr} data-node-id="49:101">
                    Av. Benjamín Franklin 235, Piso 3, Mexico City
                  </p>
                </article>
              </div>
            </section>

            <section className={styles.contact} data-node-id="40:745">
              <h2 className={styles.contactTitle} data-node-id="40:746">
                Contact us
              </h2>
              <form className={styles.form} data-node-id="53:2173" autoComplete="off">
                <label className={styles.field}>
                  <span className="visually-hidden">First name</span>
                  <input
                    className={styles.input}
                    name="firstName"
                    placeholder="First name"
                    data-node-id="I53:2174;2297:16158"
                  />
                </label>
                <label className={styles.field}>
                  <span className="visually-hidden">Last name</span>
                  <input
                    className={styles.input}
                    name="lastName"
                    placeholder="Last name"
                    data-node-id="I53:2175;2297:16158"
                  />
                </label>
                <label className={styles.field}>
                  <span className="visually-hidden">Email</span>
                  <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="Email"
                    data-node-id="I53:2176;2297:16158"
                  />
                </label>
                <label className={`${styles.field} ${styles.fieldMessage}`}>
                  <span className="visually-hidden">Message</span>
                  <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder="Message"
                    rows={3}
                    data-node-id="53:2181"
                  />
                </label>
                <button type="submit" className={styles.formCta} data-node-id="53:2183">
                  Send your message
                </button>
              </form>
            </section>
          </div>

          <footer className={styles.siteFooter} data-node-id="40:748">
            <div className={styles.footerGrid} data-node-id="40:749">
              <div className={styles.footerLogo} data-node-id="40:750">
                <img src={figmaAssets.logoFooterWhite} alt="SquareGPS" data-node-id="40:751" />
              </div>
              <div className={styles.footerCol} data-node-id="40:755">
                <p className={styles.footerHeading} data-node-id="40:757">
                  Products
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:759">Navixy</li>
                  <li data-node-id="40:760">B2Field</li>
                </ul>
              </div>
              <div className={styles.footerCol} data-node-id="40:761">
                <p className={styles.footerHeading} data-node-id="40:763">
                  Company
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:765">About</li>
                  <li data-node-id="40:766">Careers</li>
                </ul>
              </div>
              <div className={`${styles.footerCol} ${styles.footerColGrow}`} data-node-id="40:767">
                <p className={styles.footerHeading} data-node-id="40:769">
                  Contact
                </p>
                <ul className={styles.footerLinks}>
                  <li data-node-id="40:771">info@squaregps.com</li>
                  <li data-node-id="40:772">2945 Townsgate Rd, Suite 200, Westlake Village, CA 91361, USA</li>
                </ul>
              </div>
            </div>

            <div className={styles.legalRow} data-node-id="40:773">
              <p className={styles.legal} data-node-id="40:774">
                Copyright © 2002-2026
              </p>
              <p className={styles.legal} data-node-id="40:775">
                Cookie policy and preferences
              </p>
              <p className={styles.legal} data-node-id="40:776">
                Privacy policy
              </p>
              <div className={styles.social} data-node-id="40:777">
                <a href="https://www.linkedin.com" aria-label="LinkedIn" data-node-id="40:778">
                  <img src={linkedinIcon} alt="" width={24} height={24} />
                </a>
                <a href="https://www.youtube.com" aria-label="YouTube" data-node-id="40:782">
                  <img src={youtubeIcon} alt="" width={24} height={24} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
