import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';

type Toast = { id: number; title: string; description?: string };
type ToastContextValue = { toast: (title: string, description?: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

/** Provides `useToast()`; renders the stack bottom-right. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((title: string, description?: string) => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, title, description }]);
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Top-right under the top bar, so toasts never cover save bars or the mobile tab bar. */}
      <div className="pointer-events-none fixed top-[68px] right-4 z-[60] flex w-[280px] max-w-[calc(100%-32px)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex flex-col gap-1 rounded-card border border-line bg-white p-3 shadow-[0_4px_16px_rgba(22,22,22,0.08)]"
          >
            <div className="flex items-center gap-2 text-13 font-semibold text-ink">
              <Check size={14} strokeWidth={2.5} className="text-green-strong" />
              {t.title}
            </div>
            {t.description && <p className="text-12 leading-[1.3] text-muted">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** Show a short confirmation, e.g. toast('Quotation terkirim', 'Dikirim ke rina@…'). */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx.toast;
}
