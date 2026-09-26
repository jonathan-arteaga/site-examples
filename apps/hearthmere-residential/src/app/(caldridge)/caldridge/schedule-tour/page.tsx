import { Suspense } from 'react';
import { Metadata } from 'next';
import { PropertyScheduleTourPage } from '@hearthmere/ui';
import { ScheduleTourForm } from '@caldridge/components/forms/ScheduleTourForm';
import { propertyConfig } from '@caldridge/config/property';

export const metadata: Metadata = {
  title: 'Tour Request Demo',
  description: `Preview a browser-only tour-request flow for fictional ${propertyConfig.name}. No appointment is created.`,
  alternates: { canonical: '/caldridge/schedule-tour' },
};

export default function ScheduleTourPage() {
  return (
    <PropertyScheduleTourPage
      propertyName={propertyConfig.name}
      officeHours={propertyConfig.contact.officeHours}
      tourHours={propertyConfig.contact.tourHours}
      scheduleTourForm={<Suspense fallback={<p>Loading tour form…</p>}><ScheduleTourForm /></Suspense>}
    />
  );
}
