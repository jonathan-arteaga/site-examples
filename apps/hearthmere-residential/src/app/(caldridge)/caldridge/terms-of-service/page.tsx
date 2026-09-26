import { Metadata } from 'next';
import { PropertyTermsOfServicePage } from '@hearthmere/ui';
import { propertyConfig } from '@caldridge/config/property';
import { legalConfig } from '@caldridge/config/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Portfolio demonstration notices for the fictional ${propertyConfig.name} website.`,
  alternates: { canonical: '/caldridge/terms-of-service' },
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
      includePhotoVariationDisclaimer={propertyConfig.includePhotoVariationDisclaimer}
    />
  );
}
