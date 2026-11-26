import type { ReactNode } from 'react';

/** Grey desk the paper sits on in detail pages; scrolls sideways on narrow screens. */
export function DocumentCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 overflow-x-auto rounded-card bg-gray-soft px-4 py-7 lg:min-h-[calc(100dvh-170px)]">
      <div className="mx-auto w-[600px]">{children}</div>
    </div>
  );
}
