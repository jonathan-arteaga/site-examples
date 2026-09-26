'use client';

import { PropertyHeader } from '@hearthmere/ui';
import { mainNavLinks, ctaNavLinks, PAGES_WITH_HERO } from '@alderwyck/config/navigation';
import { propertyConfig } from '@alderwyck/config/property';
import { SCROLL_THRESHOLDS } from '@hearthmere/config';
import { siteBasePath, withBasePath } from '@alderwyck/config/site';

export function Header() {
  return (
    <PropertyHeader
      propertyName={propertyConfig.name}
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
      mainNavLinks={mainNavLinks}
      ctaNavLinks={ctaNavLinks}
      pagesWithHero={PAGES_WITH_HERO}
      scrollThresholds={SCROLL_THRESHOLDS}
      basePath={siteBasePath}
      logoLightSrc={withBasePath('/images/logo-horizontal.svg')}
      logoDarkSrc={withBasePath('/images/logo-horizontal-dark.svg')}
    />
  );
}
