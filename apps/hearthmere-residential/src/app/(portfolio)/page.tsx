import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { PropertiesGrid } from '@/components/sections/PropertiesGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { pageSeo, seoConfig } from '@/config/seo';

export const metadata: Metadata = {
  description: pageSeo.home.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: seoConfig.defaultTitle,
    description: pageSeo.home.description,
  },
  twitter: {
    title: seoConfig.defaultTitle,
    description: pageSeo.home.description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <PropertiesGrid showViewAll />
      <CTABanner />
    </>
  );
}
