import { Container } from '@hearthmere/ui';
import { ApplyNowButton } from '@alderwyck/components/cta/ApplyNowButton';
import { ScheduleTourButton } from '@alderwyck/components/cta/ScheduleTourButton';
import { CallButton } from '@alderwyck/components/cta/CallButton';
import { propertyConfig } from '@alderwyck/config/property';

interface CTABannerProps {
  variant?: 'default' | 'dark';
}

export function CTABanner({ variant = 'default' }: CTABannerProps) {
  const isDark = variant === 'dark';

  return (
    <section
      className={`py-16 lg:py-20 ${
        isDark ? 'bg-gray-900' : 'bg-[var(--button-primary-bg)]'
      }`}
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl text-white">
            Ready to Explore {propertyConfig.name}?
          </h2>
          <p className="mt-4 text-lg">
            <span className="font-semibold text-white">Try the tour-request demo</span>{' '}
            <span className={isDark ? 'text-gray-400' : 'text-white/80'}>
              to continue exploring this fictional apartment community.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ScheduleTourButton
              variant={isDark ? 'primary' : 'secondary'}
              size="lg"
              location="cta_banner"
              showIcon
            >
              Open Tour Demo
            </ScheduleTourButton>
            <ApplyNowButton
              variant="outline"
              size="lg"
              location="cta_banner"
              showIcon
              className="border-white text-white hover:bg-white/10"
            >
              Preview Application
            </ApplyNowButton>
          </div>

          <div className="mt-6">
            <p className={isDark ? 'text-gray-400' : 'text-white/80'}>
              Try the demo phone action:{' '}
              <CallButton
                variant="link"
                location="cta_banner"
                showNumber
                showIcon={false}
                className={`${
                  isDark
                    ? 'text-white hover:text-gray-200'
                    : 'text-white hover:text-white/80'
                } font-semibold`}
              />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
