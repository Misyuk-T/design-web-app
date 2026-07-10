// Shared content types — the single source of truth for the CMS layer.
// Both the local fallback content and the Supabase mapping conform to these
// shapes exactly, so swapping data sources is transparent to consumers.

export type Discipline =
  | 'architecture'
  | 'interiors'
  | 'visualization'
  | 'printing'
  | 'drafting';

export interface Project {
  id: string;
  slug: string;
  title: string;
  discipline: Discipline; // primary discipline
  disciplines?: Discipline[]; // optional secondary tags for multi-discipline work
  year: number;
  location: string; // e.g. "Copenhagen, DK"
  summary: string; // 1–2 sentence contemplative caption
  body: string; // markdown narrative for the detail page
  coverImage: string; // /images/*.svg
  images: string[]; // ordered gallery, /images/*.svg
  role: string; // studio's role / scope on the project
  featured: boolean; // surfaces in home "Selected Projects"
  order: number; // manual sort weight
}

export interface Service {
  id: string;
  key: Discipline;
  number: string; // editorial label e.g. "01"
  title: string; // "Architecture"
  description: string; // 1–2 line studio-voice copy
  throughlineStep: number; // position in concept → made-object process
  order: number; // display order
}

export interface ProcessStep {
  number: string; // "01"
  title: string;
  description: string;
}

export interface SiteSettings {
  studioName: string; // wordmark
  tagline: string; // one-line positioning
  heroStatement: string; // hero display copy
  heroSub: string; // hero sub-statement
  aboutStatement: string; // studio / about paragraph
  email: string; // contact
  location: string; // studio locale
  social: { label: string; url: string }[];
  stats: { label: string; value: string }[];
  processSteps: ProcessStep[];
}

export interface SiteContent {
  settings: SiteSettings;
  services: Service[]; // sorted by order
  projects: Project[]; // sorted: order asc, then year desc
}
