'use client';

import { useRef, useState } from 'react';
import { Upload, X, FileType } from 'lucide-react';
import { registerCustomFont } from '@/lib/card-storage';
import { useLocale } from '@/lib/locale-context';

interface FontUploaderProps {
  customFontName: string | null;
  customFontData: string | null;
  onFontLoaded: (name: string, dataUrl: string) => void;
  onFontRemoved: () => void;
}

const ACCEPTED = '.ttf,.woff,.woff2,.otf';

export default function FontUploader({
  customFontName,
  customFontData,
  onFontLoaded,
  onFontRemoved,
}: FontUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocale();

  async function handleFile(file: File) {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['ttf', 'woff', 'woff2', 'otf'].includes(ext)) {
      setError(t.create.unsupportedFormat);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(t.create.fontTooLarge);
      return;
    }

    setLoading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const fontName = `Custom-${file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, '')}`;
      await registerCustomFont(fontName, dataUrl);
      onFontLoaded(fontName, dataUrl);
    } catch {
      setError(t.create.fontCorrupted);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-500 dark:text-gray-400">{t.create.customFont}</label>

      {customFontName ? (
        <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg px-3 py-2.5">
          <FileType className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
          <span className="text-sm text-teal-700 dark:text-teal-300 truncate flex-1">{customFontName}</span>
          <button
            onClick={() => {
              onFontRemoved();
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="p-1 rounded hover:bg-teal-100 dark:hover:bg-teal-800/40 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-600
            rounded-lg px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400
            hover:border-teal-400 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400
            hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {loading ? t.create.loadingFont : t.create.uploadFont}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
