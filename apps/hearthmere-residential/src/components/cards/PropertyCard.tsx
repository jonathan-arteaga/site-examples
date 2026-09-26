'use client';

import { PortfolioImage as Image } from '@hearthmere/ui';
import { Card, buttonVariants } from '@hearthmere/ui';
import type { Property } from '@/config/properties';

interface PropertyCardProps {
  property: Property;
  location?: string;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card interactive className="overflow-hidden">
      {/* Property Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Property Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {property.name}
        </h3>
        {property.city && (
          <p className="text-sm text-gray-500 mb-4">{property.city}</p>
        )}

        <a
          href={property.path}
          className={buttonVariants('outline', 'md', 'w-full group')}
        >
            View Property
        </a>
      </div>
    </Card>
  );
}
