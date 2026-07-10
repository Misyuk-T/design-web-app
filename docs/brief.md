# Project Brief — Studio Portfolio & Landing Site

_BMAD Analyst deliverable. Prepared 2026-07-10._

## 1. Overview

A single, cohesive portfolio and landing website for a small multidisciplinary
design studio. The studio operates across five overlapping disciplines under one
roof: **architecture**, **interior & 3D design**, **3D visualization**,
**3D printing / making**, and **drafting & project documentation** (проектант).

The site's job is to make a small, versatile practice read as a single,
confident, high-end studio — the way Norm Architects, Vincent Van Duysen, or a
top Dribbble interior-portfolio does — rather than a freelancer offering a menu
of unrelated skills.

**Content language:** English (matches the aspirational reference market).
**Tone target:** quiet luxury, editorial, contemplative — never salesy.

## 2. Target Audience

**Primary — Private residential clients (homeowners & developers of high-end homes).**
Affluent individuals commissioning a house, apartment renovation, or interior.
They are design-literate, value taste and restraint, and are choosing a studio
on _feel_ and portfolio as much as on scope. They want to trust one team from
concept to construction documents.

**Secondary — Commercial & hospitality clients.**
Boutique hotels, restaurants, retail, and small commercial fit-outs that want a
signature interior plus the technical follow-through (visualization + drawings).

**Tertiary — Trade & collaborators.**
Contractors, developers, and other architects who may sub-contract the studio's
strengths: photoreal 3D visualization, 3D-printed models/objects, and precise
project documentation. This audience cares about competence and deliverables.

**Shared decision drivers:** portfolio quality, sense of taste, breadth handled
by one accountable team, and confidence that the studio can take a project from
first sketch to buildable drawings and physical objects.

## 3. Positioning

**Positioning statement:**
> A multidisciplinary design studio that carries a project from first idea to
> built reality — architecture, interiors, visualization, and the drawings and
> printed objects in between — held to a single, quiet, material-driven
> aesthetic.

**The wedge:** most competitors are either _pure aesthetic_ studios (beautiful,
but they hand off technical work) or _pure technical_ providers (drafting/viz
shops with no design voice). This studio is credibly **both** — design taste
_and_ end-to-end technical delivery — which is rare and is the core promise.

**What we are not:** not a generalist freelancer, not a render farm, not a
big impersonal firm. Small, senior, hands-on, and selective.

**Proof pillars to surface on-site:**
- One team, five disciplines, one visual language.
- Concept → visualization → documentation → made object: a visible throughline.
- Restraint and materiality as a signature, not maximal spectacle.

## 4. Brand Personality

| Trait | Expression |
|---|---|
| **Quiet** | Whitespace, thin rules, small uppercase labels, no exclamation. |
| **Editorial** | Large elegant serif display type; numbered sections; captions read like a design monograph. |
| **Warm-minimal** | Muted warm neutrals (bone, oat, clay, ink), never clinical cold white. |
| **Precise** | The technical disciplines (drafting, printing, viz) signal rigor and craft. |
| **Contemplative** | Copy invites the reader to slow down; describes atmosphere and material, not features. |

**Voice guidelines:** short, declarative, sensory. Talk about light, proportion,
material, and process — not "solutions" or "services rendered." Reference tone
(Norm Architects): _"material, light, and proportion come together to create a
calm, tactile landscape that invites visitors to slow down."_ Avoid jargon,
avoid hype, avoid lorem-ipsum filler — every line should sound like a real
studio wrote it.

## 5. Reference & Competitor Analysis

### Primary reference — Norm Architects (normcph.com)
- **Positioning:** "Designing architecture, interiors and products" — a
  multidisciplinary creative studio built on **"soft minimalism"**: refinement
  balanced with tactile, material-focused, wellbeing-driven experiences over
  spectacle. This is almost exactly the target register for our studio.
- **Structure:** discipline-led top nav (Architecture / Design / Creative /
  Studio / Press), homepage organized as editorial portfolio bands by typology
  ("Latest work," "Hospitality Projects," "In Residence," etc.).
- **Tone:** poetic, contemplative, metaphorical project titles ("Sanctuary in
  the sky," "History dances with sustainability"). Projects framed as
  philosophical statements about space, not functional briefs.
- **Aesthetic:** generous whitespace; neutral palette that lets full-bleed
  photography dominate; refined type; titles/captions layered with imagery; the
  site itself embodies the "soft minimal" philosophy it sells.
- **Takeaway for us:** adopt the discipline-led structure, editorial portfolio
  bands, small uppercase labels, and contemplative caption voice. **Diverge** by
  using a **large serif display** face (more warmth/editorial character than
  Norm's sans) and **muted _warm_ neutrals** rather than cool grey — and by
  foregrounding our end-to-end technical range (viz, printing, drafting) as a
  differentiator Norm doesn't emphasize.

### Secondary reference — Dribbble interior-portfolio shot
- Big imagery, thin rules/dividers, small uppercase labels, **numbered
  sections**. Confirms the visual system: numbered editorial sections, hairline
  dividers, restrained type scale, image-forward layout.

### Competitive landscape (archetypes we position against)
1. **Aesthetic-only studios** (Norm, Van Duysen tier): beautiful, but hand off
   technical/documentation work. _Our edge:_ we keep it in-house.
2. **Technical providers** (viz studios, drafting/BIM shops): competent,
   commodity-priced, no design voice. _Our edge:_ we have taste.
3. **Local generalist freelancers:** cheap and broad but read as unpolished and
   unaccountable. _Our edge:_ a single coherent brand and senior ownership.

## 6. Success Criteria

**Positioning / brand**
- A first-time visitor understands within one screen that this is _one senior
  studio_ spanning design **and** technical delivery — not a freelancer list.
- The site reads as peer to Norm-tier studios in taste and restraint.

**Content & UX**
- Discipline-led navigation; each of the five services has a clear, real,
  English, non-lorem description that sounds like a genuine high-end studio.
- Editorial portfolio bands with numbered sections, uppercase labels, hairline
  dividers, and large serif display type.
- Every project/section conveys atmosphere and process, not feature lists.

**Design system**
- Muted warm-neutral palette + large elegant serif display, defined as Tailwind
  v4 `@theme` tokens in `globals.css` (no `tailwind.config`).
- Generous whitespace; imagery-forward; consistent thin rules and small labels.

**Technical (constraints for downstream agents)**
- Builds fully self-contained: **no remote images** — elegant local SVG
  placeholder "photographs" (muted architectural abstractions) under
  `public/images/`.
- Content layer works **without env vars** via local fallback content, and
  switches to **Supabase** as headless CMS when
  `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present.
- Verifiable via `npm run build` / `npx tsc --noEmit` (never `npm run dev`).
- Accessible, responsive, fast; clean typographic hierarchy on mobile.

## 7. Sitemap Direction (for downstream PM/UX agents)

- **Home** — hero (studio statement) → editorial portfolio bands → services
  overview → studio/about teaser → contact CTA.
- **Work / Projects** — filterable by discipline; project detail pages.
- **Services** — the five disciplines, each with editorial copy and the
  end-to-end throughline (concept → viz → documentation → made object).
- **Studio** — about, philosophy, contact.

Downstream agents (PM, Architect, Designer) should treat sections 3–6 as
binding: positioning as end-to-end one-studio, warm soft-minimal aesthetic,
serif display + warm neutrals, and the self-contained/Supabase-optional
technical constraints.
