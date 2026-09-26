'use client';

import { ReactNode } from 'react';
import { PortfolioLink as Link } from './PortfolioLink';
import { buttonVariants, type ButtonVariant, type ButtonSize } from './Button';
import { CalendarIcon } from '../icons/property';
import { withPropertyBasePath } from '../lib/property-path';

interface PropertyScheduleTourButtonProps {
  location?: string;
  floorPlanId?: string;
  showIcon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  basePath?: string;
}

export function PropertyScheduleTourButton({
  floorPlanId,
  showIcon = false,
  variant = 'primary',
  size = 'md',
  className,
  children = 'Tour Request Demo',
  basePath = '',
}: PropertyScheduleTourButtonProps) {
  const route = floorPlanId
    ? `/schedule-tour?plan=${floorPlanId}`
    : '/schedule-tour';
  const href = withPropertyBasePath(basePath, route);

  return (
    <Link
      href={href}
      className={buttonVariants(variant, size, className)}
    >
      {showIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
      {children}
    </Link>
  );
}
