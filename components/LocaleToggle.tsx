'use client';

import { useLocale } from '@/lib/locale-context';
import { Languages } from 'lucide-react';

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
      className="h-9 flex items-center gap-1.5 px-2.5 rounded-lg
        bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-300 transition-colors text-xs font-medium"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      {locale === 'en' ? 'عربي' : 'EN'}
    </button>
  );
}
