export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import {
  COMMUNITY_SHOWCASE_SITE_KEYS,
  SHOWCASE_SITES,
} from '@hearthmere/config';

const portfolioRoutes = [
  '',
  '/properties',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
] as const;

const communityRoutes = [
  '',
  '/accessibility',
  '/amenities',
  '/applicants',
  '/contact',
  '/floor-plans',
  '/gallery',
  '/listings',
  '/neighborhood',
  '/privacy-policy',
  '/resident-portal',
  '/schedule-tour',
  '/terms-of-service',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://hearthmere.example'
  ).replace(/\/+$/, '');

  return [
    ...portfolioRoutes.map((route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: index === 0 ? 1 : 0.7,
    })),
    ...COMMUNITY_SHOWCASE_SITE_KEYS.flatMap((siteKey) =>
      communityRoutes.map((route, index) => ({
        url: `${baseUrl}${SHOWCASE_SITES[siteKey].basePath}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: index === 0 ? 0.9 : 0.6,
      }))
    ),
  ];
}
