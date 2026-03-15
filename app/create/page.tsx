'use client';

import { useState } from 'react';
import { ArrowLeft, Send, CircleAlert as AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/card/ImageUploader';
import CardPreview from '@/components/card/CardPreview';
import NameStyleControls from '@/components/card/NameStyleControls';
import PublishLinkBox from '@/components/card/PublishLinkBox';
import ThemeToggle from '@/components/ThemeToggle';
import LocaleToggle from '@/components/LocaleToggle';
import { useLocale } from '@/lib/locale-context';
import { saveCard, generateCardId, FONT_OPTIONS } from '@/lib/card-storage';

export default function CreatePage() {
  const { t, dir } = useLocale();
  const [image, setImage] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [namePosition, setNamePosition] = useState({ x: 50, y: 70 });
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');
  const [customFontName, setCustomFontName] = useState<string | null>(null);
  const [customFontData, setCustomFontData] = useState<string | null>(null);
  const [publishedLink, setPublishedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isRtl = FONT_OPTIONS.find((f) => f.name === fontFamily)?.rtl ?? false;
  const isCustomFont = customFontName !== null && fontFamily === customFontName;

  function handlePreviewClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNamePosition({ x: Math.round(x), y: Math.round(y) });
  }

  function handlePublish() {
    if (!image) {
      setError(t.create.uploadImageFirst);
      return;
    }
    setError(null);

    const cardId = generateCardId();
    saveCard({
      cardId,
      image,
      imageWidth,
      imageHeight,
      namePosition,
      fontFamily,
      fontSize,
      textColor,
      rtl: isRtl,
      ...(isCustomFont && customFontData
        ? { customFontData, customFontName }
        : {}),
    });

    const link = `${window.location.origin}/card/${cardId}`;
    setPublishedLink(link);
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
            {t.create.home}
          </Link>
          <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.create.pageTitle}</h1>
          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </p>
          </div>
        )}

        <ImageUploader image={image} onImageChange={(dataUrl, w, h) => {
          setImage(dataUrl);
          setImageWidth(w);
          setImageHeight(h);
        }} />

        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 shadow-sm">
          <NameStyleControls
            fontFamily={fontFamily}
            fontSize={fontSize}
            textColor={textColor}
            customFontName={customFontName}
            customFontData={customFontData}
            onFontFamilyChange={setFontFamily}
            onFontSizeChange={setFontSize}
            onTextColorChange={setTextColor}
            onCustomFontLoaded={(name, dataUrl) => {
              setCustomFontName(name);
              setCustomFontData(dataUrl);
            }}
            onCustomFontRemoved={() => {
              setCustomFontName(null);
              setCustomFontData(null);
            }}
          />
        </div>

        {image && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.create.livePreview}
              <span className="text-xs text-gray-400 dark:text-gray-500 ms-2">
                {t.create.previewHint}
              </span>
            </h3>
            <CardPreview
              image={image}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              nameText={t.create.placeholderName}
              namePosition={namePosition}
              fontFamily={fontFamily}
              fontSize={fontSize}
              textColor={textColor}
              rtl={isRtl}
              onClick={handlePreviewClick}
              interactive
            />
          </div>
        )}

        {!publishedLink ? (
          <button
            onClick={handlePublish}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700
              dark:bg-teal-500 dark:hover:bg-teal-600
              text-white font-medium py-4 rounded-xl transition-all duration-200 text-sm
              shadow-sm hover:shadow-md"
          >
            <Send className="w-4 h-4" />
            {t.create.publishCard}
          </button>
        ) : (
          <PublishLinkBox link={publishedLink} />
        )}
      </main>
    </div>
  );
}
