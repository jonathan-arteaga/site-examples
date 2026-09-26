import NextLink from 'next/link';
import type { ComponentProps } from 'react';

// A gallery visit should load the chosen page, not prefetch every demo route.
export function PortfolioLink({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} prefetch={prefetch} />;
}
