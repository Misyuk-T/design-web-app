# Product Requirements Document — Studio Portfolio & Landing Site

_BMAD PM deliverable. Prepared 2026-07-10. Builds on `docs/brief.md` (sections 3–6 are binding)._

---

## 1. Product Summary

A single, editorial portfolio and landing website for a small multidisciplinary
design studio that carries a project end-to-end — **architecture, interior & 3D
design, 3D visualization, 3D printing / making, and drafting & project
documentation** (проектант) — under one senior, accountable team and one visual
language.

The core job of the site: make a small, versatile practice read within one
screen as a **single, confident, high-end studio** — a peer to Norm Architects —
never a freelancer's menu of unrelated skills. The aesthetic register is **soft,
warm minimalism**: quiet luxury, editorial, material-driven, imagery-forward,
large elegant serif display type, muted warm neutrals, hairline dividers, small
uppercase labels, and numbered sections.

The build is self-contained (local SVG placeholder imagery, no remote assets)
and CMS-optional: it runs on local fallback content with no env vars and
switches to Supabase as a headless CMS when Supabase env vars are present.

---

## 2. Goals & Non-Goals

### 2.1 Product goals
- **G1 — One-studio comprehension.** A first-time visitor understands within one
  screen that this is one senior studio spanning design **and** technical
  delivery, not a service list.
- **G2 — Taste as proof.** The site itself demonstrates the studio's taste and
  restraint; it reads as a peer to Norm-tier studios.
- **G3 — Legible end-to-end throughline.** The visitor can trace concept →
  visualization → documentation → made object as one continuous capability.
- **G4 — Portfolio as the hero.** Selected projects are the emotional and
  evidentiary center; imagery and atmosphere lead, copy supports.
- **G5 — Low-friction contact.** A design-literate prospect can reach the studio
  with a clear, unhurried call to action.

### 2.2 Success criteria (measurable proxies)
- First screen names the studio, its one-line positioning, and the five
  disciplines without scrolling on desktop and within the first viewport +
  one scroll on mobile.
- All five disciplines carry real, English, non-lorem copy in the studio voice.
- Landing renders fully with **zero env vars** (local fallback content) and
  passes `npm run build` and `npx tsc --noEmit`.
- Lighthouse-style targets met (see §8): performance, a11y, SEO all strong.

### 2.3 Non-goals (this phase)
- No authentication, client portal, or e-commerce.
- No blog/press system, multi-language, or search.
- No live Supabase provisioning (code must be *ready* for it, not depend on it).
- No booking/scheduling or payment flows.
- No animation-heavy interactions beyond restrained, tasteful transitions.

---

## 3. User Personas

**P1 — Elena, private high-end residential client (PRIMARY).**
Commissioning a house or full apartment renovation. Design-literate, chooses on
feel and portfolio, wants to trust one team from concept to construction
drawings. Needs: to feel the studio's taste immediately, see coherent work,
believe the team can go from sketch to buildable documentation. Reads slowly;
distrusts hype.

**P2 — Marco, boutique commercial / hospitality developer (SECONDARY).**
Developing a small hotel or restaurant. Wants a signature interior *and* the
technical follow-through (visualization + drawings). Needs: evidence of range,
signal of reliability and delivery, a sense the studio can handle both the
atmosphere and the paperwork.

**P3 — Sofia, trade collaborator / architect (TERTIARY).**
May sub-contract photoreal visualization, 3D-printed models, or precise project
documentation. Cares about competence and deliverables more than mood. Needs: to
quickly find that these discrete technical services exist and are done to a high
standard, plus a way to make contact.

---

## 4. Information Architecture & Sitemap

