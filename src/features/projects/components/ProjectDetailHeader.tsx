import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button, Progress, Toggle, useToast } from '@/components/ui';
import { memberById } from '@/data/workspace';
import type { ProjectStatus } from '@/lib/status';
import type { Project } from '../data';
import { formatDate } from '../format';
import { ProjectStatusSelect } from './ProjectStatusSelect';

type ProjectDetailHeaderProps = {
  project: Project;
  onAddTask: () => void;
};

function Divider() {
  return <span className="h-3 w-px shrink-0 bg-line max-sm:hidden" aria-hidden />;
}

/**
 * Project title, status, meta line (client · PM · period · progress) and actions.
 * Status and portal visibility are local demo state; key the header by project id.
 */
export function ProjectDetailHeader({ project, onAddTask }: ProjectDetailHeaderProps) {
  const toast = useToast();
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [portalVisible, setPortalVisible] = useState(project.portalVisible);

  const changeStatus = (next: ProjectStatus) => {
    setStatus(next);
    toast('Status project diubah', `${project.name} → ${next}`);
  };

  const changePortal = (visible: boolean) => {
    setPortalVisible(visible);
    toast(visible ? 'Ditampilkan di portal klien' : 'Disembunyikan dari portal klien', project.name);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-[5px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-22 leading-[1.2] font-semibold tracking-[-0.01em] text-ink max-lg:text-20">{project.name}</h1>
          <ProjectStatusSelect value={status} onChange={changeStatus} />
        </div>
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-13 leading-none text-muted">
          <Link to={`/crm/companies/${project.clientId}`} className="hover:text-ink hover:underline">
            {project.client}
          </Link>
          <Divider />
          <span>PM: {memberById(project.pmId).name}</span>
          <Divider />
          <span>
            {formatDate(project.startDate)} – {formatDate(project.deadline)}
          </span>
          <Divider />
          <span className="flex items-center gap-3.5">
            <Progress value={project.progress} height={5} shape="square" className="w-[110px]" />
            <span className="text-12 font-semibold text-ink">{project.progress}%</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-12-5 text-ink">
          <Toggle checked={portalVisible} onChange={changePortal} label="Tampilkan di portal klien" />
          <span className="max-sm:hidden">Tampilkan di portal klien</span>
        </label>
        <Button variant="primary" icon={Plus} onClick={onAddTask}>
          Task
        </Button>
      </div>
    </div>
  );
}
