import { Calendar, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Avatar, Badge, Card, EmptyState, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { dealStageTone } from '@/lib/status';
import { formatDate, type Deal } from '../../dealData';

/** Table view of the pipeline (Kanban/Tabel switch), in the list style used across the app. */
export function DealsTable({ deals }: { deals: Deal[] }) {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 overflow-hidden">
      {deals.length === 0 ? (
        <EmptyState title="Tidak ada deal" description="Coba ubah kata kunci atau filter." className="py-10" />
      ) : (
        <Table minWidth={860}>
          <THead>
            <TH>DEAL</TH>
            <TH>PERUSAHAAN</TH>
            <TH>STAGE</TH>
            <TH align="right">NILAI</TH>
            <TH>PIC</TH>
            <TH>CLOSING</TH>
            <TH>SUMBER</TH>
          </THead>
          <tbody>
            {deals.map((deal) => {
              const owner = memberById(deal.ownerId);
              return (
                <TR key={deal.id} onClick={() => navigate(`/crm/deals/${deal.id}`)} className="h-[52px]">
                  <TD>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{deal.title}</span>
                      {deal.stale && (
                        <span className="flex items-center gap-[5px] text-11-5 font-medium text-yellow-strong">
                          <TriangleAlert size={12} />
                          Tanpa aktivitas &gt; 7 hari
                        </span>
                      )}
                    </div>
                  </TD>
                  <TD className="text-muted">{deal.company.name}</TD>
                  <TD>
                    <Badge tone={dealStageTone[deal.stage]}>{deal.stage}</Badge>
                  </TD>
                  <TD align="right" className="font-semibold whitespace-nowrap">
                    {formatRupiah(deal.value)}
                  </TD>
                  <TD>
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <Avatar name={owner.name} size="xs" className="text-10" />
                      {owner.name}
                    </span>
                  </TD>
                  <TD className="whitespace-nowrap text-muted">
                    <span className="flex items-center gap-[5px]">
                      <Calendar size={12} className="text-faint" />
                      {formatDate(deal.closingDate)}
                    </span>
                  </TD>
                  <TD className="text-muted">{deal.source}</TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