**Home** (this PRD's primary deliverable) — an ordered set of editorial sections
(see §5).

**Work / Projects**
- `/work` — projects listing, filterable/groupable by discipline, editorial grid.
- `/work/[slug]` — project detail page: hero image, meta (discipline, year,
  location, role/scope), narrative body, image sequence, next-project link.

**Studio** — about, philosophy, team posture, contact (may be folded into home
sections for this phase; a dedicated route is optional and out of critical path).

**Contact** — reachable from the home contact section and global footer.

Global: header (studio wordmark + discipline-led nav + contact link) and footer
(contact, disciplines recap, copyright). Header/footer are layout-level, not
part of the numbered home sections.

---

## 5. Landing Page — Ordered Sections

The home page is composed of **7 ordered sections**, each built as one
self-contained React **server component** under
`src/components/sections/` (PascalCase filename). Each imports ONLY from `react`,
`next/*`, and `@/lib/content` (the `getContent()` accessor the CMS agent
provides). Sections never import from each other. Numbered editorial labels
(01 – 06 for the content bands) reinforce the monograph feel; Hero and Footer-CTA
are unnumbered book-ends.

1. **Hero** — full-bleed opening statement. Studio wordmark/name, one-line
   positioning (end-to-end, one studio, material-driven), a quiet sub-statement,
   and a subtle scroll cue. One large atmospheric SVG placeholder image.
2. **Studio / About** — the "one team, five disciplines, one visual language"
   statement. Short, sensory, declarative paragraph on philosophy (light,
   proportion, material, process) plus a compact stat/credential row (years,
   disciplines, throughline).
3. **Disciplines / Services** — the five disciplines as an editorial list with
   numbered labels, each with a real one-to-two-line description in studio voice.
   Emphasize the throughline: concept → visualization → documentation → made
   object.
4. **Selected Projects** — the portfolio band; 3–6 featured projects as large
   imagery with small uppercase discipline label, project title (serif), year/
   location caption, linking to `/work/[slug]`. This is the emotional center.
5. **Process** — the end-to-end throughline made explicit as numbered steps
   (e.g. Concept → Design → Visualization → Documentation → Making), each a
   short contemplative line. Proves in-house continuity.
6. **Capabilities / Trade** — a quieter band surfacing the discrete technical
   offerings (photoreal visualization, 3D printing / models, drafting &
   documentation) for the trade/collaborator audience, framed with craft and
   rigor rather than a price list.
7. **Contact / CTA** — closing invitation. Warm, unhurried CTA, email/contact
   affordance, studio locale, and a hairline-framed footer-adjacent close.

> Rationale for 7: the brief's suggested set (hero, about, services, projects,
> process, contact) is extended with a dedicated **Capabilities / Trade** band so
> the tertiary audience (P3) is served without diluting the primary residential
> narrative, and so the "credibly technical too" wedge is explicit.

Each section spec and its target file path are enumerated in the structured
output accompanying this PRD.

---

## 6. Functional Requirements

### 6.1 Landing page (FR-L)
- **FR-L1** Render all 7 sections in order as server components composed by
  `src/app/page.tsx`.
- **FR-L2** Every section pulls its content via `getContent()` from
  `@/lib/content`; no hardcoded content that duplicates the CMS model (short
  presentational microcopy is acceptable).
- **FR-L3** Sections are independently buildable and must not import one another.
- **FR-L4** All imagery references local SVG placeholders under `public/images/`.
- **FR-L5** Numbered content bands (02–06 style labels), small uppercase labels,
  hairline dividers, serif display headings — consistent across sections.
- **FR-L6** Fully responsive; clean typographic hierarchy on mobile; imagery
  scales without layout shift.

### 6.2 Projects listing (FR-P)
- **FR-P1** `/work` lists all projects from `getContent()` in an editorial grid.
- **FR-P2** Group or filter by discipline (architecture, interiors,
  visualization, 3D printing, drafting).
- **FR-P3** Each card: cover image, uppercase discipline label, serif title,
  year/location caption; links to detail page.
- **FR-P4** Deterministic ordering (explicit `order`/`featured` then year desc).

### 6.3 Project detail (FR-D)
- **FR-D1** `/work/[slug]` resolves a project by slug from `getContent()`;
  unknown slug → Next.js `notFound()`.
- **FR-D2** Renders hero image, meta block (discipline, year, location, scope/
  role), narrative body, and an ordered image sequence.
- **FR-D3** Provides a "next project" or "back to work" link.
- **FR-D4** Generates static params for all known project slugs (SSG-friendly).

### 6.4 Contact (FR-C)
- **FR-C1** Contact section/route exposes the studio email and locale from
  `site settings` content.
- **FR-C2** Primary CTA is a `mailto:` (or simple form posting to a route
  handler is acceptable if trivially self-contained); no third-party form
  service, no external network dependency for the build.
- **FR-C3** If a form is used, it degrades gracefully and validates on the server.

### 6.5 Content layer (FR-CMS-consumer side)
- **FR-CMS1** A single accessor module `@/lib/content` exposes `getContent()`
  (and typed sub-accessors) returning: `projects`, `services`/`disciplines`,
  and `siteSettings`.
- **FR-CMS2** With no Supabase env vars, `getContent()` returns local fallback
  content (typed, real English copy) so the entire site builds and renders.
