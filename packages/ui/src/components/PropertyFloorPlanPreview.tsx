'use client';

import { ReactNode, Ref } from 'react';
import { PortfolioImage as Image } from './PortfolioImage';
import { PortfolioLink as Link } from './PortfolioLink';
import { formatPrice, formatSqft } from '@hearthmere/utils/client';
import { buttonVariants } from './Button';
import { Card } from './Card';
import { Container } from './Container';
import { FloorPlanPlaceholder } from './FloorPlanPlaceholder';
import { ArrowRightIcon } from '../icons/property';
import { withPropertyBasePath } from '../lib/property-path';

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
  images: {
    floorPlan?: string;
    photos: string[];
  };
}

interface PropertyFloorPlanPreviewProps {
  sectionRef: Ref<HTMLElement>;
  isVisible: boolean;
  plans: PropertyFloorPlan[];
  renderApplyAction: (planId: string) => ReactNode;
  basePath?: string;
}

export function PropertyFloorPlanPreview({
  sectionRef,
  isVisible,
  plans,
  renderApplyAction,
  basePath = '',
}: PropertyFloorPlanPreviewProps) {
  const previewPlans = plans.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className={`text-center max-w-2xl mx-auto animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Preview the Fictional Floor Plans
          </h2>
          <p className="mt-4 text-lg">
            <span className="font-semibold text-gray-900">Compare illustrative layouts and dimensions,</span>{' '}
            <span className="text-gray-500">with synthetic pricing added for a realistic product demonstration.</span>
          </p>
        </div>

        <div className={`mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children ${isVisible ? 'is-visible' : ''}`}>
          {previewPlans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden" interactive>
              <div className="relative aspect-[4/3]">
                {plan.images.floorPlan ? (
                  <Image
                    src={plan.images.floorPlan}
                    alt={`${plan.name} floor plan`}
                    fill
                    className="object-contain bg-white p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <FloorPlanPlaceholder className="absolute inset-0" />
                )}
                {/* Availability is intentionally omitted from these static demo cards. */}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>

                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                  <span>{plan.bedrooms} Bed</span>
                  <span>{plan.bathrooms} Bath</span>
                  <span>{formatSqft(plan.sqft)}</span>
                </div>

                <div className="mt-4">
                  <span className="text-2xl font-bold text-[var(--color-primary-700)]">
                    {formatPrice(plan.price.min)}
                  </span>
                  {plan.price.min !== plan.price.max && (
                    <span className="text-lg text-gray-500">
                      {' '}
                      - {formatPrice(plan.price.max)}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">/mo</span>
                </div>

                <div className="mt-6">
                  {renderApplyAction(plan.id)}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={`mt-12 text-center animate-on-scroll delay-500 ${isVisible ? 'is-visible' : ''}`}>
          <Link
            href={withPropertyBasePath(basePath, '/floor-plans')}
            className={buttonVariants('outline', 'lg')}
          >
              Compare Every Demo Plan
              <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
