import { IMAGE_POLICY } from './image-policy';

export interface SharedNextImageConfig {
  formats: Array<'image/avif' | 'image/webp'>;
  deviceSizes: number[];
  imageSizes: number[];
  minimumCacheTTL: number;
}

export function createNextImageConfig(): SharedNextImageConfig {
  return {
    formats: [...IMAGE_POLICY.nextImage.formats],
    deviceSizes: [640, 960, 1440, 1920],
    imageSizes: [32, 64, 128, 256],
    minimumCacheTTL: IMAGE_POLICY.nextImage.minimumCacheTTL,
  };
}
