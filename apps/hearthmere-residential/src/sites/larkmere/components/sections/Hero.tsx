import { PortfolioImage as Image } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { ApplyNowButton } from '@larkmere/components/cta/ApplyNowButton';
import { ScheduleTourButton } from '@larkmere/components/cta/ScheduleTourButton';
import { getBedroomOptions } from '@larkmere/config/floor-plans';
import { withBasePath } from '@larkmere/config/site';

export function Hero() {
  const bedrooms = getBedroomOptions();

  return (
    <section className="relative min-h-screen flex items-center -mt-20 lg:-mt-24 pt-20 lg:pt-24">
      {/* Background Image - fetchPriority for faster LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath('/images/exterior/building-front.jpg')}
          alt="Synthetic garden apartment exterior created for this portfolio demonstration"
          fill
          className="object-cover object-center"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-eyebrow text-[var(--color-primary-300)] mb-4">
            Fictional garden-apartment interface
          </p>

          {/* Main Headline - using display font */}
          <h1 className="heading-display text-display-2xl text-white text-shadow-hero">
            Explore a Property Website Concept
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lead text-gray-200 max-w-xl text-shadow-subtle">
            Browse synthetic rooms, example layout cards, and invented neighborhood
            details assembled for a safe portfolio demonstration.
          </p>

          {/* Price tag */}
          <p className="mt-4 text-body-lg">
            <span className="text-white font-medium">
              Rates and availability are illustrative demo data
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ScheduleTourButton
              size="lg"
              location="hero"
              showIcon
              className="w-full sm:w-auto"
            />
            <ApplyNowButton
              variant="secondary"
              size="lg"
              location="hero"
              showIcon
              className="w-full sm:w-auto"
            />
          </div>

          {/* Quick Stats - Compact Badges */}
          <div className="mt-12 pb-8 sm:pb-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                <span className="text-lg font-bold">{bedrooms[0]}-{bedrooms[bedrooms.length - 1]}</span>
                Layout examples
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                <span aria-hidden="true">✦</span> Synthetic amenity set
              </span>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}
