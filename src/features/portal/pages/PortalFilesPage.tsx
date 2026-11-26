import { useState } from 'react';
import { SectionLabel, useToast } from '@/components/ui';
import { FileCard } from '../components/FileCard';
import { FileDropZone } from '../components/FileDropZone';
import { FileGroupTable } from '../components/FileGroupTable';
import { PortalPage } from '../components/PortalPage';
import { PortalPageHeader } from '../components/PortalPageHeader';
import { UploadFileButton } from '../components/UploadFileButton';
import { mainProject, portalFiles, portalTodayShort, type PortalFile } from '../data';

const decimal = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 });

/** 2516582 → "2,4 MB", 655360 → "640 KB" */
function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${decimal.format(bytes / (1024 * 1024))} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** J6 · Portal File: files shared by the team and uploaded by the client, grouped per project. */
export function PortalFilesPage() {
  const toast = useToast();
  const [files, setFiles] = useState<PortalFile[]>(portalFiles);

  const upload = (picked: File[]) => {
    if (picked.length === 0) return;
    const added = picked.map<PortalFile>((f, i) => ({
      id: `upload-${Date.now()}-${i}`,
      name: f.name,
      size: formatFileSize(f.size),
      date: portalTodayShort,
      source: 'client',
    }));
    setFiles((list) => [...added, ...list]);
    toast(
      picked.length === 1 ? 'File terunggah' : `${picked.length} file terunggah`,
      `${picked.length === 1 ? picked[0]!.name : 'File Anda'} ditambahkan ke ${mainProject.name}.`,
    );
  };

  const download = (file: PortalFile) => toast('Download dimulai', `${file.name} sedang diunduh.`);

  return (
    <PortalPage className="lg:gap-[18px]">
      <PortalPageHeader
        title="File"
        titleClassName="text-20 leading-[1.2] tracking-[-0.01em]"
        subtitle="File yang dibagikan tim dan file yang Anda unggah"
        className="max-lg:[&_p]:hidden"
        action={<UploadFileButton onFiles={upload} />}
      />

      <FileDropZone onFiles={upload} />

      <div className="max-lg:hidden">
        <FileGroupTable project={mainProject.name} files={files} onDownload={download} />
      </div>

      <section className="flex flex-col gap-3 lg:hidden">
        <SectionLabel>{mainProject.name}</SectionLabel>
        {files.map((file) => (
          <FileCard key={file.id} file={file} onDownload={download} />
        ))}
      </section>
    </PortalPage>
  );
}
