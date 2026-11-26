import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, Card, TextLink, useToast } from '@/components/ui';
import { useBreadcrumbs } from '@/components/layout/PageMeta';
import { AuthTopBar } from '../components/AuthTopBar';
import { DoneSummary } from '../components/onboarding/DoneSummary';
import { FinanceFields } from '../components/onboarding/FinanceFields';
import { FinancePreview } from '../components/onboarding/FinancePreview';
import { NextActionsCard } from '../components/onboarding/NextActionsCard';
import { RolesPreview } from '../components/onboarding/RolesPreview';
import { TeamFields } from '../components/onboarding/TeamFields';
import { WorkspaceFields } from '../components/onboarding/WorkspaceFields';
import { WorkspacePreview } from '../components/onboarding/WorkspacePreview';
import { OnboardingStepper } from '../components/OnboardingStepper';
import { StepHeading } from '../components/StepHeading';
import { initialOnboarding, onboardingSteps, type OnboardingForm } from '../data';

/**
 * A6 · Onboarding Wizard. The current step lives in `?step=1…4` so browser back works
 * and each step is linkable (`?step=2` is the step drawn in the design).
 */
export function OnboardingPage() {
  useBreadcrumbs([{ label: 'Onboarding' }]);
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const [form, setForm] = useState<OnboardingForm>(initialOnboarding);

  const lastIndex = onboardingSteps.length - 1;
  const index = Math.min(Math.max(Number(params.get('step')) || 1, 1), onboardingSteps.length) - 1;
  const step = onboardingSteps[index]!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  const goTo = (i: number) => setParams({ step: String(i + 1) });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (index < lastIndex) return goTo(index + 1);
    toast('Workspace siap dipakai', `Selamat datang di ${form.workspace.name}.`);
    navigate('/');
  };

  const main = {
    workspace: (
      <WorkspaceFields value={form.workspace} onChange={(patch) => setForm((f) => ({ ...f, workspace: { ...f.workspace, ...patch } }))} />
    ),
    finance: <FinanceFields value={form.finance} onChange={(patch) => setForm((f) => ({ ...f, finance: { ...f.finance, ...patch } }))} />,
    team: <TeamFields invites={form.invites} onChange={(invites) => setForm((f) => ({ ...f, invites }))} />,
    done: <DoneSummary form={form} />,
  }[step.id];

  const aside = {
    workspace: <WorkspacePreview value={form.workspace} />,
    finance: <FinancePreview value={form.finance} />,
    team: <RolesPreview />,
    done: <NextActionsCard />,
  }[step.id];

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <AuthTopBar bordered>
        <div className="flex items-center gap-4 text-13 leading-none">
          <span className="text-muted">
            Langkah {index + 1} dari {onboardingSteps.length}
          </span>
          <TextLink to="/" className="text-13 leading-none">
            Lewati
          </TextLink>
        </div>
      </AuthTopBar>

      <main className="mx-auto flex w-full max-w-[1184px] flex-col gap-5 px-4 py-5 lg:gap-7 lg:px-8 lg:pt-10 lg:pb-8">
        <OnboardingStepper current={index} />

        <form onSubmit={submit} className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
          <Card className="flex flex-col gap-5 p-5 lg:p-7">
            <StepHeading title={step.title} description={step.description} />
            {main}
            <div className="flex items-center justify-between gap-3 pt-2">
              {index > 0 ? (
                <Button onClick={() => goTo(index - 1)}>Kembali</Button>
              ) : (
                <span />
              )}
              <Button type="submit" variant="primary" iconRight={ArrowRight}>
                {index === lastIndex ? 'Masuk ke dashboard' : 'Lanjut'}
              </Button>
            </div>
          </Card>
          <aside className="flex flex-col gap-4">{aside}</aside>
        </form>
      </main>
    </div>
  );
}
