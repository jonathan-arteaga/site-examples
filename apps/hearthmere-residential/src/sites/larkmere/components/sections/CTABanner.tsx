import { Container } from '@hearthmere/ui';
import { ApplyNowButton } from '@larkmere/components/cta/ApplyNowButton';
import { ScheduleTourButton } from '@larkmere/components/cta/ScheduleTourButton';
import { CallButton } from '@larkmere/components/cta/CallButton';
import { propertyConfig } from '@larkmere/config/property';

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
            Continue Through the {propertyConfig.name} Demo
          </h2>
          <p className="mt-4 text-lg">
            <span className="font-semibold text-white">Open a simulated interface state</span>{' '}
            <span className={isDark ? 'text-gray-400' : 'text-white/80'}>
              while every interaction remains local to this portfolio experience.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ScheduleTourButton
              variant={isDark ? 'primary' : 'secondary'}
              size="lg"
              location="cta_banner"
              showIcon
            />
            <ApplyNowButton
              variant="outline"
              size="lg"
              location="cta_banner"
              showIcon
              className="border-white text-white hover:bg-white/10"
            />
          </div>

          <div className="mt-6">
            <p className={isDark ? 'text-gray-400' : 'text-white/80'}>
              Try the fictional phone control:{' '}
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
