'use client';

import { Button } from './Button';
import { Container } from './Container';

interface PropertyErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function PropertyErrorPage({ reset }: PropertyErrorPageProps) {
  return (
    <main className="flex min-h-[60vh] items-center">
      <Container className="py-24 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">The property demo hit an error</h1>
        <p className="mx-auto mb-6 max-w-md text-gray-600">
          Reload this fictional view to continue. No form information was sent or saved.
        </p>
        <Button onClick={reset}>Reload Demo</Button>
      </Container>
    </main>
  );
}
