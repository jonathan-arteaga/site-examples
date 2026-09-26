'use client';

import { PortfolioLink as Link } from './PortfolioLink';
import { PortfolioImage as Image } from './PortfolioImage';
import { Container } from './Container';
import { PhoneIcon, MapPinIcon, ClockIcon, EqualHousingIcon } from '../icons';
import { PORTFOLIO_DISCLOSURE } from './DemoSafetyNotice';
import { withPropertyBasePath } from '../lib/property-path';

interface FooterNavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterNavSection {
  title: string;
  links: FooterNavLink[];
}

export interface PropertyFooterProps {
  propertyName: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  phoneDisplay: string;
  officeHours: Array<{ days: string; hours: string }>;
  residentPortalPath?: string;
  fairHousingDisclaimer: string;
  footerNavSections: FooterNavSection[];
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoClassName?: string;
  basePath?: string;
}

export function PropertyFooter({
  propertyName,
  tagline,
  address,
  phoneDisplay,
  officeHours,
  residentPortalPath,
  fairHousingDisclaimer,
  footerNavSections,
  logoSrc = '/images/logo-horizontal.svg',
  logoWidth = 180,
  logoHeight = 50,
  logoClassName = 'h-12 w-auto',
  basePath = '',
}: PropertyFooterProps) {
  const currentYear = new Date().getFullYear();
  const siteHref = (href: string) => withPropertyBasePath(basePath, href);

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Property Info */}
            <div className="sm:col-span-2">
              <Link href={siteHref('/')} className="inline-block">
                <Image
                  src={logoSrc}
                  alt={propertyName}
                  width={logoWidth}
                  height={logoHeight}
                  className={logoClassName}
                />
              </Link>
              <p className="mt-4 text-gray-400">{tagline}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-[var(--color-primary-300)] flex-shrink-0 mt-0.5" />
                  <address className="not-italic text-gray-300">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zip}
                  </address>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-[var(--color-primary-300)] flex-shrink-0" />
                  <button
                    type="button"
                    data-demo-action="phone"
                    className="text-left text-gray-300 hover:text-white transition-colors"
                  >
                    {phoneDisplay}
                  </button>
                </div>
              </div>

            </div>

            {/* Nav Sections */}
            {footerNavSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  {section.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={siteHref(link.href)}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Office Hours */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Fictional Office Hours
              </h4>
              <ul className="mt-4 space-y-2">
                {officeHours.map((hours) => (
                  <li key={hours.days} className="flex items-start gap-2">
                    <ClockIcon className="h-5 w-5 text-[var(--color-primary-300)] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">
                      <span className="font-medium">{hours.days}:</span>
                      <br />
                      {hours.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fair Housing Compliance */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <div className="flex items-center gap-3">
              <EqualHousingIcon className="h-10 w-10 text-white flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white">
                Illustrative Equal Housing
                <br />
                Language
              </span>
            </div>
            <p className="text-xs text-gray-400 md:flex-1">{fairHousingDisclaimer}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Hearthmere. Fictional portfolio demonstration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href={siteHref('/privacy-policy')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href={siteHref('/terms-of-service')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href={siteHref('/accessibility')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
              {residentPortalPath && (
                <Link
                  href={siteHref(residentPortalPath)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Portal Demo
                </Link>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400 sm:text-left">
            {PORTFOLIO_DISCLOSURE}
          </p>
        </div>
      </Container>
    </footer>
  );
}
