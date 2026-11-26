import { Link } from 'react-router';
import { Badge, Card, CardHeader, Progress } from '@/components/ui';
import { atRiskProjects } from '../data';

export function AtRiskProjectsCard() {
  return (
    <Card className="min-w-0 self-start">
      <CardHeader title="Project berisiko" subtitle="Deadline dekat, progress rendah" />
      <ul className="px-4 pb-3">
        {atRiskProjects.map((p) => (
          <li key={p.id} className="border-b border-line">
            <Link to={`/projects/${p.id}`} className="flex items-center gap-3 py-2.5 hover:opacity-80">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-13 font-semibold text-ink">{p.name}</span>
                <span className="truncate text-11-5 text-muted">{p.client}</span>
              </div>
              <Progress value={p.progress} tone={p.tone} height={5} shape="square" className="w-[90px] shrink-0" />
              <span className="w-8 text-right text-12 font-semibold text-ink">{p.progress}%</span>
              <Badge tone={p.tone}>Sisa {p.daysLeft} hari</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
