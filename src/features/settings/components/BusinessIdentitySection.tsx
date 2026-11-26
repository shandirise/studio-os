import { useRef, type ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { Button, Field, Input, Select } from '@/components/ui';
import { currencyOptions, taxOptions, timezoneOptions, workspaceLogoMark, type WorkspaceForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Logo, business name, NPWP, address, currency, timezone and default tax. */
export function BusinessIdentitySection({ form }: { form: SettingsForm<WorkspaceForm> }) {
  const { values, set } = form;
  const fileInput = useRef<HTMLInputElement>(null);

  const onLogoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) set('logoUrl', URL.createObjectURL(file));
    e.target.value = '';
  };

  return (
    <SettingsSection title="Identitas bisnis">
      <div className="flex items-center gap-4">
        {values.logoUrl ? (
          <img src={values.logoUrl} alt={values.businessName} className="size-14 shrink-0 rounded-control object-contain" />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-control bg-ink text-[31px] leading-none font-bold text-white">
            {workspaceLogoMark}
          </span>
        )}
        <div className="flex flex-col items-start gap-1.5">
          <Button size="sm" icon={Upload} onClick={() => fileInput.current?.click()}>
            Upload logo
          </Button>
          <p className="text-12 leading-none text-muted">Dipakai di PDF dan Client Portal</p>
          <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={onLogoSelected} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Nama bisnis">
          {(id) => <Input id={id} value={values.businessName} onChange={(e) => set('businessName', e.target.value)} />}
        </Field>
        <Field label="NPWP">{(id) => <Input id={id} value={values.npwp} onChange={(e) => set('npwp', e.target.value)} />}</Field>
      </div>

      <Field label="Alamat">
        {(id) => <Input id={id} value={values.address} onChange={(e) => set('address', e.target.value)} autoComplete="street-address" />}
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Mata uang">
          {(id) => <Select id={id} options={currencyOptions} value={values.currency} onChange={(e) => set('currency', e.target.value)} />}
        </Field>
        <Field label="Zona waktu">
          {(id) => <Select id={id} options={timezoneOptions} value={values.timezone} onChange={(e) => set('timezone', e.target.value)} />}
        </Field>
        <Field label="Pajak default">
          {(id) => <Select id={id} options={taxOptions} value={values.tax} onChange={(e) => set('tax', e.target.value)} />}
        </Field>
      </div>
    </SettingsSection>
  );
}
