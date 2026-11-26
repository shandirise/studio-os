import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Page } from '@/components/layout/Page';
import { useBreadcrumbs, type Crumb } from '@/components/layout/PageMeta';
import { Tabs } from '@/components/ui';
import { cn } from '@/lib/cn';
import { KanbanBoard } from '../components/KanbanBoard';
import { NewTaskModal } from '../components/NewTaskModal';
import { ProjectActivityTab } from '../components/ProjectActivityTab';
import { ProjectDetailHeader } from '../components/ProjectDetailHeader';
import { ProjectFilesTab } from '../components/ProjectFilesTab';
import { ProjectFinanceTab } from '../components/ProjectFinanceTab';
import { ProjectOverviewTab } from '../components/ProjectOverviewTab';
import { ProjectTimeTab } from '../components/ProjectTimeTab';
import { TaskDrawer } from '../components/TaskDrawer';
import { detailTabs, getProject, type DetailTab, type TaskStatus } from '../data';
import { useTasks } from '../taskStore';
import { useTaskParam } from '../useTaskParam';

const isDetailTab = (value: string | null): value is DetailTab => detailTabs.some((t) => t.value === value);

/** E2 · Project detail. The Task tab (kanban) fills the viewport on desktop; `?task=` opens the E3 drawer. */
export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProject(projectId);
  const [params, setParams] = useSearchParams();
  const tabParam = params.get('tab');
  const tab: DetailTab = isDetailTab(tabParam) ? tabParam : 'task';
  const { taskId, openTask, closeTask } = useTaskParam();
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus | null>(null);

  const allTasks = useTasks();
  const tasks = useMemo(() => allTasks.filter((t) => t.projectId === project.id), [allTasks, project.id]);
  const openedTask = allTasks.find((t) => t.id === taskId);

  const projectUrl = `/projects/${project.id}`;
  const tabLabel = detailTabs.find((t) => t.value === tab)!.label;
  const crumbs: Crumb[] = [
    { label: 'Project', to: '/projects' },
    { label: project.name, to: projectUrl },
    { label: tabLabel, to: tab === 'task' ? projectUrl : `${projectUrl}?tab=${tab}` },
  ];
  if (openedTask) crumbs.push({ label: openedTask.title });
  useBreadcrumbs(crumbs);

  const changeTab = (next: DetailTab) => setParams(next === 'task' ? {} : { tab: next });

  return (
    <Page className={cn('lg:gap-3.5', tab === 'task' && 'lg:h-[calc(100dvh-56px)]')}>
      <ProjectDetailHeader key={project.id} project={project} onAddTask={() => setNewTaskStatus('To Do')} />

      <Tabs items={detailTabs} value={tab} onChange={changeTab} />

      {tab === 'task' && <KanbanBoard tasks={tasks} onOpenTask={openTask} onAddTask={setNewTaskStatus} />}
      {tab === 'overview' && <ProjectOverviewTab project={project} tasks={tasks} />}
      {tab === 'file' && <ProjectFilesTab />}
      {tab === 'waktu' && <ProjectTimeTab />}
      {tab === 'keuangan' && <ProjectFinanceTab project={project} />}
      {tab === 'aktivitas' && <ProjectActivityTab />}

      {newTaskStatus && (
        <NewTaskModal open projectId={project.id} status={newTaskStatus} onClose={() => setNewTaskStatus(null)} />
      )}
      <TaskDrawer taskId={taskId} onClose={closeTask} onOpenTask={openTask} />
    </Page>
  );
}
