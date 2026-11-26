import { useCallback, useEffect, useRef, useState } from 'react';
import { formatClock } from './format';

const SAVE_DELAY_MS = 800;

/**
 * Simulated autosave for the editors. Call `touch()` on every change:
 * the status shows "Menyimpan…" and settles on "Tersimpan · HH:MM".
 */
export function useAutosave(initialSavedAt = '10:42') {
  const [savedAt, setSavedAt] = useState(initialSavedAt);
  const [saving, setSaving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const touch = useCallback(() => {
    setSaving(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setSaving(false);
      setSavedAt(formatClock(new Date()));
    }, SAVE_DELAY_MS);
  }, []);

  return { saving, savedAt, touch };
}
