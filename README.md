# SquareGPS — Careers Website

Corporate careers landing page for [SquareGPS](https://squaregps.com) — a software company developing innovative tech for Mobile Resource Management and GPS Telematics.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool & dev server
- **CSS Modules** — scoped component styles
- **MapLibre GL** — interactive world map (Global Offices section)
- **@fontsource/mona-sans** + **@fontsource/bitter** — self-hosted fonts

## Project Structure

```
src/
├── SquarePage.tsx              # Main page component
├── SquarePage.module.css       # Page-level styles
├── components/
│   ├── OurProductsSection.tsx  # Animated product icons (Navixy / B2Field)
│   ├── WorkplaceSection.tsx    # "More than a workplace" benefits grid
│   ├── VacanciesSection.tsx    # Open vacancies cards
│   └── OfficesMap.tsx          # MapLibre interactive map
├── hooks/
│   └── useReveal.ts            # Scroll-based reveal animation hook
├── styles/
│   └── tokens.css              # Global design tokens (colors, spacing, typography)
├── assets/                     # SVGs, images, video, icons
└── index.css                   # Global base styles + reveal animation classes
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

- **Scroll reveal animations** — sections fade in on scroll via `useReveal` hook (`IntersectionObserver`), triggered once per element
- **Animated Our Products section** — icons swap automatically every 4.5s with SVG connector line animation; pauses on hover; respects `prefers-reduced-motion`
- **Interactive world map** — MapLibre GL with custom markers for office locations (USA, Serbia, Mexico)
- **Responsive design** — fully adapted for desktop, tablet, and mobile with CSS custom property overrides per breakpoint
- **Accessible** — keyboard-focusable links, `aria-label` on icons, `prefers-reduced-motion` support throughout

## Design Tokens

All spacing, typography, and color values are defined as CSS variables in `src/styles/tokens.css` and override at breakpoints:

| Breakpoint | Token overrides |
|---|---|
| ≤ 1024px | Reduced spacing, smaller headings |
| ≤ 640px | Mobile gutters (`--content-pad-x: 20px`), smaller type scale |

## Assets

- `hero-video.mp4` — autoplay background video in the hero section
- `favicon.svg` — SquareGPS favicon
- Product icons: `navixy-product-icon.svg`, `b2field-product-icon.svg`
- Social icons: `linkedin-icon.svg`, `youtube-icon.svg`
