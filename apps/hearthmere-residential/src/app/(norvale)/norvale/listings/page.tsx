import { Metadata } from 'next';
import { PropertyListingsPage, PropertyMockListings } from '@hearthmere/ui';
import { getMockListings } from '@hearthmere/config';
import { CTABanner } from '@norvale/components/sections/CTABanner';
import { propertyConfig } from '@norvale/config/property';

export const metadata: Metadata = {
  title: 'Fictional Demo Listings',
  description: `Browse fictional portfolio listings for ${propertyConfig.name}. Pricing and availability are demo data.`,
  alternates: { canonical: '/norvale/listings' },
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
