import type { FooterNavSection } from './types/property';

export interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
  external?: boolean;
  portal?: boolean;
}

/**
 * Pages that have hero images and should use transparent header styling.
 */
export const PAGES_WITH_HERO: readonly string[] = ['/', '/amenities'];

export const mainNavLinks: NavLink[] = [
  { label: 'Floor Plans', href: '/floor-plans' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Amenities', href: '/amenities' },
];

export const ctaNavLinks: NavLink[] = [
  { label: 'Portal Demo', href: '/resident-portal', portal: true },
  { label: 'Tour Demo', href: '/schedule-tour', highlight: true },
  { label: 'Demo Listings', href: '/listings' },
];

export const footerNavSections: FooterNavSection[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Floor Plans', href: '/floor-plans' },
      { label: 'Amenities', href: '/amenities' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Neighborhood', href: '/neighborhood' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Demo Listings', href: '/listings' },
      { label: 'Tour Demo', href: '/schedule-tour' },
      { label: 'Contact Demo', href: '/contact' },
      { label: 'Portal Demo', href: '/resident-portal' },
    ],
  },
];
