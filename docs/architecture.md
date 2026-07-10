# Architecture — Studio Portfolio & Landing Site

_BMAD Architect deliverable. Prepared 2026-07-10. Implements `docs/prd.md`._
_Stack: Next.js 16.2 (App Router) · React 19 · TypeScript · Tailwind v4 (no config) · Supabase-optional CMS._

> **Route naming decision.** The binding PRD (§4 sitemap, FR-P, FR-D) and the
> home `SelectedProjects` link contract all standardize on **`/work`** and
> **`/work/[slug]`**. The architect brief's phrasing "/projects" maps to these
> exact routes. Canonical throughout this document and all code: **`/work`**.

---

## 1. App Router Structure

All routes are **static-generated** (SSG). Server components by default; the only
client component is the `/work` discipline filter (minimal client JS).

```
src/
  app/
    layout.tsx            # root: <html><body>, next/font, Header, main, Footer, skip link
    page.tsx              # "/"  — landing: composes the 7 section components in order
    globals.css           # Tailwind v4 @theme tokens (palette, fonts, rhythm)
    sitemap.ts            # MetadataRoute.Sitemap — home, /work, all /work/[slug]
    robots.ts             # MetadataRoute.Robots — allow all, points at sitemap
    opengraph-image.tsx   # (optional) static OG using a local SVG/asset
    not-found.tsx         # studio-styled 404
    work/
      page.tsx            # "/work" — projects listing, filterable by discipline
      [slug]/
        page.tsx          # "/work/[slug]" — project detail
                          #   export generateStaticParams()  -> all slugs
                          #   export generateMetadata({params}) -> per-project SEO
  components/
    layout/
      Header.tsx          # wordmark + discipline nav + contact link (server)
      Footer.tsx          # contact, disciplines recap, copyright (server)
      SkipLink.tsx        # skip-to-content (a11y NFR-A3)
    sections/             # the 7 home sections (see §5 ownership map)
      Hero.tsx  Studio.tsx  Disciplines.tsx  SelectedProjects.tsx
      Process.tsx  Capabilities.tsx  Contact.tsx
    ui/                   # shared editorial primitives (NFR-D2)
      SectionLabel.tsx    # "01 —" numbered uppercase label
      Hairline.tsx        # hairline divider rule
      ProjectCard.tsx     # cover + uppercase discipline + serif title + caption
      DisciplineFilter.tsx# "use client" — /work filter control (only client comp)
      Placeholder.tsx     # renders a local SVG placeholder with reserved aspect ratio
  lib/
    content.ts            # getContent / getProjects / getProjectBySlug accessors
    types.ts              # SiteContent, Project, Service, ProcessStep, SiteSettings, ...
    fallback-content.ts   # typed real-English local content (zero-env-var default)
    supabase.ts           # createClient() helper; null when env vars absent
public/
  images/                 # local SVG placeholder "photographs" (see §6)
supabase/
  migrations/             # 0001_init.sql (schema + RLS)
  seed.sql                # seed rows mirroring fallback-content.ts
```

### Next.js 16 conventions that differ from older training data
- **`params` is a `Promise`.** In `/work/[slug]`, page and `generateMetadata`
  must `await params`: `const { slug } = await params`.
- **`generateStaticParams`** returns `[{ slug }]` for every known slug → full SSG,
  satisfies FR-D4 / NFR-P4.
- **`sitemap.ts` / `robots.ts`** use the `MetadataRoute.Sitemap` /
  `MetadataRoute.Robots` return types (NFR-S4). `sitemap()` calls `getProjects()`
  to enumerate `/work/[slug]` URLs.
- **Metadata API**: root `layout.tsx` exports a base `metadata` (title template,
  description, OG/Twitter); `/work/[slug]` exports `generateMetadata` for
  per-project titles/descriptions (NFR-S1/S2).
- Unknown slug in `/work/[slug]` → `notFound()` (FR-D1).

### Rendering / data flow
`getContent()` runs **at build time** inside server components. No content is
duplicated in the client bundle. Sections receive their slice of `SiteContent`
either by calling `getContent()` themselves or by `page.tsx` passing props — the
binding rule (FR-L2/FR-L3) is that **sections import only `react`, `next/*`, and
`@/lib/content`, and never each other**.

---

## 2. CMS Layer Contract (`src/lib`)

A single accessor module isolates all content sourcing. Consumers never touch
Supabase or fallback files directly.

### 2.1 `src/lib/types.ts` — shared types

