import { Metadata } from 'next';
import { PropertyAccessibilityPage } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { legalConfig } from '@larkmere/config/legal';

export const metadata: Metadata = {
  title: 'Accessibility Demo Notice',
  description: `Portfolio accessibility information for the fictional ${propertyConfig.name} interface.`,
  alternates: { canonical: '/larkmere/accessibility' },
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
