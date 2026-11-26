import { useRef, type ChangeEvent } from 'react';
import { Avatar, Button, Field, Input } from '@/components/ui';
import type { ProfileForm } from '../data';
import type { SettingsForm } from '../hooks/useSettingsForm';
import { SettingsSection } from './SettingsSection';

/** Photo (64px avatar) + name / email. */
export function ProfileSection({ form }: { form: SettingsForm<ProfileForm> }) {
  const { values, set } = form;
  const fileInput = useRef<HTMLInputElement>(null);

  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) set('photoUrl', URL.createObjectURL(file));
    e.target.value = '';
  };

  return (
    <SettingsSection title="Profil">
      <div className="flex items-center gap-5">
        {values.photoUrl ? (
          <img src={values.photoUrl} alt={values.name} className="size-16 shrink-0 rounded-control object-cover" />
        ) : (
          <Avatar name={values.name} size="2xl" className="text-24" />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" onClick={() => fileInput.current?.click()}>
              Ganti foto
            </Button>
            <Button size="sm" variant="ghost" onClick={() => set('photoUrl', null)}>
              Hapus
            </Button>
          </div>
          <p className="text-12 leading-none text-muted">JPG atau PNG, maks. 2 MB</p>
          <input ref={fileInput} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onPhotoSelected} />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Nama lengkap">
          {(id) => <Input id={id} value={values.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />}
        </Field>
        <Field label="Email">{(id) => <Input id={id} value={values.email} disabled />}</Field>
      </div>
    </SettingsSection>
  );
}
