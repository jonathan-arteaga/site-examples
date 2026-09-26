import { PortfolioLink as Link } from './PortfolioLink';
import { Container } from './Container';
import { withPropertyBasePath } from '../lib/property-path';

export function PropertyNotFoundPage({ basePath = '' }: { basePath?: string }) {
  return (
    <main className="flex min-h-[60vh] items-center">
      <Container className="py-24 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          This route is not part of the fictional property demonstration.
        </p>
        <Link
          href={withPropertyBasePath(basePath, '/')}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary-500)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-600)]"
        >
          Go Home
        </Link>
      </Container>
    </main>
  );
}
