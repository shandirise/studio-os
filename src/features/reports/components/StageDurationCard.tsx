import { useNavigate } from 'react-router';
import { Badge, Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { dealStageTone } from '@/lib/status';
import { stageDurations, stageHealthTone } from '../data';

export function StageDurationCard() {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader title="Rata-rata lama di tiap stage" />
      <Table minWidth={760} className="border-t border-line">
        <THead>
          <TH className="w-[200px]">STAGE</TH>
          <TH align="right" className="w-[140px]">
            RATA-RATA HARI
          </TH>
          <TH align="right" className="w-[110px]">
            DEAL AKTIF
          </TH>
          <TH>TERLAMA</TH>
          <TH className="w-[130px]">STATUS</TH>
        </THead>
        <tbody>
          {stageDurations.map((row) => (
            <TR key={row.stage} className="h-11" onClick={() => navigate('/crm/deals')}>
              <TD>
                <Badge tone={dealStageTone[row.stage]}>{row.stage}</Badge>
              </TD>
              <TD align="right" className="whitespace-nowrap">
                {row.avgDays}
              </TD>
              <TD align="right">{row.activeDeals}</TD>
              <TD>{row.longest}</TD>
              <TD>
                <Badge tone={stageHealthTone[row.health]}>{row.health}</Badge>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
