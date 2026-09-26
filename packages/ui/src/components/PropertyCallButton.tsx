'use client';

import { ReactNode } from 'react';
import { buttonVariants, type ButtonVariant, type ButtonSize } from './Button';
import { PhoneIcon } from '../icons/property';

interface PropertyCallButtonProps {
  phone?: string;
  phoneDisplay: string;
  location?: string;
  showNumber?: boolean;
  showIcon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

export function PropertyCallButton({
  phone: _phone,
  phoneDisplay,
  location: _location,
  showNumber = false,
  showIcon = true,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: PropertyCallButtonProps) {
  return (
    <button
      type="button"
      data-demo-action="phone"
      className={buttonVariants(variant, size, className)}
    >
      {showIcon && <PhoneIcon className="mr-2 h-4 w-4" />}
      {children || (showNumber ? phoneDisplay : 'Phone Demo')}
    </button>
  );
}
