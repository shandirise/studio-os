import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Button styled like an underlined text link, for in-place actions such as "Kirim ulang". */
export function InlineAction({ className, type = 'button', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer text-13 leading-none font-semibold text-ink underline underline-offset-2 hover:text-ink-2',
        className,
      )}
      {...rest}
    />
  );
}
