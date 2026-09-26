import { Metadata } from 'next';
import { Container, DemoMapPanel } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { IconWrapper } from '@caldridge/components/ui/IconWrapper';
import { ScoreCircle } from '@caldridge/components/ui/ScoreCircle';
import { CTABanner } from '@caldridge/components/sections/CTABanner';
import { propertyConfig } from '@caldridge/config/property';
import { neighborhoodSections, walkScore } from '@caldridge/config/neighborhood';
import { getAmenityIcon } from '@caldridge/components/icons';

export const metadata: Metadata = {
  title: 'Illustrative Neighborhood',
  description: `Explore fictional destinations, distances, and mobility examples around ${propertyConfig.name} in ${propertyConfig.address.city}.`,
  alternates: { canonical: '/caldridge/neighborhood' },
};

export default function NeighborhoodPage() {
  return (
    <>
      {/* Header */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Explore the Illustrative Demo Neighborhood
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Destinations, distances, and mobility values on this page are
              fictional examples for the portfolio.
            </p>
          </div>

          {/* Walk Scores */}
          <div className="mt-12 flex justify-center gap-12 lg:gap-24">
            <ScoreCircle score={walkScore.walk} label="Illustrative walking" />
            <ScoreCircle score={walkScore.transit} label="Illustrative transit" />
            <ScoreCircle score={walkScore.bike} label="Illustrative cycling" />
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <Container>
          <DemoMapPanel
            address={propertyConfig.address.formatted}
            propertyName={propertyConfig.name}
            className="min-h-[400px]"
          />
        </Container>
      </section>

      {/* Neighborhood Sections */}
      {neighborhoodSections.map((section, index) => (
        <section
          key={section.id}
          className={`py-12 lg:py-16 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
        >
          <Container>
            <div className="flex items-start gap-4 mb-8">
              <IconWrapper size="lg" variant="primary">
                {getAmenityIcon(section.icon, 'h-7 w-7')}
              </IconWrapper>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.name}
                </h2>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.pois.map((poi) => (
                <Card key={poi.name} className="p-4">
                  <h3 className="font-semibold text-gray-900">{poi.name}</h3>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-gray-500">{poi.type}</span>
                    <span className="text-[var(--color-primary-600)] font-medium">
                      {poi.distance}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CTABanner />
    </>
  );
}
