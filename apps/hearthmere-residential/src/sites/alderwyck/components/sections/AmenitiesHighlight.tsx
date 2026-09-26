'use client';

import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { buttonVariants } from '@hearthmere/ui';
import { IconWrapper } from '@alderwyck/components/ui/IconWrapper';
import { featuredAmenities } from '@alderwyck/config/amenities';
import { getAmenityIcon, ArrowRightIcon } from '@alderwyck/components/icons';
import { useStaggerAnimation } from '@hearthmere/hooks';
import { withBasePath } from '@alderwyck/config/site';

export function AmenitiesHighlight() {
  const [sectionRef, isVisible] = useStaggerAnimation<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-16 lg:py-24">
      <Container>
        <div className={`text-center max-w-2xl mx-auto animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Thoughtful Everyday Amenities
          </h2>
          <p className="mt-4 text-lg">
            <span className="font-semibold text-gray-900">Preview the community experience</span>{' '}
            <span className="text-gray-500">through a fictional mix of practical comforts and shared spaces.</span>
          </p>
        </div>

        <div className={`mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 stagger-children ${isVisible ? 'is-visible' : ''}`}>
          {featuredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <IconWrapper size="lg" variant="primary" shape="circle">
                {getAmenityIcon(amenity.icon, 'h-7 w-7')}
              </IconWrapper>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                {amenity.name}
              </h3>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center animate-on-scroll delay-400 ${isVisible ? 'is-visible' : ''}`}>
          <Link href={withBasePath('/amenities')} className={buttonVariants('outline', 'lg')}>
              View All Amenities
              <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
