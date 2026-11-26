import { Badge, Progress } from '@/components/ui';
import { workspace } from '@/data/workspace';
import { projectTone } from '@/lib/status';
import { MilestonesCard } from '../components/MilestonesCard';
import { PortalPage } from '../components/PortalPage';
import { PortalPageHeader } from '../components/PortalPageHeader';
import { RecentFilesCard } from '../components/RecentFilesCard';
import { SharedTasksCard } from '../components/SharedTasksCard';
import { TeamMessagesCard } from '../components/TeamMessagesCard';
import { mainProject, projectFiles, projectManager } from '../data';

/** J3 · Portal Project: milestones, shared tasks, files and messages for the client's project. */
export function PortalProjectsPage() {
  const project = mainProject;

  return (
    <PortalPage className="gap-3.5 lg:gap-5">
      <div className="flex flex-col gap-1.5 lg:hidden">
        <h1 className="text-20 leading-[1.2] font-semibold tracking-[-0.01em] text-ink">{project.name}</h1>
        <div className="flex items-center gap-2.5">
          <Progress value={project.progress} shape="square" className="w-[250px]" />
          <span className="text-13 leading-none font-semibold text-ink">{project.progress}%</span>
        </div>
      </div>

      <PortalPageHeader
        className="max-lg:hidden"
        title={project.name}
        badge={<Badge tone={projectTone[project.status]}>{project.status}</Badge>}
        subtitle={`${workspace.name} · PM: ${projectManager.name} · deadline ${project.deadline}`}
        action={
          <div className="flex w-[220px] flex-col items-end gap-1.5">
            <span className="text-13 leading-none font-semibold text-ink">{project.progress}% selesai</span>
            <Progress value={project.progress} shape="square" />
          </div>
        }
      />

      <div className="grid items-start gap-3.5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-4">
        <div className="flex min-w-0 flex-col gap-3.5 lg:gap-4">
          <MilestonesCard />
          <SharedTasksCard />
        </div>
        <div className="flex min-w-0 flex-col gap-3.5 lg:gap-4">
          <RecentFilesCard title="File" files={projectFiles} className="max-lg:hidden" />
          <TeamMessagesCard />
        </div>
      </div>
    </PortalPage>
  );
}
