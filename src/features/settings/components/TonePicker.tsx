import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/status';
import { stageTones } from '../data';

const toneSwatch: Record<Tone, string> = {
  gray: 'bg-gray',
  blue: 'bg-blue',
  purple: 'bg-purple',
  orange: 'bg-orange',
  green: 'bg-green',
  red: 'bg-red',
  yellow: 'bg-yellow',
  dark: 'bg-dark',
};

const toneLabel: Record<Tone, string> = {
  gray: 'Abu-abu',
  blue: 'Biru',
  purple: 'Ungu',
  orange: 'Oranye',
  green: 'Hijau',
  red: 'Merah',
  yellow: 'Kuning',
  dark: 'Gelap',
};

type TonePickerProps = {
  value: Tone;
  onChange: (tone: Tone) => void;
  /** Name of the thing being colored, for the accessible label. */
  label: string;
};

/** 20px color swatch that opens a small palette of the status tones. */
export function TonePicker({ value, onChange, label }: TonePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        aria-label={`Warna ${label}: ${toneLabel[value]}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn('size-5 cursor-pointer rounded-badge', toneSwatch[value])}
      />
      {open && (
        <div className="absolute top-full right-0 z-30 mt-1.5 grid w-max lg:right-auto lg:left-0 grid-cols-4 gap-2 rounded-card border border-line bg-white p-2.5 shadow-[0_4px_16px_rgba(22,22,22,0.08)]">
          {stageTones.map((tone) => (
            <button
              key={tone}
              type="button"
              aria-label={toneLabel[tone]}
              title={toneLabel[tone]}
              onClick={() => {
                onChange(tone);
                setOpen(false);
              }}
              className={cn(
                'size-5 cursor-pointer rounded-badge',
                toneSwatch[tone],
                tone === value && 'ring-2 ring-ink ring-offset-2',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
