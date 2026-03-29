'use client';
import { useState } from 'react';

interface ProjectParagraphProps {
  eyebrow?: string;
  title?: string;
  body: string;
  // Overview image (small square, left side)
  image?: string;
  imageAlt?: string;
  // Side image (large, 4:3, left or right)
  src?: string;
  alt?: string;
  caption?: string;
  showCaption?: boolean;  // default true
  imagePosition?: 'left' | 'right';
  compact?: boolean;
  showImage?: boolean;    // default true
}

// Deterministic greyscale fallback for side image
function greyFallback(src: string): string {
  const h = src.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xff, 0);
  const palette = [16, 22, 18, 28, 13, 32, 20, 25];
  return `hsl(0, 0%, ${palette[h % palette.length]}%)`;
}

export default function ProjectParagraph({
  eyebrow,
  title,
  body,
  image,
  imageAlt = '',
  src,
  alt = '',
  caption,
  showCaption = true,
  imagePosition = 'right',
  compact = false,
  showImage = true,
}: ProjectParagraphProps) {
  const [hovered, setHovered] = useState(false);
  const hasSideImage = !!src && showImage;

  const gridCols = compact
    ? (imagePosition === 'left' ? 'lg:grid-cols-[3fr_4fr]' : 'lg:grid-cols-[4fr_3fr]')
    : 'lg:grid-cols-2';

  return (
    <section className="pt-28 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {eyebrow && (
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 shrink-0">
              {eyebrow}
            </span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>
        )}

        {hasSideImage ? (
          /* Side image layout (large, 4:3) */
          <div className={`grid grid-cols-1 ${gridCols} gap-12 lg:gap-16 items-start ${imagePosition === 'left' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className="flex flex-col justify-center">
              {title && (
                <h3 className="text-2xl font-normal text-zinc-950 leading-snug mb-6">{title}</h3>
              )}
              <p className="text-lg font-light text-zinc-700 leading-relaxed whitespace-pre-line">
                {body}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="aspect-[4/3]"
                style={{ overflow: 'hidden', background: greyFallback(src!) }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 600ms ease',
                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
                  }}
                />
              </div>
              {caption && showCaption && (
                <p className="text-xs text-zinc-400 leading-relaxed">{caption}</p>
              )}
            </div>
          </div>
        ) : (
          /* Overview / text layout (optional small square image) */
          <div className={image ? 'flex flex-row items-start lg:items-center gap-8 sm:gap-10 lg:gap-16' : ''}>
            {image && (
              <div className="w-[88px] sm:w-[140px] lg:w-[220px] shrink-0 aspect-square overflow-hidden">
                <img src={image} alt={imageAlt} className="w-full h-full object-contain" />
              </div>
            )}
            <div className="flex-1">
              {title && (
                <h3 className="text-2xl font-normal text-zinc-950 leading-snug mb-6">{title}</h3>
              )}
              <p className="text-lg font-light text-zinc-700 leading-relaxed max-w-3xl whitespace-pre-line">
                {body}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
