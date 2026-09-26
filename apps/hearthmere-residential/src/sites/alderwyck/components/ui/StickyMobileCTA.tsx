'use client';

import { PropertyStickyMobileCTA } from '@hearthmere/ui';
import { propertyConfig } from '@alderwyck/config/property';
import { siteBasePath } from '@alderwyck/config/site';

export function StickyMobileCTA() {
  return (
    <PropertyStickyMobileCTA
      basePath={siteBasePath}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
    />
  );
}
