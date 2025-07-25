import { Manrope } from 'next/font/google';
import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.scss';
import { Providers } from '@/app/provider';

import 'react-loading-skeleton/dist/skeleton.css'; // Импорт глобальных CSS здесь, в server-лейауте

const inter = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CraveX',
  description:
    'Legendary aggregate app for crypto and finance assets for people around all world!',
  icons: {
    icon: './favicon.ico',
  },
  keywords: ['crypto', 'assets', 'wallet', 'CraveX', 'finance'],
  authors: [{ name: 'CraveX Team', url: 'https://cravex.io' }],
  creator: 'CraveX',
  publisher: 'CraveX',
  openGraph: {
    title: 'Title for social media',
    description: 'Preview description for social networks',
    url: 'https://cravex.io/your-page',
    siteName: 'CraveX',
    images: [
      {
        url: 'https://cravex.io/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview Image for CraveX',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CraveX',
    description: 'Web3 hub for crypto and finance',
    creator: '@cravex_io',
    images: ['https://cravex.io/preview.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased main_app`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
