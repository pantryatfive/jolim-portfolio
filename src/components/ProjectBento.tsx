'use client';
import { useState, useEffect, useRef } from 'react';

interface BentoImage {
  src: string;
  alt?: string;
}

interface ProjectBentoProps {
  images: BentoImage[]; // min 4, max 6
  eyebrow?: string;
}

/*
 * Desktop (lg+, 3 cols) — asymmetric bento with col-span + row-span
 *
 * 4:  "a a b"  320px       5:  "a b b"  300px       6:  "a a b"  320px
 *     "c d d"  280px           "a c d"  200px           "c d b"  200px
 *                              "e e d"  280px           "e e f"  300px
 *
 * Tablet (md, 2 cols) — simpler bento, one tall cell per layout
 *
 * 4:  "a b"  200px         5:  "a b"  240px         6:  "a b"  220px
 *     "a c"  200px              "c b"  200px              "c b"  200px
 *     "d d"  200px              "d e"  200px              "d e"  200px
 *                                                          "f f"  200px
 *
 * Mobile (<md, 1 col) — single stack, aspect-ratio: 4/3 per cell
 */
const DESKTOP: Record<number, { areas: string; rows: string }> = {
  4: { areas: '"a a b" "c d d"',           rows: '320px 280px' },
  5: { areas: '"a b b" "a c d" "e e d"',   rows: '300px 200px 280px' },
  6: { areas: '"a a b" "c d b" "e e f"',   rows: '320px 200px 300px' },
};

const TABLET: Record<number, { areas: string; rows: string }> = {
  4: { areas: '"a b" "a c" "d d"',         rows: '200px 200px 200px' },
  5: { areas: '"a b" "c b" "d e"',         rows: '240px 200px 200px' },
  6: { areas: '"a b" "c b" "d e" "f f"',   rows: '220px 200px 200px 200px' },
};

// area name = letter at cell index (a=0, b=1, …)
const AREA = ['a', 'b', 'c', 'd', 'e', 'f'];

function buildCSS(count: number): string {
  const d = DESKTOP[count];
  const t = TABLET[count];
  const cellRules = AREA.slice(0, count)
    .map((name, i) => `.bn${count} .bc${i} { grid-area: ${name}; }`)
    .join(' ');

  return `
    .bn${count} {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .bn${count} .bc {
      aspect-ratio: 4 / 3;
      border-radius: 0;
      overflow: hidden;
    }
    @media (min-width: 768px) {
      .bn${count} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: ${t.areas};
        grid-template-rows: ${t.rows};
      }
      .bn${count} .bc { aspect-ratio: auto; }
      ${cellRules}
    }
    @media (min-width: 1024px) {
      .bn${count} {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: ${d.areas};
        grid-template-rows: ${d.rows};
      }
    }
  `;
}

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 600ms ease',
};

const imgHoverStyle: React.CSSProperties = {
  transform: 'scale(1.05)',
  filter: 'brightness(1.1)',
};

function greyFallback(index: number): string {
  const palette = [16, 22, 18, 28, 13, 32, 20, 25];
  return `hsl(0, 0%, ${palette[index % palette.length]}%)`;
}

function BentoCell({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ width: '100%', height: '100%', background: greyFallback(index) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          style={hovered ? { ...imgStyle, ...imgHoverStyle } : imgStyle}
        />
      )}
    </div>
  );
}

export default function ProjectBento({ images, eyebrow }: ProjectBentoProps) {
  const count = Math.min(6, Math.max(4, images.length));
  const items = images.slice(0, count);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-28 pb-10">
      <style dangerouslySetInnerHTML={{ __html: buildCSS(count) }} />
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

        <div className={`bn${count}`}>
          {items.map((img, i) => (
            <div
              key={i}
              className={`bc bc${i}`}
              style={{
                opacity: 0,
                animation: visible ? `softRise 0.8s ease-out ${i * 80}ms forwards` : 'none',
              }}
            >
              <BentoCell src={img.src} alt={img.alt ?? ''} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
