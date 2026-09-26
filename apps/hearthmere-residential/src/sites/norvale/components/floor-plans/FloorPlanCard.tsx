'use client';

import { PropertyFloorPlanCard } from '@hearthmere/ui';
import { ApplyNowButton } from '@norvale/components/cta/ApplyNowButton';
import { ScheduleTourButton } from '@norvale/components/cta/ScheduleTourButton';
import type { FloorPlan } from '@hearthmere/config';

interface FloorPlanCardProps {
  plan: FloorPlan;
}

export function FloorPlanCard({ plan }: FloorPlanCardProps) {
  return (
    <PropertyFloorPlanCard
      plan={plan}
      renderApplyAction={(planId) => (
        <ApplyNowButton
          floorPlanId={planId}
          location="floor_plan_detail"
          className="w-full"
        />
      )}
      renderScheduleAction={(planId) => (
        <ScheduleTourButton
          floorPlanId={planId}
          variant="outline"
          location="floor_plan_detail"
          className="w-full"
        />
      )}
    />
  );
}
