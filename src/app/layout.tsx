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
