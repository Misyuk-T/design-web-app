// Content layer — the single public API every section and route consumes.
//
// Behavior:
//   • No Supabase env vars  → returns typed local fallback content.
//   • Env vars present      → sources from Supabase via the anon client.
//   • Any Supabase error    → logs and returns the fallback slice, so the build
//                             never breaks.
//
// Ordering is deterministic (build-time SSG): projects by `order` asc, then
// `year` desc; services by `order` asc. Snake_case DB columns are mapped to the
// camelCase types in types.ts.

import type {
  Project,
  Service,
  ProcessStep,
  SiteSettings,
  SiteContent,
} from './types';
import {
  fallbackProjects,
  fallbackServices,
  fallbackSettings,
  fallbackProcessSteps,
} from './fallback-content';
import { getSupabaseClient } from './supabase';

// ---------------------------------------------------------------------------
// DB row shapes (snake_case) — internal to this module.
// ---------------------------------------------------------------------------

interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  discipline: Project['discipline'];
  disciplines: Project['discipline'][] | null;
  year: number;
  location: string;
  summary: string;
  body: string;
  cover_image: string;
  images: string[] | null;
  role: string;
  featured: boolean;
  order: number;
}

interface ServiceRow {
  id: string;
  key: Service['key'];
  number: string;
  title: string;
  description: string;
  throughline_step: number;
  order: number;
}

interface ProcessStepRow {
  number: string;
  title: string;
  description: string;
  order?: number;
}

interface SiteSettingsRow {
  studio_name: string;
  tagline: string;
  hero_statement: string;
  hero_sub: string;
  about_statement: string;
  email: string;
  location: string;
  social: SiteSettings['social'] | null;
  stats: SiteSettings['stats'] | null;
  process_steps: ProcessStep[] | null;
}

// ---------------------------------------------------------------------------
// Row → type mappers.
// ---------------------------------------------------------------------------

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    discipline: row.discipline,
    disciplines: row.disciplines ?? undefined,
    year: row.year,
    location: row.location,
    summary: row.summary,
    body: row.body,
    coverImage: row.cover_image,
    images: row.images ?? [],
    role: row.role,
    featured: row.featured,
    order: row.order,
  };
}

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    key: row.key,
    number: row.number,
    title: row.title,
    description: row.description,
    throughlineStep: row.throughline_step,
    order: row.order,
  };
}

function mapProcessStep(row: ProcessStepRow): ProcessStep {
  return {
    number: row.number,
    title: row.title,
    description: row.description,
  };
}

// ---------------------------------------------------------------------------
// Deterministic sorts.
// ---------------------------------------------------------------------------

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) => a.order - b.order || b.year - a.year,
  );
}

function sortServices(services: Service[]): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

// ---------------------------------------------------------------------------
// Supabase fetchers — return `null` on missing client or any error, so callers
// fall back cleanly. Never throw.
// ---------------------------------------------------------------------------

async function fetchProjectsFromSupabase(): Promise<Project[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('projects').select('*');
    if (error || !data) throw error ?? new Error('No projects returned');
    return sortProjects((data as ProjectRow[]).map(mapProject));
  } catch (err) {
    console.error('[content] Supabase projects fetch failed; using fallback.', err);
    return null;
  }
}

async function fetchServicesFromSupabase(): Promise<Service[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('services').select('*');
    if (error || !data) throw error ?? new Error('No services returned');
    return sortServices((data as ServiceRow[]).map(mapService));
  } catch (err) {
    console.error('[content] Supabase services fetch failed; using fallback.', err);
    return null;
  }
}

async function fetchSettingsFromSupabase(): Promise<SiteSettings | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    if (error || !data) throw error ?? new Error('No site_settings row');
    const row = data as SiteSettingsRow;

    // Process steps live either in the `process_steps` table or, as a fallback,
    // in the site_settings.process_steps jsonb column. Prefer the table.
    let processSteps: ProcessStep[] = [];
    try {
      const { data: stepRows, error: stepErr } = await client
        .from('process_steps')
        .select('*')
        .order('order', { ascending: true });
      if (!stepErr && stepRows && stepRows.length > 0) {
        processSteps = (stepRows as ProcessStepRow[]).map(mapProcessStep);
      }
    } catch {
      // ignore — fall through to jsonb column below
    }
    if (processSteps.length === 0) {
      processSteps = (row.process_steps ?? []).map(mapProcessStep);
    }
    if (processSteps.length === 0) {
      processSteps = fallbackProcessSteps;
    }

    return {
      studioName: row.studio_name,
      tagline: row.tagline,
      heroStatement: row.hero_statement,
      heroSub: row.hero_sub,
      aboutStatement: row.about_statement,
      email: row.email,
      location: row.location,
      social: row.social ?? [],
      stats: row.stats ?? [],
      processSteps,
    };
  } catch (err) {
    console.error('[content] Supabase settings fetch failed; using fallback.', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API.
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  const remote = await fetchProjectsFromSupabase();
  return remote ?? sortProjects(fallbackProjects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getServices(): Promise<Service[]> {
  const remote = await fetchServicesFromSupabase();
  return remote ?? sortServices(fallbackServices);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await fetchSettingsFromSupabase();
  return remote ?? fallbackSettings;
}

export async function getContent(): Promise<SiteContent> {
  const [settings, services, projects] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
  ]);
  return { settings, services, projects };
}
