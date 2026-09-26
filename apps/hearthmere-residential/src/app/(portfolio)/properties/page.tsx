import type { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { PropertiesGrid } from '@/components/sections/PropertiesGrid';
import { CTABanner } from '@/components/sections/CTABanner';
import { pageSeo } from '@/config/seo';

export const metadata: Metadata = {
  title: pageSeo.properties.title,
  description: pageSeo.properties.description,
  alternates: {
    canonical: '/properties',
  },
  openGraph: {
    url: '/properties',
    title: pageSeo.properties.title,
    description: pageSeo.properties.description,
  },
  twitter: {
    title: pageSeo.properties.title,
    description: pageSeo.properties.description,
  },
};

export default function PropertiesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary-50)] py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
              Our Portfolio
            </p>
            <h1 className="heading-display text-display-lg text-gray-900 mb-3">
              Our Properties
            </h1>
            <p className="text-body-lg text-gray-600">
              Browse four fictional apartment communities representing 544 illustrative
              homes. Each concept has its own layouts, amenities, and neighborhood story.
            </p>
          </div>
        </Container>
      </section>

      {/* Properties Grid - Show All */}
      <PropertiesGrid showAll showViewAll={false} />

      {/* CTA */}
      <CTABanner />
    </>
  );
}
