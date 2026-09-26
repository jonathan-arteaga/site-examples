'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { PortfolioLink as Link } from './PortfolioLink';
import { Button } from './Button';
import { CookieIcon, XIcon } from '../icons';
import { withPropertyBasePath } from '../lib/property-path';

const LOCAL_PREFERENCE_KEY = 'portfolio-demo-notice-dismissed';

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(LOCAL_PREFERENCE_KEY) === 'yes';
  } catch {
    return false;
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function CookieConsent({ basePath = '' }: { basePath?: string }) {
  const isDismissed = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 750);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(LOCAL_PREFERENCE_KEY, 'yes');
    } catch {
      // The notice can still close for this page when browser storage is unavailable.
    }
    setIsReady(false);
    window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_PREFERENCE_KEY }));
  };

  if (!isReady || isDismissed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="local-preference-title"
      className="fixed inset-x-0 bottom-0 z-[75] p-4 md:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-start gap-4 p-4 md:p-6">
          <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] sm:flex">
            <CookieIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 id="local-preference-title" className="text-lg font-semibold text-gray-900">
              Local Demo Preference
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This portfolio stores one preference in this browser so it can remember
              that you dismissed this notice. It is not used for tracking or shared
              with another service.{' '}
              <Link
                href={withPropertyBasePath(basePath, '/privacy-policy')}
                className="font-medium text-[var(--color-primary-600)] hover:underline"
              >
                Read the demo privacy policy
              </Link>
              .
            </p>
            <Button type="button" onClick={dismiss} size="sm" className="mt-4">
              Remember My Preference
            </Button>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Dismiss local preference notice"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function useCookieConsent(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
