'use client';

import { PropertyFloorPlanPreview } from '@hearthmere/ui';
import { useStaggerAnimation } from '@hearthmere/hooks';
import { floorPlans } from '@caldridge/config/floor-plans';
import { ApplyNowButton } from '@caldridge/components/cta/ApplyNowButton';
import { siteBasePath } from '@caldridge/config/site';

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
