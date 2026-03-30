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

const BASE_DELAY = 200;

function parseTitle(title: string): { type: 'digits'; num: number; suffix: string } | { type: 'mixed' } {
  const match = title.trim().match(/^([\d,]+)([^a-zA-Z]*)$/);
  if (match) {
    return { type: 'digits', num: parseInt(match[1].replace(/,/g, ''), 10), suffix: match[2] };
  }
  return { type: 'mixed' };
}

function CountUpTitle({
  num, suffix, delay, visible, className,
}: {
  num: number; suffix: string; delay: number; visible: boolean; className: string;
}) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setActive(true);
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * num));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [visible, num, delay]);

  return (
    <p className={className} style={{ opacity: active ? 1 : 0, transition: 'opacity 0.1s' }}>
      {count}{suffix}
    </p>
  );
}

function ClipReveal({
  children, delay, visible, wrapperClassName,
}: {
  children: React.ReactNode; delay: number; visible: boolean; wrapperClassName?: string;
}) {
  return (
    <div className={`overflow-hidden ${wrapperClassName ?? ''}`}>
      <div
        style={{
          transform: 'translateY(105%)',
          animation: visible
            ? `clipReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms forwards`
            : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stagger = isDesktop ? index * 80 : 0;
  const titleDelay = BASE_DELAY + stagger;
  const bodyDelay = titleDelay + 150;
  const parsed = parseTitle(metric.title);

  return (
    <div ref={ref} className="flex-1 py-8 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
      {parsed.type === 'digits' ? (
        <CountUpTitle
          num={parsed.num}
          suffix={parsed.suffix}
          delay={titleDelay}
          visible={visible}
          className="text-flashlight text-5xl font-black leading-none tracking-tight mb-4"
        />
      ) : (
        <ClipReveal delay={titleDelay} visible={visible} wrapperClassName="mb-4">
          <p className="text-flashlight text-5xl font-black leading-none tracking-tight">
            {metric.title}
          </p>
        </ClipReveal>
      )}

      <ClipReveal delay={bodyDelay} visible={visible}>
        <p className="text-sm font-light text-zinc-400 leading-relaxed">
          {metric.body}
        </p>
      </ClipReveal>
    </div>
  );
}

export default function ProjectMetrics({ metrics, eyebrow }: ProjectMetricsProps) {
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

        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
