import { Metadata } from 'next';
import { PropertyPrivacyPolicyPage } from '@hearthmere/ui';
import { propertyConfig } from '@norvale/config/property';
import { legalConfig } from '@norvale/config/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${propertyConfig.name}`,
  alternates: { canonical: '/norvale/privacy-policy' },
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
