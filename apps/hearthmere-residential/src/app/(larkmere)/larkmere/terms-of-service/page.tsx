import { Metadata } from 'next';
import { PropertyTermsOfServicePage } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { legalConfig } from '@larkmere/config/legal';

export const metadata: Metadata = {
  title: 'Portfolio Demo Terms',
  description: `Usage notice for the fictional ${propertyConfig.name} interface demonstration.`,
  alternates: { canonical: '/larkmere/terms-of-service' },
};

export default function TermsOfServicePage() {
  return (
    <PropertyTermsOfServicePage
      propertyName={propertyConfig.name}
      effectiveDate={legalConfig.termsOfService.effectiveDate}
      fairHousingDisclaimer={legalConfig.fairHousing.disclaimer}
      governingLaw={legalConfig.termsOfService.governingLaw}
      jurisdiction={legalConfig.termsOfService.jurisdiction}
      address={propertyConfig.address}
      contact={propertyConfig.contact}
    />
  );
}
