import { PortfolioImage as Image } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { ApplyNowButton } from '@caldridge/components/cta/ApplyNowButton';
import { ScheduleTourButton } from '@caldridge/components/cta/ScheduleTourButton';
import { propertyConfig } from '@caldridge/config/property';
import { getBedroomOptions, getPriceRange } from '@caldridge/config/floor-plans';
import { withBasePath } from '@caldridge/config/site';
import { formatPrice } from '@hearthmere/utils/client';

export function Hero() {
  const priceRange = getPriceRange();
  const bedrooms = getBedroomOptions();

  return (
    <section className="relative min-h-screen flex items-center -mt-20 lg:-mt-24 pt-20 lg:pt-24">
      {/* Background Image - fetchPriority for faster LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath('/images/amenities/pool-1.jpg')}
          alt={`${propertyConfig.name} fictional townhome exterior`}
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
            {propertyConfig.address.city}, {propertyConfig.address.state}
          </p>

          {/* Main Headline - using display font */}
          <h1 className="heading-display text-display-2xl text-white text-shadow-hero">
            {propertyConfig.tagline}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lead text-gray-200 max-w-xl text-shadow-subtle">
            Preview spacious townhome layouts, practical shared amenities, and a
            fictional neighborhood inspired by Foundry Row.
          </p>

          {/* Synthetic price range */}
          <p className="mt-4 text-body-lg">
            <span className="text-white font-medium">
              Synthetic monthly range: {formatPrice(priceRange.min)}-
              {formatPrice(priceRange.max)}
            </span>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ScheduleTourButton
              size="lg"
              location="hero"
              showIcon
              className="w-full sm:w-auto"
            >
              Open Tour Demo
            </ScheduleTourButton>
            <ApplyNowButton
              variant="secondary"
              size="lg"
              location="hero"
              showIcon
              className="w-full sm:w-auto"
            >
              Preview Application
            </ApplyNowButton>
          </div>

          {/* Quick Stats - Compact Badges */}
          <div className="mt-12 pb-8 sm:pb-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                <span className="text-lg font-bold">{bedrooms[0]}-{bedrooms[bedrooms.length - 1]}</span>
                Bedrooms
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                <span aria-hidden="true">🐾</span> Pet-Friendly Concept
              </span>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}
