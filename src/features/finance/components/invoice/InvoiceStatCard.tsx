import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';

type InvoiceStatCardProps = {
  label: string;
  value: string;
  caption: string;
  /** Shows the value in red (overdue). */
  danger?: boolean;
};

/** F1 summary tile: label, 22px value, caption. */
export function InvoiceStatCard({ label, value, caption, danger }: InvoiceStatCardProps) {
  return (
    <Card className="flex min-w-0 flex-col gap-[5px] p-3.5">
      <p className="truncate text-12 leading-none font-medium text-muted">{label}</p>
      <p className={cn('text-22 leading-[1.1] font-semibold tracking-[-0.01em]', danger ? 'text-danger' : 'text-ink')}>{value}</p>
      <p className="truncate text-11-5 leading-none text-muted">{caption}</p>
    </Card>
  );
}
