import { Upload } from 'lucide-react';
import { Badge, Button, Card, Table, TD, TH, THead, TR } from '@/components/ui';
import { importHistory } from '../data';
import { SettingsSection } from './SettingsSection';

/** Past CSV imports with their outcome; new contact imports run in the CRM import wizard. */
export function ImportHistorySection() {
  return (
    <SettingsSection
      title="Riwayat import"
      action={
        <Button size="sm" icon={Upload} to="/crm/import" className="-my-1.5">
          Import kontak
        </Button>
      }
    >
      <Card className="overflow-hidden">
        <Table minWidth={640}>
          <THead>
            <TH>FILE</TH>
            <TH className="w-[110px]">JENIS</TH>
            <TH className="w-[130px]">TANGGAL</TH>
            <TH className="w-[130px]">STATUS</TH>
            <TH className="w-[170px]">HASIL</TH>
          </THead>
          <tbody>
            {importHistory.map((record) => (
              <TR key={record.id} className="h-[46px] [&>td]:py-2">
                <TD className="font-semibold">{record.file}</TD>
                <TD>{record.kind}</TD>
                <TD className="whitespace-nowrap">{record.date}</TD>
                <TD>
                  <Badge tone={record.ok ? 'green' : 'red'}>{record.ok ? 'Selesai' : 'Gagal'}</Badge>
                </TD>
                <TD className="text-muted">{record.result}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
    </SettingsSection>
  );
}
