# CLAUDE.md — Coding Rules for Jolim Portfolio

## General
- Clean, minimal code — no bloat, no unused helpers
- Mobile responsive always
- Typography and spacing over decoration
- Orange is an accent only — use sparingly
- Never add comments, docstrings, or type annotations to code you didn't change
- Never add error handling for scenarios that can't happen

---

## Layout
- Outer container: `max-w-[1440px] mx-auto` with `px-6 sm:px-12 lg:px-20`
- Section vertical rhythm: `pt-28 pb-10`
- `ProjectBottom` always gets `mt-10` above it

---

## Homepage

### Data
- Single source of truth: `src/data/projects.ts`
- Live project: `{ title, slug, thumbnail? }`
- Placeholder: `{ title: null, slug: null }` — renders as "Project 0X"
- Always update `projects.ts` when a project title changes

### Works Cards
- Thumbnail aspect ratio: `3/2`
- Card wrapper: `flex flex-col`
- Card-label (text area below thumbnail): `flex-1` to equalise row height
- Terminology: thumbnail area = **works card**, text area below = **card-label**

### Works Section Layout
- Grey `bg-zinc-50` section sits **outside** `max-w-[1440px]` for full-width bleed
- `---- Works ----` divider sits inside the white container, above the grey section
- Grey section has its own inner `max-w-[1440px]` for content alignment

### Animations
- **Hero:** Staggered line reveal with blur-to-focus
- **Avatar:** Marching ants rotation (20s), gentle pulse (4s)
- **Intro text:** 3-chunk sequential fade-up on scroll
- **Flashlight:** 12s orange gradient sweep — use class `text-flashlight`
- **Works cards:** `softRise` keyframe — `translateY(12px→0)` + `opacity(0→1)`, ease-out, diagonal stagger 80ms, total 3–4s. On hover: replay at 400ms. Apply to all future works cards.
- **Clip reveal:** `clipReveal` keyframe — `translateY(105%→0)`, 0.75s spring (`cubic-bezier(0.16,1,0.3,1)`). Wrap target in `overflow-hidden` + inner div with animation. Use for text/mixed-content entrances.

---

## Case Study Pages

### Required Structure — no exceptions
1. `ProjectHero` — title + blurb
2. `ProjectMeta` — project / role / duration
3. `ProjectParagraph eyebrow="Overview"` — always includes overview illustration
4. _(body sections)_
5. `ProjectBottom` — always last, before `</main>`

### Overview Illustration
Every Overview section must include an image:
```tsx
<ProjectParagraph
  eyebrow="Overview"
  body="..."
  image="/Project%20X/ProjectParagraph/projectparagraph-1/overview@2x.webp"
  imageAlt="Illustration of designer at laptop"
/>
```
Export from Paper as WebP, place in `ProjectParagraph/projectparagraph-1/`.

---

## Images

### Folder Structure — mandatory
`/public/Project X/<ComponentName>/<component-name>-<index>/<filename>`

| Section | Example path |
|---|---|
| `ProjectParagraph` | `/Project 1/ProjectParagraph/projectparagraph-1/overview@2x.webp` |
| `ProjectGallery` | `/Project 1/ProjectGallery/projectgallery-1/image-1.jpg` |
| `ProjectBento` | `/Project 1/ProjectBento/projectbento-1/image-1.jpg` |
| `ProjectStrip` | `/Project 1/ProjectStrip/projectstrip-1/image-1.jpg` |

### Rules
- Index counts each component type independently by order of appearance
- All filenames: `image-1.jpg`, `image-2.jpg`, etc. — no custom names
- Exception: overview illustration is always `overview@2x.webp`
- URL-encode spaces in TSX paths: `/Project%201/...`
- Accepted formats: `.jpg`, `.webp`, `.png`

---

## Section Components

| Component | Purpose | Key Props |
|---|---|---|
| `ProjectHero` | Title + blurb, dark bg | `title`, `blurb` |
| `ProjectMeta` | Metadata strip | `project`, `role`, `duration?`, `extras[]` |
| `ProjectParagraph` | Text block with optional image | `eyebrow?`, `title?`, `body`, `image?`, `imageAlt?`, `src?`, `alt?`, `caption?`, `showCaption?`, `imagePosition?`, `compact?`, `showImage?` |
| `ProjectParagraphColumns` | 2–3 column text layout | `eyebrow?`, `columns[]` |
| `ProjectTextHighlight` | Chunked text with staggered fade | `chunks[]`, `showAvatar?` |
| `ProjectMetrics` | Stat blocks with flashlight title | `metrics[]` (`title`, `body`), `eyebrow?` — digits-only titles (`180+`) count up; mixed titles (`Up to 5 Formats`) use clip reveal. Per-card scroll observer: mobile = flat 200ms delay, desktop = 80ms stagger. |
| `ProjectGallery` | Auto-advancing carousel | `slides[]`, `eyebrow?` |
| `ProjectBento` | Bento grid, 4–6 images | `images[]`, `eyebrow?` |
| `ProjectStrip` | 1-row image strip, 1–3 images | `images[]`, `eyebrow?` |
| `ProjectBottom` | Prev/next navigation | `currentSlug` |
