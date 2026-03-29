interface Column {
  heading?: string;
  body: string;
}

interface ProjectParagraphColumnsProps {
  eyebrow?: string;
  columns: [Column, Column] | [Column, Column, Column]; // 2 or 3 columns
}

export default function ProjectParagraphColumns({ eyebrow, columns }: ProjectParagraphColumnsProps) {
  const count = columns.length;
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
        <div className={`grid grid-cols-1 gap-10 ${count === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col gap-3">
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
