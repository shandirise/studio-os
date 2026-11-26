import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { CommandPalette } from '@/features/global/CommandPalette';
import { MobileNav } from './MobileNav';
import { PageMetaProvider } from './PageMeta';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/** Opens the command palette with Ctrl/⌘ + K. */
function useCommandPaletteShortcut(open: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
}

/** Internal app frame: sidebar + top bar on desktop, top bar + bottom tabs on mobile. */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, search } = useLocation();
  // `?cmdk=1` opens the palette directly (used by the /screens overview).
  const [paletteOpen, setPaletteOpen] = useState(() => new URLSearchParams(search).has('cmdk'));

  useCommandPaletteShortcut(() => setPaletteOpen(true));

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  return (
    <PageMetaProvider>
      <div className="flex min-h-dvh bg-canvas">
        {/* The outer column stretches with the page so the sidebar surface never ends early. */}
        <div className="hidden shrink-0 border-r border-line bg-white lg:block">
          <Sidebar
            className="sticky top-0 h-dvh border-r-0"
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((c) => !c)}
          />
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-overlay/45" onClick={() => setMobileMenuOpen(false)} aria-hidden />
            <Sidebar className="relative h-full shadow-xl" onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenSearch={() => setPaletteOpen(true)} onOpenMenu={() => setMobileMenuOpen(true)} />
          <main className="flex min-w-0 flex-1 flex-col pb-[60px] lg:pb-0">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>
        </div>

        <MobileNav onOpenMenu={() => setMobileMenuOpen(true)} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </PageMetaProvider>
  );
}
