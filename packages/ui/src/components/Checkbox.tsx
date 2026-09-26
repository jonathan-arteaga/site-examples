import { forwardRef } from 'react';

import { cn } from '../lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        data-slot="checkbox"
        className={cn(
          'h-4 w-4 shrink-0 rounded border border-input',
          'text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
