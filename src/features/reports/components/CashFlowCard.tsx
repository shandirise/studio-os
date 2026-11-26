import { Card, CardHeader } from '@/components/ui';
import { cashFlow } from '../data';
import { ChartLegend } from './ChartLegend';

/** Height in px of the tallest bar. */
const BAR_HEIGHT = 190;

/** Paired columns per month: cash in (ink) next to cash out (grey). */
export function CashFlowCard() {
  const max = Math.max(...cashFlow.flatMap((m) => [m.cashIn, m.cashOut]));
  const barHeight = (value: number) => (value / max) * BAR_HEIGHT;

  return (
    <Card className="min-w-0">
      <CardHeader title="Arus kas" subtitle="Masuk vs keluar · dalam juta Rupiah" />
      <div className="flex h-[230px] items-end gap-3.5 px-5 pt-2 pb-3.5">
        {cashFlow.map((m) => (
          <div key={m.label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-end justify-center gap-1" title={`Masuk ${m.cashIn} jt · Keluar ${m.cashOut} jt`}>
              <div className="w-[26px] min-w-0 rounded-[2px] bg-ink" style={{ height: barHeight(m.cashIn) }} />
              <div className="w-[26px] min-w-0 rounded-[2px] bg-line-2" style={{ height: barHeight(m.cashOut) }} />
            </div>
            <span className="text-10-5 leading-none text-muted">{m.label}</span>
          </div>
        ))}
      </div>
      <ChartLegend
        className="gap-x-5 px-5 pb-3.5"
        items={[
          { label: 'Masuk', swatch: 'bg-ink' },
          { label: 'Keluar', swatch: 'bg-line-2' },
        ]}
      />
    </Card>
  );
}
