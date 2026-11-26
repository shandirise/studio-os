import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type ProfileFieldProps = {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
};

/** Icon + small label + value row used in the "Profil" cards. */
export function ProfileField({ icon: Icon, label, children }: ProfileFieldProps) {
  return (
    <div className="flex items-center gap-2.5 border-b border-line py-[9px]">
      <Icon size={15} className="shrink-0 text-faint" />
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="text-11 leading-[13px] text-muted">{label}</span>
        <span className="truncate text-13 leading-[17px] font-medium text-ink">{children}</span>
      </div>
    </div>
  );
}
