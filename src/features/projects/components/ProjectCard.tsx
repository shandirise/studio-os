import { Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Card, Progress } from '@/components/ui';
import { projectTone } from '@/lib/status';
import type { Project } from '../data';
import { formatBudget, formatDate } from '../format';
import { AvatarStack } from './AvatarStack';
import { ProjectMenu } from './ProjectMenu';

/** Grid card for the project list. The whole card links to the project; the menu sits above the link. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="relative flex min-w-0 flex-col gap-3 p-4 transition-colors hover:border-line-2">
      <div className="flex items-center justify-between">
        <Badge tone={projectTone[project.status]}>{project.status}</Badge>
        <ProjectMenu project={project} className="relative z-10" />
      </div>

      <div className="flex min-w-0 flex-col gap-[3px]">
        <Link
          to={`/projects/${project.id}`}
          className="truncate text-15 leading-[1.2] font-semibold text-ink after:absolute after:inset-0 after:rounded-card"
        >
          {project.name}
        </Link>
        <p className="truncate text-12-5 leading-[1.2] text-muted">{project.client}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-11-5 leading-none">
          <span className="text-muted">Progress task</span>
          <span className="font-semibold text-ink">{project.progress}%</span>
        </div>
        <Progress
          value={project.progress}
          tone={project.status === 'Selesai' ? 'green' : 'ink'}
          height={5}
          shape="square"
        />
      </div>

      <div className="h-px bg-line" />

      <div className="flex items-center justify-between gap-3">
        <AvatarStack memberIds={project.team} />
        <div className="flex flex-col items-end gap-[3px] text-11-5 leading-none">
          <span className="flex items-center gap-[5px] text-muted">
            <Calendar size={12} />
            {formatDate(project.deadline)}
          </span>
          <span className="font-medium text-ink">
            {formatBudget(project.spent)} / {formatBudget(project.budget)} budget
          </span>
        </div>
      </div>
    </Card>
  );
}
