import { Check, LoaderCircle } from 'lucide-react';

/** "✓ Tersimpan · 10:42" next to the editor actions. */
export function AutosaveStatus({ saving, savedAt }: { saving: boolean; savedAt: string }) {
  return (
    <p className="flex items-center gap-1.5 text-12 leading-none text-muted" aria-live="polite">
      {saving ? (
        <>
          <LoaderCircle size={13} className="animate-spin" />
          Menyimpan…
        </>
      ) : (
        <>
          <Check size={13} strokeWidth={2.5} className="text-green" />
          Tersimpan · {savedAt}
        </>
      )}
    </p>
  );
}
