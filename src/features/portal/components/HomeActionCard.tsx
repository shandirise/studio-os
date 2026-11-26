import type { ReactNode } from 'react';
import { Badge, Card } from '@/components/ui';
import type { Tone } from '@/lib/status';

type HomeActionCardProps = {
  label: string;
  badge: { label: string; tone: Tone };
  value: string;
  description: ReactNode;
  /** Call to action; full width on mobile. */
  action: ReactNode;
};

/** Home "needs your attention" card: pending quotation / unpaid invoice with one action. */
export function HomeActionCard({ label, badge, value, description, action }: HomeActionCardProps) {
  return (
    <Card className="flex min-w-0 flex-col gap-2.5 p-4 lg:gap-3 lg:p-[18px]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-11-5 leading-none font-semibold text-muted lg:text-12">{label}</p>
        <Badge tone={badge.tone}>{badge.label}</Badge>
      </div>
      <p className="text-18 leading-[1.1] font-semibold text-ink lg:text-20 lg:tracking-[-0.01em]">{value}</p>
      <p className="text-12-5 leading-[1.4] text-muted lg:text-13">{description}</p>
      <div className="flex [&>*]:max-lg:w-full">{action}</div>
    </Card>
  );
}
