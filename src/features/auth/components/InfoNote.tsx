import type { ReactNode } from 'react';
import { TriangleAlert, type LucideIcon } from 'lucide-react';

/** Subtle note box with a leading icon, used beside wizard forms. */
export function InfoNote({ icon: Icon = TriangleAlert, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex gap-2.5 rounded-card border border-line bg-subtle p-3.5">
      <Icon className="mt-px shrink-0 text-muted" />
      <p className="text-12-5 leading-[1.5] text-muted">{children}</p>
    </div>
  );
}
