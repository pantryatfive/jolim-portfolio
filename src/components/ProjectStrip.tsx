'use client';
import { useState, useEffect, useRef } from 'react';

interface StripImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ProjectStripProps {
  images: [StripImage] | [StripImage, StripImage] | [StripImage, StripImage, StripImage];
  eyebrow?: string;
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

function greyFallback(src: string): string {
  const h = src.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xff, 0);
  const palette = [16, 22, 18, 28, 13, 32, 20, 25];
  return `hsl(0, 0%, ${palette[h % palette.length]}%)`;
}

function StripCell({ src, alt = '', caption }: StripImage) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div
        className="aspect-[4/3]"
        style={{ overflow: 'hidden', background: greyFallback(src) }}
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
      {caption && (
        <p className="text-xs text-zinc-400 leading-relaxed">{caption}</p>
      )}
    </div>
  );
}

const colClass: Record<number, string> = {
  1: 'grid-cols-1 max-w-xl',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
};

export default function ProjectStrip({ images, eyebrow }: ProjectStripProps) {
  const count = images.length;
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
        <div className={`grid gap-5 ${colClass[count]}`}>
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                opacity: 0,
                animation: visible ? `softRise 0.8s ease-out ${i * 80}ms forwards` : 'none',
              }}
            >
              <StripCell {...img} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
