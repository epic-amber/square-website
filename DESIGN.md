# SquareGPS / Navixy

> Category: Telematics & SaaS
> Corporate careers and product site for SquareGPS — a telematics company
> building Navixy and B2Field. Deep navy-to-sky-blue atmospheric palette,
> generous whitespace, Figma-faithful pixel precision, scroll-reveal animations.

## 1. Visual Theme & Atmosphere

Confident, modern, open. The site communicates global scale and technical depth without feeling cold — a warm sky-blue thread runs through every gradient, balancing the deep navy professionalism. Backgrounds transition from pure white into layered atmospheric blue gradients that evoke altitude and connection — core metaphors for a telematics company that unites people and assets across 134+ countries.

Decorative elements are restrained: floating product icons gently drift on the hero, SVG wave ribbons add organic motion to section transitions, and soft elliptical glow shapes (exported from Figma) breathe behind content. Nothing is gratuitous — every ornament reinforces the "connected world" brand story.

Photography is used sparingly but deliberately: team photos in the "More than a workplace" grid show real people in real offices. Product visuals (Navixy/B2Field tiles) are brand-specific SVG illustrations with baked-in shadows, not stock imagery.

**Key Characteristics:**
- Deep navy-to-sky-blue atmospheric gradients — the signature visual identity
- White-dominant pages with blue gradient immersion zones (hero → products)
- Soft elliptical glow shapes (Figma-exported PNGs) floating behind content
- SVG wave backdrops with layered blur for organic section transitions
- Scroll-reveal animations via IntersectionObserver — elements fade up 28px
- Animated count-up statistics with staggered easeOutQuart timing
- Floating hero icons with gentle drift keyframes (8–14s cycles)
- `prefers-reduced-motion` respected throughout — all animation is opt-in
- Figma node traceability: `data-node-id` attributes on key elements

## 2. Color Palette & Roles

### Primary Brand
- **Navy Deep** (`#012762`): Brand anchor. Dark CTA backgrounds, gradient endpoints, active filter chips, footer/contact backdrops. The deepest tone in the palette.
- **Sky 500** (`#00a6f4`): Primary accent. Hero CTA base, focus rings, link highlights, gradient brightpoints. The energetic counterpoint to navy.
- **Page Accent** (`#00abff`): Alternate sky used in specific contexts.

### Neutral Scale (Slate)
- **Slate 900** (`#0f172b`): Primary body text, card titles, navigation text, footer headings.
- **Slate 700** (`#314158`): Secondary body text, hero subtitle, product descriptions, footer links.
- **Slate 600** (`#45556c`): Tertiary text. Navigation links, stat labels, card descriptions, meta text.
- **Slate 500** (`#62748e`): Muted text. Legal copy, sidebar titles, placeholder-adjacent, result counts.
- **Slate 400** (`#90a1b9`): Placeholder text, location dots, decorative dividers.
- **Slate 300** (`#cad5e2`): Nav CTA background (default), light border adjacent.
- **Slate 200** (`#e2e8f0`): Card borders (hairline), dividers, chip borders, office card borders.
- **Slate 100** (`#f1f5f9`): Benefit card surfaces, tag pill backgrounds, level pill backgrounds, map fallback.
- **White** (`#ffffff`): Page background, card surfaces, text on dark.

### Extended
- **Heading Muted** (`#222222`): Section titles (hero H1, office titles, workplace heading). Slightly warmer than Slate 900.
- **Surface Gray** (`#F7F9FC`): Offices section background — a subtle warm-gray that makes white cards "float."
- **LinkedIn Blue** (`#0A66C2`): Easy Apply button — external brand color, used only for LinkedIn integration.

### Gradients (Figma-matched)
- **Page Gradient** (`--gradient-page`): Full-page vertical sweep — white → navy deep → sky → white. Uses `oklch` interpolation where supported.
- **Atmospheric** (`--gradient-atmospheric`): 33-stop vertical gradient from white through sky into navy deep and back. The core immersion effect behind hero → products. Uses `oklab` where supported.
- **Atmospheric Soft** (`--gradient-atmospheric-soft`): Simplified 14-stop version for text-heavy sections (Open Roles). Symmetric bell-curve.
- **Navixy Tile** (`--gradient-navixy-tile`): 148° diagonal, mid-blues — product tile background.
- **Hero CTA** (`--gradient-hero-cta`): 90° left-to-right sky → navy sweep. Animated via `background-position` on hover.
- **CTA Deep** (`--gradient-cta-deep`): 90° dark navy sweep (`#013e87` → `#013070`) for secondary dark CTAs.
- **Contact Backdrop** (`--gradient-contact-backdrop`): Top-loaded navy for blur-masked dark sections.

