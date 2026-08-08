# Studio Kova

Portfolio and landing site for a small multidisciplinary design studio — architecture, interiors, 3D visualization, 3D printing, and project documentation.

**[Live site](https://design-web-app-topaz.vercel.app/uk)**

The brief was to make a five-discipline practice read as one confident studio instead of a freelancer with a service menu. Most of the work went into structure and typography rather than features.

## Bilingual routing

Ukrainian and English share one route tree. `/uk/projects` and `/en/projects` are rewritten by middleware to `/projects`, with the locale carried in a cookie and read server-side. No duplicated pages, no `[locale]` segment, and unprefixed URLs still resolve using the visitor's stored preference.

## Content

Four tables in Supabase — `projects`, `services`, `process_steps`, `site_settings`. Every read is wrapped so that missing environment variables or a failed query return typed local fallback content instead of throwing.

That is not defensive decoration. The project runs on Supabase's free tier, which pauses idle databases; when that happens the site keeps serving its last shipped content rather than breaking.

## Design concepts

`/v1` and `/v2` are alternative visual directions kept alongside the production layout, sharing the same data and locale handling. They exist so the client could compare directions on real content instead of static mockups.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, Supabase. `sitemap.ts`, `robots.ts`, and `manifest.ts` are generated from the same content source.

## Running it

```bash
npm install
npm run dev
```

Supabase credentials are optional:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Leave them unset and the site renders from fallback content. To work against a real database, apply `supabase/migrations/0001_init.sql` and `supabase/seed.sql`.

## Documentation

`docs/` holds the brief, PRD, UX spec, and architecture notes written before implementation.
