# UX & Design System Specification — Studio Portfolio

_BMAD UX Expert deliverable. Prepared 2026-07-10. Binding for every section, route,
and layout dev agent. Builds on `docs/prd.md` (§5, §8.5, §8.3 are the parent constraints)._

The register is **soft, warm minimalism** — quiet luxury in the Norm Architects
lineage: large elegant serif display, muted warm neutrals, hairline dividers,
small uppercase labels, numbered sections, generous whitespace, imagery-forward.
Every choice below optimizes for _restraint_. When in doubt, remove, enlarge the
whitespace, and let the serif breathe.

---

## 1. Design Tokens (Tailwind v4 `@theme` in `globals.css`)

Tailwind v4 has **no `tailwind.config`**. All tokens live in `src/app/globals.css`
inside an `@theme { … }` block. Declaring `--color-bone` there automatically
generates the utilities `bg-bone`, `text-bone`, `border-bone`, etc. Replace the
scaffold's `@theme inline` / dark-mode block entirely — this site is **light-only**
(warm paper), so do **not** ship a `prefers-color-scheme: dark` palette override.

### 1.1 Color tokens

Warm muted neutrals + one earthen accent. Naming is `--color-<name>`.

| Token | Hex | Role |
|---|---|---|
| `--color-bone` | `#F4F1EA` | Primary page background — warm paper/ivory |
| `--color-ivory` | `#FAF8F3` | Raised/inset surfaces, cards, alternating bands (lighter than bone) |
| `--color-oat` | `#E7E1D5` | Hairline rules, subtle fills, image-frame backing |
| `--color-ink` | `#1F1C18` | Primary text — warm near-black charcoal (NOT pure #000) |
| `--color-stone` | `#6B6459` | Secondary text, captions, meta, muted labels |
| `--color-clay` | `#9A6A4F` | THE accent — terracotta/clay: links, active state, focus ring, small marks |
| `--color-olive` | `#7C7A5A` | Optional secondary accent (sparingly — e.g. one hover); do not mix with clay in the same component |

**Semantic aliases** (declare these too, so components read intent not hue):
`--color-background: var(--color-bone)`, `--color-surface: var(--color-ivory)`,
`--color-foreground: var(--color-ink)`, `--color-muted: var(--color-stone)`,
`--color-rule: var(--color-oat)`, `--color-accent: var(--color-clay)`.

**Contrast (NFR-A2, WCAG AA):** `ink` on `bone` ≈ 13.8:1 (AAA). `stone` on `bone`
≈ 4.9:1 — passes AA for normal text; keep captions ≥ 15px. `clay` on `bone`
≈ 4.6:1 — passes AA for normal text and UI; for clay used at small/thin weights,
keep ≥ 16px or bump to `--color-ink` for the label and reserve clay for the
underline/mark. Never place `stone` or `clay` text on `oat`.

### 1.2 Font tokens

`--font-serif` (display) and `--font-sans` (body), wired to `next/font` CSS vars
(see §2). Remove the scaffold's `--font-geist-*` / `--font-mono`.

```css
--font-serif: var(--font-fraunces);
--font-sans:  var(--font-inter);
```

### 1.3 Radius, rule, motion tokens

| Token | Value | Role |
|---|---|---|
| `--radius-frame` | `2px` | Image frames / buttons — barely-there, editorial (NOT rounded) |
| `--hairline` | `1px` | Divider weight (use as `border-width`) |
| `--ease-quiet` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | The only easing; slow, calm |
| `--dur` | `400ms` | Standard transition duration |

---

## 2. Typography

### 2.1 Font setup (`next/font/google`, self-hosted per NFR-B1)

In `src/app/layout.tsx`, replace Geist with:

```ts
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],          // light display; avoid bold
  axes: ["opsz"],                          // optical size — elegant at display sizes
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});
```

Apply both variables on `<html className={`${fraunces.variable} ${inter.variable}`}>`.
Set `body { font-family: var(--font-sans); color: var(--color-ink);
background: var(--color-background); }`. **Fraunces** is the display serif (high
contrast, editorial, "Norm" register); **Inter** is the neutral body sans.
_(Cormorant Garamond is an acceptable serif alt if Fraunces feels too characterful —
same setup, `weight: ["300","400","500"]`.)_

### 2.2 Type scale (fluid, `clamp()`)

Serif display runs light (`font-weight: 300–400`), tight tracking, tight leading.
Body sans is `400`, relaxed leading. Use these named steps consistently:

| Step | Font | Size (`clamp`) | Leading / tracking | Use |
|---|---|---|---|---|
| Display XL | serif 300 | `clamp(2.75rem, 6vw, 5.5rem)` | `leading-[1.02] tracking-[-0.02em]` | Hero statement |
| Display L | serif 300 | `clamp(2rem, 4vw, 3.5rem)` | `leading-[1.08] tracking-[-0.015em]` | Section headline |
| Display M | serif 400 | `clamp(1.5rem, 2.5vw, 2.25rem)` | `leading-tight` | Project title, sub-heads |
| Body L | sans 400 | `clamp(1.05rem, 1.4vw, 1.3rem)` | `leading-relaxed` | Lead paragraph, about statement |
| Body | sans 400 | `1rem` (16px) | `leading-relaxed` | Standard prose |
| Caption | sans 400 | `0.9rem` | `leading-normal` `text-stone` | Year/location, image captions |
| Label | sans 500 | `0.75rem` (min 12px) | `uppercase tracking-[0.18em]` | Small uppercase eyebrow labels |

### 2.3 Signature primitives

- **Uppercase label (eyebrow):** `text-xs font-medium uppercase tracking-[0.18em]
  text-stone`. Used above headlines and as discipline tags.
- **Numbered section header:** the editorial monogram cue. Render as
  `01 — Studio`: the number + em-dash in the Label style (`text-stone`), the name
  in `text-ink`. Pattern:
  `<p class="label"><span class="text-stone">01</span> — Studio</p>`.
  Numbers **01–06** for content bands; Hero and Contact/CTA are unnumbered
  book-ends (PRD §5). The visible number is decorative — the real `<h2>` is the
  serif headline that follows (NFR-A5).

---

## 3. Spacing, Layout & Rhythm

- **Container:** `max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16`. Define once as a
  `.container-editorial` utility (or a shared `<Container>` in layout). Text-heavy
  passages sit in a narrower `max-w-[68ch]` / `max-w-3xl` measure.
- **Vertical rhythm:** each `<section>` gets `py-24 md:py-32` (Hero taller:
  `min-h-[88vh]`). This generous whitespace _is_ the luxury — do not compress it on
  desktop. Mobile may relax to `py-20`.
- **Hairline dividers (NFR-D2):** `border-t border-rule` (1px `--color-oat`).
  Use between sections and within editorial lists (e.g. each discipline row).
  Never a heavy or colored rule. A single hairline separating sections is the
  primary structural device.
- **Editorial grid:** 12-col mental model via CSS grid. Common patterns:
  asymmetric `grid-cols-1 md:grid-cols-12` with headline in `col-span-5` and body
  in `col-span-6 md:col-start-7`; projects in `grid-cols-1 md:grid-cols-2 gap-x-8
  gap-y-16`. Favor asymmetry and left-alignment over centered blocks (centering
  reserved for the Hero statement only).
- **Alternating bands:** most sections sit on `bone`; use `ivory` sparingly to set
  off one quieter band (e.g. Capabilities/Trade) — subtle, not stripey.

---

## 4. Component Conventions

### 4.1 Links & buttons

- **Text link (default):** `text-ink` with a clay underline that animates in on
  hover. Implementation: `underline underline-offset-[6px] decoration-[1px]
  decoration-oat hover:decoration-clay transition-[text-decoration-color]`
  duration `--dur` `--ease-quiet`. No color change of the text itself.
- **Primary CTA ("link-button"):** understated, not a filled pill. An inline label
  + a thin baseline rule, or a bordered rect: `inline-flex items-center gap-3 border
  border-ink px-6 py-3 text-xs uppercase tracking-[0.18em]` with
  `hover:bg-ink hover:text-bone transition-colors` (`--dur`/`--ease-quiet`).
  Optional trailing `→` that nudges `translate-x-1` on hover.
- **Contact CTA:** the studio email rendered large in **Display M serif** as a
  `mailto:` link with the hover-underline treatment — quiet and confident, no button
  chrome (PRD FR-C2).
- Buttons/links use `--radius-frame` (2px), never fully rounded.

### 4.2 Image frames (local SVG placeholders only — PRD FR-L4/NFR-B1)

- Always wrap in a fixed-aspect frame so there is **zero layout shift** (NFR-P3):
  `relative w-full overflow-hidden bg-oat rounded-[--radius-frame]` +
  `aspect-[...]`, with `next/image` `fill` + `sizes`, or an `<img>` with explicit
  `width/height`.
- **Aspect ratios:** Hero `aspect-[16/10]` (or full-bleed `min-h-[88vh]`);
  Selected Projects `aspect-[4/5]` (portrait, editorial) or `aspect-[3/4]`;
  wide project heroes `aspect-[3/2]`; capability thumbs `aspect-square`.
- `bg-oat` backs every frame so a slow/absent image still reads as a warm plate,
  never white.
- **Alt text:** meaningful images get descriptive `alt`; purely decorative
  abstract SVG plates are `alt=""` + `aria-hidden` (NFR-A1).

### 4.3 Hover & motion (restrained — PRD §2.3 non-goal: no flashy animation)

- One vocabulary only: opacity and a **small** transform, `--dur` `--ease-quiet`.
- Project card hover: image `scale-[1.03]` inside `overflow-hidden` + caption
  clay-underline appears. Nothing bounces, nothing spins.
- **Always** wrap non-essential transitions in
  `@media (prefers-reduced-motion: reduce) { *,*::before,*::after {
  transition: none !important; animation: none !important; } }` (NFR-A4).

### 4.4 Accessibility & focus (NFR-A3)

- Skip-to-content link as first focusable child of `<body>` (visually hidden until
  focused). Semantic landmarks: `header`/`nav`/`main`/`footer`, one `<h1>` per page
  (the Hero statement), `<section aria-labelledby>` per band.
- Global visible focus: `:focus-visible { outline: 2px solid var(--color-clay);
  outline-offset: 3px; }`. Do not remove outlines without a replacement.

---

## 5. Section-level cues (quick reference for section agents)

Hero: unnumbered, centered Display XL statement + Label sub, one atmospheric plate,
quiet scroll cue. Studio: `01 — Studio`, asymmetric grid, Body L statement + hairline
stat row. Disciplines: `02`, hairline-separated list, each row `Label number + serif
title + one-line desc`. Selected Projects: `03`, 2-col portrait grid, the emotional
center. Process: `04`, numbered steps as short contemplative lines. Capabilities/Trade:
`05`, quieter `ivory` band. Contact/CTA: unnumbered, large serif `mailto:`, locale,
hairline close.

---

## Summary

**Color tokens** (`@theme`, light-only): `--color-bone` (bg), `--color-ivory`
(surface), `--color-oat` (rules), `--color-ink` (text), `--color-stone` (muted),
`--color-clay` (accent), `--color-olive` (2nd accent) + semantic aliases
(`--color-background/surface/foreground/muted/rule/accent`).
**Fonts** via `next/font/google`: **Fraunces** `--font-fraunces` (`--font-serif`,
display, weights 300–500, `opsz` axis) + **Inter** `--font-inter` (`--font-sans`,
400/500); no Geist, no `tailwind.config`, self-hosted.
**5 visual rules:** (1) Warm paper `bone`, warm-black `ink` — never pure #000/#fff;
one accent (`clay`) only. (2) Light serif display (Fraunces 300–400, tight tracking)
vs Inter body; small uppercase `tracking-[0.18em]` labels; `01 — Studio` numbered
headers. (3) Generous rhythm: `max-w-[1200px]`, `py-24/32`, whitespace is the luxury.
(4) 1px `oat` hairline dividers are the only structural rule — no boxes/shadows.
(5) Restraint in motion: `bg-oat` fixed-aspect image frames (no layout shift),
subtle scale/underline hovers on `--ease-quiet`, honor `prefers-reduced-motion`.
