'use client';

import { PropertyContactForm } from '@hearthmere/ui';
import { floorPlans } from '@larkmere/config/floor-plans';

export function ContactForm() {
  return (
    <PropertyContactForm
      floorPlanOptions={floorPlans.map((fp) => ({
        value: fp.id,
        label: `${fp.name} - ${fp.bedrooms}BR/${fp.bathrooms}BA`,
      }))}
    />
  );
}
