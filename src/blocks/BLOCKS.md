# Reusable Blocks Catalog

This folder contains UI sections that were built for SquareGPS but are not currently active
in the main design. Each block is self-contained (TSX + CSS Module + README) and can be
dropped into any page with minimal wiring.

---

## How to use a block

1. Copy the block's folder (e.g. `HeroPhotoStrip/`) into `src/components/`.
2. Import the component in the target page.
3. Read the block's `README.md` for configuration options, design tokens, and responsive notes.

---

## Available blocks

### HeroPhotoStrip

**Path:** `src/blocks/HeroPhotoStrip/`  
**Component:** `HeroPhotoStrip`  
**Docs:** [`HeroPhotoStrip/README.md`](./HeroPhotoStrip/README.md)

**What it looks like:**  
Full-width hero section with a centred headline + subtitle over a transparent background,
followed by a horizontal row of four rounded photo cards. Each card has a different
aspect ratio and is vertically staggered (alternating +20px / -12px translateY offsets).
The photo strip uses `margin-bottom: -100px` to physically overlap the content section below,
creating a layered depth effect where the next section's gradient appears *behind* the cards.

**Best for:** About Us, Team, Company intro pages where 4 team or product photos should
anchor the top of the page.

**Key features:**
- 4 configurable photo slots (shift, flex-grow, aspect-ratio per slot)
- Scroll-triggered entrance animation with staggered delays
- Mobile: switches to 2-column grid, cancels stagger transforms
- Designed to work with the atmospheric gradient on `AboutPage`

**Tokens:** `--text-h1`, `--text-lg`, `--radius-2xl`, `--header-h`, `--content-width`,
`--content-pad-x`, `--space-5`, `--space-6`, `--space-24`, `--color-white`, `--color-slate-600`

---

*Add new blocks below this line following the same format.*
