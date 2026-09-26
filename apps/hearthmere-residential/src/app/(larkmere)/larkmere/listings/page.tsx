import { Metadata } from 'next';
import { PropertyListingsPage, PropertyMockListings } from '@hearthmere/ui';
import { getMockListings } from '@hearthmere/config';
import { CTABanner } from '@larkmere/components/sections/CTABanner';
import { propertyConfig } from '@larkmere/config/property';

export const metadata: Metadata = {
  title: 'Fictional Demo Listings',
  description: `Inspect sample listing cards for ${propertyConfig.name}. Every rate, date, and status is invented portfolio data.`,
  alternates: { canonical: '/larkmere/listings' },
};

export default function ListingsPage() {
  return (
    <PropertyListingsPage
      listings={
        <PropertyMockListings
          listings={getMockListings(propertyConfig.id)}
          propertyName={propertyConfig.name}
        />
      }
      ctaBanner={<CTABanner />}
    />
  );
}
