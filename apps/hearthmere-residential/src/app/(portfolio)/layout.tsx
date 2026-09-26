import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { assertProductionEnv } from '@hearthmere/utils';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  CookieConsent,
  DemoSafetyNotice,
  ToastContainer,
  ToastProvider,
} from '@hearthmere/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import { seoConfig } from '@/config/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hearthmere.example';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: seoConfig.openGraph.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Hearthmere Residential fictional property portfolio showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: ['/twitter-image'],
  },
  icons: {
    icon: [{ url: '/images/logo-brandmark.svg', type: 'image/svg+xml' }],
    shortcut: ['/images/logo-brandmark.svg'],
    apple: [{ url: '/images/logo-brandmark.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  assertProductionEnv({ context: 'root layout' });


  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <ToastProvider>

          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* Cross-application navigation intentionally leaves the Next base path. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ display: "block", padding: "8px 24px", textAlign: "right", fontSize: 12, background: "#f3f1ed", color: "#243043" }}>← Back to examples</a>
          <ToastContainer />
          <CookieConsent />
          <DemoSafetyNotice />
        </ToastProvider>
      </body>
    </html>
  );
}
