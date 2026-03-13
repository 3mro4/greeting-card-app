'use client';

import { Type, Palette } from 'lucide-react';
import { FONT_OPTIONS } from '@/lib/card-storage';
import FontUploader from '@/components/card/FontUploader';
import { useLocale } from '@/lib/locale-context';

interface NameStyleControlsProps {
  fontFamily: string;
  fontSize: number;
  textColor: string;
  customFontName: string | null;
  customFontData: string | null;
  onFontFamilyChange: (v: string) => void;
  onFontSizeChange: (v: number) => void;
  onTextColorChange: (v: string) => void;
  onCustomFontLoaded: (name: string, dataUrl: string) => void;
  onCustomFontRemoved: () => void;
}

export default function NameStyleControls({
  fontFamily,
  fontSize,
  textColor,
  customFontName,
  customFontData,
  onFontFamilyChange,
  onFontSizeChange,
  onTextColorChange,
  onCustomFontLoaded,
  onCustomFontRemoved,
}: NameStyleControlsProps) {
  const { t } = useLocale();
  const selectedFont = FONT_OPTIONS.find((f) => f.name === fontFamily);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <Type className="w-4 h-4" />
        {t.create.nameTextStyle}
      </h3>

      <FontUploader
        customFontName={customFontName}
        customFontData={customFontData}
        onFontLoaded={(name, dataUrl) => {
          onCustomFontLoaded(name, dataUrl);
          onFontFamilyChange(name);
        }}
        onFontRemoved={() => {
          onCustomFontRemoved();
          onFontFamilyChange('Inter');
        }}
      />

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">{t.create.fontFamily}</label>
        <select
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 dark:focus:border-teal-500
            transition-all"
        >
          {customFontName && (
            <optgroup label={t.create.customFontGroup}>
              <option value={customFontName} style={{ fontFamily: customFontName }}>
                {customFontName}
              </option>
            </optgroup>
          )}
          <optgroup label={t.create.latinFonts}>
            {FONT_OPTIONS.filter((f) => !f.rtl).map((f) => (
              <option key={f.name} value={f.name} style={{ fontFamily: f.name }}>
                {f.name}
              </option>
            ))}
          </optgroup>
          <optgroup label={t.create.arabicFonts}>
            {FONT_OPTIONS.filter((f) => f.rtl).map((f) => (
              <option key={f.name} value={f.name} style={{ fontFamily: f.name }}>
                {f.name}
              </option>
            ))}
          </optgroup>
        </select>
        {selectedFont?.rtl && (
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1.5">{t.create.rtlNote}</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          {t.create.fontSize}: {fontSize}px
        </label>
        <input
          type="range"
          min={12}
          max={72}
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full appearance-none cursor-pointer
            accent-teal-500"
        />
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1">
          <span>12px</span>
          <span>72px</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <Palette className="w-3.5 h-3.5" />
          {t.create.textColor}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">{textColor}</span>
        </div>
      </div>
    </div>
  );
}
