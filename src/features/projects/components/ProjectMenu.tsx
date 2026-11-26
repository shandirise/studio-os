import { Archive, Copy, Ellipsis, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Menu, useToast } from '@/components/ui';
import type { Project } from '../data';

/** "…" menu on a project card / row. */
export function ProjectMenu({ project, className }: { project: Project; className?: string }) {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Menu
      className={className}
      items={[
        { label: 'Buka project', icon: Eye, onSelect: () => navigate(`/projects/${project.id}`) },
        { label: 'Duplikat', icon: Copy, onSelect: () => toast('Project diduplikat', `Salinan "${project.name}" dibuat sebagai draft.`) },
        { label: 'Arsipkan', icon: Archive, danger: true, onSelect: () => toast('Project diarsipkan', project.name) },
      ]}
      trigger={({ toggle }) => (
        <button
          type="button"
          aria-label={`Menu ${project.name}`}
          onClick={toggle}
          className="inline-flex size-6 cursor-pointer items-center justify-center rounded-control text-ink hover:bg-subtle"
        >
          <Ellipsis size={16} />
        </button>
      )}
    />
  );
}
