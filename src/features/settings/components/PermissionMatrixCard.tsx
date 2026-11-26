import { Card, CardHeader, Checkbox } from '@/components/ui';
import { cn } from '@/lib/cn';
import {
  permissionActions,
  permissionModules,
  roles,
  type PermissionAction,
  type PermissionMatrix,
  type PermissionModule,
  type Role,
} from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';

const rowGrid = 'grid grid-cols-[minmax(0,1fr)_repeat(3,176px)] items-center px-4';
const groupGrid = 'grid grid-cols-4 justify-items-center';

type PermissionMatrixCardProps = {
  form: SettingsForm<{ permissions: PermissionMatrix }>;
};

/** Module × role × action (L/B/U/H) checkbox matrix. Create/update/delete imply view. */
export function PermissionMatrixCard({ form }: PermissionMatrixCardProps) {
  const { permissions } = form.values;

  const toggle = (module: PermissionModule, role: Role, action: PermissionAction, checked: boolean) =>
    form.update((v) => {
      const current = v.permissions[module][role];
      const next =
        action === 'view' && !checked
          ? { view: false, create: false, update: false, delete: false }
          : { ...current, [action]: checked, view: current.view || checked };
      return { ...v, permissions: { ...v.permissions, [module]: { ...v.permissions[module], [role]: next } } };
    });

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Permission matrix" subtitle="Hak akses per role · L Lihat, B Buat, U Ubah, H Hapus" />
      <div className="overflow-x-auto">
        <div className="min-w-[740px]">
          <div className={cn(rowGrid, 'h-[30px] border-y border-line bg-subtle text-10-5 leading-none font-semibold text-muted')}>
            <span>MODUL</span>
            {roles.map((role) => (
              <span key={role} className="text-center uppercase">
                {role}
              </span>
            ))}
          </div>
          <div className={cn(rowGrid, 'h-6 border-b border-line')}>
            <span />
            {roles.map((role) => (
              <div key={role} className={groupGrid}>
                {permissionActions.map((a) => (
                  <abbr key={a.key} title={a.label} className="text-10 leading-none font-semibold text-faint no-underline">
                    {a.short}
                  </abbr>
                ))}
              </div>
            ))}
          </div>
          {permissionModules.map((module, i) => (
            <div key={module.id} className={cn(rowGrid, 'h-[34px]', i < permissionModules.length - 1 && 'border-b border-line')}>
              <span className="truncate text-13 text-ink">{module.label}</span>
              {roles.map((role) => (
                <div key={role} className={groupGrid}>
                  {permissionActions.map((a) => (
                    <Checkbox
                      key={a.key}
                      checked={permissions[module.id][role][a.key]}
                      onChange={(checked) => toggle(module.id, role, a.key, checked)}
                      ariaLabel={`${module.label} · ${role} · ${a.label}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
