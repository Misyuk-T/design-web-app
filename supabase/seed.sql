-- seed.sql — inserts rows identical to src/lib/fallback-content.ts so a local
-- Supabase project and the zero-env build render the same site.
-- Long text uses dollar-quoting ($$…$$) to avoid apostrophe escaping.

-- ---------------------------------------------------------------------------
-- site_settings (singleton)
-- ---------------------------------------------------------------------------
insert into site_settings (
  id, studio_name, tagline, hero_statement, hero_sub, about_statement,
  email, location, social, stats, process_steps
) values (
  1,
  'Studio Kova',
  'One studio, from first sketch to made object.',
  'A single studio for architecture, interiors, and everything the building of them requires.',
  $$We carry a project end to end — concept, design, visualization, documentation, and making — under one team and one quiet, material-driven language.$$,
  $$Studio Kova is a small, senior practice working across architecture, interior and 3D design, photoreal visualization, 3D printing, and project documentation. We believe a place is best made when one team holds it from the first line to the last fitting — so nothing is lost in translation between the idea and the thing itself. Our work is quiet by intention: warm materials, honest proportion, and light treated as a building material of its own.$$,
  'studio@studiokova.com',
  'Copenhagen, DK',
  $$[
    {"label":"Instagram","url":"https://instagram.com/studiokova"},
    {"label":"Pinterest","url":"https://pinterest.com/studiokova"},
    {"label":"LinkedIn","url":"https://linkedin.com/company/studiokova"}
  ]$$::jsonb,
  $$[
    {"label":"Years in practice","value":"12"},
    {"label":"Disciplines in-house","value":"05"},
    {"label":"Projects delivered","value":"60+"}
  ]$$::jsonb,
  $$[
    {"number":"01","title":"Concept","description":"We begin with the site, the light, and the life a space is meant to hold. First moves are drawn by hand — proportion and intent before detail."},
    {"number":"02","title":"Design","description":"Plan, section, and material are resolved together. Architecture and interior are shaped as one continuous gesture, never handed between disciplines."},
    {"number":"03","title":"Visualization","description":"Photoreal images test atmosphere before anything is built — how morning falls across a wall, how a material ages, how a room feels to stand in."},
    {"number":"04","title":"Documentation","description":"Concept becomes buildable. We produce precise drawings and project documentation that carry the design intact from studio to site."},
    {"number":"05","title":"Making","description":"Where a detail asks for it, we prototype and print in-house — models, fittings, and objects — closing the loop between drawing and made thing."}
  ]$$::jsonb
);

-- ---------------------------------------------------------------------------
-- process_steps (table mirror of the jsonb above)
-- ---------------------------------------------------------------------------
insert into process_steps (number, title, description, "order") values
  ('01', 'Concept',       $$We begin with the site, the light, and the life a space is meant to hold. First moves are drawn by hand — proportion and intent before detail.$$, 1),
  ('02', 'Design',        $$Plan, section, and material are resolved together. Architecture and interior are shaped as one continuous gesture, never handed between disciplines.$$, 2),
  ('03', 'Visualization', $$Photoreal images test atmosphere before anything is built — how morning falls across a wall, how a material ages, how a room feels to stand in.$$, 3),
  ('04', 'Documentation', $$Concept becomes buildable. We produce precise drawings and project documentation that carry the design intact from studio to site.$$, 4),
  ('05', 'Making',        $$Where a detail asks for it, we prototype and print in-house — models, fittings, and objects — closing the loop between drawing and made thing.$$, 5);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
insert into services (key, number, title, description, throughline_step, "order") values
  ('architecture',  '01', 'Architecture',
    $$Houses and considered buildings shaped around light, proportion, and place. From first massing to the details that make a threshold feel inevitable.$$, 1, 1),
  ('interiors',     '02', 'Interior & 3D Design',
    $$Interiors composed as one atmosphere — material, joinery, and furniture resolved together so a room reads as a single, unhurried thought.$$, 2, 2),
  ('visualization', '03', '3D Visualization',
    $$Photoreal images that test a space before it exists — light, material, and mood rendered with restraint, for clients and for collaborators alike.$$, 3, 3),
  ('drafting',      '04', 'Drafting & Documentation',
    $$Precise construction drawings and project documentation. The unglamorous rigor that carries a design intact from concept to a buildable set.$$, 4, 4),
  ('printing',      '05', '3D Printing & Making',
    $$In-house prototyping, models, and printed objects. We close the distance between a drawing and a physical thing you can hold and judge.$$, 5, 5);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
