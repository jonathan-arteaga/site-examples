import type { MockListing } from '@hearthmere/config';
import { formatPrice } from '@hearthmere/utils/client';
import { Badge } from './Badge';
import { Card } from './Card';
import { Container } from './Container';
import { PropertyApplyNowButton } from './PropertyApplyNowButton';

interface PropertyMockListingsProps {
  listings: readonly MockListing[];
  propertyName: string;
}

export function PropertyMockListings({
  listings,
  propertyName,
}: PropertyMockListingsProps) {
  return (
    <section className="py-12 lg:py-16" aria-label="Fictional demo listings">
      <Container>
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          These cards are static portfolio examples. Units, prices, dimensions, and
          availability are fictional and are not connected to a property system.
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden p-0">
              <div className="border-b border-gray-100 bg-gray-50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{listing.unit}</p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      {listing.floorPlan}
                    </h2>
                  </div>
                  <Badge variant="warning">{listing.availability}</Badge>
                </div>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Bedrooms</dt>
                    <dd className="mt-1 font-semibold text-gray-900">{listing.bedrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Bathrooms</dt>
                    <dd className="mt-1 font-semibold text-gray-900">{listing.bathrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Size</dt>
                    <dd className="mt-1 font-semibold text-gray-900">
                      {listing.squareFeet.toLocaleString()} SF
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Fictional monthly price
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(listing.monthlyRent)}
                    </p>
                  </div>
                  <PropertyApplyNowButton
                    floorPlanId={listing.floorPlan}
                    propertyName={propertyName}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
