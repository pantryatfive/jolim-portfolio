# Jolim 2026 — Portfolio Brief

## About
Jon Lim (Jolim) — Product designer with agency background.
Combines design system thinking with the craft of an advertising
art director.

## Work to Feature
- UI/Product design case studies
- Advertising campaign executions
- Studio design team management

## Visual Direction
- Color: Black, grey, white scale with high-contrast orange accents
- Background: White or light grey
- Typography: Large H1s, classy, editorial feel
- Style: Minimal, clean, lots of white space
- Details: Tiny animated ASCII-style icons
- Influences: Dieter Rams, Saul Bass
- Reference site: osome.com

## Tech Stack
- Next.js + Tailwind CSS
- TypeScript
- Deployed on Vercel

## Rules for Claude Code
- Keep code clean and minimal — no bloat
- Mobile responsive always
- Prioritise typography and spacing over decoration
- Orange is an accent only — use sparingly

## Current Implementation

### Sections Built
1. **Hero Section**
   - Staggered line reveal animation (GSAP-style)
   - 24×24 black pixel animation placeholder
   - Large headline with tight tracking
   - Subtext: "Jonathan Lim"

2. **Introduction Section**
   - Editorial divider with "Introduction" label
   - 160×160 avatar with marching ants animation (rotating dotted border)
   - Avatar uses jolim@2x.png from /public
   - Subtle orange glow pulse animation
   - 2-column layout (avatar + bio text)
   - Chunked text reveal on scroll
   - Orange flashlight gradient effect on key phrase
   - Scroll-triggered animations using Intersection Observer

### Key Animations
- **Hero**: Staggered line reveal with blur-to-focus (cubic-bezier easing)
- **Avatar**: Marching ants rotation (20s), gentle pulse (4s), orange glow (4s)
- **Text**: 3-chunk sequential fade-up reveal
- **Flashlight**: 12s orange gradient sweep with pause at peak
- All animations use sophisticated easing curves for premium feel

### Typography
- Hero H1: text-5xl → text-7xl (responsive), font-black, tracking-tight
- Body text: text-2xl, font-light, 65ch max-width for readability
- Editorial letter-spacing and line-height throughout

### Color Usage
- Orange (#ea580c) used sparingly for accents
- Zinc scale (50-950) for greys and blacks
- Minimal palette following brief
