// Local fallback content — real, English, studio-voice copy.
// This is the zero-env-var default: the entire site builds and renders from
// these typed constants. Shapes mirror `types.ts` exactly so a later Supabase
// swap is transparent. Image paths reference local SVG placeholders under
// public/images/ (produced by the imagery agent).

import type {
  Project,
  Service,
  ProcessStep,
  SiteSettings,
} from './types';

export const fallbackProcessSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept',
    description:
      'We begin with the site, the light, and the life a space is meant to hold. First moves are drawn by hand — proportion and intent before detail.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Plan, section, and material are resolved together. Architecture and interior are shaped as one continuous gesture, never handed between disciplines.',
  },
  {
    number: '03',
    title: 'Visualization',
    description:
      'Photoreal images test atmosphere before anything is built — how morning falls across a wall, how a material ages, how a room feels to stand in.',
  },
  {
    number: '04',
    title: 'Documentation',
    description:
      'Concept becomes buildable. We produce precise drawings and project documentation that carry the design intact from studio to site.',
  },
  {
    number: '05',
    title: 'Making',
    description:
      'Where a detail asks for it, we prototype and print in-house — models, fittings, and objects — closing the loop between drawing and made thing.',
  },
];

export const fallbackSettings: SiteSettings = {
  studioName: 'Studio Kova',
  tagline: 'One studio, from first sketch to made object.',
  heroStatement:
    'A single studio for architecture, interiors, and everything the building of them requires.',
  heroSub:
    'We carry a project end to end — concept, design, visualization, documentation, and making — under one team and one quiet, material-driven language.',
  aboutStatement:
    'Studio Kova is a small, senior practice working across architecture, interior and 3D design, photoreal visualization, 3D printing, and project documentation. We believe a place is best made when one team holds it from the first line to the last fitting — so nothing is lost in translation between the idea and the thing itself. Our work is quiet by intention: warm materials, honest proportion, and light treated as a building material of its own.',
  email: 'studio@studiokova.com',
  location: 'Copenhagen, DK',
  social: [
    { label: 'Instagram', url: 'https://instagram.com/studiokova' },
    { label: 'Pinterest', url: 'https://pinterest.com/studiokova' },
    { label: 'LinkedIn', url: 'https://linkedin.com/company/studiokova' },
  ],
  stats: [
    { label: 'Years in practice', value: '12' },
    { label: 'Disciplines in-house', value: '05' },
    { label: 'Projects delivered', value: '60+' },
  ],
  processSteps: fallbackProcessSteps,
};

export const fallbackServices: Service[] = [
  {
    id: 'svc-architecture',
    key: 'architecture',
    number: '01',
    title: 'Architecture',
    description:
      'Houses and considered buildings shaped around light, proportion, and place. From first massing to the details that make a threshold feel inevitable.',
    throughlineStep: 1,
    order: 1,
  },
  {
    id: 'svc-interiors',
    key: 'interiors',
    number: '02',
    title: 'Interior & 3D Design',
    description:
      'Interiors composed as one atmosphere — material, joinery, and furniture resolved together so a room reads as a single, unhurried thought.',
    throughlineStep: 2,
    order: 2,
  },
  {
    id: 'svc-visualization',
    key: 'visualization',
    number: '03',
    title: '3D Visualization',
    description:
      'Photoreal images that test a space before it exists — light, material, and mood rendered with restraint, for clients and for collaborators alike.',
    throughlineStep: 3,
    order: 3,
  },
  {
    id: 'svc-drafting',
    key: 'drafting',
    number: '04',
    title: 'Drafting & Documentation',
    description:
      'Precise construction drawings and project documentation. The unglamorous rigor that carries a design intact from concept to a buildable set.',
    throughlineStep: 4,
    order: 4,
  },
  {
    id: 'svc-printing',
    key: 'printing',
    number: '05',
    title: '3D Printing & Making',
    description:
      'In-house prototyping, models, and printed objects. We close the distance between a drawing and a physical thing you can hold and judge.',
    throughlineStep: 5,
    order: 5,
  },
];

