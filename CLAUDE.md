# CLAUDE.md — Coding Rules for Jolim Portfolio

## General Rules
- Keep code clean and minimal — no bloat, no unused helpers
- Mobile responsive always
- Prioritise typography and spacing over decoration
- Orange is an accent only — use sparingly
- Do not add comments, docstrings, or type annotations to code you didn't change
- Do not add error handling for scenarios that can't happen

---

## Layout
- Outer container: `max-w-[1440px] mx-auto` with `px-6 sm:px-12 lg:px-20`
- Section vertical rhythm: `pt-28 pb-10`
- `ProjectBottom` always gets `mt-10` above it

---

## Homepage (`src/app/page.tsx`)

### Works Grid
- Single source of truth: `src/data/projects.ts`
- Live: `{ title, slug, thumbnail? }` — linked cards
- Placeholder: `{ title: null, slug: null }` — shows as "Project 0X"
- **Always update `projects.ts` when a project title changes**

### Works Cards
- Thumbnail area: `aspectRatio: 3/2`
- Card-label (white text area below thumbnail): uses `flex-1` to equalise height across a row
- Card wrapper: `flex flex-col` so grid stretch flows through
- Terminology: thumbnail area = **works card**, text area below = **card-label**

### Works Section Layout
- Grey `bg-zinc-50` section is **outside** the `max-w-[1440px]` container for full viewport bleed
- The `---- Works ----` divider sits inside the white container, above the grey section
- Grey section has its own inner `max-w-[1440px]` div for content alignment

### Animations
- **Hero:** Staggered line reveal with blur-to-focus
- **Avatar:** Marching ants rotation (20s), gentle pulse (4s)
- **Intro text:** 3-chunk sequential fade-up on scroll
- **Flashlight:** 12s orange gradient sweep — use class `text-flashlight`
- **Works cards entrance:** `softRise` keyframe — `translateY(12px→0)` + `opacity(0→1)`, ease-out, diagonal stagger 80ms, total 3–4s. On hover: replay at 400ms. Apply to all future works cards.

---

## Case Study Pages

### Required Structure — no exceptions
1. `ProjectHero` — title + blurb
2. `ProjectMeta` — project / role / duration
3. `ProjectParagraph eyebrow="Overview"` — always includes overview illustration
4. _(body sections)_
5. `ProjectBottom` — always last, before `</main>`

### Overview Illustration Rule
Every Overview `ProjectParagraph` must include:
```tsx
<ProjectParagraph
  eyebrow="Overview"
  body="..."
  image="/Project%20X/ProjectParagraph/projectparagraph-1/overview@2x.webp"
  imageAlt="Illustration of designer at laptop"
/>
```
Export from Paper as WebP, drop into the project's `ProjectParagraph/projectparagraph-1/` folder.

---

## Image Folder Rule — mandatory, no exceptions

Path structure: `/public/Project X/<ComponentName>/<component-name>-<index>/<filename>`

| Section | Example path |
|---|---|
| `ProjectParagraph` | `/Project 1/ProjectParagraph/projectparagraph-1/overview@2x.webp` |
| `ProjectGallery` | `/Project 1/ProjectGallery/projectgallery-1/slide1.jpg` |
| `ProjectBento` | `/Project 1/ProjectBento/projectbento-1/123.jpg` |
| `ProjectStrip` | `/Project 1/ProjectStrip/projectstrip-1/img.jpg` |

- Index counts each section type independently by order of appearance
- **All image filenames must use `image-1.jpg`, `image-2.jpg`, `image-3.jpg` etc.** — no custom filenames
- Exception: overview illustration always named `overview@2x.webp`
- URL-encode spaces in TSX: `/Project%201/...`
- Formats: `.jpg`, `.webp`, `.png`

---

## Section Components

| Component | Purpose | Key Props |
|---|---|---|
| `ProjectHero` | Title + blurb, dark bg | `title`, `blurb` |
| `ProjectMeta` | Metadata strip | `project`, `role`, `duration?`, `extras[]` |
| `ProjectParagraph` | Text block with optional images | `eyebrow?`, `title?`, `body`, `image?`, `imageAlt?`, `src?`, `alt?`, `caption?`, `showCaption?`, `imagePosition?`, `compact?`, `showImage?` |
| `ProjectParagraphColumns` | 2–3 col text | `eyebrow?`, `columns[]` |
| `ProjectTextHighlight` | Chunked text reveal with staggered fade | `chunks[]`, `showAvatar?` |
| `ProjectMetrics` | 3-col stat blocks with flashlight titles | `metrics[]` (`title`, `body`), `eyebrow?` |
| `ProjectGallery` | Auto-advancing carousel | `slides[]`, `eyebrow?` |
| `ProjectBento` | Bento grid 4–6 images | `images[]`, `eyebrow?` |
| `ProjectStrip` | 1-row image strip 1–3 | `images[]`, `eyebrow?` |
| `ProjectBottom` | Prev/next navigation | `currentSlug` |
