'use client';

import { useEffect, useState } from 'react';
import { Button, type ButtonProps } from './Button';
import { ArrowRightIcon } from '../icons';

interface PropertyApplyNowButtonProps extends Omit<ButtonProps, 'onClick'> {
  floorPlanId?: string;
  propertyName?: string;
  location?: string;
  showIcon?: boolean;
}

export function PropertyApplyNowButton({
  floorPlanId,
  propertyName = 'this fictional property',
  location: _location,
  showIcon = false,
  children = 'Preview Application',
  ...props
}: PropertyApplyNowButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props}>
        {children}
        {showIcon && <ArrowRightIcon className="ml-2 h-4 w-4" />}
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-apply-title"
            aria-describedby="demo-apply-description"
            className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-700)]">
              Portfolio demonstration
            </p>
            <h2 id="demo-apply-title" className="mt-2 text-2xl font-bold text-gray-900">
              Application preview only
            </h2>
            <p id="demo-apply-description" className="mt-3 text-gray-600">
              Applications for {propertyName}
              {floorPlanId ? ` — ${floorPlanId}` : ''} are disabled. No application
              data is requested, collected, stored, or sent.
            </p>
            <Button
              autoFocus
              type="button"
              className="mt-6 w-full"
              onClick={() => setIsOpen(false)}
            >
              Close Demo
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
