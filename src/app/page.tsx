"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import WorksThumbStudioLead from "@/components/WorksThumbStudioLead";

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const worksRef = useRef<HTMLElement>(null);
  const [isWorksVisible, setIsWorksVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logos = ["/logo.svg", "/logo-negative.svg", "/logo-colour.svg"];
  const [logoSrc, setLogoSrc] = useState("/logo.svg");
  const [logoVisible, setLogoVisible] = useState(true);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

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

    schedule("/logo.svg");
    return () => { clearTimeout(timeout); clearTimeout(swapTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsAboutVisible(true); },
      { threshold: 0 }
    );
    const target = introTextRef.current ?? aboutRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsWorksVisible(true); },
      { threshold: 0.1 }
    );
    if (worksRef.current) observer.observe(worksRef.current);
    return () => observer.disconnect();
  }, []);

  // Back-navigation fix: browser restores scroll after mount, so observers may
  // have already fired with elements out of view. Re-check after a short delay.
  useEffect(() => {
    const checkVisibility = () => {
      const aboutTarget = introTextRef.current ?? aboutRef.current;
      if (aboutTarget) {
        const r = aboutTarget.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) setIsAboutVisible(true);
      }
      if (worksRef.current) {
        const r = worksRef.current.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) setIsWorksVisible(true);
      }
    };
    // Run at 120ms and 400ms to catch both early and late scroll restoration
    const t1 = setTimeout(checkVisibility, 120);
    const t2 = setTimeout(checkVisibility, 400);
    // Also catch browser bfcache restores
    window.addEventListener('pageshow', checkVisibility);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('pageshow', checkVisibility);
    };
  }, []);

  return (
    <>
      {/* Sticky Header — full-width bg, constrained content */}
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
            <span className="text-xs tracking-[0.2em] text-zinc-400 uppercase font-light">
              Jolim
            </span>
          </div>

          {/* Desktop nav — centered */}
          <nav className="hidden sm:flex items-center justify-center gap-6 sm:gap-8">
              <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xs tracking-wide text-zinc-950 hover:text-zinc-400 transition-colors">
                Home
              </a>
              <a href="#works" onClick={e => { e.preventDefault(); document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
                Works
              </a>
              <a href="#" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
                About
              </a>
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center justify-end gap-4">
            {/* Download CV — always visible */}
            <a
              href="#"
              className="text-xs tracking-wide bg-zinc-950 text-white px-4 py-2 hover:bg-orange-500 transition-colors"
            >
              Download CV
            </a>

            {/* Hamburger — mobile only */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="sm:hidden border-t border-zinc-100 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-4">
            <a href="#" onClick={e => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-xs tracking-wide text-zinc-950 hover:text-zinc-400 transition-colors">
              Home
            </a>
            <a href="#works" onClick={e => { e.preventDefault(); setMenuOpen(false); document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
              Works
            </a>
            <a href="#" onClick={() => setMenuOpen(false)} className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
              About
            </a>
          </nav>
        )}
      </header>

      {/* Page */}
      <main className="min-h-screen bg-white flex flex-col pt-14">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col flex-1 px-6 sm:px-12 lg:px-20">

          {/* Hero */}
          <section className="flex-1 flex flex-col justify-center pt-32 pb-12">
            {/* Pixel animation placeholder */}
            <div className="w-6 h-6 bg-zinc-950 mb-6 ml-1"></div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-950 leading-[1.05] tracking-tight">
              <span className="block hero-line-1">Product Experience Designer</span>
              <span className="block hero-line-2">with an Agency Craft</span>
              <span className="block hero-line-3">Background</span>
            </h1>

            <p className="mt-8 text-xl text-zinc-400 font-light tracking-wide max-w-lg leading-relaxed hero-subtext">
              Jonathan Lim
            </p>
          </section>

          {/* About — Avatar + Intro */}
          <section ref={aboutRef} className="pt-28 pb-28">
            {/* Divider with Middle Text */}
            <div className="flex items-center gap-4 mb-28">
              <div className="flex-1 h-px bg-zinc-200"></div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light px-2">
                Introduction
              </span>
              <div className="flex-1 h-px bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-16 items-start">

              {/* Avatar with rotating dotted border */}
              <div className={`relative w-[160px] h-[160px] mx-auto lg:mx-0 avatar-container ${isAboutVisible ? 'fade-up' : 'opacity-0'}`}>
                {/* Rotating dotted circle with pulse */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  style={{ animation: 'gentlePulse 4s ease-in-out infinite' }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e4e4e7"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    className="origin-center"
                    style={{
                      animation: 'spin 20s linear infinite',
                    }}
                  />
                </svg>

                {/* Avatar with shadow */}
                <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-lg">
                  <img
                    src="/jolim@2x.png"
                    alt="Jon Lim"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Intro Text with Chunked Reveal */}
              <div className="text-center lg:text-left lg:pt-2">
                <p ref={introTextRef} className="text-[20px] lg:text-[24px] text-zinc-800 font-light leading-[1.6] tracking-[0.01em] max-w-[65ch]">
                  <span className={isAboutVisible ? 'text-chunk-1' : 'opacity-0'}>
                    Hi, I'm <span className="text-zinc-950 font-normal">Jolim</span> — a Product and Creative Designer with{" "}
                    <span className="text-zinc-950 font-normal">15+ years of experience</span>{" "}
                    across digital products and advertising design in Singapore, Doha, and Manila.
                  </span>{" "}
                  <span className={isAboutVisible ? 'text-chunk-2' : 'opacity-0'}>
                    I focus on delivering{" "}
                    <span className="font-medium text-flashlight">
                      high-quality design craft, studio management, and building efficient workflows
                    </span>{" "}
                  </span>
                  <span className={isAboutVisible ? 'text-chunk-3' : 'opacity-0'}>
                    that scale creative output across products and campaigns.
                  </span>
                </p>
              </div>

            </div>
          </section>

        </div>{/* end constrained container */}

        {/* Works — full viewport width, grey bg. Negative mt pulls up so divider straddles the white/grey boundary */}
        <section ref={worksRef} id="works" className="bg-zinc-50 pb-28 mt-[1px]">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20">
            {/* Divider — straddles white/grey boundary */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-zinc-200"></div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light px-2">Works</span>
              <div className="flex-1 h-px bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
              {PROJECTS.map((p, i) => {
                const { title, slug } = p;
                const thumbnail = 'thumbnail' in p ? p.thumbnail : undefined;
                const cardLabel = title ?? `Project ${String(i + 1).padStart(2, '0')}`;

                const card = (
                  <div className="flex flex-col h-full transition-shadow duration-300 ease-out group-hover:shadow-[0_4px_8px_rgba(0,0,0,0.07)]">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/2',
                      background: slug === 'studio-lead'
                        ? 'linear-gradient(135deg, #4A3F6B 0%, #7B6BA8 50%, #A594CC 100%)'
                        : '#e4e4e7',
                    }}>
                      {slug === 'studio-lead' && (
                        <>
                          <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            opacity: 0.08,
                          }} />
                          <WorksThumbStudioLead />
                        </>
                      )}
                      {thumbnail && (
                        <>
                          <img
                            src={thumbnail}
                            alt={title ?? ''}
                            className="absolute inset-0 w-full h-full object-cover scale-[1.08] group-hover:scale-100 transition-transform duration-[400ms] ease-out"
                          />
                          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
                        </>
                      )}
                    </div>
                    <div className="bg-white px-2 py-4 flex flex-col gap-1 flex-1">
                      <p className="text-sm font-medium text-zinc-950">{cardLabel}</p>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {slug === 'studio-lead' ? "I led the design studio powering marketing campaigns for Advertising Agencies and Oddle's 100+ restaurant partners" : slug === 'oddle-eats' ? 'Food discovery, made native.' : title ? 'Product design · Brand strategy · Creative direction' : 'Coming soon'}
                      </p>
                    </div>
                  </div>
                );

                return slug ? (
                  <a key={i} href={`/works/${slug}`} className={`group flex flex-col ${isWorksVisible ? `works-card-${i + 1}` : 'opacity-0'}`}>
                    {card}
                  </a>
                ) : (
                  <div key={i} className={`group flex flex-col cursor-default ${isWorksVisible ? `works-card-${i + 1}` : 'opacity-0'}`}>
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      {/* Footer */}
      <footer style={{ backgroundColor: '#141414' }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 py-[57px]">

          {/* Main row */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-[57px] mb-[71px]">

            {/* Left: name + links */}
            <div className="flex flex-col gap-5">
              <p className="text-xs tracking-[0.2em] uppercase text-white font-medium">
                Jonathan Lim
              </p>
              <div className="flex flex-col gap-[7px]">
                <a href="mailto:jon@jolim.co" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Email</a>
                <a href="https://linkedin.com/in/jolim" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Linkedin</a>
                <a href="https://dribbble.com/jolim" className="text-xs tracking-wide text-white/40 hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>

            {/* Right: image placeholder + tagline, left-aligned */}
            <div className="flex flex-col gap-[18px] items-start">
              <div className="w-[50px] h-[50px] bg-white shrink-0" />
              <p className="text-sm font-light leading-relaxed tracking-wide max-w-xs" style={{ color: '#ADADAD' }}>
                Crafting products and campaigns<br />
                with purpose and precision.
              </p>
            </div>

          </div>

          {/* Bottom bar */}
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
