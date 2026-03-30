'use client';
import { useState, useEffect, useRef } from 'react';

interface Slide {
  src: string;
  alt?: string;
  caption?: string;
}

interface ProjectGalleryProps {
  slides: Slide[];
  eyebrow?: string;
}

// Deterministic greyscale fallback — varies per slide index
function greyFallback(index: number): string {
  const palette = [16, 22, 18, 28, 13, 32, 20, 25];
  return `hsl(0, 0%, ${palette[index % palette.length]}%)`;
}

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 600ms ease',
};

export default function ProjectGallery({ slides, eyebrow }: ProjectGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, slides.length, current]);

  if (!slides.length) return null;

  return (
    <section ref={ref} className="pt-28 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {eyebrow && (
          <div className={`flex items-center gap-4 mb-10 ${visible ? 'text-chunk-1' : 'opacity-0'}`}>
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 shrink-0">
              {eyebrow}
            </span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>
        )}

        {/* Carousel */}
        <div
          className="relative overflow-hidden aspect-[16/9]"
          style={{
            background: greyFallback(current),
            opacity: 0,
            animation: visible ? 'softRise 0.8s ease-out 0.3s forwards' : 'none',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="min-w-full h-full shrink-0">
                {slide.src && (
                  <img
                    src={slide.src}
                    alt={slide.alt ?? ''}
                    style={paused && i === current
                      ? { ...imgStyle, transform: 'scale(1.05)', filter: 'brightness(1.1)' }
                      : imgStyle
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Arrow buttons */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/80 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/80 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                aria-label="Next slide"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Caption + dots */}
        <div
          className="mt-4 flex items-center justify-between"
          style={{
            opacity: 0,
            animation: visible ? 'fadeInUp 0.8s ease-out 0.5s forwards' : 'none',
          }}
        >
          <p className="text-xs text-zinc-400 leading-relaxed">
            {slides[current].caption ?? ''}
          </p>
          {slides.length > 1 && (
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === current ? 'bg-zinc-950' : 'bg-zinc-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
