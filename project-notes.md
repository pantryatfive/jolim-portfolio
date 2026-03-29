# Project Notes — Jolim Portfolio

## About
**Jo Lim** — Product and Creative Designer, 15+ years. Singapore, Doha, Manila.
Agency + product background. Combines design system thinking with advertising art direction craft.

---

## Visual Direction
- Palette: Black, grey, white — orange as accent only
- Background: White or light grey (`zinc-50`)
- Typography: Large H1s, editorial, classy
- Style: Minimal, lots of white space, purposeful
- Influences: Dieter Rams, Saul Bass
- Reference: osome.com

---

## Tech Stack
- Next.js + Tailwind CSS + TypeScript
- Deployed on Vercel (account: `pantryatfive-9313s-projects`)
- Deploy commands: `vercel` (preview) · `vercel --prod` (production)
- Local path: `/Volumes/MAC500/Claude Projects/jolim-portfolio`

---

## Projects

| # | Title | Slug | Status |
|---|-------|------|--------|
| 01 | Studio Design Leadership | `studio-lead` | Live — content largely complete |
| 02 | Oddle Eats App | `oddle-eats` | Live — in progress |
| 03 | Qatar Rail | `qatar-rail` | Live — stub only |
| 04–06 | — | — | Placeholder |

---

## What's Been Built

**Homepage**
- Hero, intro text, works grid — all live
- Studio Lead card: purple gradient + noise + emoji dock animation (`WorksThumbStudioLead`)
- Card blurbs per project are hardcoded in `page.tsx`

**Components**
- `ProjectHero` — title + blurb, dark bg
- `ProjectMeta` — project, role, duration, extras
- `ProjectParagraph` — merged text + image component (supports overview image and large side image)
- `ProjectParagraphColumns` — 2–3 col text layout
- `ProjectTextHighlight` — chunked text reveal with staggered fade + optional flashlight (renamed from `ProjectIntro`)
- `ProjectMetrics` — 3-col stat blocks, large flashlight title + body, staggered fade-in
- `ProjectGallery` — auto-advancing carousel, pauses on hover
- `ProjectBento` — asymmetric bento grid, 4–6 images
- `ProjectStrip` — 1-row image strip, 1–3 images
- `ProjectBottom` — prev/next navigation, reads from `projects.ts`

**Recent changes (2026-03-30)**
- Merged `ProjectParagraphImage` into `ProjectParagraph` — deleted old component
- Renamed `ProjectIntro` → `ProjectTextHighlight`
- Standardised image filenames to `image-1.jpg`, `image-2.jpg` across all components
- Fixed works section grey bg — now true full-width bleed outside max-width container
- Built `ProjectMetrics` — added to oddle-eats with 3 stats
- Updated oddle-eats hero blurb, overview copy, and ProjectMeta fields

---

## Known Issues
- [ ] _(add issues as they come up)_

---

## Next Steps

- [ ] Refine homepage introduction entrance animation
- [ ] Add scroll-triggered section entrance animations
- [ ] Continue building out `oddle-eats` case study content
- [ ] Build out `qatar-rail` case study content
- [ ] Export + add overview illustrations for projects 02 and 03
- [ ] Add captions to studio-lead ProjectStrip
- [ ] Replace footer `mailto:` with a contact form
