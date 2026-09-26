import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariantStyles = cva(
  [
    'inline-flex items-center justify-center font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'rounded-lg',
    'transition-all duration-200',
    'hover:-translate-y-0.5 hover:shadow-md',
    'active:translate-y-0 active:scale-[0.98] active:shadow-sm',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring',
        secondary:
          'border border-input bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-input',
        outline:
          'border-2 border-primary text-primary hover:bg-accent focus-visible:ring-ring',
        ghost:
          'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400 hover:shadow-none',
        white:
          'bg-white text-gray-900 hover:bg-gray-100 shadow-sm focus-visible:ring-white/70',
        'outline-light':
          'border border-white/60 text-white hover:bg-white/10 focus-visible:ring-white/70 hover:shadow-none',
        link:
          'text-primary hover:text-primary-hover hover:underline underline-offset-4 p-0 h-auto hover:translate-y-0 hover:shadow-none active:scale-100',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'white' | 'outline-light' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantStyles> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariantStyles({ variant, size }),
        variant !== 'link' || className ? className : undefined
      )}
      {...props}
    />
  );
}

/**
 * Returns button styling classes without rendering a <button> element.
 * Use this on <a>, <Link>, or other elements that need button appearance.
 */
function buttonVariants(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string {
  return cn(
    buttonVariantStyles({
      variant,
      size: variant === 'link' ? undefined : size,
    }),
    className
  );
}

export { Button, buttonVariants };
