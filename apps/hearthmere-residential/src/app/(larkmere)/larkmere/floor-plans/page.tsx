import { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { FloorPlanCard } from '@larkmere/components/floor-plans';
import { CTABanner } from '@larkmere/components/sections/CTABanner';
import { propertyConfig } from '@larkmere/config/property';
import { floorPlans } from '@larkmere/config/floor-plans';

export const metadata: Metadata = {
  title: 'Floor Plan Concepts',
  description: `Compare four fictional layout cards for ${propertyConfig.name}. Dimensions, rates, and status labels are illustrative demo data.`,
  alternates: { canonical: '/larkmere/floor-plans' },
};

export default function FloorPlansPage() {
  return (
    <>
      {/* Header Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Illustrative Floor Plan Collection
            </h1>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gray-900">Compare four example layouts.</span>{' '}
              <span className="text-gray-500">
                Rates and status labels are fictional demo data.
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
