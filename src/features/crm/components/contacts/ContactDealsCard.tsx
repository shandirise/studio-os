import { Link } from 'react-router';
import { Badge, Button, Card, CardHeader } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { dealStageTone } from '@/lib/status';
import type { RelatedDeal } from '../../contactData';

type ContactDealsCardProps = {
  deals: RelatedDeal[];
  onCreateDeal: () => void;
};

/** "Deals" card in the right column of the contact detail page. */
export function ContactDealsCard({ deals, onCreateDeal }: ContactDealsCardProps) {
  return (
    <Card>
      <CardHeader title="Deals" subtitle={`${deals.length} aktif`} />
      <div className="flex flex-col gap-2 px-4 pb-3">
        {deals.map((deal) => (
          <Link
            key={deal.id}
            to={`/crm/deals/${deal.id}`}
            className="flex flex-col gap-1.5 rounded-control border border-line bg-subtle p-2.5 transition-colors hover:border-line-2"
          >
            <span className="text-13 leading-4 font-semibold text-ink">{deal.name}</span>
            <span className="flex items-center justify-between gap-2">
              <span className="text-12-5 text-ink">{formatRupiah(deal.value)}</span>
              <Badge tone={dealStageTone[deal.stage]}>{deal.stage}</Badge>
            </span>
          </Link>
        ))}
        {deals.length === 0 && (
          <div className="flex flex-col items-start gap-2 rounded-control border border-dashed border-line-2 p-3">
            <p className="text-12-5 text-muted">Belum ada deal untuk kontak ini.</p>
            <Button size="sm" onClick={onCreateDeal}>
              Buat deal
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
