import { useNavigate } from 'react-router';
import { Avatar, Badge, Card, Table, TD, TH, THead, TR } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { formatRupiah } from '@/lib/format';
import { dealStageTone } from '@/lib/status';
import { formatShortDate, type RelatedDeal } from '../../contactData';

/** Active deals of a company ("Deals" tab). */
export function CompanyDealsTable({ deals }: { deals: RelatedDeal[] }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <Table minWidth={480}>
        <THead>
          <TH>DEAL</TH>
          <TH align="right" className="w-[130px]">
            NILAI
          </TH>
          <TH className="w-[130px]">STAGE</TH>
          <TH className="w-14">PIC</TH>
        </THead>
        <tbody>
          {deals.map((deal) => (
            <TR key={deal.id} onClick={() => navigate(`/crm/deals/${deal.id}`)} className="h-[50px]">
              <TD>
                <div className="flex min-w-0 flex-col gap-px">
                  <span className="truncate font-medium">{deal.name}</span>
                  <span className="truncate text-11-5 text-muted">Target closing {formatShortDate(deal.closeDate)}</span>
                </div>
              </TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {formatRupiah(deal.value)}
              </TD>
              <TD>
                <Badge tone={dealStageTone[deal.stage]}>{deal.stage}</Badge>
              </TD>
              <TD>
                <Avatar name={memberById(deal.picId).name} size="xs" className="text-10" />
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
