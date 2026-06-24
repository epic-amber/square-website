import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import styles from './VacancyPage.module.css'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { EasyApplyButton } from './components/EasyApplyButton'
import { BrandWaveBackdrop } from './components/BrandWaveBackdrop'
import { getJobById } from './data/jobs'
import { useReveal } from './hooks/useReveal'
import locationPinIcon from './assets/icon-location-pin.svg'
import vacancyContent from './content/vacancy.json'

/**
 * VacancyPage — detail page for a specific vacancy. Route `/careers/:id`.
 *
 * Layout (desktop): 2-column — content (~67%) + sticky sidebar (~33%).
 * Sections: Who we are → About the team → What you'll do → Minimum
 * requirements → In-office expectations → Pay and benefits → Bottom CTA.
 *
 * Mobile: single column, sidebar info inline after hero meta, sticky bottom
 * bar with Easy Apply (UX convention for job postings).
 *
 * If id is invalid → redirect to /careers.
 */
export function VacancyPage() {
  const { id } = useParams<{ id: string }>()
  const job = getJobById(id ? decodeURIComponent(id) : undefined)

  /* Scroll to top on mount/job change. */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const { ref: footerRef, visible: footerVisible } = useReveal(0.05)

  if (!job) {
    return <Navigate to="/careers" replace />
  }

  return (
    <div className={styles.page}>
      <SiteHeader />

      <main className={styles.main}>
        {/* Brand atmosphere — top-right corner accent. Reuses the same       */}
        {/* SVG-coded animated wave from Careers / Main page (BrandWave-      */}
        {/* Backdrop). Wrapper constrains it to top-right; radial mask fades  */}
        {/* gracefully toward title/content. Hidden on mobile (≤767px).       */}
        <div className={styles.heroAccent} aria-hidden="true">
          <BrandWaveBackdrop />
        </div>

        <div className={styles.inner}>
          {/* Breadcrumb back link */}
          <Link to="/careers" className={styles.backLink}>
            <span className={styles.backArrow} aria-hidden>
              ←
            </span>
            <span>{vacancyContent.backLink}</span>
          </Link>

          {/* Hero — title + location/format meta */}
          <header className={styles.hero}>
            <h1 className={styles.title}>{job.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <img
                  src={locationPinIcon}
                  alt=""
                  width={18}
                  height={18}
                  className={styles.metaIcon}
                  aria-hidden
                />
                {job.location}
              </span>
              <span className={styles.metaDot} aria-hidden>
                ·
              </span>
              <span className={styles.metaItem}>{job.format}</span>
              <span className={styles.metaDot} aria-hidden>
                ·
              </span>
              <span className={styles.metaItem}>
                {vacancyContent.postedPrefix} {job.postedAgo}
              </span>
            </div>
          </header>

          {/* Content + Sidebar grid */}
          <div className={styles.grid}>
            <article className={styles.content}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.whoWeAre}</h2>
                <p className={styles.paragraph}>{vacancyContent.aboutCompany}</p>
              </section>

              {job.aboutTeam && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.aboutTeam}</h2>
                  <p className={styles.paragraph}>{job.aboutTeam}</p>
                </section>
              )}

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.whatYoullDo}</h2>
                <ul className={styles.list}>
                  {job.responsibilities.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.minimumRequirements}</h2>
                <ul className={styles.list}>
                  {job.requirements.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {job.inOfficeExpectations && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.inOfficeExpectations}</h2>
                  <p className={styles.paragraph}>{job.inOfficeExpectations}</p>
                </section>
              )}

              {job.payAndBenefits && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>{vacancyContent.sectionTitles.payAndBenefits}</h2>
                  <p className={styles.paragraph}>{job.payAndBenefits}</p>
                </section>
              )}

              {/* Bottom CTA card — opaque, brand atmosphere lives top-right */}
              {/* via <BrandWaveBackdrop /> wrapped in .heroAccent (see main). */}
              <aside className={styles.bottomCta}>
                <h3 className={styles.bottomCtaTitle}>
                  {vacancyContent.bottomCta.title}
                </h3>
                <p className={styles.bottomCtaText}>
                  {vacancyContent.bottomCta.body}
                </p>
                <EasyApplyButton href={job.href} />
              </aside>
            </article>

            {/* Sticky sidebar — visible on desktop, inline at top on mobile */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <SidebarRow label={vacancyContent.sidebar.officeLocation} value={job.location} />
                <SidebarRow label={vacancyContent.sidebar.team} value={job.team} />
                <SidebarRow label={vacancyContent.sidebar.jobType} value={job.jobType} />
                <SidebarRow label={vacancyContent.sidebar.experience} value={job.level} />
                <div className={styles.sidebarApply}>
                  <EasyApplyButton href={job.href} fullWidth />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile sticky bottom bar — visible <768px, contains Easy Apply CTA. */}
        <div className={styles.mobileBar} role="region" aria-label={vacancyContent.mobileBarAriaLabel}>
          <EasyApplyButton href={job.href} fullWidth />
        </div>
      </main>

      <SiteFooter
        revealRef={footerRef}
        revealClass={`reveal ${footerVisible ? 'reveal--in' : ''}`}
      />
    </div>
  )
}

/* ── Sidebar row ─────────────────────────────────────────────── */
function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.sidebarRow}>
      <p className={styles.sidebarLabel}>{label}</p>
      <p className={styles.sidebarValue}>{value}</p>
    </div>
  )
}
