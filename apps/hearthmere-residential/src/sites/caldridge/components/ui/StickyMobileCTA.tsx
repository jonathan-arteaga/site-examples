'use client';

import { PropertyStickyMobileCTA } from '@hearthmere/ui';
import { propertyConfig } from '@caldridge/config/property';
import { siteBasePath } from '@caldridge/config/site';

export function StickyMobileCTA() {
  return (
    <PropertyStickyMobileCTA
      basePath={siteBasePath}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
    />
  );
}
