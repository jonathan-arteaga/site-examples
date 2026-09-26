import {
  SHOWCASE_SITES,
  withSiteBasePath,
  withSiteBaseUrl,
} from '@hearthmere/config';

export const siteBasePath = SHOWCASE_SITES.larkmere.basePath;
export const fallbackSiteUrl = 'https://hearthmere.example/larkmere';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? withSiteBaseUrl(process.env.NEXT_PUBLIC_SITE_URL, siteBasePath)
  : fallbackSiteUrl;

export function withBasePath(path: string): string {
  return withSiteBasePath(siteBasePath, path);
}
