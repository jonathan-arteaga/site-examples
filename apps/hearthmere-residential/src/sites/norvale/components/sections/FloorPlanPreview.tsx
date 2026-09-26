'use client';

import { PropertyFloorPlanPreview } from '@hearthmere/ui';
import { useStaggerAnimation } from '@hearthmere/hooks';
import { floorPlans } from '@norvale/config/floor-plans';
import { ApplyNowButton } from '@norvale/components/cta/ApplyNowButton';
import { siteBasePath } from '@norvale/config/site';

export function FloorPlanPreview() {
  const [sectionRef, isVisible] = useStaggerAnimation<HTMLElement>();

  return (
    <PropertyFloorPlanPreview
      basePath={siteBasePath}
      sectionRef={sectionRef}
      isVisible={isVisible}
      plans={floorPlans}
      renderApplyAction={(planId) => (
        <ApplyNowButton
          floorPlanId={planId}
          location="floor_plan_preview"
          className="w-full"
        />
      )}
    />
  );
}
