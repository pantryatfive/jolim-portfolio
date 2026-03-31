'use client';
import { useRef, useState, useEffect } from 'react';

interface Column {
  heading?: string;
  body: string;
}

interface ProjectParagraphColumnsProps {
  eyebrow?: string;
  columns: [Column, Column] | [Column, Column, Column];
}

export default function ProjectParagraphColumns({ eyebrow, columns }: ProjectParagraphColumnsProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const count = columns.length;

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
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20">
        {eyebrow && (
          <div className={`flex items-center gap-4 mb-10 ${visible ? 'text-chunk-1' : 'opacity-0'}`}>
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 shrink-0">
              {eyebrow}
            </span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>
        )}
        <div className={`grid grid-cols-1 gap-10 ${count === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
          {columns.map((col, i) => (
            <div
              key={i}
              className="flex flex-col gap-3"
              style={{
                opacity: 0,
                animation: visible
                  ? `fadeInUp 0.8s ease-out ${0.5 + i * 0.2}s forwards`
                  : 'none',
              }}
            >
              {col.heading && (
                <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  {col.heading}
                </h3>
              )}
              <p className="text-lg font-light text-zinc-700 leading-relaxed whitespace-pre-line">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
