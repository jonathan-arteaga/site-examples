export interface NavLink {
  href: string;
  label: string;
}

export const mainNavLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const footerNavLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const legalLinks: NavLink[] = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
];
