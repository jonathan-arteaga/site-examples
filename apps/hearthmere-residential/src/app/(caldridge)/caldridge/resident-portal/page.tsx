import type { Metadata } from 'next';
import { PropertyResidentPortalPage } from '@hearthmere/ui';
import { propertyConfig } from '@caldridge/config/property';

export const metadata: Metadata = {
  title: 'Resident Portal Demo',
  description: `Local resident-portal demonstration for ${propertyConfig.name}. No accounts or resident data are connected.`,
  alternates: { canonical: '/caldridge/resident-portal' },
};

export default function ResidentPortalPage() {
  return <PropertyResidentPortalPage propertyName={propertyConfig.name} />;
}
