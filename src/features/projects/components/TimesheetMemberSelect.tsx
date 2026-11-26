import { ChevronDown } from 'lucide-react';
import { Avatar, Menu } from '@/components/ui';
import { memberById, team } from '@/data/workspace';

type TimesheetMemberSelectProps = {
  memberId: string;
  onChange: (memberId: string) => void;
};

/** Team member picker ("RA Rizky Aditya ⌄") for whose timesheet is shown. */
export function TimesheetMemberSelect({ memberId, onChange }: TimesheetMemberSelectProps) {
  const member = memberById(memberId);

  return (
    <Menu
      items={team.map((m) => ({ label: m.name, onSelect: () => onChange(m.id) }))}
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Timesheet milik ${member.name}`}
          className="flex h-[34px] cursor-pointer items-center gap-2 rounded-control border border-line-2 bg-white px-2.5 text-13 font-medium text-ink hover:bg-canvas"
        >
          <Avatar name={member.name} size="xs" className="size-5 text-10" />
          {member.name}
          <ChevronDown size={14} strokeWidth={2} className="text-muted" />
        </button>
      )}
    />
  );
}
