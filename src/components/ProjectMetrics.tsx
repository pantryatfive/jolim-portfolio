'use client';
import { useRef, useState, useEffect } from 'react';

interface Metric {
  title: string;
  body: string;
}

interface ProjectMetricsProps {
  metrics: [Metric, Metric, Metric] | [Metric, Metric];
  eyebrow?: string;
}

const DELAYS = [0, 80, 160];

export default function ProjectMetrics({ metrics, eyebrow }: ProjectMetricsProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-28 pb-10">
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

        <div className={`grid grid-cols-1 gap-10 ${metrics.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
          {metrics.map((metric, i) => (
            <div
              key={i}
              style={{
                opacity: 0,
                animation: visible
                  ? `softRise 0.8s ease-out ${DELAYS[i]}ms forwards`
                  : 'none',
              }}
            >
              {/* Horizontal divider */}
              <div className="h-px bg-zinc-200 mb-6" />

              {/* Title with flashlight */}
              <p className="text-flashlight text-5xl font-black leading-none tracking-tight mb-4">
                {metric.title}
              </p>

              {/* Body */}
              <p className="text-sm font-light text-zinc-400 leading-relaxed">
                {metric.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
