'use client';

import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';

interface DownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

export default function DownloadButton({ targetRef, filename = 'greeting-card.png' }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const { t } = useLocale();

  async function handleDownload() {
    if (!targetRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(targetRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800
        dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900
        disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-3.5 rounded-xl transition-all
        duration-200 text-sm shadow-sm hover:shadow-md"
    >
      <Download className="w-4 h-4" />
      {downloading ? t.card.preparingDownload : t.card.downloadCard}
    </button>
  );
}
