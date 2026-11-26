import { Progress } from '@/components/ui';
import { cn } from '@/lib/cn';

type InlineMeterProps = {
  /** 0–100 */
  percent: number;
  /** Track width, e.g. "w-[130px]". */
  trackClassName: string;
};

/** Table cell meter: 5px ink bar followed by the percentage. */
export function InlineMeter({ percent, trackClassName }: InlineMeterProps) {
  return (
    <div className="flex items-center gap-2">
      <Progress value={percent} height={5} shape="square" className={cn('shrink-0', trackClassName)} />
      <span className="text-12 leading-none text-muted">{percent}%</span>
    </div>
  );
}
