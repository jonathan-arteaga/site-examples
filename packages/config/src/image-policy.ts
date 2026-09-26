export const IMAGE_POLICY = {
  photo: {
    maxLongEdge: 1920,
    quality: 75,
    maxBytes: 1400 * 1024,
  },
  floorPlan: {
    maxLongEdge: 1400,
    maxBytes: 2200 * 1024,
  },
  og: {
    path: '/images/og-image.jpg',
    width: 1200,
    height: 630,
    quality: 75,
    maxBytes: 250 * 1024,
  },
  unreferenced: {
    maxBytes: 300 * 1024,
  },
  nextImage: {
    formats: ['image/avif', 'image/webp'] as const,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920] as const,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384] as const,
    minimumCacheTTL: 2592000,
  },
} as const;

export type ImagePolicy = typeof IMAGE_POLICY;
