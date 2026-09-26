import { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { FloorPlanCard } from '@norvale/components/floor-plans';
import { CTABanner } from '@norvale/components/sections/CTABanner';
import { propertyConfig } from '@norvale/config/property';
import { floorPlans, getPriceRange } from '@norvale/config/floor-plans';
import { formatPrice } from '@hearthmere/utils/client';

export const metadata: Metadata = {
  title: 'Floor Plans & Pricing',
  description: `Review six illustrative one-, two-, and three-bedroom layouts created for the ${propertyConfig.name} portfolio demo.`,
  alternates: { canonical: '/norvale/floor-plans' },
};

export default function FloorPlansPage() {
  const priceRange = getPriceRange();

  return (
    <>
      {/* Header Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Illustrative Layouts & Pricing
            </h1>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gray-900">Compare the fictional layouts.</span>{' '}
              <span className="text-gray-500">
                Synthetic monthly range: {formatPrice(priceRange.min)}-
                {formatPrice(priceRange.max)}.
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* Floor Plans Grid */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {floorPlans.map((plan) => (
              <FloorPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
