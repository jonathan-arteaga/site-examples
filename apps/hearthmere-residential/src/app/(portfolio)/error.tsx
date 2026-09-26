'use client';

import { Container } from '@hearthmere/ui';
import { Button } from '@hearthmere/ui';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[60vh] flex items-center">
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          The demonstration hit an error
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Reload this local portfolio view. No form information was sent or saved
          before this screen appeared.
        </p>
        <Button onClick={reset}>Reload Demo</Button>
      </Container>
    </main>
  );
}
