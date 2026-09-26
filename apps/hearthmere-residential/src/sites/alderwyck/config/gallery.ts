import { GalleryImage, GalleryCategory } from '@hearthmere/config';
import blurManifest from './gallery-blur-manifest.json';
import { withBasePath } from './site';

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'All Photos' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'interiors', name: 'Interiors' },
  { id: 'amenities', name: 'Amenities' },
];

export const galleryImages: GalleryImage[] = [
  // Exterior
  {
    id: 'ext-1',
    src: '/images/exterior/exterior-pool.jpg',
    alt: 'Sand-toned Alderwyck courtyard beside the demonstration pool',
    category: 'exterior',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'ext-2',
    src: '/images/exterior/exterior-building.jpg',
    alt: 'Bright Alderwyck facade framed by newly planted greenery',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-3',
    src: '/images/exterior/exterior-entrance.jpg',
    alt: 'Covered Alderwyck arrival walk with a fictional entry marker',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-4',
    src: '/images/exterior/exterior-building2.jpg',
    alt: 'Garden-facing Alderwyck wing in warm afternoon light',
    category: 'exterior',
    width: 1200,
    height: 900,
    featured: true,
  },
  // Interiors
  {
    id: 'int-kitchen-1',
    src: '/images/interior/kitchen.jpg',
    alt: 'Illustrative Alderwyck kitchen with light cabinetry and green accents',
    category: 'interiors',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'int-bedroom-1',
    src: '/images/interior/bedroom.jpg',
    alt: 'Synthetic Alderwyck bedroom staged in soft neutral colors',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-bath-1',
    src: '/images/interior/bathroom.jpg',
    alt: 'Fictional Alderwyck bath with pale tile and a simple vanity',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  // Amenities
  {
    id: 'amen-pool-1',
    src: '/images/amenities/pool-1.jpg',
    alt: 'Generated Alderwyck courtyard pool surrounded by garden planting',
    category: 'amenities',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'amen-pool-2',
    src: '/images/amenities/pool-2.jpg',
    alt: 'Illustrative Alderwyck pool terrace with shaded lounge chairs',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
  {
    id: 'amen-office-1',
    src: '/images/amenities/leasing-office.jpg',
    alt: 'Fictional Alderwyck welcome room with a small consultation desk',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
];

const blurMap = blurManifest as Record<string, string>;
const galleryImagesWithBlur: GalleryImage[] = galleryImages.map((img) => {
  const blurDataURL = blurMap[img.src];
  return {
    ...img,
    src: withBasePath(img.src),
    ...(blurDataURL ? { blurDataURL } : {}),
  };
});

export const getFeaturedImages = (): GalleryImage[] =>
  galleryImagesWithBlur.filter((img) => img.featured);

export const getImagesByCategory = (categoryId: string): GalleryImage[] =>
  categoryId === 'all'
    ? galleryImagesWithBlur
    : galleryImagesWithBlur.filter((img) => img.category === categoryId);
