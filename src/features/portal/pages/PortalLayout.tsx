import { Outlet } from 'react-router';
import { PortalHeader } from '../components/PortalHeader';

/** Client portal frame (J2–J6): portal header on top, screen below. No internal app shell. */
export function PortalLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <PortalHeader />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