### Shadow & Effects
- **Form Card Shadow**: `0px 4px 4px 0px rgba(0, 0, 0, 0.25)` — traditional drop shadow, contact form only.
- **Navixy Glow**: `8px 3px 29.9px 8px #c7f5ff` — product tile cyan glow.
- **Section Blur**: `100px` — heavy blur on decorative backdrop layers.

## 3. Typography Rules

### Font Families
- **Primary (Sans):** `'Mona Sans', system-ui, -apple-system, sans-serif` — used for headings, body, UI elements. Self-hosted via `@fontsource/mona-sans`.
- **Serif accent:** `'Bitter', ui-serif, Georgia, serif` — declared as `--font-serif` in Tailwind config but NOT actively used as a serif voice. In practice, `--font-serif` maps to Mona Sans in `tokens.css`. Bitter is available for future editorial use.
- **Form text:** `'Proxima Nova', 'Helvetica Neue', Helvetica, Arial, sans-serif` — legal/copyright text, form labels.

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Hero Display | 72px (→ 36px mobile) | 500 | 1.3 | normal | Main page headline |
| Mission Text | 48px (→ 20px mobile) | 500 | 1.45 | normal | Mission statement on dark bg |
| Section Title | 48px (→ 28px mobile) | 500 | normal | normal | "More than a workplace" |
| H1 | 36px (→ 28px mobile) | 500 | normal | normal | Products title, offices title, careers title |
| Stat Value | 60px (→ 40px mobile) | 300 | normal | normal | Hero animated counters |
| Card Title (large) | 22px (→ 18px mobile) | 500 | 1.3 | normal | CareersSection job cards |
| Card Title (grid) | 20px (→ 18px mobile) | 500 | 1.3 | normal | VacanciesSection job cards |
| Body Large | 18px (→ 16px mobile) | 400 | 1.4 | normal | Hero subtitle, product descriptions |
| Body | 16px | 400 | 1.4 | normal | General body text, footer links |
| Body Small | 14px | 400 | normal | normal | Nav links, stat labels, card descriptions |
| Benefit Title | 18px (→ 16px mobile) | 700 | 1.25 | normal | Workplace benefit cards |
| Benefit Body | 15px (→ 14px mobile) | 500 | 1.4 | normal | Workplace benefit descriptions |
| Sidebar Title | 12px | 600 | normal | 0.8px | Filter group labels (uppercase) |
| Chip | 13px | 500 | 1 | normal | Filter chips, level pills |
| Legal | 14px | 400 | 1.4 | normal | Footer copyright (Proxima Nova) |

### Principles
- **Three primary weights:** 400 (body/reading), 500 (headings/interactive), 600–700 (emphasis/labels). Never use bold (700+) on body text.
- **No letter-spacing on display sizes** — Mona Sans has natural tracking.
- **Uppercase only for sidebar filter labels** (12px, 600 weight, 0.8px tracking). Never uppercase headings or CTAs.
- **`-webkit-font-smoothing: antialiased`** globally — renders crisper on macOS.
- **`font-variant-numeric: tabular-nums`** on counters and result counts — prevents layout jitter.

## 4. Component Stylings

### Buttons

**Primary CTA (Hero)**
- Background: `--color-sky-500` with `--gradient-hero-cta` overlay (240% width)
- Text: white, 18px, weight 400
- Padding: `10px 20px 10px 24px`
- Radius: 16px (`--radius-2xl`)
- Hover: `background-position` slides to 100% (sky → navy sweep)
- Icon: 20px arrow, shifts `translateX(4px)` on hover
- Transition: `background-position 0.55s cubic-bezier(0.33, 0, 0.2, 1)`

