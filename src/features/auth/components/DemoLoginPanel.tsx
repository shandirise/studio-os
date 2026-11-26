import { Badge } from '@/components/ui';
import { demoRoles } from '../data';
import { DemoRoleButton } from './DemoRoleButton';

/** "Coba Demo" box under the login form: instant login per role. */
export function DemoLoginPanel() {
  return (
    <section className="flex flex-col gap-2.5 rounded-card border border-line bg-subtle p-3.5 lg:gap-3 lg:p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-13 leading-[1.2] font-semibold text-ink lg:hidden">Coba Demo · login instan</h2>
        <div className="flex flex-col gap-0.5 max-lg:hidden">
          <h2 className="text-14 leading-[1.2] font-semibold text-ink">Coba Demo</h2>
          <p className="text-12 leading-[1.3] text-muted">Login instan tanpa daftar, pilih salah satu peran</p>
        </div>
        <Badge tone="dark" dot={false} className="max-lg:hidden">
          Demo
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 lg:gap-x-2.5 lg:gap-y-3">
        {demoRoles.map((demo) => (
          <DemoRoleButton key={demo.role} {...demo} />
        ))}
      </div>
    </section>
  );
}
