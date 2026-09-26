'use client';

import { PropertyContactForm } from '@hearthmere/ui';
import { floorPlans } from '@caldridge/config/floor-plans';
import { propertyConfig } from '@caldridge/config/property';

export function ContactForm() {
  return (
    <PropertyContactForm
      floorPlanOptions={floorPlans.map((fp) => ({
        value: fp.id,
        label: `${fp.name} - ${fp.bedrooms}BR/${fp.bathrooms}BA`,
      }))}
      phonePlaceholder={propertyConfig.contact.phonePlaceholder}
      formDisclosure={propertyConfig.contact.formDisclosure}
    />
  );
}
