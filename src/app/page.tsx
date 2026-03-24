"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky Header — full-width bg, constrained content */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 sm:px-12 lg:px-20 h-14">
          <span className="text-xs tracking-[0.2em] text-zinc-400 uppercase font-light">
            Jolim
          </span>
          <nav className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="text-xs tracking-wide text-zinc-950 hover:text-zinc-400 transition-colors">
              Home
            </a>
            <a href="#" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
              About
            </a>
            <a href="#" className="text-xs tracking-wide text-zinc-400 hover:text-zinc-950 transition-colors">
              Case Studies
            </a>
            <a
              href="#"
              className="text-xs tracking-wide bg-zinc-950 text-white px-4 py-2 hover:bg-orange-500 transition-colors"
            >
              Download CV
            </a>
          </nav>
        </div>
      </header>

      {/* Page */}
      <main className="min-h-screen bg-white flex flex-col pt-14">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col flex-1 px-6 sm:px-12 lg:px-20">

          {/* Hero */}
          <section className="flex-1 flex flex-col justify-center pt-32 pb-12 max-w-5xl">
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
          <section ref={aboutRef} className="py-28">
            {/* Divider with Middle Text */}
            <div className="flex items-center gap-4 max-w-6xl mx-auto mb-16">
              <div className="flex-1 h-px bg-zinc-200"></div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light px-2">
                Introduction
              </span>
              <div className="flex-1 h-px bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

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
                <p className="text-2xl text-zinc-800 font-light leading-[1.6] tracking-[0.01em] max-w-[65ch]">
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


        </div>
      </main>
    </>
  );
}
