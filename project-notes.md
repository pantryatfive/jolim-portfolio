# Jolim Portfolio — Project Notes

## About
**Jon Lim (Jolim)** — Product and Creative Designer, 15+ years.
Singapore, Doha, Manila. Agency + product background.
Combines design system thinking with advertising art direction craft.

---

## Visual Direction
- **Palette:** Black, grey, white — orange as accent only (use sparingly)
- **Background:** White or light grey (`zinc-50`)
- **Typography:** Large H1s, editorial, classy feel
- **Style:** Minimal, lots of white space, purposeful
- **Influences:** Dieter Rams, Saul Bass
- **Reference:** osome.com

---

## Tech Stack
- Next.js + Tailwind CSS + TypeScript
- Deployed on **Vercel** (account: `pantryatfive-9313s-projects`)
- Deploy: `vercel` (preview) · `vercel --prod` (production)
- Run from: `/Volumes/MAC500/Claude Projects/jolim-portfolio`

---

## Work to Feature
- UI/Product design case studies
- Advertising campaign executions
- Studio design team management

---

## Projects

| # | Title | Slug | Status |
|---|-------|------|--------|
| 01 | Studio Design Leadership | `studio-lead` | Live — content largely complete |
| 02 | Oddle Eats App | `oddle-eats` | Live — in progress |
| 03 | Qatar Rail | `qatar-rail` | Live — stub only |
| 04–06 | — | — | Placeholder |

---

## Homepage — Works Section
- Grey `bg-zinc-50` section is **outside** the `max-w-[1440px]` container for full viewport bleed
- `---- Works ----` divider sits in the white container above the grey section
- Works cards use `aspectRatio: 3/2` (responsive height)
- Card-label uses `flex-1` so all labels in a row are equal height
- Studio-lead card has purple gradient + noise + emoji dock animation (`WorksThumbStudioLead`)
- Card blurbs per project are hardcoded in `page.tsx`

---

## Components Built

| Component | Notes |
|---|---|
| `ProjectHero` | Title + blurb, dark bg |
| `ProjectMeta` | Metadata strip — project, role, duration, extras |
| `ProjectParagraph` | Merged text + image component. Supports small square overview image (`image`) and large side image (`src`, `imagePosition`, `compact`, `showImage`, `caption`, `showCaption`) |
| `ProjectParagraphColumns` | 2–3 col text layout |
| `ProjectTextHighlight` | Chunked text reveal with staggered fade + optional flashlight highlight (renamed from ProjectIntro) |
| `ProjectMetrics` | 3-col stat blocks — large flashlight title + body, grey top divider per column, staggered fade-in |
| `ProjectGallery` | Auto-advancing carousel, pauses on hover |
| `ProjectBento` | Asymmetric bento grid, 4–6 images |
| `ProjectStrip` | 1-row image strip, 1–3 images |
| `ProjectBottom` | Prev/next navigation, auto-reads from `projects.ts` |

---

## Image Naming Convention
All image files use `image-1.jpg`, `image-2.jpg` etc. — no custom filenames.
Exception: overview illustration is always `overview@2x.webp`.

---

## Recent Session Work (2026-03-30)
- Merged `ProjectParagraphImage` into `ProjectParagraph` — deleted old component
- Renamed `ProjectIntro` → `ProjectTextHighlight`
- Standardised image filenames to `image-1.jpg`, `image-2.jpg` across all components
- Fixed homepage works section grey bg — now true full viewport bleed outside max-width container
- Card-label heights equalised using `flex-1` + `h-full`
- Built `ProjectMetrics` component — added to `oddle-eats` with 3 stats
- Updated `oddle-eats` hero blurb, overview body copy, and ProjectMeta fields
- Split `CLAUDE.md` into `CLAUDE.md` (rules) + `project-notes.md` (context)

---

## To-Do
- [ ] Refine homepage introduction entrance animation
- [ ] Add scroll-triggered section entrance animations
- [ ] Replace footer `mailto:` with a contact form
- [ ] Continue building out `oddle-eats` case study content
- [ ] Build out `qatar-rail` case study content
- [ ] Export + add overview illustrations for Project 02 and 03
- [ ] Add captions to studio-lead ProjectStrip
