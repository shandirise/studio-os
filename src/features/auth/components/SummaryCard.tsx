import type { ReactNode } from 'react';
import { Card, SectionLabel } from '@/components/ui';
import { cn } from '@/lib/cn';
import { SummaryRow, type SummaryItem } from './SummaryRow';

type SummaryCardProps = {
  title: string;
  rows: SummaryItem[];
  /** Optional block between the caps title and the rows. */
  header?: ReactNode;
  className?: string;
};

/** Side card with a caps label and summary rows. */
export function SummaryCard({ title, rows, header, className }: SummaryCardProps) {
  return (
    <Card className={cn('flex flex-col gap-3.5 p-5', className)}>
      <SectionLabel>{title}</SectionLabel>
      {header}
      {rows.map((row, i) => (
        <SummaryRow key={i} {...row} />
      ))}
    </Card>
  );
}
