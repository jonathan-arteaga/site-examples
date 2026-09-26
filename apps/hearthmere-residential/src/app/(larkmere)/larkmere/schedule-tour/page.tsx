import { Suspense } from 'react';
import { Metadata } from 'next';
import { PropertyScheduleTourPage } from '@hearthmere/ui';
import { ScheduleTourForm } from '@larkmere/components/forms/ScheduleTourForm';
import { propertyConfig } from '@larkmere/config/property';

export const metadata: Metadata = {
  title: 'Tour Request Demo',
  description: `Preview a local tour-request interface for ${propertyConfig.name}. It creates no visit, message, or record.`,
  alternates: { canonical: '/larkmere/schedule-tour' },
};

export default function ScheduleTourPage() {
  return (
    <PropertyScheduleTourPage
      propertyName={propertyConfig.name}
      officeHours={propertyConfig.contact.officeHours}
      scheduleTourForm={<Suspense fallback={<p>Loading tour form…</p>}><ScheduleTourForm /></Suspense>}
    />
  );
}
