import { Upload } from 'lucide-react';
import { buttonClass } from '@/components/ui';

/** Primary "Upload file" button that opens the native file picker. Mobile uses the compact "Upload" size. */
export function UploadFileButton({ onFiles }: { onFiles: (files: File[]) => void }) {
  return (
    <label className={buttonClass('primary', 'md', 'cursor-pointer max-lg:h-7 max-lg:px-2.5 max-lg:text-12')}>
      <input
        type="file"
        multiple
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = '';
        }}
      />
      <Upload size={16} strokeWidth={2} className="max-lg:size-3.5" />
      <span className="lg:hidden">Upload</span>
      <span className="max-lg:hidden">Upload file</span>
    </label>
  );
}
