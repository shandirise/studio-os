import { useNavigate } from 'react-router';
import { Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { formatRupiah } from '@/lib/format';
import { topClients } from '../data';
import { InlineMeter } from './InlineMeter';

export function TopClientsCard() {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader title="Top 10 klien by revenue" />
      <Table minWidth={720} className="border-t border-line">
        <THead>
          <TH className="w-11">#</TH>
          <TH>KLIEN</TH>
          <TH align="right" className="w-[100px]">
            DEAL WON
          </TH>
          <TH align="right" className="w-[150px]">
            REVENUE
          </TH>
          <TH className="w-[220px]">KONTRIBUSI</TH>
        </THead>
        <tbody>
          {topClients.map((c) => (
            <TR key={c.companyId} className="h-[42px]" onClick={() => navigate(`/crm/companies/${c.companyId}`)}>
              <TD>{c.rank}</TD>
              <TD>{c.name}</TD>
              <TD align="right">{c.dealsWon}</TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {formatRupiah(c.revenue)}
              </TD>
              <TD>
                <InlineMeter percent={c.share} trackClassName="w-[130px]" />
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
