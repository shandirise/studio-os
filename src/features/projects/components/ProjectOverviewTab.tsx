import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Avatar, Card, CardHeader, KpiCard, Progress } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { financeDocs, type Project, type Task } from '../data';
import { formatBudget, formatDate, formatDuration } from '../format';

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-line py-2.5 last:border-b-0">
      <dt className="w-[120px] shrink-0 text-12 text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 text-13 text-ink">{children}</dd>
    </div>
  );
}

const quotation = financeDocs.find((d) => d.kind === 'Quotation');

/** Overview tab: KPIs, project details and team. */
export function ProjectOverviewTab({ project, tasks }: { project: Project; tasks: Task[] }) {
  const boardTasks = tasks.filter((t) => t.status !== 'Backlog');
  const done = boardTasks.filter((t) => t.status === 'Done').length;
  const logged = tasks.reduce((sum, t) => sum + t.loggedSeconds, 0);
  const budgetUsed = project.budget ? Math.round((project.spent / project.budget) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        <KpiCard label="Progress task" value={`${project.progress}%`} />
        <KpiCard label="Task selesai" value={`${done}/${boardTasks.length}`} />
        <KpiCard label="Jam tercatat" value={formatDuration(logged)} />
        <KpiCard label="Budget terpakai" value={`${budgetUsed}%`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader title="Tentang project" />
          <div className="flex flex-col gap-3 px-4 pb-4">
            <p className="text-13 leading-[1.5] text-ink-2">{project.description}</p>
            <dl>
              <DetailRow label="Klien">
                <Link to={`/crm/companies/${project.clientId}`} className="font-medium underline-offset-2 hover:underline">
                  {project.client}
                </Link>
              </DetailRow>
              <DetailRow label="Project manager">{memberById(project.pmId).name}</DetailRow>
              <DetailRow label="Periode">
                {formatDate(project.startDate)} – {formatDate(project.deadline)}
              </DetailRow>
              <DetailRow label="Budget">
                <div className="flex flex-col gap-1.5">
                  <span>
                    {formatBudget(project.spent)} <span className="text-muted">dari {formatBudget(project.budget)}</span>
                  </span>
                  <Progress value={budgetUsed} height={5} shape="square" className="max-w-[240px]" />
                </div>
              </DetailRow>
              {quotation && (
                <DetailRow label="Quotation">
                  <Link to={quotation.to} className="font-medium underline-offset-2 hover:underline">
                    {quotation.number}
                  </Link>
                </DetailRow>
              )}
            </dl>
          </div>
        </Card>

        <Card className="self-start">
          <CardHeader title="Tim project" subtitle={`${project.team.length} anggota`} />
          <ul className="flex flex-col gap-3 px-4 pb-4">
            {project.team.map((id) => {
              const member = memberById(id);
              const openTasks = tasks.filter((t) => t.assigneeId === id && t.status !== 'Done').length;
              return (
                <li key={id} className="flex items-center gap-2.5">
                  <Avatar name={member.name} size="md" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-13 font-semibold text-ink">{member.name}</span>
                    <span className="truncate text-12 text-muted">
                      {id === project.pmId ? 'Project Manager' : member.role}
                    </span>
                  </div>
                  <span className="shrink-0 text-12 text-muted">{openTasks} task aktif</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
