import { useMemo, useState } from 'react';
import { Layers, Plus } from 'lucide-react';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { Button, Card, EmptyState, PageHeader, Segmented, Tabs, useToast } from '@/components/ui';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilterBar, type ProjectFilters } from '../components/ProjectFilterBar';
import { ProjectTable } from '../components/ProjectTable';
import {
  projectTabCounts,
  projectTabs,
  projects,
  projectViewOptions,
  type ProjectTab,
  type ProjectView,
} from '../data';

const initialFilters: ProjectFilters = { query: '', client: null, pmId: null, deadline: null };

/** E1 · Project — List (grid or table). */
export function ProjectsPage() {
  useBreadcrumbs([{ label: 'Project' }]);
  const toast = useToast();
  const [tab, setTab] = useState<ProjectTab>('Semua');
  const [view, setView] = useState<ProjectView>('grid');
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const list = projects.filter(
      (p) =>
        (tab === 'Semua' || p.status === tab) &&
        (!query || `${p.name} ${p.client}`.toLowerCase().includes(query)) &&
        (!filters.client || p.client === filters.client) &&
        (!filters.pmId || p.pmId === filters.pmId),
    );
    if (!filters.deadline) return list;
    const direction = filters.deadline === 'nearest' ? 1 : -1;
    return [...list].sort((a, b) => a.deadline.localeCompare(b.deadline) * direction);
  }, [tab, filters]);

  return (
    <Page>
      <PageHeader
        title="Project"
        subtitle={`${projectTabCounts.Berjalan} berjalan · ${projectTabCounts.Semua} total`}
        actions={
          <>
            <Segmented options={projectViewOptions} value={view} onChange={setView} />
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => toast('Project baru', 'Buat project dari quotation yang disetujui atau mulai dari kosong.')}
            >
              Project
            </Button>
          </>
        }
      />

      <Tabs
        items={projectTabs.map((t) => ({ value: t, label: t, count: projectTabCounts[t] }))}
        value={tab}
        onChange={setTab}
      />

      <ProjectFilterBar filters={filters} onChange={setFilters} />

      {visible.length === 0 ? (
        <Card className="py-10">
          <EmptyState
            icon={Layers}
            title="Tidak ada project"
            description="Tidak ada project yang cocok dengan tab dan filter ini."
            action={
              <Button
                size="sm"
                onClick={() => {
                  setTab('Semua');
                  setFilters(initialFilters);
                }}
              >
                Reset filter
              </Button>
            }
          />
        </Card>
      ) : view === 'grid' ? (
        <div className="grid gap-3.5 md:grid-cols-2 lg:gap-4 xl:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={visible} />
      )}
    </Page>
  );
}
