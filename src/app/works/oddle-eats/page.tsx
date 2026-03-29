'use client';
import { useState, useEffect } from 'react';
import ProjectHero from '@/components/ProjectHero';
import ProjectMeta from '@/components/ProjectMeta';
import ProjectParagraph from '@/components/ProjectParagraph';
import ProjectBottom from '@/components/ProjectBottom';
import ProjectMetrics from '@/components/ProjectMetrics';

export default function OddleEats() {
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
        <div className="max-w-[1440px] mx-auto flex items-center justify-between sm:grid sm:grid-cols-3 px-6 sm:px-12 lg:px-20 h-14">
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

        {/* ===== HERO ===== */}
        <ProjectHero
          title="Oddle Eats App"
          blurb="Food discovery, made native. I designed the full iOS & Android experience for Oddle Eats — a 0→1 build that brought personalised recommendations, editorial content, and real-time order tracking to Singapore's power users."
        />

        {/* ===== META ===== */}
        <ProjectMeta
          project="The Oddle Company"
          role="UI Design, Design System, Branding, Prototyping"
          duration="2021 (4 weeks)"
          extras={[
            { label: 'Platform', value: 'iOS & Android' },
          ]}
        />

        {/* ===== METRICS ===== */}
        <ProjectMetrics
          metrics={[
            { title: '180+',          body: 'Campaign assets produced weekly' },
            { title: 'Up to 5 Formats', body: 'Social, EDM, Shop Banner, GIF, and Print — executed across all channels simultaneously' },
            { title: '100+',          body: 'Restaurant merchants scaled across design operations' },
          ]}
        />

        {/* ===== PARAGRAPH ===== */}
        <ProjectParagraph
          eyebrow="Overview"
          body="Oddle powers online ordering for 10,000+ restaurants across Southeast Asia. The product had always lived on the web — functional, but frictionless it was not. In 2021, we set out to build a native mobile app from scratch, targeting Oddle's power users: the frequent orderers who kept coming back despite the web's limitations. This was a 0→1 product build — from first wireframe to App Store submission — on a compressed timeline."
          image="/Project%202/ProjectParagraph/projectparagraph-1/overview@2x.webp"
          imageAlt="Illustration of designer at laptop"
        />

      </main>

      {/* ===== PROJECT NAVIGATION ===== */}
      <ProjectBottom currentSlug="oddle-eats" />

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#141414' }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-[57px]">
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
