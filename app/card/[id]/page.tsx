'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TriangleAlert as AlertTriangle } from 'lucide-react';
import { loadCard, registerCustomFont, CardData } from '@/lib/card-storage';
import CardPreview from '@/components/card/CardPreview';
import PersonalizationForm from '@/components/card/PersonalizationForm';
import DownloadButton from '@/components/card/DownloadButton';
import ThemeToggle from '@/components/ThemeToggle';
import LocaleToggle from '@/components/LocaleToggle';
import { useLocale } from '@/lib/locale-context';

export default function CardPage() {
  const params = useParams();
  const cardId = params.id as string;
  const { t, dir } = useLocale();

  const [card, setCard] = useState<CardData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const previewRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = loadCard(cardId);
    if (data) {
      if (data.customFontData && data.customFontName) {
        registerCustomFont(data.customFontName, data.customFontData).then(() => {
          setCard(data);
        });
      } else {
        setCard(data);
      }
    } else {
      setNotFound(true);
    }
  }, [cardId]);

  function handleGenerate() {
    if (!name.trim()) return;
    setDisplayName(name.trim());
    setGenerated(true);
  }

  useEffect(() => {
    if (generated && downloadRef.current) {
      downloadRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [generated, displayName]);

  if (notFound) {
    return (
      <div dir={dir} className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="absolute top-4 end-4 flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-amber-500 dark:text-amber-400" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t.card.notFoundTitle}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.card.notFoundDesc}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t.card.goHome}
          </Link>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 dark:border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t.card.home}
          </Link>
          <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.card.pageTitle}</h1>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            {t.card.receivedGreeting}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.card.enterName}
          </p>
        </div>

        <PersonalizationForm
          name={name}
          onNameChange={setName}
          onGenerate={handleGenerate}
          generated={generated}
          rtl={card.rtl}
        />

        <CardPreview
          ref={previewRef}
          image={card.image}
          imageWidth={card.imageWidth}
          imageHeight={card.imageHeight}
          nameText={generated ? displayName : ''}
          namePosition={card.namePosition}
          fontFamily={card.fontFamily}
          fontSize={card.fontSize}
          textColor={card.textColor}
          rtl={card.rtl}
        />

        {generated && (
          <div ref={downloadRef} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <DownloadButton
              targetRef={previewRef as React.RefObject<HTMLDivElement>}
              filename={`card-${displayName.replace(/\s+/g, '-').toLowerCase()}.png`}
            />
          </div>
        )}
      </main>
    </div>
  );
}