```ts
export type Discipline =
  | 'architecture' | 'interiors' | 'visualization' | 'printing' | 'drafting';

export interface Project {
  id: string;
  slug: string;
  title: string;
  discipline: Discipline;           // primary
  disciplines?: Discipline[];       // optional secondary tags
  year: number;
  location: string;                 // e.g. "Copenhagen, DK"
  summary: string;                  // 1–2 sentence caption
  body: string;                     // markdown narrative (detail page)
  coverImage: string;               // /images/*.svg
  images: string[];                 // ordered gallery, /images/*.svg
  role: string;                     // scope / studio role
  featured: boolean;                // surfaces in home Selected Projects
  order: number;                    // manual sort weight
}

export interface Service {          // a.k.a. discipline entry
  id: string;
  key: Discipline;
  number: string;                   // editorial label "01"
  title: string;                    // "Architecture"
  description: string;              // 1–2 line studio-voice copy
  throughlineStep: number;          // position concept→made-object
  order: number;
}

export interface ProcessStep {
  number: string;                   // "01"
  title: string;
  description: string;
}

export interface SiteSettings {     // singleton
  studioName: string;
  tagline: string;
  heroStatement: string;
  heroSub: string;
  aboutStatement: string;
  email: string;
  location: string;
  social: { label: string; url: string }[];
  stats: { label: string; value: string }[];
  processSteps: ProcessStep[];
}

export interface SiteContent {
  settings: SiteSettings;
  services: Service[];              // sorted by order
  projects: Project[];              // sorted: featured/order then year desc
}
```

### 2.2 `src/lib/content.ts` — accessors (the public contract)

```ts
export async function getContent(): Promise<SiteContent>;
export async function getProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project | null>;
export async function getServices(): Promise<Service[]>;
export async function getSiteSettings(): Promise<SiteSettings>;
```

Behavior:
- **No env vars** → returns typed data from `fallback-content.ts` (FR-CMS2).
  Entire site builds and renders with zero configuration.
- **`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` present** →
  sources from Supabase via the anon client (FR-CMS3).
- **On any Supabase error** → logs and returns fallback content, so the build
  never breaks (FR-CMS3). This is a `try/catch` around each fetch, defaulting to
  the corresponding fallback slice.
- **Ordering is deterministic** (FR-P4): projects sorted by `order` asc, then
  `year` desc; `getProjectBySlug` is an exact `slug` match; `featured` projects
  feed `SelectedProjects`.
- Results are effectively static (build-time) — no request-time APIs, so pages
  stay SSG.

### 2.3 `src/lib/supabase.ts`

```ts
export function getSupabaseClient(): SupabaseClient | null;  // null if env absent
```

Reads the two `NEXT_PUBLIC_*` vars; returns `null` when either is missing so
`content.ts` can branch cleanly to fallback. Uses the **anon** key only
(public read via RLS). Requires adding `@supabase/supabase-js` to dependencies
when Supabase is wired; the fallback path has **no runtime dependency**.

### 2.4 `src/lib/fallback-content.ts`
Exports one typed constant per collection (`fallbackSettings: SiteSettings`,
`fallbackServices: Service[]`, `fallbackProjects: Project[]`) with **real English
studio-voice copy** — 5 disciplines, 4–6 featured projects, process steps, stats,
contact. Shapes mirror `types.ts` exactly so a Supabase swap is transparent.

---

## 3. Supabase Schema (`supabase/`)

Optional, additive. Tables mirror PRD §7 one-to-one. **RLS on, public read via
`anon`**, no write policy (CMS edits happen in the Supabase dashboard / service
role). Migrations in `supabase/migrations/`, seed in `supabase/seed.sql`.

### 3.1 Tables (`supabase/migrations/0001_init.sql`)

```sql
create type discipline as enum
  ('architecture','interiors','visualization','printing','drafting');

create table projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  discipline   discipline not null,
  disciplines  discipline[] not null default '{}',
  year         int not null,
  location     text not null,
  summary      text not null,
  body         text not null,          -- markdown
  cover_image  text not null,
  images       text[] not null default '{}',
  role         text not null,
  featured     boolean not null default false,
  "order"      int not null default 0,
  created_at   timestamptz not null default now()
);

create table services (
  id               uuid primary key default gen_random_uuid(),
  key              discipline not null unique,
  number           text not null,
  title            text not null,
  description      text not null,
  throughline_step int not null,
  "order"          int not null default 0
);

create table process_steps (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  title       text not null,
  description text not null,
  "order"     int not null default 0
);

-- singleton, guarded to a single row
create table site_settings (
  id              int primary key default 1,
  studio_name     text not null,
  tagline         text not null,
  hero_statement  text not null,
  hero_sub        text not null,
  about_statement text not null,
  email           text not null,
  location        text not null,
  social          jsonb not null default '[]',
  stats           jsonb not null default '[]',
  process_steps   jsonb not null default '[]',
  constraint site_settings_singleton check (id = 1)
);
```

### 3.2 RLS — public read only

```sql
alter table projects       enable row level security;
alter table services       enable row level security;
alter table process_steps  enable row level security;
alter table site_settings  enable row level security;

create policy "public read" on projects      for select using (true);
create policy "public read" on services      for select using (true);
create policy "public read" on process_steps for select using (true);
create policy "public read" on site_settings for select using (true);
```

### 3.3 DB → app field mapping
`content.ts` maps snake_case columns to camelCase types: `cover_image →
coverImage`, `throughline_step → throughlineStep`, `"order" → order`. Process
steps may live either as the `process_steps` table **or** the
`site_settings.process_steps` jsonb — the accessor reads the table first and
falls back to the jsonb column; both feed `SiteSettings.processSteps`.

