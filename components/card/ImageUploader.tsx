'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (dataUrl: string) => void;
}

export default function ImageUploader({ image, onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t.create.backgroundImage}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer
          hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all duration-200 overflow-hidden"
      >
        {image ? (
          <div className="relative group">
            <img
              src={image}
              alt="Uploaded background"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
              transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">{t.create.clickToChange}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.create.clickOrDrag}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.create.fileTypes}</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
