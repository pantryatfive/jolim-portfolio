'use client';
import { useState } from 'react';
import { LIVE_PROJECTS } from '@/data/projects';

interface ProjectBottomProps {
  currentSlug: string;
}

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transform: 'scale(1.08)',
  transition: 'transform 400ms ease-out',
};

const imgHoverStyle: React.CSSProperties = {
  transform: 'scale(1.0)',
};

const thumbStyle: React.CSSProperties = {
  position: 'relative',
  width: 64,
  height: 64,
  borderRadius: 0,
  overflow: 'hidden',
  background: '#e4e4e7',
  flexShrink: 0,
};

function NavCard({ project, direction }: {
  project: { title: string; slug: string; thumbnail?: string };
  direction: 'prev' | 'next';
}) {
  const [hovered, setHovered] = useState(false);
  const isPrev = direction === 'prev';

  const thumbnail = (
    <div className="hidden sm:block" style={thumbStyle}>
      {project.thumbnail ? (
        <>
          <img
            src={project.thumbnail}
            alt={project.title}
            style={hovered ? { ...imgStyle, ...imgHoverStyle } : imgStyle}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
        </>
      ) : (
        <div style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );

  const text = (
    <div className={`flex flex-col gap-1 ${isPrev ? '' : 'items-end text-right'}`}>
      <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
        {isPrev ? '← Previous' : 'Next →'}
      </span>
      <span className="text-base font-medium text-zinc-950 group-hover:text-orange-600 transition-colors">
        {project.title}
      </span>
    </div>
  );

  return (
    <a
      href={`/works/${project.slug}`}
      className="group flex items-center gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Prev: text left, thumb right — Next: thumb left, text right */}
      {isPrev ? <>{text}{thumbnail}</> : <>{thumbnail}{text}</>}
    </a>
  );
}

export default function ProjectBottom({ currentSlug }: ProjectBottomProps) {
  const index = LIVE_PROJECTS.findIndex((p) => p.slug === currentSlug);
  const prev = index > 0 ? LIVE_PROJECTS[index - 1] : null;
  const next = LIVE_PROJECTS.length > 1
    ? (index < LIVE_PROJECTS.length - 1 ? LIVE_PROJECTS[index + 1] : LIVE_PROJECTS[0])
    : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-10 border-t border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="flex flex-row items-center gap-6 sm:gap-10">

          {/* Previous — left-aligned */}
          <div className="flex-1">
            {prev ? <NavCard project={prev} direction="prev" /> : <div />}
          </div>

          {/* Vertical divider */}
          <div className="w-px self-stretch bg-zinc-200" style={{ minHeight: 80 }} />

          {/* Next — right-aligned */}
          <div className="flex-1 flex justify-end">
            {next && <NavCard project={next} direction="next" />}
          </div>

        </div>
      </div>
    </div>
  );
}
