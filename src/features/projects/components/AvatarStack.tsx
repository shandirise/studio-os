import { Avatar } from '@/components/ui';
import { memberById } from '@/data/workspace';

type AvatarStackProps = {
  memberIds: string[];
  /** Avatars shown before collapsing the rest into "+N". */
  max?: number;
};

/** Row of 24px team avatars with a "+N" overflow tile. */
export function AvatarStack({ memberIds, max = 3 }: AvatarStackProps) {
  const shown = memberIds.slice(0, max);
  const rest = memberIds.length - shown.length;
  return (
    <div className="flex items-center gap-[3px]">
      {shown.map((id) => (
        <Avatar key={id} name={memberById(id).name} size="xs" className="size-6 border border-white text-10" />
      ))}
      {rest > 0 && (
        <span className="inline-flex size-6 items-center justify-center rounded-control border border-line-2 bg-white text-10 font-semibold text-ink">
          +{rest}
        </span>
      )}
    </div>
  );
}
