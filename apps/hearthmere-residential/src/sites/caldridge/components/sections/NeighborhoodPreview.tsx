import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container, DemoMapPanel } from '@hearthmere/ui';
import { buttonVariants } from '@hearthmere/ui';
import { IconWrapper } from '@caldridge/components/ui/IconWrapper';
import { propertyConfig } from '@caldridge/config/property';
import { neighborhoodSections, walkScore } from '@caldridge/config/neighborhood';
import { getAmenityIcon, ArrowRightIcon } from '@caldridge/components/icons';
import { withBasePath } from '@caldridge/config/site';

export function NeighborhoodPreview() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Illustrative Demo Neighborhood
            </h2>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gray-900">Explore a fictional setting.</span>{' '}
              <span className="text-gray-500">Destinations, distances, and mobility values are illustrative portfolio content.</span>
            </p>

            {/* Walk Scores */}
            <div className="mt-8 flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {walkScore.walk}
                </div>
                <div className="text-sm text-gray-500">Illustrative walking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {walkScore.transit}
                </div>
                <div className="text-sm text-gray-500">Illustrative transit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {walkScore.bike}
                </div>
                <div className="text-sm text-gray-500">Illustrative cycling</div>
              </div>
            </div>

            {/* Neighborhood Categories */}
            <div className="mt-8 space-y-6">
              {neighborhoodSections.slice(0, 3).map((section) => (
                <div key={section.id} className="flex gap-4">
                  <IconWrapper size="md" variant="primary">
                    {getAmenityIcon(section.icon, 'h-6 w-6')}
                  </IconWrapper>
                  <div>
                    <h3 className="font-semibold text-gray-900">{section.name}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href={withBasePath('/neighborhood')} className={buttonVariants('outline')}>
                  Explore Fictional Neighborhood
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right: Map */}
          <DemoMapPanel
            address={propertyConfig.address.formatted}
            propertyName={propertyConfig.name}
            className="min-h-[400px]"
          />
        </div>
      </Container>
    </section>
  );
}
