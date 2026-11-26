import { useRef, useState } from 'react';
import { Field, Input, Select, Tag, Textarea } from '@/components/ui';
import { emailTemplateOrder, emailVariables, type EmailTemplate, type EmailTemplateId, type TemplatesForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Pick an email template and edit its subject and body; variable chips insert at the cursor. */
export function EmailTemplateSection({ form }: { form: SettingsForm<TemplatesForm> }) {
  const { values, update } = form;
  const [templateId, setTemplateId] = useState<EmailTemplateId>('quotation');
  // The shared Textarea doesn't take a ref, so the element is looked up from a wrapper.
  const bodyWrapRef = useRef<HTMLDivElement>(null);
  const template = values.emails[templateId];

  const patch = (changes: Partial<EmailTemplate>) =>
    update((v) => ({ ...v, emails: { ...v.emails, [templateId]: { ...v.emails[templateId], ...changes } } }));

  const insertVariable = (variable: string) => {
    const el = bodyWrapRef.current?.querySelector('textarea');
    const start = el?.selectionStart ?? template.body.length;
    const end = el?.selectionEnd ?? template.body.length;
    patch({ body: template.body.slice(0, start) + variable + template.body.slice(end) });
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start + variable.length, start + variable.length);
    });
  };

  return (
    <SettingsSection title="Template email" description="Gunakan variabel agar pesan terisi otomatis">
      <div className="grid gap-3 lg:grid-cols-2">
        <Field label="Template">
          {(id) => (
            <Select
              id={id}
              options={emailTemplateOrder.map((key) => ({ value: key, label: values.emails[key].label }))}
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value as EmailTemplateId)}
            />
          )}
        </Field>
        <Field label="Subjek">{(id) => <Input id={id} value={template.subject} onChange={(e) => patch({ subject: e.target.value })} />}</Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-12 leading-none font-medium text-ink-2">Variabel</span>
        <div className="flex flex-wrap gap-1.5">
          {emailVariables.map((variable) => (
            <button
              key={variable}
              type="button"
              title="Sisipkan ke isi pesan"
              onClick={() => insertVariable(variable)}
              className="cursor-pointer rounded-badge hover:[&>span]:border-line-2 hover:[&>span]:text-ink"
            >
              <Tag>{variable}</Tag>
            </button>
          ))}
        </div>
      </div>

      <div ref={bodyWrapRef}>
        <Field label="Isi pesan">
          {(id) => (
            <Textarea id={id} rows={3} value={template.body} onChange={(e) => patch({ body: e.target.value })} className="min-h-[90px]" />
          )}
        </Field>
      </div>
    </SettingsSection>
  );
}
