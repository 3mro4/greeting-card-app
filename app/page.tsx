'use client';

import Link from 'next/link';
import { PenTool, Send, Download, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LocaleToggle from '@/components/LocaleToggle';
import { useLocale } from '@/lib/locale-context';

export default function Home() {
  const { t, dir } = useLocale();

  const steps = [
    { icon: PenTool, title: t.home.designTitle, desc: t.home.designDesc },
    { icon: Send, title: t.home.shareTitle, desc: t.home.shareDesc },
    { icon: Download, title: t.home.downloadTitle, desc: t.home.downloadDesc },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="absolute top-4 end-4 flex items-center gap-2">
        <LocaleToggle />
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mx-auto">
            <PenTool className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              {t.home.title}
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              {t.home.subtitle}
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600
              text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-sm
              hover:shadow-md"
          >
            {t.home.createCard}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50
                shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center mx-auto mb-3">
                <step.icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">{step.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
