'use client';

import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container, buttonVariants } from '@hearthmere/ui';
import { ArrowRightIcon } from '@/components/icons';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { properties } from '@/config/properties';
import { useStaggerAnimation } from '@hearthmere/hooks';

interface PropertiesGridProps {
  showAll?: boolean;
  showViewAll?: boolean;
}

export function PropertiesGrid({ showAll = false, showViewAll = true }: PropertiesGridProps) {
  const [sectionRef, isVisible] = useStaggerAnimation<HTMLElement>();
  const displayProperties = showAll ? properties : properties.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      className={`py-12 lg:py-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
    >
      <Container>
        {/* Section Header */}
        <div className={`text-center mb-8 stagger-children ${isVisible ? 'is-visible' : ''}`}>
          <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
            Our Portfolio
          </p>
          <h2 className="heading-display text-display-md text-gray-900 mb-4">
            Four Fictional Community Concepts
          </h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            Explore four fictional communities with distinct floor plans, amenities,
            and neighborhood stories.
          </p>
        </div>

        {/* Properties Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-children ${isVisible ? 'is-visible' : ''}`}>
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Link */}
        {showViewAll && !showAll && (
          <div className="text-center mt-10">
            <Link href="/properties" className={buttonVariants('outline', 'md', 'group')}>
                View the Full Portfolio
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