export const fallbackProjects: Project[] = [
  {
    id: 'prj-1',
    slug: 'villa-solveig',
    title: 'Villa Solveig',
    discipline: 'architecture',
    disciplines: ['architecture', 'interiors'],
    year: 2025,
    location: 'Jutland, DK',
    summary:
      'A low timber and lime house set into a coastal slope, drawn to follow the sun from morning kitchen to evening room.',
    body:
      'Villa Solveig sits quietly in the dune grass, its long single-storey volume broken only where the roof lifts to draw north light into the living spaces. We designed the house from the inside out — beginning with the daily arc of the sun and the family\'s slow rituals of morning and evening — then wrapped it in untreated timber and lime render that will silver and settle with the coast.\n\nStudio Kova held the project from first sketch to final fitting: architecture, interior, the full construction set, and the visualizations that let the family live in the house a year before it existed. Oak, lime, and blackened steel repeat throughout, so the building reads as one material argument rather than a collection of rooms.\n\nThe result is a house that feels found rather than placed — a piece of the landscape given just enough shape to be lived in.',
    coverImage: '/images/project-1.jpg',
    images: ['/images/project-1.jpg', '/images/project-2.jpg', '/images/project-3.jpg'],
    role: 'Architecture · Interior · Documentation · Visualization',
    featured: true,
    order: 1,
  },
  {
    id: 'prj-2',
    slug: 'apartment-lindengade',
    title: 'Apartment Lindengade',
    discipline: 'interiors',
    disciplines: ['interiors', 'visualization'],
    year: 2024,
    location: 'Copenhagen, DK',
    summary:
      'A nineteenth-century apartment stripped back to its bones and rebuilt around warm plaster, oak, and a single long sightline.',
    body:
      'A tired top-floor flat in the old town, reworked into a calm, generous home. We removed a century of accretions to recover the original volume, then set a spine of oak joinery down its length — a wall that quietly holds the kitchen, the library, and the storage a small apartment needs.\n\nWalls are finished in lime plaster tinted the colour of unbleached linen; floors are wide reclaimed oak. Everything unnecessary was taken away so that light, and the few good things the owners kept, could be felt.\n\nWe designed the interior, drew the joinery for the maker, and produced the visualizations that guided every decision on material and tone.',
    coverImage: '/images/project-2.jpg',
    images: ['/images/project-2.jpg', '/images/project-4.jpg', '/images/project-1.jpg'],
    role: 'Interior Design · Joinery Documentation · Visualization',
    featured: true,
    order: 2,
  },
  {
    id: 'prj-3',
    slug: 'northlight-pavilion',
    title: 'Northlight Pavilion',
    discipline: 'printing',
    disciplines: ['printing', 'architecture'],
    year: 2025,
    location: 'Oslo, NO',
    summary:
      'A small garden pavilion whose ceramic-printed vault was prototyped, tuned, and produced entirely in the studio.',
    body:
      'A commission for a private garden, the Northlight Pavilion tests how far in-house making can carry a design. Its shading vault is assembled from clay-printed components, each one form-found to shed rain and cast a shifting lattice of shadow across the floor through the day.\n\nWe modelled the geometry, printed and fired successive prototypes to resolve the joint and the tolerance, then produced the final set of pieces on the studio\'s own machines. Nothing about the object passed through a supplier we could not stand beside.\n\nIt is a small building, but it is the clearest statement of how we work: an idea drawn, tested, and made under one roof.',
    coverImage: '/images/project-3.jpg',
    images: ['/images/project-3.jpg', '/images/project-5.jpg', '/images/project-6.jpg'],
    role: '3D Printing · Prototyping · Architecture',
    featured: true,
    order: 3,
  },
  {
    id: 'prj-4',
    slug: 'harbour-house-visualization',
    title: 'Harbour House',
    discipline: 'visualization',
    disciplines: ['visualization', 'architecture'],
    year: 2024,
    location: 'Lisbon, PT',
    summary:
      'A full photoreal image set for a competition-winning harbour house — atmosphere resolved long before ground was broken.',
    body:
      'Commissioned by a fellow practice, Harbour House is a set of photoreal visualizations produced to carry a competition entry and, later, to guide the client through construction. The brief was atmosphere over spectacle: warm afternoon light on lime-washed walls, the particular blue of the Tagus held in the middle distance.\n\nWe built the scene from the architect\'s model, developing materials, lighting, and staging until each frame read as a photograph of a place that already existed. The images did their work — the scheme was won, and the studio was retained through delivery.\n\nThis is the visualization service standing on its own: quiet, precise, and true to the design it represents.',
    coverImage: '/images/project-4.jpg',
    images: ['/images/project-4.jpg', '/images/project-2.jpg', '/images/project-1.jpg'],
    role: '3D Visualization · Art Direction',
    featured: true,
    order: 4,
  },
  {
    id: 'prj-5',
    slug: 'meridian-documentation-set',
    title: 'Meridian Documentation Set',
    discipline: 'drafting',
    disciplines: ['drafting', 'architecture'],
    year: 2023,
    location: 'Lviv, UA',
    summary:
      'A complete construction and permit documentation package that took a concept design cleanly onto site.',
    body:
      'For a mixed-use building designed by others, Studio Kova produced the full technical documentation — the drawings, schedules, and specifications that turn an intention into a buildable, permittable project.\n\nWorking from the concept set, we resolved the constructive detail, coordinated the disciplines, and delivered a permit and construction package precise enough to price and build without ambiguity. It is careful, patient work, and it is where many good designs are quietly lost or saved.\n\nWe take it as seriously as any facade: the drawing is the design, made durable.',
    coverImage: '/images/project-5.jpg',
    images: ['/images/project-5.jpg', '/images/project-6.jpg', '/images/project-3.jpg'],
    role: 'Drafting · Construction Documentation · Coordination',
    featured: true,
    order: 5,
  },
  {
    id: 'prj-6',
    slug: 'atelier-morgen',
    title: 'Atelier Morgen',
    discipline: 'architecture',
    disciplines: ['architecture', 'interiors', 'drafting'],
    year: 2023,
    location: 'Aarhus, DK',
    summary:
      'A working studio and gallery for a ceramicist — one room of top-lit calm, drawn and documented end to end.',
    body:
      'Atelier Morgen is a small workspace and gallery for a ceramicist, built in the yard of a nineteenth-century terrace. The brief was a single, quiet, top-lit room — a place to make and to show, warm in winter and cool in the long northern summer.\n\nWe designed a compact timber-frame volume with a clerestory that washes the working wall in even north light, a poured lime floor, and built-in oak shelving sized to the maker\'s own vessels. Studio Kova carried the project from concept through the full construction documentation and onto site.\n\nRestraint was the whole design: one material palette, one source of light, and nothing that competes with the work made inside.',
    coverImage: '/images/project-6.jpg',
    images: ['/images/project-6.jpg', '/images/project-1.jpg', '/images/project-5.jpg'],
    role: 'Architecture · Interior · Documentation',
    featured: true,
    order: 6,
  },
];
