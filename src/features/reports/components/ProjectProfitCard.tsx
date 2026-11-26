import { useNavigate } from 'react-router';
import { Badge, Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { projectProfits, punctualityTone } from '../data';
import { InlineMeter } from './InlineMeter';

export function ProjectProfitCard() {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader title="Profit per project" subtitle="Revenue − biaya jam − pengeluaran" />
      <Table minWidth={900} className="border-t border-line">
        <THead>
          <TH>PROJECT</TH>
          <TH align="right" className="w-[130px]">
            REVENUE
          </TH>
          <TH align="right" className="w-[120px]">
            BIAYA JAM
          </TH>
          <TH align="right" className="w-[120px]">
            PENGELUARAN
          </TH>
          <TH align="right" className="w-[130px]">
            PROFIT
          </TH>
          <TH className="w-[150px]">MARGIN</TH>
          <TH className="w-[120px]">TEPAT WAKTU</TH>
        </THead>
        <tbody>
          {projectProfits.map((p) => (
            <TR key={p.id} className="h-[46px]" onClick={() => navigate(`/projects/${p.id}`)}>
              <TD className="font-semibold">{p.name}</TD>
              <TD align="right" className="whitespace-nowrap">
                {p.revenue}
              </TD>
              <TD align="right" className="whitespace-nowrap">
                {p.laborCost}
              </TD>
              <TD align="right" className="whitespace-nowrap">
                {p.expenses}
              </TD>
              <TD align="right" className="font-semibold whitespace-nowrap">
                {p.profit}
              </TD>
              <TD>
                <InlineMeter percent={p.margin} trackClassName="w-[70px]" />
              </TD>
              <TD>
                <Badge tone={punctualityTone[p.punctuality]}>{p.punctuality}</Badge>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
