import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import styles from './VacancyPage.module.css'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { EasyApplyButton } from './components/EasyApplyButton'
import { BrandWaveBackdrop } from './components/BrandWaveBackdrop'
import { ABOUT_SQUAREGPS, getJobById } from './data/jobs'
import { useReveal } from './hooks/useReveal'
import locationPinIcon from './assets/icon-location-pin.svg'

/**
 * VacancyPage — detail page для конкретной вакансии. Route `/careers/:id`.
 *
 * Layout (desktop): 2-column — content (~67%) + sticky sidebar (~33%).
 * Sections: Who we are → About the team → What you'll do → Minimum
 * requirements → In-office expectations → Pay and benefits → Bottom CTA.
 *
 * Mobile: single column, sidebar info inline после hero meta, sticky bottom
 * bar с Easy Apply (UX-convention для job postings).
 *
 * Если id невалидный → redirect на /careers.
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
            <span>All open roles</span>
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
                Posted {job.postedAgo}
              </span>
            </div>
          </header>

          {/* Content + Sidebar grid */}
          <div className={styles.grid}>
            <article className={styles.content}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Who we are</h2>
                <p className={styles.paragraph}>{ABOUT_SQUAREGPS}</p>
              </section>

              {job.aboutTeam && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>About the team</h2>
                  <p className={styles.paragraph}>{job.aboutTeam}</p>
                </section>
              )}

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What you'll do</h2>
                <ul className={styles.list}>
                  {job.responsibilities.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Minimum requirements</h2>
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
                  <h2 className={styles.sectionTitle}>In-office expectations</h2>
                  <p className={styles.paragraph}>{job.inOfficeExpectations}</p>
                </section>
              )}

              {job.payAndBenefits && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Pay and benefits</h2>
                  <p className={styles.paragraph}>{job.payAndBenefits}</p>
                </section>
              )}

              {/* Bottom CTA card — opaque, brand atmosphere lives top-right */}
              {/* через <BrandWaveBackdrop /> wrapped в .heroAccent (см. main).*/}
              <aside className={styles.bottomCta}>
                <h3 className={styles.bottomCtaTitle}>
                  We look forward to hearing from you
                </h3>
                <p className={styles.bottomCtaText}>
                  At SquareGPS we are looking for people with passion, grit, and
                  integrity. We encourage you to apply even if your experience
                  does not precisely match the job description — your skills and
                  passion will stand out, and we will know once we have taken
                  some extraordinary twists and turns.
                </p>
                <EasyApplyButton href={job.href} />
              </aside>
            </article>

            {/* Sticky sidebar — visible on desktop, inline at top on mobile */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <SidebarRow label="Office location" value={job.location} />
                <SidebarRow label="Team" value={job.team} />
                <SidebarRow label="Job type" value={job.jobType} />
                <SidebarRow label="Experience" value={job.level} />
                <div className={styles.sidebarApply}>
                  <EasyApplyButton href={job.href} fullWidth />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile sticky bottom bar — visible <768px, contains Easy Apply CTA. */}
        <div className={styles.mobileBar} role="region" aria-label="Apply">
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
