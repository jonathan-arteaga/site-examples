import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import {
  createPropertyMetadata,
  propertyViewport,
  PropertyRootLayout,
} from '@hearthmere/ui';

import { Header } from '@larkmere/components/layout/Header';
import { Footer } from '@larkmere/components/layout/Footer';
import { StructuredData } from '@larkmere/components/seo/StructuredData';
import { StickyMobileCTA } from '@larkmere/components/ui/StickyMobileCTA';
import { propertyConfig } from '@larkmere/config/property';
import { seoConfig } from '@larkmere/config/seo';
import { siteBasePath } from '@larkmere/config/site';
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
