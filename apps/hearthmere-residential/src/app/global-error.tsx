'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              The demonstration hit an error
            </h1>
            <p className="text-gray-600 mb-6">
              Reload the portfolio interface to continue exploring.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] rounded-lg hover:bg-[var(--button-primary-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--button-primary-ring)]"
            >
              Reload Demo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
