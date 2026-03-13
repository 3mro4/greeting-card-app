'use client';

import { forwardRef } from 'react';
import { useLocale } from '@/lib/locale-context';

interface CardPreviewProps {
  image: string;
  nameText: string;
  namePosition: { x: number; y: number };
  fontFamily: string;
  fontSize: number;
  textColor: string;
  rtl?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  interactive?: boolean;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  (
    {
      image,
      nameText,
      namePosition,
      fontFamily,
      fontSize,
      textColor,
      rtl = false,
      onClick,
      interactive = false,
    },
    ref
  ) => {
    const { t } = useLocale();

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`relative overflow-hidden rounded-xl shadow-lg bg-gray-900 ${
          interactive ? 'cursor-crosshair' : ''
        }`}
        style={{ aspectRatio: '4/3' }}
      >
        <img
          src={image}
          alt="Card background"
          className="absolute inset-0 w-full h-full object-cover"
          crossOrigin="anonymous"
        />

        {nameText && (
          <div
            className="absolute whitespace-nowrap"
            dir={rtl ? 'rtl' : 'ltr'}
            style={{
              left: `${namePosition.x}%`,
              top: `${namePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              fontFamily,
              fontSize: `${fontSize}px`,
              color: textColor,
              textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              fontWeight: 600,
            }}
          >
            {nameText}
          </div>
        )}

        {interactive && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white
            text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
            {t.create.clickToPlaceName}
          </div>
        )}
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;
