import { ChevronDown } from 'lucide-react';
import { Badge, Menu } from '@/components/ui';
import { projectTone, type ProjectStatus } from '@/lib/status';

const statuses = Object.keys(projectTone) as ProjectStatus[];

type ProjectStatusSelectProps = {
  value: ProjectStatus;
  onChange: (status: ProjectStatus) => void;
};

/** Status badge with a chevron that opens a status menu. */
export function ProjectStatusSelect({ value, onChange }: ProjectStatusSelectProps) {
  return (
    <Menu
      align="left"
      items={statuses.map((s) => ({ label: s, onSelect: () => onChange(s) }))}
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Status project: ${value}`}
          className="flex cursor-pointer items-center gap-0.5 rounded-badge text-muted hover:text-ink"
        >
          <Badge tone={projectTone[value]}>{value}</Badge>
          <ChevronDown size={14} strokeWidth={2} />
        </button>
      )}
    />
  );
}
