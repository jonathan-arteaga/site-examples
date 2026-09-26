'use client';

import { PropertyFooter } from '@hearthmere/ui';
import { propertyConfig } from '@alderwyck/config/property';
import { legalConfig } from '@alderwyck/config/legal';
import { footerNavSections } from '@alderwyck/config/navigation';
import { siteBasePath, withBasePath } from '@alderwyck/config/site';

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
      logoSrc={withBasePath('/images/logo-horizontal.svg')}
    />
  );
}
