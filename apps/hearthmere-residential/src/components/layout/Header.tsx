'use client';

import { useState, useEffect, useRef } from 'react';
import { PortfolioLink as Link } from '@hearthmere/ui';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon, PhoneIcon, BrandMarkIcon } from '@/components/icons';
import { mainNavLinks } from '@/config/navigation';
import { companyConfig } from '@/config/company';

export function Header() {
  const [mobileMenuRoute, setMobileMenuRoute] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const mobileMenuOpen = mobileMenuRoute === pathname;

  // Check if we're on the homepage for transparent header
  const isHomepage = pathname === '/';

  // Track scroll position for header visibility and styling
  useEffect(() => {
    const updateHeaderState = (currentScrollY: number) => {
      const atTop = currentScrollY < 50;
      const shouldShow =
        currentScrollY < 100 || currentScrollY < lastScrollY.current;

      setIsAtTop((prev) => (prev !== atTop ? atTop : prev));
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(() => {
          updateHeaderState(currentScrollY);
          ticking.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuRoute(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Determine header style based on page and scroll position
  const isTransparent = isHomepage && isAtTop;

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] px-4 py-2 rounded-lg font-medium"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isTransparent ? 'pt-4' : 'pt-2'}
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={`
              flex items-center justify-between
              rounded-full
              px-4 lg:px-6
              h-14 lg:h-16
              transition-all duration-300
              ${isTransparent
                ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10'
                : 'bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 border border-white/70'
              }
            `}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 font-semibold text-lg">
              <BrandMarkIcon className={isTransparent ? 'text-white' : 'text-[var(--color-primary-700)]'} />
              <span className={isTransparent ? 'text-white' : 'text-gray-900'}>
                {companyConfig.shortName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${isTransparent
                      ? isActiveLink(link.href)
                        ? 'bg-white/20 text-white'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      : isActiveLink(link.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <button
                type="button"
                data-demo-action="phone"
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors
                  ${isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <PhoneIcon className="h-4 w-4" />
                <span className="hidden xl:inline">{companyConfig.contact.phoneDisplay}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`
                lg:hidden p-2 -mr-1 rounded-full transition-colors
                ${isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              onClick={() => {
                setMobileMenuRoute((prev) => (prev === pathname ? null : pathname));
              }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Dropdown */}
          <div
            id="mobile-menu"
            className={`
              lg:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out
              ${mobileMenuOpen
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none'
              }
            `}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-4 py-3 text-base font-medium rounded-xl transition-colors
                      ${isActiveLink(link.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setMobileMenuRoute(null)}
                    aria-current={isActiveLink(link.href) ? 'page' : undefined}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                  >
                    {link.label}
                  </Link>
                ))}

                <hr className="my-2 border-gray-100" />

                <button
                  type="button"
                  data-demo-action="phone"
                  onClick={() => {
                    setMobileMenuRoute(null);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  <PhoneIcon className="h-5 w-5" />
                  {companyConfig.contact.phoneDisplay}
                </button>

              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header - only on non-homepage */}
      {!isHomepage && <div className="h-16 lg:h-20" />}
    </>
  );
}
