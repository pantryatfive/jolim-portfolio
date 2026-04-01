export interface Project {
  title: string;
  slug: string;
  thumbnail?: string;
}

/**
 * Single source of truth for all portfolio projects.
 * - Live projects: { title, slug } — appear in Works grid + project navigation
 * - Placeholders: { title: null, slug: null } — show as "Project 0X" in Works grid only
 *
 * To add a new project: replace a null entry with { title: '...', slug: '...' }
 * and create its page at src/app/works/[slug]/page.tsx
 */
export const PROJECTS: (Project | { title: null; slug: null })[] = [
  { title: 'Studio Design Leadership', slug: 'studio-lead' },
  { title: 'Oddle Eats App', slug: 'oddle-eats' },
  { title: 'Qatar Rail', slug: 'qatar-rail' },
  { title: 'Qatar Airways Destination', slug: 'qatar-airways' },
  { title: null, slug: null },
  { title: null, slug: null },
];

/** Only built/live projects — used for prev/next navigation */
export const LIVE_PROJECTS: Project[] = PROJECTS.filter(
  (p): p is Project => p.slug !== null && p.title !== null
);
