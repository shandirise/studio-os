import { Download, FileText, Upload } from 'lucide-react';
import { Badge, Button, Card, CardHeader, IconButton, Table, TD, TH, THead, TR, useToast } from '@/components/ui';
import { memberById } from '@/data/workspace';
import { projectFiles } from '../data';
import { formatDate } from '../format';

/** File tab: project documents with client visibility. */
export function ProjectFilesTab() {
  const toast = useToast();

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="File project"
        subtitle={`${projectFiles.length} file`}
        action={
          <Button size="sm" icon={Upload} onClick={() => toast('Unggah file', 'Pilih file untuk diunggah ke project.')}>
            Unggah file
          </Button>
        }
      />
      <Table minWidth={720}>
        <THead>
          <TH>NAMA FILE</TH>
          <TH>UKURAN</TH>
          <TH>DIUNGGAH OLEH</TH>
          <TH>TANGGAL</TH>
          <TH>AKSES</TH>
          <TH className="w-12" />
        </THead>
        <tbody>
          {projectFiles.map((f) => (
            <TR key={f.id}>
              <TD>
                <span className="flex items-center gap-2.5 font-medium">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-subtle text-muted">
                    <FileText size={14} />
                  </span>
                  {f.name}
                </span>
              </TD>
              <TD className="text-muted">{f.size}</TD>
              <TD>{memberById(f.uploaderId).name}</TD>
              <TD className="whitespace-nowrap text-muted">{formatDate(f.date)}</TD>
              <TD>
                <Badge tone={f.clientVisible ? 'green' : 'gray'}>{f.clientVisible ? 'Terlihat klien' : 'Internal'}</Badge>
              </TD>
              <TD>
                <IconButton
                  icon={Download}
                  label={`Unduh ${f.name}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => toast('Mengunduh file', f.name)}
                />
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
