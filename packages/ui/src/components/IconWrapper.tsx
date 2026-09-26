import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const iconWrapperVariants = cva(
  'flex items-center justify-center flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-14 h-14',
      },
      variant: {
        primary: 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]',
        secondary: 'bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]',
      },
      shape: {
        rounded: 'rounded-lg',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
      shape: 'rounded',
    },
  }
);

interface IconWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconWrapperVariants> {}

function IconWrapper({ children, size, variant, shape, className, ...props }: IconWrapperProps) {
  return (
    <div
      data-slot="icon-wrapper"
      className={cn(iconWrapperVariants({ size, variant, shape }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { IconWrapper, iconWrapperVariants };