- **FR-CMS3** With `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  present, `getContent()` sources from Supabase, falling back to local content
  on error so the build never breaks.
- **FR-CMS4** Content is typed (TypeScript interfaces) and shared by all sections
  and routes; `npx tsc --noEmit` passes.

---

## 7. CMS Content Model Requirements

Three collections. These are requirements for the CMS agent; local fallback must
mirror these shapes exactly so a later Supabase swap is transparent.

### 7.1 `projects`
| Field | Type | Notes |
|---|---|---|
| `id` | string/uuid | PK |
| `slug` | string | unique, URL segment |
| `title` | string | serif display title, editorial |
| `discipline` | enum | architecture \| interiors \| visualization \| printing \| drafting (primary discipline) |
| `disciplines` | enum[] | optional secondary tags for multi-discipline work |
| `year` | number | |
| `location` | string | e.g. "Copenhagen, DK" |
| `summary` | string | 1–2 sentence contemplative caption |
| `body` | rich text / markdown | narrative for detail page |
| `coverImage` | string | path to local SVG placeholder |
| `images` | string[] | ordered gallery paths |
| `role` / `scope` | string | studio's role on the project |
| `featured` | boolean | surfaces in home "Selected Projects" |
| `order` | number | manual sort weight |

### 7.2 `services` / `disciplines`
| Field | Type | Notes |
|---|---|---|
| `id` | string | PK |
| `key` | enum | architecture \| interiors \| visualization \| printing \| drafting |
| `number` | string | editorial label e.g. "01" |
| `title` | string | e.g. "Architecture" |
| `description` | string | real English studio-voice copy (1–2 lines) |
| `throughlineStep` | number | position in concept→made-object process |
| `order` | number | display order |

### 7.3 `siteSettings` (singleton)
| Field | Type | Notes |
|---|---|---|
| `studioName` | string | wordmark |
| `tagline` | string | one-line positioning |
| `heroStatement` | string | hero display copy |
| `heroSub` | string | hero sub-statement |
| `aboutStatement` | string | studio/about paragraph |
| `email` | string | contact |
| `location` | string | studio locale |
| `social` | {label,url}[] | optional, no external assets required |
| `stats` | {label,value}[] | about-row credentials |
| `processSteps` | {number,title,description}[] | for Process section |

All copy fields must ship with real, non-lorem English content in the studio
voice (short, sensory, declarative — light, proportion, material, process).

---

## 8. Non-Functional Requirements

### 8.1 Performance
- **NFR-P1** Server components by default; ship minimal client JS (interactivity
  only where essential).
- **NFR-P2** No render-blocking remote assets; all imagery is local SVG.
- **NFR-P3** No cumulative layout shift on image load (intrinsic sizing / aspect
  ratios reserved).
- **NFR-P4** Static generation for home, `/work`, and all `/work/[slug]` pages
  where possible.
- **NFR-P5** Verifiable via `npm run build` and `npx tsc --noEmit`; never rely on
  `npm run dev`.

### 8.2 SEO
- **NFR-S1** Per-page metadata via Next.js Metadata API (title, description,
  canonical); home and each project detail have distinct, descriptive titles.
- **NFR-S2** Open Graph + Twitter card metadata using a local SVG/asset.
- **NFR-S3** Semantic landmarks (`header`, `main`, `nav`, `footer`, `section`),
  one `h1` per page, logical heading order.
- **NFR-S4** `sitemap.xml` and `robots.txt` via Next.js conventions covering
  home, `/work`, and project slugs.
- **NFR-S5** Descriptive, human-readable slugs.

### 8.3 Accessibility (WCAG 2.1 AA target)
- **NFR-A1** All meaningful images have descriptive `alt`; decorative SVG marked
  `aria-hidden`.
- **NFR-A2** Warm-neutral palette meets AA contrast for body and interactive
  text; verify ink-on-bone and label contrast.
- **NFR-A3** Keyboard operable: visible focus states, logical tab order, skip-to-
  content link.
- **NFR-A4** Respect `prefers-reduced-motion` for any transitions.
- **NFR-A5** Numbered/uppercase decorative labels do not replace semantic
  headings.

### 8.4 Responsive & cross-device
- **NFR-R1** Fluid layouts from ~360px to large desktop; imagery-forward at all
  sizes.
- **NFR-R2** Typographic scale collapses gracefully; serif display remains
  legible and elegant on mobile.

### 8.5 Design system & maintainability
- **NFR-D1** All design tokens (warm-neutral palette: bone/oat/clay/ink; serif
  display + supporting sans; spacing/rhythm) defined in `globals.css` `@theme`
  (Tailwind v4, no `tailwind.config`).
- **NFR-D2** Consistent hairline rule, label, and numbered-section primitives
  reused across sections.
- **NFR-D3** Content/presentation separation via `@/lib/content`; no cross-
  section imports.

### 8.6 Build integrity
- **NFR-B1** Self-contained: no remote images, fonts loaded via `next/font`
  (self-hosted), no external network calls at build or runtime for core render.
- **NFR-B2** Runs with zero env vars; Supabase is strictly additive.

---

## 9. Dependencies & Downstream Handoffs

- **Architect** — routing (`/work`, `/work/[slug]`), `@/lib/content` module +
  types, Supabase-optional data source, `globals.css` `@theme` tokens, layout
  (header/footer), local SVG placeholder image set under `public/images/`.
- **Designer / section dev agents** — build each of the 7 section components per
  §5 and the structured spec, consuming `getContent()` only.
- **CMS agent** — provide `getContent()`, local fallback content (real copy),
  and the Supabase schema mirroring §7.

## 10. Open Questions
- Dedicated `/studio` route vs. folding About into home (default: fold for this
  phase, revisit if content grows).
- Contact via `mailto:` vs. self-contained server-action form (default:
  `mailto:` for zero dependencies; upgrade later).
