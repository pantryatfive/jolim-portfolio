interface ProjectHeroProps {
  title: string;
  blurb: string;
}

export default function ProjectHero({ title, blurb }: ProjectHeroProps) {
  return (
    <section style={{ backgroundColor: '#141414' }} className="pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight fade-up opacity-0">
          {title}
        </h1>
        <p className="mt-8 text-lg font-light text-zinc-400 max-w-2xl leading-relaxed fade-up-delay opacity-0">
          {blurb}
        </p>
      </div>
    </section>
  );
}