### 3.4 `supabase/seed.sql`
Inserts rows identical to `fallback-content.ts` so local Supabase and the
zero-env build render the same site.

---

## 4. Design Tokens (`src/app/globals.css`, Tailwind v4)

**No `tailwind.config`** (NFR-D1). Replace the create-next-app defaults. Tokens
declared in `@theme` become Tailwind utilities (`bg-bone`, `text-ink`,
`font-serif`, etc.). Provide warm-neutral palette (bone/oat/clay/ink),
self-hosted serif display + supporting sans via `next/font` (wired in
`layout.tsx`, exposed as `--font-serif` / `--font-sans`), spacing/rhythm, and a
`prefers-reduced-motion` guard (NFR-A4). Palette must meet AA contrast for
ink-on-bone body and labels (NFR-A2). This file is **owned by the Architect**;
section agents consume utilities, they do not edit tokens.

---

## 5. File Ownership Map (parallel dev agents)

Sections are independent (no cross-imports), enabling parallel work. Each section
agent owns exactly one file under `src/components/sections/` and may **read**
`lib/*` and `ui/*` contracts but not modify them.

| Owner | Files | Depends on (read-only) |
|---|---|---|
| **Architect (this doc)** | `app/layout.tsx`, `app/globals.css`, `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `components/layout/*`, `components/ui/*` (shared primitives), `public/images/*` | — |
| **CMS agent** | `lib/content.ts`, `lib/types.ts`, `lib/fallback-content.ts`, `lib/supabase.ts`, `supabase/migrations/*`, `supabase/seed.sql` | `types.ts` (source of truth) |
| **Routes agent** | `app/page.tsx` (composes sections), `app/work/page.tsx`, `app/work/[slug]/page.tsx` | `lib/content`, `sections/*`, `ui/ProjectCard`, `ui/DisciplineFilter` |
| **Hero agent** | `components/sections/Hero.tsx` | `lib/content` (`settings`), `ui/*` |
| **Studio agent** | `components/sections/Studio.tsx` | `lib/content` (`settings.aboutStatement`, `stats`), `ui/*` |
| **Disciplines agent** | `components/sections/Disciplines.tsx` | `lib/content` (`services`), `ui/SectionLabel`, `ui/Hairline` |
| **Selected Projects agent** | `components/sections/SelectedProjects.tsx` | `lib/content` (`projects` where `featured`), `ui/ProjectCard` → links `/work/[slug]` |
| **Process agent** | `components/sections/Process.tsx` | `lib/content` (`settings.processSteps`), `ui/*` |
| **Capabilities agent** | `components/sections/Capabilities.tsx` | `lib/content` (`services` viz/printing/drafting), `ui/*` |
| **Contact agent** | `components/sections/Contact.tsx` | `lib/content` (`settings.email/location/social`), `ui/*` |

Shared-primitive contract (Architect owns; agents consume): `SectionLabel`,
`Hairline`, `ProjectCard`, `Placeholder`, `DisciplineFilter`. Agreeing these
signatures up front is what lets the 7 sections build in parallel without
touching each other (FR-L3, NFR-D2/D3).

### Build order / critical path
1. **Architect**: tokens (`globals.css`), `layout.tsx`, `ui/*` primitives, SVG placeholders.
2. **CMS agent**: `types.ts` → `fallback-content.ts` → `content.ts` (unblocks everyone).
3. **Section agents** (parallel) + **Routes agent** compose.
4. **Supabase schema/seed** in parallel (not on critical path — additive).

---

## 6. Local SVG Placeholder Imagery (`public/images/`)

No remote assets (NFR-B1). Muted architectural abstract SVG compositions
(gradients, geometry, grain) at reserved aspect ratios to prevent CLS (NFR-P3):
hero (wide atmospheric), one cover per project, gallery frames. `ui/Placeholder`
renders them with `width`/`height` so intrinsic sizing reserves space.
Meaningful images carry descriptive `alt`; purely decorative SVG is
`aria-hidden` (NFR-A1).

---

## 7. Cross-cutting NFR compliance
- **SEO** (NFR-S1–S5): base `metadata` + `generateMetadata`; `sitemap.ts` +
  `robots.ts`; semantic `header/main/nav/footer/section`, one `h1` per page.
- **A11y** (NFR-A1–A5): skip link, visible focus, AA contrast tokens,
  `prefers-reduced-motion`, decorative labels never replace headings.
- **Perf** (NFR-P1–P5): server components, local SVG only, reserved aspect
  ratios, SSG, verified by `npm run build` + `npx tsc --noEmit` (never `dev`).
- **Build integrity** (NFR-B1/B2): zero-env-var render via fallback; `next/font`
  self-hosted; Supabase strictly additive.

---

## 8. Verification
`npm run build` (full SSG of `/`, `/work`, every `/work/[slug]`) and
`npx tsc --noEmit`. No `NEXT_PUBLIC_SUPABASE_*` set → fallback path exercised by
default.