**Dark CTA (Vacancies / Load More)**
- Background: `#013070` with `--gradient-cta-deep`
- Same shape/size as Hero CTA
- Hover: gradient position sweeps opposite direction

**Nav CTA (Header)**
- Background: `--color-slate-300`
- Text: `--color-slate-700`, 14px, weight 500
- Padding: `6px 16px`
- Radius: 16px
- Hover: background lightens to slate-200

**LinkedIn Easy Apply**
- Background: `#0A66C2`
- Same shape tokens as primary CTA
- Hover: `#084e96` (deeper)
- Active: `scale(0.98)`

### Cards

**Job Card (Hairline style)**
- Background: white
- Border: `1px solid var(--color-slate-200)`
- Radius: 12px
- Padding: 28–32px (desktop), 20–24px (mobile)
- Hover: border darkens to `--color-slate-400`, title color shifts to slate-700
- Focus: `2px solid var(--color-sky-500)`, offset 2px
- No shadow — tactility via border-darkening only
- "View role" link with animated arrow gap (6px → 10px, arrow +4px on hover)

**Office Card**
- Background: white (floats on `#F7F9FC` section bg)
- Border: `1px solid var(--color-slate-200)`
- Radius: 8px
- Padding: `36px 24px`

**Benefit Card**
- Background: `--color-slate-100`
- Radius: 8px
- Padding: 24px
- No border, no shadow

### Chips (Filter)

**Inactive**
- Background: `rgba(255, 255, 255, 0.7)`
- Border: `1px solid var(--color-slate-200)`
- Radius: 100px (full pill)
- Height: 32px, padding: `0 14px`
- Text: 13px, weight 500, slate-700
- Hover: border slate-400, bg white, text slate-900

**Active**
- Background: `--color-navy-deep` (`#012762`)
- Border: same color
- Text: white
- Hover: `#013e87`

### Tags (Level Pills)
- Background: `--color-slate-100`
- Radius: 100px
- Padding: `4px 12px`
- Text: 13–14px, weight 500, slate-600

### Inputs & Forms
- Placeholder: `--color-slate-400`
- Padding: 12px horizontal, 6px vertical
- Textarea: min-height 70px, resize vertical

### Navigation
- Full-width header, content constrained to `--content-width` (1280px)
- Logo: 145×30px, left-aligned
- Links: 14px, weight 400, slate-600, right-aligned
- Gap between nav items: 36px (desktop), 16px (mobile)
- CTA pill button right-most in nav

### Footer
- 4-column layout: logo | Products | Company | Contact
- Column width: 302px each
- Heading: 16px, weight 600, slate-900
- Links: 16px, weight 400, slate-700, hover → slate-900
- Link gap: 14px vertical
- Legal: Proxima Nova, 14px, slate-500
- Social icons: 24×24px, 20px gap

## 5. Layout Principles

### Grid & Container
- **Page width:** 1440px (design artboard)
- **Content width:** 1280px (`--content-width`)
- **Content padding:** 80px sides (desktop), 40px (tablet), 20px (mobile)
- **Content = centered** with `margin: 0 auto` and `max-width: var(--content-width)`

### Spacing Scale
Base unit: 4px. Tokens follow a semi-Tailwind naming convention:
- `--space-1`: 4px · `--space-2`: 8px · `--space-4`: 16px · `--space-5`: 20px · `--space-6`: 24px
- `--space-9`: 36px · `--space-10`: 40px · `--space-12`: 48px · `--space-24`: 96px
- `--space-28`: 112px · `--space-40`: 160px (10rem) · `--space-64`: 64px

### Section Spacing
- Major sections separated by 128px (desktop `.inner` gap) → 80px (tablet) → 56px → 48px (mobile)
- Within `.topPageGradient` and `.lowerRegion`: `--space-40` gap between children
- Footer top padding: `--space-24` (96px desktop)

### Grids
- **Vacancy cards (home):** 3-column, 20px gap → 2-col tablet → 1-col mobile
- **Careers job list:** sidebar (280px) + content column, 40px gap → single column on mobile
- **Workplace bento grid:** `719fr 422fr 422fr` × 3 rows with named areas → 2-col → 1-col
- **Office cards:** 3-column flex, 20px gap → stacked on tablet
- **Footer:** 4-column flex → stacked on mobile

