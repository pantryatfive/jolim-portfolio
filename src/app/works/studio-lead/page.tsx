'use client';
import { useState, useEffect } from 'react';
import ProjectHero from '@/components/ProjectHero';
import ProjectMeta from '@/components/ProjectMeta';
import ProjectParagraph from '@/components/ProjectParagraph';
import ProjectParagraphColumns from '@/components/ProjectParagraphColumns';
import ProjectBento from '@/components/ProjectBento';
import ProjectStrip from '@/components/ProjectStrip';
import ProjectTextHighlight from '@/components/ProjectTextHighlight';
import ProjectBottom from '@/components/ProjectBottom';
import ProjectMetrics from '@/components/ProjectMetrics';

export default function Project01() {
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
          title="Studio Design Leadership"
          blurb="I led the design studio powering marketing campaigns for Advertising Agencies and Oddle's 100+ restaurant partners — building systems that enabled high-volume output without sacrificing quality."
        />

        {/* ===== META ===== */}
        <ProjectMeta
          project="Various Projects"
          role="Design Lead"
        />

        {/* ===== PARAGRAPH ===== */}
        <ProjectParagraph
          eyebrow="Overview"
          body="Oddle's managed marketing service required consistent, high-quality campaign assets across a growing number of merchants. Without structure, files were difficult to track, output quality varied across designers, and scaling production created operational friction."
          image="/Project%201/ProjectParagraph/projectparagraph-1/overview@2x.webp"
          imageAlt="Illustration of designer at laptop"
        />

        {/* ===== PARAGRAPH COLUMNS ===== */}
        <ProjectParagraphColumns
          columns={[
            {
              heading: 'What I Lead',
              body: '• Studio & Marketing Team\n• Managed a team of 4 marketing designers\n• Ran regular syncs to align quality and execution\n• Provided art direction and design feedback across all outputs\n• Campaign Execution',
            },
            {
              heading: 'Oversaw and contributed to:',
              body: '• Social media campaigns\n• Email marketing (EDMs)\n• Promotional assets for restaurant partners\n• Remained hands-on in design to maintain creative standards.',
            },
          ]}
        />

        {/* ===== BENTO ===== */}
        <ProjectBento
          eyebrow="Work"
          images={[
            { src: '/Project%201/ProjectBento/projectbento-1/image-1.jpg', alt: 'Studio work 1' },
            { src: '/Project%201/ProjectBento/projectbento-1/image-2.jpg', alt: 'Studio work 2' },
            { src: '/Project%201/ProjectBento/projectbento-1/image-3.jpg', alt: 'Studio work 3' },
            { src: '/Project%201/ProjectBento/projectbento-1/image-4.jpg', alt: 'Studio work 4' },
            { src: '/Project%201/ProjectBento/projectbento-1/image-5.jpg', alt: 'Studio work 5' },
          ]}
        />

        {/* ===== INTRO ===== */}
        <ProjectTextHighlight
          chunks={[
            <>To support scale, I <span className="font-medium text-flashlight">established a design management system that structured how work is produced</span>, stored, and evaluated. A file &amp; folder system, naming conventions, production workflow, and design evaluation.</>,
          ]}
        />

        {/* ===== PARAGRAPH COLUMNS ===== */}
        <ProjectParagraphColumns
          columns={[
            {
              heading: 'File & folder system',
              body: 'File & folder system — standardized project organization across brands and campaigns, reducing search time and team confusion.\n\nNaming conventions — introduced clear, structured naming (e.g. campaign + date), making files easier to scan and sort\n\nProduction workflow — aligned tools, file setup, and output expectations to improve consistency across designers\n\nDesign evaluation — defined internal review standards to maintain consistent visual quality across campaigns',
            },
            {
              heading: 'Impact',
              body: '• Scaled design operations across 100+ merchants\n• Reduced production friction through clear structure\n• Improved consistency across marketing outputs\n• Enabled faster onboarding for new designers',
            },
          ]}
        />

        {/* ===== METRICS ===== */}
        <ProjectMetrics
          metrics={[
            { title: '180+',           body: 'Campaign assets produced weekly' },
            { title: 'Up to 5 Formats', body: 'Social, EDM, Shop Banner, GIF, and Print — executed across all channels simultaneously' },
            { title: '100+',           body: 'Restaurant merchants scaled across design operations' },
          ]}
        />

        {/* ===== STRIP ===== */}
        <ProjectStrip
          eyebrow="File System & Workflow"
          images={[
            { src: '/Project%201/ProjectStrip/projectstrip-1/image-1.jpg', alt: 'Image 1', caption: 'Caption one' },
            { src: '/Project%201/ProjectStrip/projectstrip-1/image-2.jpg', alt: 'Image 2', caption: 'Caption two' },
            { src: '/Project%201/ProjectStrip/projectstrip-1/image-3.jpg', alt: 'Image 3', caption: 'Caption three' },
          ]}
        />

        {/* ===== PARAGRAPH + IMAGE (left, compact) ===== */}
        <ProjectParagraph
          eyebrow="Retrospect"
          title="This approach to systems + execution was built on my earlier experience as a Studio Lead at GroupM."
          body={`At GroupM, I operated in a more complex, high-pressure environment:\n\n• Led studio operations for ~4 years\n• Balanced hands-on design with team leadership\n• Worked with traffic managers on resource planning\n• Collaborated across agencies to interpret briefs into execution\n\nI operate as a player–coach — designing alongside my team, building systems beyond outputs, reducing chaos rather than adding process, and aligning teams around clarity and consistent standards.`}
          src="/Project%201/ProjectParagraphImage/projectparagraphimage-1/image-1.jpg"
          alt="Studio work"
          imagePosition="left"
          compact
        />

      </main>

      {/* ===== PROJECT NAVIGATION ===== */}
      <ProjectBottom currentSlug="studio-lead" />

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
