'use client';

import { PropertyScheduleTourButton } from '@hearthmere/ui';
import type { ButtonVariant, ButtonSize } from '@hearthmere/ui';
import { siteBasePath } from '@norvale/config/site';

interface ScheduleTourButtonProps {
  location?: string;
  floorPlanId?: string;
  showIcon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export function ScheduleTourButton({
  location = 'header',
  floorPlanId,
  showIcon = false,
  children = 'Open Tour Demo',
  ...props
}: ScheduleTourButtonProps) {
  return (
    <PropertyScheduleTourButton
      basePath={siteBasePath}
      location={location}
      floorPlanId={floorPlanId}
      showIcon={showIcon}
      {...props}
    >
      {children}
    </PropertyScheduleTourButton>
  );
}