### Whitespace Philosophy
- Generous vertical breathing room between sections (96–128px desktop)
- Hero block uses large internal gaps (36px between elements)
- Cards use 24–32px internal padding — content never feels cramped
- Section titles have substantial bottom margin (44–64px to content)

## 6. Depth & Elevation

| Level | Treatment | Usage |
|-------|-----------|-------|
| Flat (0) | No shadow, no border | Page background, text blocks, benefits on slate-100 |
| Hairline (1) | `1px solid var(--color-slate-200)` | Job cards, office cards, filter chips, dividers |
| Subtle Glow (2) | `8px 3px 29.9px 8px #c7f5ff` | Navixy product tile only |
| Form Shadow (3) | `0px 4px 4px rgba(0,0,0,0.25)` | Contact form card only |
| Atmospheric (bg) | Ellipse PNG glow + section blur 100px | Hero background, page atmosphere |

**Shadow Philosophy:** Almost zero box-shadow usage in the UI. Depth comes from:
1. **Hairline borders** — cards and chips use 1px borders that darken on hover
2. **Background layering** — gradient zones, surface color shifts (`#F7F9FC` offices section), ellipse glows
3. **Blur** — 100px backdrop blur on decorative layers, not on UI elements
4. **No lift-on-hover** — hover feedback is border-darkening + text color shift, never translateY or shadow increase

## 7. Do's and Don'ts

### Do
- Use `var(--token)` references for all colors, spacing, typography — never hardcode values outside tokens.css
- Use CSS Modules (`.module.css`) for component-scoped styles. One module per component.
- Apply `data-node-id` attributes on elements that map to Figma nodes for design traceability.
- Use `useReveal()` hook for scroll-reveal animations — consistent IntersectionObserver behavior.
- Use the `.reveal` / `.reveal--in` CSS classes for scroll-triggered fade-up (28px translateY).
- Respect `prefers-reduced-motion: reduce` — disable all animations and transitions.
- Use `oklch` / `oklab` gradient interpolation behind `@supports` for smoother color stops.
- Use Mona Sans for all UI text. Reserve Proxima Nova for legal/form contexts only.
- Keep hero CTA and dark CTA visually consistent — same padding tokens, same radius, same arrow icon pattern.
- Use hairline border hover (slate-200 → slate-400) as the standard card interaction pattern.
- Use `cubic-bezier(0.22, 1, 0.36, 1)` for reveal animations, `cubic-bezier(0.33, 0, 0.2, 1)` for CTA transitions.

### Don't
- Don't use Tailwind utility classes in JSX — the project uses CSS Modules as the primary styling approach.
- Don't add box-shadows to cards — use hairline borders. Shadow is reserved for the contact form and Navixy glow only.
- Don't introduce new colors outside the established palette. If the design needs one, add it to `tokens.css` first.
- Don't use `font-weight: 700+` on body or description text — 700 is only for benefit card titles.
- Don't animate with `translateY` lifts on hover — hover feedback is border-color + text-color changes.
- Don't use `position: fixed` for the header — it stays in document flow.
- Don't skip the focus-visible styles — all interactive elements need `outline: 2px solid` (sky-500 or white on dark).
- Don't hard-code breakpoint-specific values — use token overrides in `tokens.css` media queries.
- Don't place gradients on individual cards — gradients are page-level atmospheric effects only.
- Don't use glassmorphism, neumorphism, or frosted-glass effects.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | ≥ 1200px | Full layout, floating hero decor icons visible, 3-col grids |
| Narrow Desktop | 1024–1199px | Hero decor icons scale proportionally, 2-col vacancy grid |
| Tablet | 768–1023px | Inner gaps shrink (80px), sidebar narrows (240px), office cards stack |
| Large Mobile | 640–767px | Single-column layouts, sidebar hidden → bottom sheet filters, footer stacks |
| Mobile | 480–639px | Minimal gaps (48px), 32px hero title, 2×2 stat grid |
| Small Mobile | < 480px | Tightest padding (20px cards), smallest type scale |

