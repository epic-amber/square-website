# HeroPhotoStrip

**Category:** Hero / Page header  
**Status:** Archived — superseded on About Us by the two-column Figma hero (node 277:95)  
**Files:** `HeroPhotoStrip.tsx` · `HeroPhotoStrip.module.css`

---

## Visual description

A full-width hero section with two zones stacked vertically:

1. **Text zone** — centred headline (`h1`) + subtitle paragraph against a transparent background (the atmospheric gradient from the parent page shows through).
2. **Photo strip** — a horizontal row of four rounded photo cards that sit below the text. Each card has a different aspect ratio and is vertically offset (staggered) so the strip looks alive. The strip uses `margin-bottom: -100px` to physically overlap the section that follows it, creating a layered depth effect where the next section's gradient appears *behind* the cards.

```
┌─────────────────────────────────────────┐
│                                         │  ← transparent, gradient shows through
│            About Us (h1, 36px)          │
│     Founded in 2005, we unite people…   │
│                                         │
│  ┌──────┐ ┌────┐ ┌──────┐ ┌─────┐      │
│  │  ↓   │ │  ↑ │ │  ↓   │ │  ↑  │      │  ← staggered photo cards
│  │ 5:3  │ │1:1 │ │ 4:3  │ │ 5:4 │      │
│  └──────┘ └────┘ └──────┘ └─────┘      │
└── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  ← -100px margin into next section
```

---

## When to use

- **About Us** page hero where 4 team / product photos should be shown at the top of the page.
- **Team** or **Company** pages with similar photo-first introductions.
- Any page where you want a soft overlap between the hero and the first content section below.

Avoid if: you need a full-bleed image background, a video hero, or a hero without photos.

---

## Photo slot configuration

Each slot is driven by the `HERO_PHOTOS` array in `HeroPhotoStrip.tsx`:

```ts
const HERO_PHOTOS = [
  { id: 1, alt: '…', shift: 20,  flex: 1.15, ratio: '5 / 3' },  // wide, pushed down
  { id: 2, alt: '…', shift: -12, flex: 0.8,  ratio: '1 / 1' },  // square, pulled up
  { id: 3, alt: '…', shift: 20,  flex: 1.0,  ratio: '4 / 3' },  // standard, pushed down
  { id: 4, alt: '…', shift: -12, flex: 0.85, ratio: '5 / 4' },  // slight portrait, pulled up
]
```

| Property | Type | Description |
|----------|------|-------------|
| `shift`  | `number` (px) | `translateY` offset. Positive = pushed down, negative = pulled up. Alternating creates the stagger effect. |
| `flex`   | `number` | Flex-grow factor relative to other slots. Values > 1 make the card wider. |
| `ratio`  | `string` | CSS `aspect-ratio` (`'width / height'`). Controls card height relative to its flex-based width. |

To swap in real photos, replace `<PhotoPlaceholder />` inside each `.photoSlot` with:
```tsx
<img src={yourPhotoSrc} alt={photo.alt} className={styles.photoImg} />
```
The `.photoImg` class is already defined: `object-fit: cover`, `width/height: 100%`.

---

## Key CSS mechanisms

### Overlap with next section
```css
.photoStrip {
  margin-bottom: -100px; /* desktop */
}
/* Tablet: -80px | Mobile: -48px */
```
This negative margin pulls the following element up so it starts *behind* the photo strip. The parent wrapper (`atmosphereRegion`) must have `overflow: visible` for the cards to actually show below the hero's natural boundary.

### Stagger animation
Each card receives an inline `transitionDelay` (120ms + 60ms × index) so cards slide in sequentially when `.reveal--in` is added.

### Mobile layout
On `max-width: 767px` the horizontal flex strip switches to a 2-column CSS Grid, each card gets a forced `aspect-ratio: 4 / 3`, and all `transform` overrides are cancelled so the stagger doesn't break the grid.

---

## Design tokens used

| Token | Usage |
|-------|-------|
| `--header-h` | Top padding offset to clear the fixed navbar |
| `--content-width` | `max-width` of the inner text and photo strip containers |
| `--content-pad-x` | Horizontal page gutter (80px desktop, 40px tablet, 20px mobile) |
| `--space-5` | Gap between photo cards |
| `--space-6` | Gap between headline and subtitle |
| `--space-24` | Bottom padding of text content block |
| `--space-9` | Mobile text content bottom padding |
| `--radius-2xl` | Card corner radius (16px) |
| `--color-white` | Card background and border colour |
| `--text-h1` | Headline font size (36px desktop) |
| `--text-lg` | Subtitle font size |
| `--color-slate-600` | Subtitle text colour |
| `--color-slate-900` | Headline text colour |

---

## Responsive behaviour

| Breakpoint | Behaviour |
|------------|-----------|
| Desktop (> 1024px) | Horizontal flex strip, `margin-bottom: -100px` |
| Tablet (≤ 1024px) | Horizontal flex strip, gap/margin reduced, `margin-bottom: -80px` |
| Mobile (≤ 767px) | 2-column grid, forced 4:3 ratio, `transform: none`, `margin-bottom: -48px` |

---

## Dependencies

- `useReveal` hook (`../hooks/useReveal`) — not used directly in HeroPhotoStrip; the reveal is driven by a local `useState` + `setTimeout(80ms)`.
- Global `.reveal` / `.reveal--in` CSS classes (defined in `src/index.css` or global styles) for fade+slide entrance animation.
- Parent page must NOT clip overflow horizontally/vertically near the strip for the overlap to work.
