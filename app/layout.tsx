import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

const ARABIC_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&family=Noto+Kufi+Arabic:wght@400;600;700&family=Readex+Pro:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap';

export const metadata: Metadata = {
  title: 'Greeting Card Generator',
  description: 'Create and share personalized greeting cards',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={ARABIC_FONTS_URL} rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
