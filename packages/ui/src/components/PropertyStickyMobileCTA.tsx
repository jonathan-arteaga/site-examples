'use client';

import { useState, useEffect } from 'react';
import { PortfolioLink as Link } from './PortfolioLink';
import { buttonVariants } from './Button';
import { PhoneIcon, CalendarIcon } from '../icons';
import { withPropertyBasePath } from '../lib/property-path';

const STICKY_CTA_SCROLL_THRESHOLD = 100;

export interface PropertyStickyMobileCTAProps {
  phone?: string;
  phoneDisplay: string;
  basePath?: string;
}

export function PropertyStickyMobileCTA({
  phone: _phone,
  phoneDisplay,
  basePath = '',
}: PropertyStickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > STICKY_CTA_SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40
        lg:hidden
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
      role="complementary"
      aria-label="Quick actions"
    >
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button
            type="button"
            data-demo-action="phone"
            className="flex items-center justify-center h-11 w-11 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0"
            aria-label={`Show demo calling notice for ${phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </button>

          <Link
            href={withPropertyBasePath(basePath, '/schedule-tour')}
            className={buttonVariants('primary', 'md', 'flex-1 w-full rounded-full')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Tour Request Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
