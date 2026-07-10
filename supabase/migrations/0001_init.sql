-- 0001_init.sql — Studio Kova CMS schema.
-- Tables mirror the content model 1:1 (see docs/prd.md §7 and
-- docs/architecture.md §3). RLS is ON with a public SELECT policy for `anon`;
-- there is NO write policy — content edits happen via the Supabase dashboard or
-- the service role.

-- ---------------------------------------------------------------------------
-- Enum
-- ---------------------------------------------------------------------------
create type discipline as enum (
  'architecture',
  'interiors',
  'visualization',
  'printing',
  'drafting'
);

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  discipline  discipline not null,
  disciplines discipline[] not null default '{}',
  year        int not null,
  location    text not null,
  summary     text not null,
  body        text not null,          -- markdown narrative
  cover_image text not null,
  images      text[] not null default '{}',
  role        text not null,
  featured    boolean not null default false,
  "order"     int not null default 0,
  created_at  timestamptz not null default now()
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

-- Singleton settings row, guarded to id = 1.
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

-- ---------------------------------------------------------------------------
-- Row Level Security — public read only
-- ---------------------------------------------------------------------------
alter table projects      enable row level security;
alter table services      enable row level security;
alter table process_steps enable row level security;
alter table site_settings enable row level security;

create policy "public read" on projects      for select using (true);
create policy "public read" on services      for select using (true);
create policy "public read" on process_steps for select using (true);
create policy "public read" on site_settings for select using (true);
