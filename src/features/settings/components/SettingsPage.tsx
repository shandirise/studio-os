import type { ReactNode } from 'react';
import { Page } from '@/components/layout/Page';
import { PageHeader } from '@/components/ui';

type SettingsPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

/** Body column of a settings screen: 28/40px padding on desktop, title + stacked sections. */
export function SettingsPage({ title, subtitle, children }: SettingsPageProps) {
  return (
    <Page className="lg:px-10 lg:pt-7 lg:pb-10">
      <PageHeader title={title} subtitle={subtitle} />
      {children}
    </Page>
  );
}
