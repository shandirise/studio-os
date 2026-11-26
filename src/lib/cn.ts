import { extendTailwindMerge } from 'tailwind-merge';

/** tailwind-merge taught about our custom type scale and radius tokens (see styles/index.css). */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['9', '10', '10-5', '11', '11-5', '12', '12-5', '13', '13-5', '14', '15', '16', '18', '20', '22', '24', '34', '44'],
      radius: ['badge', 'control', 'card', 'modal'],
    },
  },
  override: {
    // Our text-* sizes set only font-size, so a size override must not drop a leading-* class.
    conflictingClassGroups: { 'font-size': [] },
  },
});

/**
 * Joins class names, skipping falsy values. Later classes win on conflicts,
 * so `cn('w-full', className)` lets callers override defaults safely.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(' '));
}
