import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Crumb = { label: string; to?: string };

type PageMetaValue = { crumbs: Crumb[]; setCrumbs: (crumbs: Crumb[]) => void };

const PageMetaContext = createContext<PageMetaValue | null>(null);

export function PageMetaProvider({ children }: { children: ReactNode }) {
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  return <PageMetaContext.Provider value={{ crumbs, setCrumbs }}>{children}</PageMetaContext.Provider>;
}

export function useCrumbs(): Crumb[] {
  return useContext(PageMetaContext)?.crumbs ?? [];
}

/**
 * Sets the top bar breadcrumb (and document title) for the current page.
 * The last crumb is the current page.
 *
 * useBreadcrumbs([{ label: 'CRM', to: '/crm/contacts' }, { label: 'Kontak' }]);
 */
export function useBreadcrumbs(crumbs: Crumb[]) {
  const setCrumbs = useContext(PageMetaContext)?.setCrumbs;
  const key = JSON.stringify(crumbs);

  useEffect(() => {
    const parsed: Crumb[] = JSON.parse(key);
    setCrumbs?.(parsed);
    const last = parsed[parsed.length - 1];
    document.title = last ? `${last.label} · Studio OS` : 'Studio OS';
  }, [key, setCrumbs]);
}
