'use client';
import { useState, useEffect } from 'react';
import ProjectHero from '@/components/ProjectHero';
import ProjectMeta from '@/components/ProjectMeta';
import ProjectParagraph from '@/components/ProjectParagraph';
import ProjectParagraphColumns from '@/components/ProjectParagraphColumns';
import ProjectBottom from '@/components/ProjectBottom';

export default function QatarAirways() {
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

        {/* ===== HERO ===== */}
        <ProjectHero
          title="Qatar Airways Destination"
          blurb="A creative pitch for Qatar Airways — designed to shift how travellers think about choosing a destination, from logistics to longing. My scope: Design and Art Direction for the digital component."
        />

        {/* ===== META ===== */}
        <ProjectMeta
          project="Qatar Airways"
          role="Design & Art Direction (Digital)"
          extras={[
            { label: 'Type', value: 'Creative Pitch' },
            { label: 'Deliverables', value: 'Graphic Design, Presentation Design' },
            { label: 'Team', value: 'Creative Director: Julien Gillet, Art Direction (Print): Jawad Ghrayeb, English Copy: Cal Sinclair, Arabic Copy: Naser Al-Khalaileh, Design & Art Direction (Digital): Me' },
          ]}
        />

        {/* ===== OVERVIEW ===== */}
        <ProjectParagraph
          eyebrow="Overview"
          body="Over 40% of travellers bounce between dreaming and planning before they book. And 1 in 3 hasn't even settled on a destination when they first start looking. Qatar Airways wanted to meet people at that earlier, more emotional moment — before the spreadsheet, before the price comparison. The brief: make the network of 150+ destinations feel less like a catalogue and more like an invitation."
          src="/Project%204/ProjectParagraph/projectparagraph-1/overview@2x.webp"
          alt="Illustration of designer at laptop"
          imageType="square"
        />

        {/* ===== DESIGN RATIONALE ===== */}
        <ProjectParagraph
          eyebrow="Design Rationale"
          body="The opportunity wasn't just to promote destinations — it was to give travel another dimension. Less about where Qatar Airways flies, more about why you'd want to go at all. The campaign idea came down to a single device: an epic landscape, and a small box in the frame reading &quot;You Could Be Here.&quot; Not a tagline. A placement. It puts the reader inside the image, makes the distance feel personal, and turns browsing into longing. Wanderlust first, booking second."
        />

        {/* ===== OPTION A ===== */}
        <ProjectParagraph
          eyebrow="Option A"
          body={`The brief was to make Qatar Airways' network of 150+ destinations feel less like a catalogue and more like an invitation. The insight driving the work: over 40% of travellers bounce between dreaming and planning before they book, and 1 in 3 hasn't even settled on a destination when they first start looking. That's the moment we designed for — before the spreadsheet, before the price comparison. The campaign led with scale: epic landscape photography, a single "You Could Be Here" callout placing the reader inside the image. No hard sell. Just a reminder that the distance between where you are and where you want to be is smaller than it looks. The digital component extended the idea into function — a web app that let travellers filter by what they were looking for, with real Qatar Airways data and live booking built in. Dream-to-book in a single flow.`}
        />

        {/* ===== OPTION B ===== */}
        <ProjectParagraphColumns
          eyebrow="Option B"
          columns={[
            {
              heading: 'The Concept',
              body: 'The campaign led with wanderlust, not logistics. Epic landscape photography anchored by a single "You Could Be Here" device placed the reader inside the destination — making Qatar Airways feel less like a carrier and more like a passport to somewhere worth going.',
            },
            {
              heading: 'My Role',
              body: 'I designed and art directed the digital component of the pitch — a web app that moved the concept from feeling to function. Travellers filter by what they\'re after; results surface real QA destinations with live booking built in. I also contributed to the overall visual direction of the pitch presentation.',
            },
          ]}
        />

        {/* ===== OPTION C ===== */}
        <ProjectParagraph
          eyebrow="Option C"
          body={`The insight driving the pitch: 1 in 3 travellers hasn't settled on a destination when they first start looking. Over 40% are still bouncing between dreaming and planning. That's the moment we designed for. The campaign led with scale — epic landscape photography, a single "You Could Be Here" callout that placed the reader inside the image. Less about where Qatar Airways flies, more about why you'd want to go. The brief was to make 150+ destinations feel like an invitation, not a dropdown menu.`}
        />

        <ProjectParagraph
          body="My role covered design and art direction for the digital side of the pitch. The web app extended the campaign concept into something functional: travellers filter destinations by what they're actually looking for, and results pull from real Qatar Airways data — with booking built directly into the flow. The idea was to close the gap between inspiration and action, keeping the emotional thread of the campaign intact all the way to the purchase."
        />

        {/* ===== PROJECT NAVIGATION ===== */}
        <div className="mt-10">
          <ProjectBottom currentSlug="qatar-airways" />
        </div>

      </main>

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
