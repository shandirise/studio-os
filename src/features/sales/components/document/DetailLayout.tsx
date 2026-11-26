import type { ReactNode } from 'react';
import { DocumentCanvas } from './DocumentCanvas';

/** Detail page body: paper on a grey canvas, 340px side column of cards. Stacks below xl. */
export function DetailLayout({ paper, side }: { paper: ReactNode; side: ReactNode }) {
  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <DocumentCanvas>{paper}</DocumentCanvas>
      <aside className="flex min-w-0 flex-col gap-3.5">{side}</aside>
    </div>
  );
}
