import { ArrowUpRight, Smartphone } from 'lucide-react';
import { Link } from 'react-router';
import { screenSections } from '@/app/screens';
import { Logo } from '@/components/layout/Logo';

/** Overview of every designed screen — a clickable map of the Figma canvas. */
export function ScreensPage() {
  const total = screenSections.reduce((sum, s) => sum + s.screens.length, 0);

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <Logo />
          <Link to="/" className="text-12 font-semibold text-ink underline underline-offset-2">
            Buka aplikasi
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-22 font-semibold tracking-[-0.01em] text-ink">Peta layar</h1>
          <p className="text-13 text-muted">
            {total} layar dari file desain, dikelompokkan per modul. Klik untuk membuka layar yang hidup.
          </p>
        </div>

        {screenSections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5 border-b border-line pb-2">
              <h2 className="text-15 font-semibold text-ink">{section.title}</h2>
              <p className="text-12 text-muted">{section.note}</p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {section.screens.map((screen) => (
                <Link
                  key={screen.path}
                  to={screen.path}
                  className="group flex items-center justify-between gap-3 rounded-card border border-line bg-white px-3.5 py-3 transition-colors hover:border-line-2"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="rounded-badge bg-subtle px-1.5 py-0.5 text-11 font-semibold text-muted">{screen.code}</span>
                    <span className="truncate text-13 font-medium text-ink">{screen.title}</span>
                    {screen.mobile && <Smartphone size={13} className="shrink-0 text-faint" aria-label="Ada versi mobile" />}
                  </span>
                  <ArrowUpRight size={15} className="shrink-0 text-faint group-hover:text-ink" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
