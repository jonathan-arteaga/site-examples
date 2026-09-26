import { ReactNode } from 'react';
import { PortfolioImage as Image } from './PortfolioImage';
import { formatPrice, formatSqft } from '@hearthmere/utils/client';
import { Card } from './Card';
import { FloorPlanPlaceholder } from './FloorPlanPlaceholder';
import { CheckIcon } from '../icons/property';

interface PropertyFloorPlan {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: {
    min: number;
    max: number;
  };
  price: {
    min: number;
    max: number;
  };
  available: boolean;
  availableDate?: string;
  features: string[];
  images: {
    floorPlan?: string;
    photos: string[];
  };
}

interface PropertyFloorPlanCardProps {
  plan: PropertyFloorPlan;
  renderApplyAction: (planId: string) => ReactNode;
  renderScheduleAction?: (planId: string) => ReactNode;
}

export function PropertyFloorPlanCard({
  plan,
  renderApplyAction,
  renderScheduleAction,
}: PropertyFloorPlanCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square">
          {plan.images.floorPlan ? (
            <Image
              src={plan.images.floorPlan}
              alt={`${plan.name} floor plan`}
              fill
              className="object-contain bg-white p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <FloorPlanPlaceholder className="absolute inset-0" />
          )}
          {/* Availability is intentionally omitted from these static demo cards. */}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span>{plan.bedrooms} Bed</span>
            <span>{plan.bathrooms} Bath</span>
            <span>{formatSqft(plan.sqft)}</span>
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-[var(--color-primary-700)]">
              {formatPrice(plan.price.min)}
            </span>
            {plan.price.min !== plan.price.max && (
              <span className="text-xl text-gray-500">
                {' '}
                - {formatPrice(plan.price.max)}
              </span>
            )}
            <span className="text-gray-500">/mo</span>
          </div>

          <ul className="mt-6 space-y-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <CheckIcon className="h-4 w-4 text-[var(--color-primary-500)] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            {renderApplyAction(plan.id)}
            {renderScheduleAction ? renderScheduleAction(plan.id) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
