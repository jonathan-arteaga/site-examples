'use client';

import { PropertyFooter } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { legalConfig } from '@larkmere/config/legal';
import { footerNavSections } from '@larkmere/config/navigation';
import { siteBasePath, withBasePath } from '@larkmere/config/site';

export function Footer() {
  return (
    <PropertyFooter
      basePath={siteBasePath}
      propertyName={propertyConfig.name}
      tagline={propertyConfig.tagline}
      address={propertyConfig.address}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
      officeHours={propertyConfig.contact.officeHours}
      residentPortalPath={propertyConfig.residentPortalPath}
      fairHousingDisclaimer={legalConfig.fairHousing.shortDisclaimer}
      footerNavSections={footerNavSections}
      logoSrc={withBasePath('/images/logo.svg')}
      logoWidth={120}
      logoHeight={100}
      logoClassName="h-16 w-auto"
    />
  );
}
