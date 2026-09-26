'use client';

interface PropertyGlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function PropertyGlobalErrorPage({ reset }: PropertyGlobalErrorPageProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">The property demo hit an error</h1>
            <p className="mb-6 text-gray-600">
              Reload the fictional community interface to continue.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-[var(--button-primary-bg)] px-6 py-3 text-[var(--button-primary-text)] transition-colors hover:bg-[var(--button-primary-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary-ring)] focus-visible:ring-offset-2"
            >
              Reload Demo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
