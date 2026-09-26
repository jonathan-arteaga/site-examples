import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { CookieConsent } from './CookieConsent';
import { DemoSafetyNotice } from './DemoSafetyNotice';
import { ToastContainer } from './Toast';
import { ToastProvider } from '../contexts/ToastContext';

interface PropertySeoConfig {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
      type?: string;
    }>;
  };
  twitter: {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
  robots: Metadata['robots'];
  verification?: {
    google?: string;
    bing?: string;
  };
  geo?: {
    region: string;
    placename: string;
    position: string;
    ICBM: string;
  } | null;
}

interface PropertyRootLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  structuredData: ReactNode;
  stickyMobileCTA?: ReactNode;
  fontClassName?: string;
  basePath?: string;
}

export function createPropertyMetadata(
  propertyName: string,
  seoConfig: PropertySeoConfig
): Metadata {
  const canonicalUrl = seoConfig.canonicalUrl.replace(/\/+$/, '');
  const canonicalPath = new URL(canonicalUrl).pathname.replace(/\/+$/, '');
  const iconUrl = `${canonicalPath}/images/logo-brandmark.svg`;

  return {
    title: {
      default: seoConfig.defaultTitle,
      template: `%s | ${propertyName}`,
    },
    description: seoConfig.defaultDescription,
    keywords: seoConfig.keywords,
    metadataBase: new URL('/examples/property-management/', canonicalUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: propertyName,
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      images: seoConfig.openGraph.images,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      site: seoConfig.twitter.site,
      creator: seoConfig.twitter.creator,
    },
    icons: {
      icon: [
        {
          url: iconUrl,
          type: 'image/svg+xml',
        },
      ],
      shortcut: [iconUrl],
      apple: [{ url: iconUrl, type: 'image/svg+xml' }],
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
}

export const propertyViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function PropertyRootLayout({
  children,
  header,
  footer,
  structuredData,
  stickyMobileCTA,
  fontClassName,
  basePath = '',
}: PropertyRootLayoutProps) {
  return (
    <html lang="en" className={fontClassName}>
      <head>
        {structuredData}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <ToastProvider>

          {header}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          {footer}
          {/* Cross-application navigation intentionally leaves the Next base path. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ display: "block", padding: "8px 24px", textAlign: "right", fontSize: 12, background: "#f3f1ed", color: "#243043" }}>← Back to examples</a>
          <ToastContainer />
          {stickyMobileCTA}
          <CookieConsent basePath={basePath} />
          <DemoSafetyNotice />
        </ToastProvider>
      </body>
    </html>
  );
}
