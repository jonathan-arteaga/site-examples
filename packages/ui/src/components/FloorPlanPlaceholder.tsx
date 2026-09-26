import { cn } from '@hearthmere/utils/client';
import { HomeIcon } from '../icons';

interface FloorPlanPlaceholderProps {
  className?: string;
}

// Temporary placeholder for floor plan images.
//
// REVERT: When professional floor plan images are ready, remove this component
// and restore image rendering in shared property floor plan components.
export function FloorPlanPlaceholder({ className }: FloorPlanPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]',
        className
      )}
    >
      <HomeIcon className="h-16 w-16 text-[var(--color-primary-300)]" />
      <span className="mt-3 text-sm font-medium text-[var(--color-primary-400)]">
        Floor Plan
      </span>
      <span className="mt-1 text-xs text-[var(--color-primary-300)]">
        Coming Soon
      </span>
    </div>
  );
}
