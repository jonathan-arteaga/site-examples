import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center">
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          This demo route is unavailable
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Return to the fictional portfolio index and choose one of the available views.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary-500)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-600)]"
        >
          Return to Showcase
        </Link>
      </Container>
    </main>
  );
}
