'use client';
import { useEffect, useRef, useState } from 'react';

interface MetaField {
  label: string;
  value: string;
}

interface ProjectMetaProps {
  project: string;
  role: string;
  duration?: string;
  extras?: MetaField[];
}

export default function ProjectMeta({ project, role, duration, extras = [] }: ProjectMetaProps) {
  const fields: MetaField[] = [
    { label: 'Project', value: project },
    { label: 'Role', value: role },
    ...(duration ? [{ label: 'Duration', value: duration }] : []),
    ...extras,
  ];

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-t border-b border-zinc-100">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20 py-8">
        <div
          className="flex flex-wrap gap-x-16 gap-y-6"
          style={visible
            ? { animation: 'fadeUp 0.8s ease-out 0.35s forwards', opacity: 0 }
            : { opacity: 0 }}
        >
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                {field.label}
              </span>
              <span className="text-sm font-medium text-zinc-950">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
