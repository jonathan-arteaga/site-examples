export const SHOWCASE_PROJECT = {
  appName: 'hearthmere-residential',
  localOrigin: 'http://127.0.0.1:3000',
  productionOrigin: 'https://hearthmere-residential.vercel.app',
} as const;

export const SHOWCASE_SITES = {
  hearthmere: {
    basePath: '',
  },
  alderwyck: {
    basePath: '/alderwyck',
  },
  norvale: {
    basePath: '/norvale',
  },
  larkmere: {
    basePath: '/larkmere',
  },
  caldridge: {
    basePath: '/caldridge',
  },
} as const;

export type ShowcaseSiteKey = keyof typeof SHOWCASE_SITES;

export const COMMUNITY_SHOWCASE_SITE_KEYS = [
  'alderwyck',
  'norvale',
  'larkmere',
  'caldridge',
] as const satisfies readonly ShowcaseSiteKey[];

export function withSiteBasePath(basePath: string, path: string): string {
  if (
    !basePath ||
    !path.startsWith('/') ||
    path.startsWith('//') ||
    path === basePath ||
    path.startsWith(`${basePath}/`)
  ) {
    return path;
  }

  return `${basePath}${path}`;
}

export function withSiteBaseUrl(origin: string, basePath: string): string {
  return `${origin.replace(/\/+$/, '')}${basePath}`;
}
