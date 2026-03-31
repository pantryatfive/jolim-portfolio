'use client';
import { useState, useEffect } from 'react';
import ProjectHero from '@/components/ProjectHero';
import ProjectMeta from '@/components/ProjectMeta';
import ProjectParagraph from '@/components/ProjectParagraph';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectBento from '@/components/ProjectBento';
import ProjectBottom from '@/components/ProjectBottom';

export default function ProjectTemplate() {
  const logos = ['/logo.svg', '/logo-negative.svg', '/logo-colour.svg'];
  const [logoSrc, setLogoSrc] = useState('/logo.svg');
  const [logoVisible, setLogoVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let swapTimeout: ReturnType<typeof setTimeout>;
    const schedule = (currentLogo: string) => {
      const intervals = [11000, 20000, 30000, 55000];
      const delay = intervals[Math.floor(Math.random() * intervals.length)];
      timeout = setTimeout(() => {
        setLogoVisible(false);
        swapTimeout = setTimeout(() => {
          const others = logos.filter((l) => l !== currentLogo);
          const next = others[Math.floor(Math.random() * others.length)];
          setLogoSrc(next);
          setLogoVisible(true);
          schedule(next);
        }, 300);
      }, delay);
    };
    schedule('/logo.svg');
    return () => { clearTimeout(timeout); clearTimeout(swapTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between sm:grid sm:grid-cols-3 px-6 sm:px-12 lg:px-20 h-14">
          <div className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="Jolim logo"
              width={28}
              height={28}
              style={{ transition: 'opacity 0.3s ease', opacity: logoVisible ? 1 : 0 }}
            />
            <a href="/" className="text-xs tracking-[0.2em] text-zinc-400 uppercase font-light hover:text-zinc-950 transition-colors">
              Jolim
            </a>
          </div>

          <nav className="hidden sm:flex items-center justify-center gap-6 sm:gap-8">
            <a href="/" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">Home</a>
            <a href="/#works" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">Works</a>
            <a href="/#about" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">About</a>
          </nav>

          <div className="flex items-center justify-end gap-4">
            <a href="#" className="text-xs tracking-wide bg-zinc-950 text-white px-4 py-2 hover:bg-orange-500 transition-colors">
              Download CV
            </a>
            <button
              className="sm:hidden flex flex-col justify-center items-center w-6 h-6 gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-zinc-950 transition-transform duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-5 h-px bg-zinc-950 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-zinc-950 transition-transform duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="sm:hidden border-t border-zinc-100 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-4">
            <a href="/" onClick={() => setMenuOpen(false)} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">Home</a>
            <a href="/#works" onClick={() => setMenuOpen(false)} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">Works</a>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">About</a>
          </nav>
        )}
      </header>

      <main className="pt-14">

        {/* ===== HERO ===================================================
            title   — main project headline (large H1, white on dark bg)
            blurb   — one or two sentence description of the project
        ================================================================ */}
        <ProjectHero
          title="Project Title"
          blurb="A short, punchy description of the project. What it is, who it's for, and why it matters in one or two sentences."
        />

        {/* ===== META ====================================================
            project  — client or product name
            role     — your role on this project
            duration — e.g. "3 months" or "Jan – Apr 2025"
            extras   — any additional fields: { label, value }
                       e.g. [{ label: 'Team', value: '4 designers' },
                              { label: 'Platform', value: 'iOS + Web' }]
        ================================================================ */}
        <ProjectMeta
          project="Client / Product Name"
          role="Lead Product Designer"
          duration="Jan – Apr 2025"
          extras={[
            { label: 'Platform', value: 'iOS + Web' },
          ]}
        />

        {/* ===== PARAGRAPH ===============================================
            eyebrow — optional section label above the divider line
            body    — main body text. Use \n\n for paragraph breaks.
        ================================================================ */}
        <ProjectParagraph
          eyebrow="Overview"
          body="Write your overview paragraph here. Explain the problem space, the brief, and the context you were working in.\n\nYou can add a second paragraph by using a line break in the string. Keep it concise — this is editorial, not a report."
          image="/Project%20X/ProjectParagraph/projectparagraph-1/overview@2x.webp"
          imageAlt="Illustration of designer at laptop"
        />

        {/* ===== PARAGRAPH + IMAGE (image right) =========================
            body          — text on the left
            src           — image path from /public
            alt           — image alt text
            caption       — optional small caption below image
            imagePosition — 'right' (default) or 'left'
        ================================================================ */}
        <ProjectParagraph
          eyebrow="The Problem"
          body="Describe the specific challenge or insight that drove this work. What was broken, missing, or worth improving? What did users need that they weren't getting?"
          src=""
          alt="Image description"
          caption="Optional image caption — describe what's shown."
          imagePosition="right"
        />

        {/* ===== PARAGRAPH + IMAGE (image left) ========================== */}
        <ProjectParagraph
          eyebrow="The Approach"
          body="Walk through how you approached the problem. What methods did you use? What decisions were made and why? Keep it focused on craft and thinking."
          src=""
          alt="Image description"
          caption="Optional image caption."
          imagePosition="left"
        />

        {/* ===== PARAGRAPH (no eyebrow) ================================== */}
        <ProjectParagraph
          body="Use a standalone paragraph section for reflections, outcomes, or any narrative that doesn't need an image. Remove the eyebrow prop to omit the divider label."
        />

        {/* ===== GALLERY =================================================
            slides  — array of { src, alt?, caption? }
            eyebrow — optional section label
            Auto-advances every 5s. Pauses on hover.
            Arrow buttons + dot indicators for manual control.
        ================================================================ */}
        <ProjectGallery
          eyebrow="Gallery"
          slides={[
            { src: '', alt: 'Slide 1', caption: 'Caption for slide one.' },
            { src: '', alt: 'Slide 2', caption: 'Caption for slide two.' },
            { src: '', alt: 'Slide 3', caption: 'Caption for slide three.' },
          ]}
        />

        {/* ===== BENTO GALLERY ===========================================
            images  — array of { src, alt? }, min 4 / max 6 images
            eyebrow — optional section label
            Layout auto-adjusts based on image count:
              4 images → Z pattern (big/small alternating)
              5 images → featured top + 3-column row
              6 images → alternating Z across 3 rows
            Wide images use 16:9 aspect, portrait slots use 3:4.
        ================================================================ */}
        <ProjectBento
          eyebrow="Process"
          images={[
            { src: '', alt: 'Image 1' },
            { src: '', alt: 'Image 2' },
            { src: '', alt: 'Image 3' },
            { src: '', alt: 'Image 4' },
            { src: '', alt: 'Image 5' },
            { src: '', alt: 'Image 6' },
          ]}
        />

      </main>

      {/* ===== PROJECT NAVIGATION ===== */}
      <ProjectBottom currentSlug="studio-lead" />

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#141414' }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-[57px]">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-[57px] mb-[71px]">
            <div className="flex flex-col gap-5">
              <p className="text-xs tracking-[0.2em] uppercase text-white font-medium">Jonathan Lim</p>
              <div className="flex flex-col gap-[7px]">
                <a href="mailto:jon@jolim.co" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Email</a>
                <a href="https://linkedin.com/in/jolim" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Linkedin</a>
                <a href="https://dribbble.com/jolim" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] items-start">
              <div className="w-[50px] h-[50px] bg-white shrink-0" />
              <p className="text-sm font-light leading-relaxed tracking-wide max-w-xs" style={{ color: '#ADADAD' }}>
                Crafting products and campaigns<br />
                with purpose and precision.
              </p>
            </div>
          </div>
          <div className="border-t pt-[14px]" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#555' }}>
              © Jolim 2026. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
