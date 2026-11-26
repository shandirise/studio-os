import { FileText, Layers, ReceiptText, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardHeader } from '@/components/ui';
import type { RelatedDocument } from '../../contactData';

const typeIcon: Record<RelatedDocument['type'], LucideIcon> = {
  quotation: FileText,
  project: Layers,
  invoice: ReceiptText,
};

/** "Dokumen terkait": quotations, projects and invoices linked to the contact. */
export function RelatedDocumentsCard({ documents }: { documents: RelatedDocument[] }) {
  return (
    <Card>
      <CardHeader title="Dokumen terkait" />
      <ul className="flex flex-col gap-2 px-4 pb-3">
        {documents.map((doc) => {
          const Icon = typeIcon[doc.type];
          return (
            <li key={doc.id}>
              <Link to={doc.to} className="group flex items-center gap-2.5">
                <Icon size={14} className="shrink-0 text-muted" />
                <span className="min-w-0 flex-1 truncate text-12-5 leading-4 font-medium text-ink group-hover:underline">{doc.label}</span>
                <span className="shrink-0 text-11-5 text-muted">{doc.status}</span>
              </Link>
            </li>
          );
        })}
        {documents.length === 0 && <li className="text-12-5 text-muted">Belum ada dokumen terkait.</li>}
      </ul>
    </Card>
  );
}
