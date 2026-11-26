import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LucideProvider } from 'lucide-react';
import { RouterProvider } from 'react-router';
import { ToastProvider } from '@/components/ui';
import { router } from '@/app/router';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Design icons: 16px with a fixed 1.75px stroke regardless of size. */}
    <LucideProvider size={16} strokeWidth={1.75} absoluteStrokeWidth>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </LucideProvider>
  </StrictMode>,
);
