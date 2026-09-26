import { ReactNode } from 'react';
import { Container } from './Container';

interface PropertyListingsPageProps {
  listings: ReactNode;
  ctaBanner: ReactNode;
}

export function PropertyListingsPage({
  listings,
  ctaBanner,
}: PropertyListingsPageProps) {
  return (
    <>
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Fictional Demo Listings
            </h1>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gray-900">Explore the demo experience.</span>{' '}
              <span className="text-gray-500">
                Browse fictional units and open the local application preview.
              </span>
            </p>
          </div>
        </Container>
      </section>

      <section>
        {listings}
      </section>

      {ctaBanner}
    </>
  );
}
