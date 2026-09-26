import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const cardVariants = cva(
  'bg-card text-card-foreground rounded-xl shadow-sm border border-border',
  {
    variants: {
      interactive: {
        true: [
          'transition-all duration-300',
          'hover:shadow-lg hover:border-gray-200',
          'hover:-translate-y-1',
        ],
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, children, interactive, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ interactive }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, cardVariants };
