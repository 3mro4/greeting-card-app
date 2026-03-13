'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-9 h-9" />
        <div className="w-9 h-9" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200
          dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
          transition-colors"
        title={locale === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200
          dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
          transition-colors"
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-gray-300" />
        ) : (
          <Moon className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
}
