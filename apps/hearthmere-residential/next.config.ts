import type { NextConfig } from 'next';
import { createNextImageConfig } from '@hearthmere/config';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/examples/property-management',
  trailingSlash: true,
  images: {
    ...createNextImageConfig(),
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
};
export default nextConfig;
