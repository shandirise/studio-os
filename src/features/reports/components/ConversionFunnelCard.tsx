import { Badge, Card, CardHeader, Progress } from '@/components/ui';
import { conversionFunnel } from '../data';

/** The first stage fills ~82% of the row, leaving room for the badges as in the design. */
const MAX_BAR = 82;

export function ConversionFunnelCard() {
  const max = Math.max(...conversionFunnel.map((s) => s.count));

  return (
    <Card className="min-w-0 self-start">
      <CardHeader title="Funnel konversi" subtitle="Persentase lolos ke stage berikutnya" />
      <ul className="flex flex-col gap-3.5 px-4 pt-1 pb-4">
        {conversionFunnel.map((step) => (
          <li key={step.stage} className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-between gap-3 text-12-5 leading-[13px] text-ink">
              <span className="font-medium">{step.stage}</span>
              <span className="flex items-center gap-2.5">
                {step.conversion && (
                  <Badge dot={false} className="h-[19px] text-10-5 leading-none">
                    {step.conversion} lanjut
                  </Badge>
                )}
                <span className="font-semibold">{step.count}</span>
              </span>
            </div>
            <Progress value={(step.count / max) * MAX_BAR} tone={step.tone} height={12} shape="square" track={false} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
