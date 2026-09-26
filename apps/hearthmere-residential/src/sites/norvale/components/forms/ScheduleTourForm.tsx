'use client';

import { PropertyScheduleTourForm } from '@hearthmere/ui';
import { floorPlans } from '@norvale/config/floor-plans';

interface ScheduleTourFormProps {
  defaultFloorPlan?: string;
}

export function ScheduleTourForm({ defaultFloorPlan }: ScheduleTourFormProps) {
  return (
    <PropertyScheduleTourForm
      floorPlanOptions={floorPlans.map((fp) => ({
        value: fp.id,
        label: `${fp.name} - ${fp.bedrooms}BR/${fp.bathrooms}BA`,
      }))}
      defaultFloorPlan={defaultFloorPlan}
    />
  );
}
