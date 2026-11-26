export type PasswordRule = { label: string; test: (password: string) => boolean };

/** Requirements listed under the reset-password form. */
export const passwordRules: PasswordRule[] = [
  { label: '8+ karakter', test: (p) => p.length >= 8 },
  { label: 'Huruf besar & kecil', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { label: 'Angka', test: (p) => /\d/.test(p) },
];

const strengthLabels = ['Sangat lemah', 'Lemah', 'Cukup', 'Baik', 'Sangat kuat'] as const;

/**
 * Scores a password 0–4: one point per requirement above, plus one for a symbol.
 * Drives the 4-segment strength meter.
 */
export function passwordStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: '—' };
  const score = passwordRules.filter((rule) => rule.test(password)).length + (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
  return { score, label: strengthLabels[score]! };
}
