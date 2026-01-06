import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://courbet-roms-hub.vercel.app'),
  title: {
    default: 'Courbet ROMs Hub',
    template: '%s | Courbet ROMs Hub',
  },
  description: 'The ultimate destination for custom ROMs, guides, and resources for the Xiaomi Mi 11 Lite 4G (courbet). Find the best and most stable ROMs all in one place.',
  openGraph: {
    title: 'Courbet ROMs Hub',
    description: 'The ultimate destination for custom ROMs, guides, and resources for the Xiaomi Mi 11 Lite 4G (courbet).',
    url: 'https://courbet-roms-hub.com',
    siteName: 'Courbet ROMs Hub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Courbet ROMs Hub Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Courbet ROMs Hub',
    description: 'The ultimate destination for custom ROMs for Xiaomi Mi 11 Lite 4G.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')} suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  );
}
