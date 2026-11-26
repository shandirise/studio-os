import { Field, Input, Toggle } from '@/components/ui';
import type { TemplatesForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { DocumentPreview } from './DocumentPreview';
import { LayoutPicker } from './LayoutPicker';
import { SettingsSection } from './SettingsSection';

type ToggleKey = 'showLogo' | 'showNpwp' | 'showPageNumber';

const toggles: Array<{ key: ToggleKey; label: string }> = [
  { key: 'showLogo', label: 'Tampilkan logo' },
  { key: 'showNpwp', label: 'Tampilkan NPWP' },
  { key: 'showPageNumber', label: 'Tampilkan nomor halaman' },
];

/** Layout, visibility switches and footer text, next to a live preview. */
export function PdfTemplateSection({ form }: { form: SettingsForm<TemplatesForm> }) {
  const { values, set } = form;

  return (
    <SettingsSection title="Template PDF" description="Quotation dan invoice">
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <LayoutPicker value={values.layout} onChange={(layout) => set('layout', layout)} />
          {toggles.map((t) => (
            <div key={t.key} className="flex items-center justify-between gap-4">
              <span className="text-13 leading-none text-ink">{t.label}</span>
              <Toggle checked={values[t.key]} onChange={(on) => set(t.key, on)} label={t.label} />
            </div>
          ))}
          <Field label="Teks footer">
            {(id) => <Input id={id} value={values.footer} onChange={(e) => set('footer', e.target.value)} />}
          </Field>
        </div>
        <DocumentPreview
          layout={values.layout}
          showLogo={values.showLogo}
          showNpwp={values.showNpwp}
          showPageNumber={values.showPageNumber}
          footer={values.footer}
          className="w-full max-w-[400px] shrink-0 xl:w-[400px]"
        />
      </div>
    </SettingsSection>
  );
}
