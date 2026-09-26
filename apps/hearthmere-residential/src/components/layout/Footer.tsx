'use client';

import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, EqualHousingIcon, BrandMarkIcon } from '@/components/icons';
import { companyConfig } from '@/config/company';
import { footerNavLinks, legalLinks } from '@/config/navigation';
import { properties } from '@/config/properties';
import { PORTFOLIO_DISCLOSURE } from '@hearthmere/ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary-900)] text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BrandMarkIcon className="text-[var(--color-secondary-400)]" />
              <h3 className="text-lg font-bold">{companyConfig.shortName}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              {companyConfig.tagline}
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <EqualHousingIcon className="h-6 w-6 flex-shrink-0" />
              <span className="text-xs">Illustrative Equal Housing Mark</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Our Properties
            </h4>
            <ul className="space-y-3">
              {properties.map((property) => (
                <li key={property.id}>
                  <a
                    href={property.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {property.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  type="button"
                  data-demo-action="phone"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <PhoneIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-white" />
                  <span className="text-sm">{companyConfig.contact.phoneDisplay}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-demo-action="email"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <EnvelopeIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-white" />
                  <span className="text-sm">{companyConfig.contact.email}</span>
                </button>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPinIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-sm">{companyConfig.address.full}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} {companyConfig.name}. Fictional portfolio demonstration.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400 md:text-left">
            {PORTFOLIO_DISCLOSURE}
          </p>
        </div>
      </Container>
    </footer>
  );
}
