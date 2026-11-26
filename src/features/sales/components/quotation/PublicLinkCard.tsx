import { Link } from 'react-router';
import { Copy } from 'lucide-react';
import { Card, IconButton, useToast } from '@/components/ui';

type PublicLinkCardProps = {
  /** Short link shown to the user, e.g. "studio.os/q/8Hk2…x9". */
  link: string;
  /** In-app route of the client portal page this link opens. */
  portalPath: string;
};

/** "LINK PUBLIK": the client-facing link with a copy button. */
export function PublicLinkCard({ link, portalPath }: PublicLinkCardProps) {
  const toast = useToast();

  const copy = () => {
    void navigator.clipboard?.writeText(`https://${link}`);
    toast('Link disalin', 'Bagikan link ini ke klien untuk melihat dokumen.');
  };

  return (
    <Card className="flex flex-col gap-2 p-3.5">
      <p className="text-10 leading-none font-semibold tracking-[0.08em] text-faint">LINK PUBLIK</p>
      <div className="flex items-center gap-2">
        <Link
          to={portalPath}
          title="Buka tampilan klien"
          className="flex h-8 min-w-0 flex-1 items-center truncate rounded-control border border-line bg-subtle px-2.5 text-12 text-muted hover:text-ink"
        >
          {link}
        </Link>
        <IconButton icon={Copy} label="Salin link" onClick={copy} />
      </div>
    </Card>
  );
}