insert into projects (
  slug, title, discipline, disciplines, year, location, summary, body,
  cover_image, images, role, featured, "order"
) values
  (
    'villa-solveig', 'Villa Solveig', 'architecture',
    '{architecture,interiors}', 2025, 'Jutland, DK',
    $$A low timber and lime house set into a coastal slope, drawn to follow the sun from morning kitchen to evening room.$$,
    $$Villa Solveig sits quietly in the dune grass, its long single-storey volume broken only where the roof lifts to draw north light into the living spaces. We designed the house from the inside out — beginning with the daily arc of the sun and the family's slow rituals of morning and evening — then wrapped it in untreated timber and lime render that will silver and settle with the coast.

Studio Kova held the project from first sketch to final fitting: architecture, interior, the full construction set, and the visualizations that let the family live in the house a year before it existed. Oak, lime, and blackened steel repeat throughout, so the building reads as one material argument rather than a collection of rooms.

The result is a house that feels found rather than placed — a piece of the landscape given just enough shape to be lived in.$$,
    '/images/project-1.jpg', '{/images/project-1.jpg,/images/project-2.jpg,/images/project-3.jpg}',
    'Architecture · Interior · Documentation · Visualization', true, 1
  ),
  (
    'apartment-lindengade', 'Apartment Lindengade', 'interiors',
    '{interiors,visualization}', 2024, 'Copenhagen, DK',
    $$A nineteenth-century apartment stripped back to its bones and rebuilt around warm plaster, oak, and a single long sightline.$$,
    $$A tired top-floor flat in the old town, reworked into a calm, generous home. We removed a century of accretions to recover the original volume, then set a spine of oak joinery down its length — a wall that quietly holds the kitchen, the library, and the storage a small apartment needs.

Walls are finished in lime plaster tinted the colour of unbleached linen; floors are wide reclaimed oak. Everything unnecessary was taken away so that light, and the few good things the owners kept, could be felt.

We designed the interior, drew the joinery for the maker, and produced the visualizations that guided every decision on material and tone.$$,
    '/images/project-2.jpg', '{/images/project-2.jpg,/images/project-4.jpg,/images/project-1.jpg}',
    'Interior Design · Joinery Documentation · Visualization', true, 2
  ),
  (
    'northlight-pavilion', 'Northlight Pavilion', 'printing',
    '{printing,architecture}', 2025, 'Oslo, NO',
    $$A small garden pavilion whose ceramic-printed vault was prototyped, tuned, and produced entirely in the studio.$$,
    $$A commission for a private garden, the Northlight Pavilion tests how far in-house making can carry a design. Its shading vault is assembled from clay-printed components, each one form-found to shed rain and cast a shifting lattice of shadow across the floor through the day.

We modelled the geometry, printed and fired successive prototypes to resolve the joint and the tolerance, then produced the final set of pieces on the studio's own machines. Nothing about the object passed through a supplier we could not stand beside.

It is a small building, but it is the clearest statement of how we work: an idea drawn, tested, and made under one roof.$$,
    '/images/project-3.jpg', '{/images/project-3.jpg,/images/project-5.jpg,/images/project-6.jpg}',
    '3D Printing · Prototyping · Architecture', true, 3
  ),
  (
    'harbour-house-visualization', 'Harbour House', 'visualization',
    '{visualization,architecture}', 2024, 'Lisbon, PT',
    $$A full photoreal image set for a competition-winning harbour house — atmosphere resolved long before ground was broken.$$,
    $$Commissioned by a fellow practice, Harbour House is a set of photoreal visualizations produced to carry a competition entry and, later, to guide the client through construction. The brief was atmosphere over spectacle: warm afternoon light on lime-washed walls, the particular blue of the Tagus held in the middle distance.

We built the scene from the architect's model, developing materials, lighting, and staging until each frame read as a photograph of a place that already existed. The images did their work — the scheme was won, and the studio was retained through delivery.

This is the visualization service standing on its own: quiet, precise, and true to the design it represents.$$,
    '/images/project-4.jpg', '{/images/project-4.jpg,/images/project-2.jpg,/images/project-1.jpg}',
    '3D Visualization · Art Direction', true, 4
  ),
  (
    'meridian-documentation-set', 'Meridian Documentation Set', 'drafting',
    '{drafting,architecture}', 2023, 'Lviv, UA',
    $$A complete construction and permit documentation package that took a concept design cleanly onto site.$$,
    $$For a mixed-use building designed by others, Studio Kova produced the full technical documentation — the drawings, schedules, and specifications that turn an intention into a buildable, permittable project.

Working from the concept set, we resolved the constructive detail, coordinated the disciplines, and delivered a permit and construction package precise enough to price and build without ambiguity. It is careful, patient work, and it is where many good designs are quietly lost or saved.

We take it as seriously as any facade: the drawing is the design, made durable.$$,
    '/images/project-5.jpg', '{/images/project-5.jpg,/images/project-6.jpg,/images/project-3.jpg}',
    'Drafting · Construction Documentation · Coordination', true, 5
  ),
  (
    'atelier-morgen', 'Atelier Morgen', 'architecture',
    '{architecture,interiors,drafting}', 2023, 'Aarhus, DK',
    $$A working studio and gallery for a ceramicist — one room of top-lit calm, drawn and documented end to end.$$,
    $$Atelier Morgen is a small workspace and gallery for a ceramicist, built in the yard of a nineteenth-century terrace. The brief was a single, quiet, top-lit room — a place to make and to show, warm in winter and cool in the long northern summer.

We designed a compact timber-frame volume with a clerestory that washes the working wall in even north light, a poured lime floor, and built-in oak shelving sized to the maker's own vessels. Studio Kova carried the project from concept through the full construction documentation and onto site.

Restraint was the whole design: one material palette, one source of light, and nothing that competes with the work made inside.$$,
    '/images/project-6.jpg', '{/images/project-6.jpg,/images/project-1.jpg,/images/project-5.jpg}',
    'Architecture · Interior · Documentation', true, 6
  );
