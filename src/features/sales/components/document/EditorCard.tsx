import type { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';

/** White form section with a 14px title ("Informasi dokumen", "Termin & syarat"…). */
export function EditorCard({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <Card className={cn('flex min-w-0 flex-col gap-3.5 p-4', className)}>
      <h2 className="text-14 leading-[1.2] font-semibold text-ink">{title}</h2>
      {children}
    </Card>
  );
}
