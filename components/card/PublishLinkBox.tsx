'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

interface PublishLinkBoxProps {
  link: string;
}

export default function PublishLinkBox({ link }: PublishLinkBoxProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl p-5 space-y-3 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
        <Check className="w-5 h-5" />
        <span className="font-semibold text-sm">{t.publish.cardPublished}</span>
      </div>

      <p className="text-xs text-teal-600 dark:text-teal-400">
        {t.publish.shareLink}
      </p>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-700 rounded-lg px-3 py-2.5
          text-sm text-gray-700 dark:text-gray-300 font-mono truncate">
          {link}
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700
            dark:bg-teal-500 dark:hover:bg-teal-600
            text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t.publish.copied}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {t.publish.copy}
            </>
          )}
        </button>
      </div>

      <a
        href={link.replace(window.location.origin, '')}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300
          transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        {t.publish.openCardPage}
      </a>
    </div>
  );
}
