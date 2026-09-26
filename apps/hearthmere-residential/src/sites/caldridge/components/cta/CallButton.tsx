'use client';

import { PropertyCallButton } from '@hearthmere/ui';
import { propertyConfig } from '@caldridge/config/property';
import type { ButtonVariant, ButtonSize } from '@hearthmere/ui';

interface CallButtonProps {
  location?: string;
  showNumber?: boolean;
  showIcon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export function CallButton({
  location = 'header',
  showNumber = false,
  showIcon = true,
  children,
  ...props
}: CallButtonProps) {
  return (
    <PropertyCallButton
      phone={propertyConfig.contact.phone}
      phoneDisplay={propertyConfig.contact.phoneDisplay}
      location={location}
      showNumber={showNumber}
      showIcon={showIcon}
      {...props}
    >
      {children}
    </PropertyCallButton>
  );
}
