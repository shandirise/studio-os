import { Card, CardHeader, Progress, TextLink } from '@/components/ui';
import { funnel } from '../data';

export function FunnelCard() {
  const max = Math.max(...funnel.map((f) => f.count));

  return (
    <Card className="self-start">
      <CardHeader title="Funnel pipeline" subtitle="Jumlah deal per stage" action={<TextLink to="/crm/deals">Lihat deals</TextLink>} />
      <ul className="flex flex-col gap-3 px-4 pt-1 pb-4">
        {funnel.map((f) => (
          <li key={f.stage} className="flex flex-col gap-[5px]">
            <div className="flex justify-between text-12 leading-none">
              <span className="font-medium text-ink-2">{f.stage}</span>
              <span className="font-semibold text-ink">{f.count}</span>
            </div>
            {/* Bars are proportional to the first stage, as in the design. */}
            <Progress value={(f.count / max) * 98} tone={f.tone} height={10} shape="square" track={false} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
