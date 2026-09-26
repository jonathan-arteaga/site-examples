import { Metadata } from 'next';
import { PropertyAccessibilityPage } from '@hearthmere/ui';
import { propertyConfig } from '@norvale/config/property';
import { legalConfig } from '@norvale/config/legal';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: `Accessibility patterns used in the fictional ${propertyConfig.name} portfolio interface.`,
  alternates: { canonical: '/norvale/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <PropertyAccessibilityPage
      propertyName={propertyConfig.name}
      lastReviewed={legalConfig.accessibility.lastReviewed}
      contactEmail={legalConfig.accessibility.contactEmail}
      contactPhone={legalConfig.accessibility.contactPhone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
      fairHousingDisclaimer={legalConfig.fairHousing.disclaimer}
    />
  );
}
