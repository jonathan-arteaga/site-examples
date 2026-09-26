'use client';

import { useEffect, useRef, useState } from 'react';
import { PortfolioImage as Image } from './PortfolioImage';
import { PortfolioLink as Link } from './PortfolioLink';
import { usePathname } from 'next/navigation';
import { buttonVariants, type ButtonVariant } from './Button';
import { MenuIcon, PhoneIcon, XIcon } from '../icons/property';
import { withPropertyBasePath } from '../lib/property-path';

export interface PropertyHeaderNavLink {
  label: string;
  href: string;
  highlight?: boolean;
  external?: boolean;
  portal?: boolean;
}

interface PropertyHeaderProps {
  propertyName: string;
  phone: string;
  phoneDisplay: string;
  mainNavLinks: PropertyHeaderNavLink[];
  ctaNavLinks: PropertyHeaderNavLink[];
  pagesWithHero: readonly string[];
  scrollThresholds: {
    HEADER_SCROLL_DETECT: number;
    HEADER_HIDE_THRESHOLD: number;
  };
  logoLightSrc?: string;
  logoDarkSrc?: string;
  basePath?: string;
}

export function PropertyHeader({
  propertyName,
  phoneDisplay,
  mainNavLinks,
  ctaNavLinks,
  pagesWithHero,
  scrollThresholds,
  logoLightSrc = '/images/logo-horizontal.svg',
  logoDarkSrc = '/images/logo-horizontal-dark.svg',
  basePath = '',
}: PropertyHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const routePathname =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || '/'
      : pathname;
  const siteHref = (href: string) => withPropertyBasePath(basePath, href);

  const hasHeroImage = pagesWithHero.includes(routePathname);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < scrollThresholds.HEADER_SCROLL_DETECT);

      if (currentScrollY > scrollThresholds.HEADER_HIDE_THRESHOLD) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThresholds.HEADER_HIDE_THRESHOLD, scrollThresholds.HEADER_SCROLL_DETECT]);

  const isActiveLink = (href: string) => {
    if (href === '/') return routePathname === '/';
    return routePathname.startsWith(href);
  };

  const isTransparent = hasHeroImage && isAtTop;

  const getDesktopCTAVariant = (link: PropertyHeaderNavLink): ButtonVariant => {
    if (link.highlight) return isTransparent ? 'white' : 'secondary';
    if (link.portal) return isTransparent ? 'outline-light' : 'secondary';
    return 'primary';
  };

  const getMobileCTAVariant = (link: PropertyHeaderNavLink): ButtonVariant => {
    return link.portal || link.highlight ? 'secondary' : 'primary';
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] px-4 py-2 rounded-lg font-medium"
      >
        Skip to main content
      </a>

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
                ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5'
                : 'bg-white shadow-lg shadow-black/5 border border-gray-100'
              }
            `}
          >
            <Link href={siteHref('/')} className="flex-shrink-0">
              <Image
                src={isTransparent ? logoLightSrc : logoDarkSrc}
                alt={propertyName}
                width={180}
                height={40}
                className="h-9 w-auto lg:h-10"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
              {mainNavLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      px-3 py-2 text-sm font-medium rounded-full transition-all duration-200
                      ${isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={siteHref(link.href)}
                    className={`
                      px-3 py-2 text-sm font-medium rounded-full transition-all duration-200
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
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3">
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
                <span className="hidden xl:inline">{phoneDisplay}</span>
              </button>
              {ctaNavLinks.map((link) => {
                const variant = getDesktopCTAVariant(link);
                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants(variant, 'sm', 'rounded-full')}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={siteHref(link.href)}
                    className={buttonVariants(variant, 'sm', 'rounded-full')}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              className={`
                lg:hidden p-2 -mr-1 rounded-full transition-colors
                ${isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                {mainNavLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-base font-medium rounded-xl transition-colors text-gray-600 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={siteHref(link.href)}
                      className={`
                        px-4 py-3 text-base font-medium rounded-xl transition-colors
                        ${isActiveLink(link.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActiveLink(link.href) ? 'page' : undefined}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                <hr className="my-2 border-gray-100" />

                <button
                  type="button"
                  data-demo-action="phone"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  <PhoneIcon className="h-5 w-5" />
                  {phoneDisplay}
                </button>

                <div className="mt-2 space-y-2">
                  {ctaNavLinks.map((link) => {
                    const variant = getMobileCTAVariant(link);
                    return link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants(variant, 'md', 'w-full rounded-xl')}
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={siteHref(link.href)}
                        className={buttonVariants(variant, 'md', 'w-full rounded-xl')}
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {!hasHeroImage && <div className="h-20 lg:h-24" />}
    </>
  );
}
