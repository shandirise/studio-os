import { Card, CardHeader, Progress, TextLink } from '@/components/ui';
import { cn } from '@/lib/cn';
import { portalProjects } from '../data';

/** Home card listing the client's projects with progress. Mobile shows the main project only. */
export function ActiveProjectsCard() {
  return (
    <Card className="min-w-0 self-start">
      <CardHeader title="Project aktif" action={<TextLink to="/portal/projects" className="max-lg:hidden">Semua project</TextLink>} />
      <ul className="flex flex-col gap-3.5 px-3.5 pb-3.5 lg:px-4 lg:pb-4">
        {portalProjects.map((p) => (
          <li key={p.id} className={cn('flex flex-col gap-1.5', p.desktopOnly && 'max-lg:hidden')}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-13 leading-none font-semibold text-ink lg:text-13-5">{p.name}</span>
              <span className="text-13 leading-none font-semibold text-ink">{p.progress}%</span>
            </div>
            <Progress value={p.progress} shape="square" className="lg:max-w-[540px]" />
            <span className="text-12 leading-none text-muted">{p.summary}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
