'use client';

import { User, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

interface PersonalizationFormProps {
  name: string;
  onNameChange: (v: string) => void;
  onGenerate: () => void;
  generated: boolean;
  rtl?: boolean;
}

export default function PersonalizationForm({
  name,
  onNameChange,
  onGenerate,
  generated,
  rtl = false,
}: PersonalizationFormProps) {
  const { t } = useLocale();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.card.enterFullName}
        </label>
        <div className="relative">
          <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 ${
            rtl ? 'right-3' : 'left-3'
          }`} />
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            dir={rtl ? 'rtl' : 'ltr'}
            placeholder={t.card.namePlaceholder}
            className={`w-full py-3 rounded-xl border border-gray-200 dark:border-gray-600
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 dark:focus:border-teal-500
              transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 ${
                rtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
              }`}
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!name.trim()}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700
          dark:bg-teal-500 dark:hover:bg-teal-600
          disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3.5
          rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
      >
        <Sparkles className="w-4 h-4" />
        {generated ? t.card.updateCard : t.card.generateCard}
      </button>
    </div>
  );
}
