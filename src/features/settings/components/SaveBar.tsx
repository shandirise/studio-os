import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { Button, useToast } from '@/components/ui';
import { SaveBarSlotContext } from '../hooks/saveBarSlot';
import type { SettingsForm } from '../hooks/useSettingsForm';

type SaveBarProps = {
  form: Pick<SettingsForm<unknown>, 'dirty' | 'reset' | 'save'>;
  /** Toast description shown after saving. */
  savedMessage?: string;
};

/** Sticky "Ada perubahan yang belum disimpan" footer; only rendered while the form is dirty. */
export function SaveBar({ form, savedMessage }: SaveBarProps) {
  const slot = useContext(SaveBarSlotContext);
  const toast = useToast();
  if (!form.dirty || !slot) return null;

  const save = () => {
    form.save();
    toast('Perubahan disimpan', savedMessage);
  };

  return createPortal(
    <div className="flex h-14 items-center justify-between gap-3 border-t border-line bg-white px-4 lg:px-10">
      <p className="flex min-w-0 items-center gap-2 text-13 text-muted">
        <span className="size-[7px] shrink-0 rounded-full bg-orange" />
        <span className="truncate">
          Ada perubahan<span className="max-sm:hidden"> yang belum disimpan</span>
        </span>
      </p>
      <div className="flex shrink-0 gap-2">
        <Button onClick={form.reset}>Batalkan</Button>
        <Button variant="primary" onClick={save}>
          Simpan perubahan
        </Button>
      </div>
    </div>,
    slot,
  );
}
