'use client';

import { MapPinIcon } from '../icons/property';

interface DemoMapPanelProps {
  address: string;
  propertyName?: string;
  className?: string;
}

export function DemoMapPanel({
  address,
  propertyName = 'Fictional property',
  className = '',
}: DemoMapPanelProps) {
  return (
    <div
      className={`relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 ${className}`}
      aria-label={`Illustrative map placeholder for ${propertyName}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(35deg, transparent 46%, rgb(203 213 225) 47%, rgb(203 213 225) 52%, transparent 53%), linear-gradient(125deg, transparent 46%, rgb(226 232 240) 47%, rgb(226 232 240) 52%, transparent 53%)',
          backgroundSize: '72px 72px',
        }}
      />
      <button
        type="button"
        data-demo-action="map"
        className="relative mx-4 flex max-w-sm flex-col items-center rounded-2xl border border-slate-200 bg-white/95 px-6 py-5 text-center shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
      >
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
          <MapPinIcon className="h-6 w-6" />
        </span>
        <span className="font-semibold text-gray-900">Illustrative demo map</span>
        <span className="mt-1 text-sm text-gray-600">{address}</span>
        <span className="mt-3 text-xs font-medium text-[var(--color-primary-700)]">
          Show local demo notice
        </span>
      </button>
    </div>
  );
}
