'use client';

import { PropertyStickyMobileCTA } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { siteBasePath } from '@larkmere/config/site';

export function StickyMobileCTA() {
  return (
    <PropertyStickyMobileCTA
      basePath={siteBasePath}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
    />
  );
}
