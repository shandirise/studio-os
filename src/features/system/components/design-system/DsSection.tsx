import type { ReactNode } from 'react';

type DsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/** Showcase section: 18px title, muted description, hairline divider, content. */
export function DsSection({ title, description, children }: DsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-18 leading-[1.2] font-semibold text-ink">{title}</h2>
        {description && <p className="text-13 leading-[1.3] text-muted">{description}</p>}
      </div>
      <div className="h-px bg-line" />
      {children}
    </section>
  );
}
