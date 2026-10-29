import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/layout/DemoBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Genius Test by GeniusPie | Age-Adaptive Intelligence & Career Discovery',
  description:
    'Comprehensive multi-dimensional intelligence, aptitude, personality, and career discovery platform serving individuals aged 3 to 90. Triangulated empirical psychometrics with optional DMIT component.',
  keywords: [
    'Genius Test',
    'GeniusPie',
    'Aptitude Test',
    'Raven Progressive Matrices',
    'Big Five Personality',
    'DISC Assessment',
    'Holland RIASEC',
    'Career Discovery',
    'DMIT Analysis',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Suspense fallback={<div className="h-9 bg-slate-900" />}>
          <DemoBanner />
        </Suspense>
        <Suspense fallback={<header className="h-18 bg-white border-b border-slate-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading module...</div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
