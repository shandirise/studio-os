import { useNavigate } from 'react-router';
import { Badge, Card, Progress, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { projectTone } from '@/lib/status';
import type { Project } from '../data';
import { formatBudget, formatDate } from '../format';
import { AvatarStack } from './AvatarStack';
import { ProjectMenu } from './ProjectMenu';

/** "Tabel" view of the project list. Rows open the project. */
export function ProjectTable({ projects }: { projects: Project[] }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <Table minWidth={960}>
        <THead>
          <TH>PROJECT</TH>
          <TH>STATUS</TH>
          <TH>PM</TH>
          <TH>PROGRESS</TH>
          <TH>DEADLINE</TH>
          <TH align="right">BUDGET</TH>
          <TH>TIM</TH>
          <TH className="w-10" />
        </THead>
        <tbody>
          {projects.map((p) => (
            <TR key={p.id} onClick={() => navigate(`/projects/${p.id}`)}>
              <TD>
                <p className="font-semibold">{p.name}</p>
                <p className="text-12 text-muted">{p.client}</p>
              </TD>
              <TD>
                <Badge tone={projectTone[p.status]}>{p.status}</Badge>
              </TD>
              <TD className="whitespace-nowrap">{memberById(p.pmId).name}</TD>
              <TD>
                <div className="flex items-center gap-2.5">
                  <Progress
                    value={p.progress}
                    tone={p.status === 'Selesai' ? 'green' : 'ink'}
                    height={5}
                    shape="square"
                    className="w-[90px]"
                  />
                  <span className="text-12 font-semibold">{p.progress}%</span>
                </div>
              </TD>
              <TD className="whitespace-nowrap text-muted">{formatDate(p.deadline)}</TD>
              <TD align="right" className="whitespace-nowrap">
                {formatBudget(p.spent)} <span className="text-muted">/ {formatBudget(p.budget)}</span>
              </TD>
              <TD>
                <AvatarStack memberIds={p.team} />
              </TD>
              {/* Keep menu clicks from opening the row. */}
              <TD onClick={(e) => e.stopPropagation()}>
                <ProjectMenu project={p} />
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
