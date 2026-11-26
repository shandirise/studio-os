import { useNavigate } from 'react-router';
import { Badge, Card, CardHeader, Table, TD, TH, THead, TR } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRupiah } from '@/lib/format';
import { invoiceTone } from '@/lib/status';
import { oldestReceivables } from '../data';

export function OldestReceivablesCard() {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader title="Piutang terlama" />
      <Table minWidth={760} className="border-t border-line">
        <THead>
          <TH className="w-[140px]">INVOICE</TH>
          <TH>KLIEN</TH>
          <TH className="w-[120px]">JATUH TEMPO</TH>
          <TH className="w-[110px]">UMUR</TH>
          <TH align="right" className="w-[140px]">
            SISA
          </TH>
          <TH className="w-[110px]">STATUS</TH>
        </THead>
        <tbody>
          {oldestReceivables.map((inv) => (
            <TR key={inv.id} className="h-11" onClick={() => navigate(`/finance/invoices/${inv.id}`)}>
              <TD className="font-semibold whitespace-nowrap">{inv.number}</TD>
              <TD>{inv.client}</TD>
              <TD className="whitespace-nowrap">{inv.dueDate}</TD>
              <TD className="whitespace-nowrap">{inv.age}</TD>
              <TD align="right" className={cn('font-semibold whitespace-nowrap', inv.status === 'Overdue' && 'text-danger')}>
                {formatRupiah(inv.balance)}
              </TD>
              <TD>
                <Badge tone={invoiceTone[inv.status]}>{inv.status}</Badge>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
