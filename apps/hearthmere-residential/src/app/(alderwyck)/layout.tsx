import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import {
  createPropertyMetadata,
  propertyViewport,
  PropertyRootLayout,
} from '@hearthmere/ui';

import { Header } from '@alderwyck/components/layout/Header';
import { Footer } from '@alderwyck/components/layout/Footer';
import { StructuredData } from '@alderwyck/components/seo/StructuredData';
import { StickyMobileCTA } from '@alderwyck/components/ui/StickyMobileCTA';
import { propertyConfig } from '@alderwyck/config/property';
import { seoConfig } from '@alderwyck/config/seo';
import { siteBasePath } from '@alderwyck/config/site';
import { assertProductionEnv } from '@hearthmere/utils';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = createPropertyMetadata(
  propertyConfig.name,
  seoConfig
);

export const viewport: Viewport = propertyViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  assertProductionEnv({ context: 'root layout' });


  return (
    <PropertyRootLayout
      basePath={siteBasePath}
      header={<Header />}
      footer={<Footer />}
      structuredData={<StructuredData type="apartment" />}
      stickyMobileCTA={<StickyMobileCTA />}
      fontClassName={inter.variable}
    >
      {children}
    </PropertyRootLayout>
  );
}
