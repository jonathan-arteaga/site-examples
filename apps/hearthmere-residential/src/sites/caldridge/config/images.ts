/**
 * Fictional showcase image references
 */
import { withBasePath } from './site';

export const placeholderImages = {
  // Social media / OG image (1200x630)
  ogImage: withBasePath('/images/og-image.jpg'),

  // Hero images
  amenitiesHero: withBasePath('/images/amenities/leasing-center.jpg'),
} as const;
