import { Card } from './Card';
import { Container } from './Container';

interface PropertyResidentPortalPageProps {
  propertyName: string;
}

export function PropertyResidentPortalPage({
  propertyName,
}: PropertyResidentPortalPageProps) {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <Container size="sm">
        <Card className="p-8 text-center lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-700)]">
            Local portfolio simulation
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            {propertyName} Resident Portal Demo
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            This same-origin page demonstrates a resident-portal entry point. It is
            not connected to accounts, rent payments, maintenance systems, or resident
            data.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['View demo balance', 'Request demo service', 'Open demo documents'].map(
              (label) => (
                <button
                  key={label}
                  type="button"
                  data-demo-action="portal"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
}
