import { Metadata } from 'next';
import { PropertyListingsPage, PropertyMockListings } from '@hearthmere/ui';
import { getMockListings } from '@hearthmere/config';
import { CTABanner } from '@alderwyck/components/sections/CTABanner';
import { propertyConfig } from '@alderwyck/config/property';

export const metadata: Metadata = {
  title: 'Fictional Demo Listings',
  description: `Browse fictional portfolio listings for ${propertyConfig.name}. Pricing and availability are demo data.`,
  alternates: { canonical: '/alderwyck/listings' },
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
