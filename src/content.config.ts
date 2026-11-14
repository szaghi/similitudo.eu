// Content collections. Frontmatter is validated at build time: an entry missing a required field fails the build
// instead of rendering a half-empty card. `draft: true` entries are shown by `npm run dev` and left out of production.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const codes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/codes' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    kind: z.enum(['sdk', 'solver', 'library', 'general', 'tool']), // library: scientific; general: general-purpose
    parent: reference('codes').optional(), // e.g. FLUME and PRISM are built on ADAM
    order: z.number().default(100),
    status: z.enum(['active', 'maintained', 'archived']).default('active'),
    license: z.string(),
    repo: z.url(),
    docs: z.url().optional(),
    logo: z.string().optional(), // folder under public/ holding logo.svg + logo-dark.svg
    physics: z.array(z.string()).default([]),
    methods: z.array(z.string()).default([]),
    parallelism: z.array(z.string()).default([]),
    // Evidence a coordinator can check: figures, measured numbers with their source page, reference papers.
    figures: z
      .array(
        z.object({
          src: z.string(), // under public/, light version
          dark: z.string().optional(), // dark version, same size
          width: z.number().int(),
          height: z.number().int(),
          alt: z.string(),
          caption: z.string(),
          source: z.url().optional(),
          animated: z.boolean().default(false), // a looping clip next to the still: <name>.webm and <name>.mp4
          hold: z.number().nonnegative().optional(), // animated SVG: the time (s) of the frame held under reduced motion, default 0
          // a compare figure (CompareFigure.astro): `src` / `dark` are the body, the twin is revealed over it
          compare: z
            .object({
              twin: z.string(), // under public/, registered with src: same size, same frame
              twinDark: z.string().optional(),
              labels: z.tuple([z.string(), z.string()]), // body, twin
              reveal: z.string(), // the accessible name of the control, e.g. "Reveal the mesh"
              plate: z.string().optional(), // the colour behind a figure with rounded corners
            })
            .optional(),
        }),
      )
      .default([]),
    evidence: z
      .array(
        z.object({
          kind: z.enum(['verification', 'performance']),
          test: z.string(), // what was run
          result: z.string(), // the measured value, as stated in the source
          source: z.url(),
        }),
      )
      .default([]),
    papers: z.array(z.object({ cite: z.string(), doi: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    acronym: z.string(),
    title: z.string(),
    programme: z.string(), // e.g. "Horizon Europe, Cluster 4", "EuroHPC JU", "PNRR"
    grant: z.string().optional(),
    role: z.string(), // the role played: partner, WP leader, task leader, ...
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    url: z.url().optional(),
    competences: z.array(z.string()).default([]),
    codes: z.array(reference('codes')).default([]),
    draft: z.boolean().default(false),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(100),
    orcid: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    cv: z.string().optional(), // path under public/, e.g. /cv/zaghi.pdf
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    kind: z.enum(['journal', 'chapter', 'conference', 'talk', 'report', 'thesis', 'software']),
    doi: z.string().optional(),
    url: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { codes, projects, people, publications };
