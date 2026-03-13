'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, Translations, getTranslations } from './translations';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'app-locale';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === 'ar' || stored === 'en') {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = getTranslations(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
