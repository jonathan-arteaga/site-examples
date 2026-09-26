'use client';

import { PropertyStickyMobileCTA } from '@hearthmere/ui';
import { propertyConfig } from '@norvale/config/property';
import { siteBasePath } from '@norvale/config/site';

export function StickyMobileCTA() {
  return (
    <PropertyStickyMobileCTA
      basePath={siteBasePath}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
    />
  );
}
