import { Metadata } from 'next';
import { PropertyPrivacyPolicyPage } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { legalConfig } from '@larkmere/config/legal';

export const metadata: Metadata = {
  title: 'Demo Privacy Notice',
  description: `Browser-only data-handling notice for the fictional ${propertyConfig.name} portfolio.`,
  alternates: { canonical: '/larkmere/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PropertyPrivacyPolicyPage
      propertyName={propertyConfig.name}
      effectiveDate={legalConfig.termsOfService.effectiveDate}
      addressFormatted={propertyConfig.address.formatted}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
      email={propertyConfig.contact.email}
    />
  );
}
