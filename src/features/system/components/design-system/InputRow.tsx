import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Field, Input, Select } from '@/components/ui';
import { dealStageOptions } from '../../data';

/** Text input states: default, focus, error, disabled, plus the select. */
export function InputRow() {
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('rina@majubersama.co.id');
  const [invalidEmail, setInvalidEmail] = useState('rina@majubersama');
  const [stage, setStage] = useState('');
  const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invalidEmail);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="Default">
        {(id) => <Input id={id} placeholder="Isi nilai" value={value} onChange={(e) => setValue(e.target.value)} />}
      </Field>
      <Field label="Fokus">
        {(id) => (
          <Input id={id} icon={Mail} inputClassName="border-ink" value={email} onChange={(e) => setEmail(e.target.value)} />
        )}
      </Field>
      <Field label="Error" error={emailInvalid ? 'Format email tidak valid' : undefined}>
        {(id) => <Input id={id} invalid={emailInvalid} value={invalidEmail} onChange={(e) => setInvalidEmail(e.target.value)} />}
      </Field>
      <Field label="Nonaktif">{(id) => <Input id={id} value="INV-2026-0042" disabled />}</Field>
      <Field label="Select">
        {(id) => (
          <Select
            id={id}
            placeholder="Pilih stage"
            options={dealStageOptions}
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className={stage ? undefined : '[&>select]:text-faint'}
          />
        )}
      </Field>
    </div>
  );
}
