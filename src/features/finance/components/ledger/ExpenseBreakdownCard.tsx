import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';
import { expenseBreakdown, expenseTotal } from '../../ledgerData';

/** Greys from dark to light, one per category in breakdown order. */
const segmentClass = ['bg-ink', 'bg-muted', 'bg-faint', 'bg-line-2'];

/** Month total plus a stacked bar of spend per category. */
export function ExpenseBreakdownCard() {
  return (
    <Card className="flex flex-col gap-3.5 p-4 lg:flex-row lg:items-center">
      <div className="flex w-60 shrink-0 flex-col gap-1">
        <p className="text-12 leading-none text-muted">{expenseTotal.label}</p>
        <p className="text-[26px] leading-[29px] font-bold text-ink">{expenseTotal.value}</p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex h-3.5 w-full max-w-[650px] overflow-hidden rounded-[3px]" role="img" aria-label="Distribusi pengeluaran per kategori">
          {expenseBreakdown.map((item, i) => (
            <div key={item.category} className={segmentClass[i]} style={{ width: `${item.percent}%` }} />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-[22px] gap-y-2">
          {expenseBreakdown.map((item, i) => (
            <li key={item.category} className="flex items-center gap-1.5 text-12 leading-none text-ink">
              <span className={cn('size-2.5 rounded-[2px] border border-line-2', segmentClass[i])} />
              {item.category} {item.percent}%
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