### Responsive Token Overrides (in tokens.css)
Desktop → Tablet (≤1024px):
- `--content-pad-x`: 80px → 40px
- `--space-24`: 96px → 64px
- `--space-28`: 112px → 56px

Tablet → Mobile (≤640px):
- `--content-pad-x`: 40px → 20px
- `--text-hero`: 72px → 36px
- `--text-h1`: 36px → 28px
- `--text-stat`: 60px → 40px

### Collapsing Strategy
- **Navigation:** Horizontal links maintain, gaps shrink. No hamburger menu (3 items only).
- **Hero title:** `clamp(32px, 8vw, 44px)` on mobile — fluid sizing.
- **Hero `<br>` tags:** Hidden on mobile via `display: none` — natural wrapping takes over.
- **Stat counters:** 4-across → 2×2 grid on mobile.
- **Vacancy cards:** 3-col → 2-col (≤1024) → 1-col (≤767).
- **Careers sidebar:** Visible 280px column → hidden + bottom sheet modal (≤767).
- **Workplace grid:** 3-col bento → 2-col → 1-col with explicit aspect ratios per breakpoint.
- **Office cards:** 3-col flex → stacked.
- **Footer:** 4-col → stacked, legal row wraps.
- **Hero decor icons:** Visible ≥1200px, hidden below. Scale via `calc(100vw / 1440)` on narrow desktop.

### Touch Targets
- CTA buttons: `min-height: 44px` on mobile
- Load More: `min-height: 48px`, full-width on mobile
- Filter chips: 32px height (meets 44px via padding area)
- Social icons: 24×24px with 20px gaps

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: Sky Blue (`#00a6f4`)
- Dark CTA: Navy (`#013070` → `#013e87`)
- Background: White (`#ffffff`)
- Heading text: Heading Muted (`#222222`) or Slate 900 (`#0f172b`)
- Body text: Slate 700 (`#314158`)
- Secondary text: Slate 600 (`#45556c`)
- Card border: Slate 200 (`#e2e8f0`)
- Active state: Navy Deep (`#012762`)
- Focus ring: Sky 500 (`#00a6f4`)
- Section surface: `#F7F9FC`

### Example Component Prompts
- "Create a new section with a title and grid of cards. Title: 48px Mona Sans weight 500, color `#222222`, center-aligned. Grid: 3 columns, 20px gap. Cards: white background, `1px solid #e2e8f0` border, 12px radius, 32px padding. Card hover: border darkens to `#90a1b9`. Use CSS Modules."
- "Add a primary CTA button: background `#00a6f4`, white text, 18px weight 400, padding `10px 20px 10px 24px`, 16px radius. Arrow icon 20px shifts right 4px on hover. Gradient sweep on hover uses `background-position` animation 0.55s."
- "Build a filter chip row: 32px height pills, `1px solid #e2e8f0`, 100px radius, 13px weight 500 text. Active chip: `#012762` background, white text. Wrap with 8px gap."
- "Create an office card: white bg, `1px solid #e2e8f0`, 8px radius, 36px/24px padding. Flag image 36×24px with 2px radius. City name 18px weight 500, address 16px weight 400 slate-600."

### Iteration Guide
1. Always style via CSS Modules — create a `ComponentName.module.css` alongside each `.tsx` component.
2. Reference `var(--token)` from `tokens.css` for all design values. Add new tokens there, not inline.
3. Every interactive element needs `:hover` (border/color shift) and `:focus-visible` (2px outline) states.
4. Wrap scroll-revealed sections with `useReveal()` + `reveal` / `reveal--in` classes.
5. Check `prefers-reduced-motion` — provide a `@media (prefers-reduced-motion: reduce)` block that disables transitions.
6. The `.inner` pattern: content area is `max-width: var(--content-width); margin: 0 auto; padding: 0 var(--content-pad-x)`.
7. Card hover = border-darkening only. No shadows, no lifts, no scale transforms.
8. Gradients are atmospheric — they live on page-level wrappers, never on individual cards or buttons (except CTA sweep).
9. When creating a new page, follow the shell pattern: `<SiteHeader />` at top, `<SiteFooter />` at bottom, content between.
10. Lazy-load heavy components (maps, charts) with `React.lazy()` + `<Suspense>`.
