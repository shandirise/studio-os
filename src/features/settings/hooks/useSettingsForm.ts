import { useCallback, useMemo, useState } from 'react';

export type SettingsForm<T> = {
  values: T;
  /** Set one top-level field. */
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  /** Functional update for nested changes. */
  update: (updater: (values: T) => T) => void;
  /** True while the values differ from the last saved state. */
  dirty: boolean;
  /** Discard edits (Batalkan). */
  reset: () => void;
  /** Accept edits as the new saved state (Simpan perubahan). */
  save: () => void;
};

/**
 * Local form state with a saved snapshot, driving the settings save bar.
 *
 * const form = useSettingsForm(initialProfile);
 * <Input value={form.values.name} onChange={(e) => form.set('name', e.target.value)} />
 * <SaveBar form={form} />
 */
export function useSettingsForm<T>(initial: T): SettingsForm<T> {
  const [saved, setSaved] = useState(initial);
  const [values, setValues] = useState(initial);

  const dirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(saved), [values, saved]);

  const set = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const reset = useCallback(() => setValues(saved), [saved]);
  const save = useCallback(() => setSaved(values), [values]);

  return { values, set, update: setValues, dirty, reset, save };
}
