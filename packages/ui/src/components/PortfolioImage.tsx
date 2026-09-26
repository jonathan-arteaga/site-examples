import NextImage, { type ImageProps } from 'next/image';
const prefix = '/examples/property-management';
export function PortfolioImage({ src, ...props }: ImageProps) {
  const mounted = typeof src === 'string' && src.startsWith('/') && !src.startsWith(`${prefix}/`)
    ? `${prefix}${src}` : src;
  return <NextImage {...props} src={mounted} unoptimized={props.unoptimized || (typeof mounted === 'string' && mounted.endsWith('.svg'))} />;
}
