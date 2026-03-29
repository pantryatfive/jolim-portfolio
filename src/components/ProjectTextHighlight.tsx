'use client';
import { useRef, useState, useEffect } from 'react';

interface ProjectTextHighlightProps {
  /** Up to 3 text chunks — each animates in with a staggered delay */
  chunks: [React.ReactNode] | [React.ReactNode, React.ReactNode] | [React.ReactNode, React.ReactNode, React.ReactNode];
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
}

const chunkClass = ['text-chunk-1', 'text-chunk-2', 'text-chunk-3'];

export default function ProjectTextHighlight({
  chunks,
  showAvatar = false,
  avatarSrc = '/jolim@2x.png',
  avatarAlt = 'Avatar',
}: ProjectTextHighlightProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-28 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
      <div className={`grid grid-cols-1 gap-12 lg:gap-16 items-start ${showAvatar ? 'lg:grid-cols-[160px_1fr]' : ''}`}>

        {/* Avatar — only rendered when showAvatar is true */}
        {showAvatar && (
          <div className={`relative w-[160px] h-[160px] mx-auto lg:mx-0 avatar-container ${visible ? 'fade-up' : 'opacity-0'}`}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              style={{ animation: 'gentlePulse 4s ease-in-out infinite' }}
            >
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="#e4e4e7"
                strokeWidth="1"
                strokeDasharray="2 4"
                className="origin-center"
                style={{ animation: 'spin 20s linear infinite' }}
              />
            </svg>
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-lg">
              <img src={avatarSrc} alt={avatarAlt} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Text */}
        <div className="text-center lg:text-left lg:pt-2">
          <p className="text-[30px] text-zinc-800 font-light leading-[1.6] tracking-[0.01em] max-w-[65ch]">
            {chunks.map((chunk, i) => (
              <span key={i} className={visible ? chunkClass[i] : 'opacity-0'}>
                {chunk}{i < chunks.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>

      </div>
      </div>
    </section>
  );
}
