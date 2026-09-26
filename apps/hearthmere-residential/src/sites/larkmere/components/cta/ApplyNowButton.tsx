'use client';

import { PropertyApplyNowButton, type ButtonProps } from '@hearthmere/ui';

interface ApplyNowButtonProps extends Omit<ButtonProps, 'onClick'> {
  floorPlanId?: string;
  location?: string;
  showIcon?: boolean;
}

export function ApplyNowButton(props: ApplyNowButtonProps) {
  return <PropertyApplyNowButton {...props} />;
}
