export function withPropertyBasePath(basePath: string, href: string): string {
  if (
    !basePath ||
    !href.startsWith('/') ||
    href === basePath ||
    href.startsWith(`${basePath}/`)
  ) {
    return href;
  }

  return href === '/' ? basePath : `${basePath}${href}`;
}
