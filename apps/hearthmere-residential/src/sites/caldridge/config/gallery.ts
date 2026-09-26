import { GalleryImage, GalleryCategory } from '@hearthmere/config';
import blurManifest from './gallery-blur-manifest.json';
import { withBasePath } from './site';

// Caldridge Townhomes synthetic showcase gallery configuration
export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'All Photos' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'interiors', name: 'Interiors' },
  { id: 'amenities', name: 'Amenities' },
];

export const galleryImages: GalleryImage[] = [
  // Synthetic amenity and exterior scenes
  {
    id: 'amen-pool-1',
    src: '/images/amenities/pool-1.jpg',
    alt: 'Synthetic showcase image of a pool beside fictional brick townhomes',
    category: 'amenities',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'ext-2',
    src: '/images/exterior/exterior-building.jpg',
    alt: 'Synthetic showcase image of a landscaped brick-townhome courtyard',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-3',
    src: '/images/exterior/exterior-entrance.jpg',
    alt: 'Synthetic showcase image of a landscaped townhome entrance walk',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  // Synthetic primary exterior scenes
  {
    id: 'ext-primary-1',
    src: '/images/exterior/primary-1.jpg',
    alt: 'Synthetic showcase image of fictional brick townhome fronts',
    category: 'exterior',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'ext-primary-2',
    src: '/images/exterior/primary-2.jpg',
    alt: 'Synthetic showcase image of a tree-lined fictional community entrance',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  // Synthetic building scenes
  {
    id: 'ext-building-1',
    src: '/images/exterior/building-1.jpg',
    alt: 'Synthetic showcase image of a fictional brick townhome exterior',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-building-2',
    src: '/images/exterior/building-2.jpg',
    alt: 'Synthetic showcase image of a connected fictional townhome building',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-building-3',
    src: '/images/exterior/building-3.jpg',
    alt: 'Synthetic showcase image of fictional townhomes beneath mature trees',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-grass',
    src: '/images/exterior/exterior-grass.jpg',
    alt: 'Synthetic showcase image of lawns and landscaping beside brick townhomes',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  // Interiors
  {
    id: 'int-2',
    src: '/images/interior/interior-2.jpg',
    alt: 'Synthetic showcase image of a staged living room with a brick fireplace',
    category: 'interiors',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'int-6',
    src: '/images/interior/interior-6.jpg',
    alt: 'Synthetic showcase image of a staged living room, staircase, and fireplace',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-8',
    src: '/images/interior/interior-8.jpg',
    alt: 'Synthetic showcase image of a patio opening into a staged townhome living space',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  // Synthetic interior scenes
  {
    id: 'int-new-1',
    src: '/images/interior/interior-1.jpg',
    alt: 'Synthetic showcase image of a staged fictional townhome interior',
    category: 'interiors',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'int-new-2',
    src: '/images/interior/interior-3.jpg',
    alt: 'Synthetic showcase image of an open kitchen and dining area',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-3',
    src: '/images/interior/interior-4.jpg',
    alt: 'Synthetic showcase image of a compact galley kitchen',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-4',
    src: '/images/interior/interior-5.jpg',
    alt: 'Synthetic showcase image of warm wood cabinetry and a kitchen range',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-5',
    src: '/images/interior/interior-7.jpg',
    alt: 'Synthetic showcase image of a softly lit staged bedroom',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-6',
    src: '/images/interior/interior-9.jpg',
    alt: 'Synthetic showcase image of shaded brick townhome fronts',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-7',
    src: '/images/interior/interior-10.jpg',
    alt: 'Synthetic showcase image of a staged dining area beside a kitchen',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-8',
    src: '/images/interior/interior-11.jpg',
    alt: 'Synthetic showcase image of a staged living room facing a leafy patio',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-9',
    src: '/images/interior/interior-12.jpg',
    alt: 'Synthetic showcase image through an open townhome entry',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-10',
    src: '/images/interior/interior-13.jpg',
    alt: 'Synthetic showcase image of an organized walk-in closet',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-11',
    src: '/images/interior/interior-14.jpg',
    alt: 'Synthetic showcase image of a laundry closet beside a landscaped facade',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-12',
    src: '/images/interior/interior-15.jpg',
    alt: 'Synthetic showcase image of an upstairs work nook',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-13',
    src: '/images/interior/interior-16.jpg',
    alt: 'Synthetic showcase image of a utility and storage closet',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-new-14',
    src: '/images/interior/interior-17.jpg',
    alt: 'Synthetic showcase image of a staged living room opening to a patio',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  // Synthetic floor-plan lifestyle scenes
  {
    id: 'int-1br-1',
    src: '/images/interior/unit-1br-1ba.jpg',
    alt: 'Synthetic showcase image for the one-bedroom layout concept',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-1br-2',
    src: '/images/interior/unit-1br-1ba-2.jpg',
    alt: 'Synthetic showcase image of the one-bedroom kitchen and entry concept',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-2br-1',
    src: '/images/interior/unit-2br-1.5ba.jpg',
    alt: 'Synthetic showcase image for the two-bedroom townhome layout concept',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  // Amenities
  {
    id: 'amen-leasing',
    src: '/images/amenities/leasing-center.jpg',
    alt: 'Synthetic showcase image of a fictional community welcome lounge',
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
