export type SitemapChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export type SitemapRoute = {
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
};

export const PROPERTY_SITEMAP_ROUTES: readonly SitemapRoute[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/floor-plans', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/schedule-tour', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/amenities', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/neighborhood', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/listings', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/resident-portal', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/applicants', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/accessibility', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
];
