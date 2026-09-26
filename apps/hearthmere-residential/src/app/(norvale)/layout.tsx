import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import {
  createPropertyMetadata,
  propertyViewport,
  PropertyRootLayout,
} from '@hearthmere/ui';

import { Header } from '@norvale/components/layout/Header';
import { Footer } from '@norvale/components/layout/Footer';
import { StructuredData } from '@norvale/components/seo/StructuredData';
import { StickyMobileCTA } from '@norvale/components/ui/StickyMobileCTA';
import { propertyConfig } from '@norvale/config/property';
import { seoConfig } from '@norvale/config/seo';
import { siteBasePath } from '@norvale/config/site';
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
