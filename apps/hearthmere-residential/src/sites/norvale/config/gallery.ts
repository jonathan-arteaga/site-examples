import { GalleryImage, GalleryCategory } from '@hearthmere/config';
import blurManifest from './gallery-blur-manifest.json';
import { withBasePath } from './site';

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'View All' },
  { id: 'exterior', name: 'Buildings & Grounds' },
  { id: 'interiors', name: 'Inside the Homes' },
  { id: 'amenities', name: 'Shared Spaces' },
];

export const galleryImages: GalleryImage[] = [
  // Exterior
  {
    id: 'ext-hero',
    src: '/images/exterior/hero.jpg',
    alt: 'Tree-shaded warm-brick buildings along the fictional Norvale Commons drive',
    category: 'exterior',
    width: 1024,
    height: 695,
    featured: true,
  },
  {
    id: 'ext-aerial',
    src: '/images/exterior/aerial.jpg',
    alt: 'Elevated view of brick buildings and shared lawns at fictional Norvale Commons',
    category: 'exterior',
    width: 1024,
    height: 680,
  },
  {
    id: 'ext-entry-sign',
    src: '/images/exterior/entry-sign.jpg',
    alt: 'Blank brick monument and landscaping at the fictional community entrance',
    category: 'exterior',
    width: 1240,
    height: 826,
    featured: true,
  },
  {
    id: 'ext-building-landscaping',
    src: '/images/exterior/building-landscaping.jpg',
    alt: 'Hydrangeas and ornamental grasses framing a warm-brick apartment building',
    category: 'exterior',
    width: 1240,
    height: 826,
  },
  {
    id: 'ext-building-stairs',
    src: '/images/exterior/building-stairs.jpg',
    alt: 'Charcoal exterior stair and covered landing against a brick facade',
    category: 'exterior',
    width: 1240,
    height: 826,
  },
  {
    id: 'ext-grill-area',
    src: '/images/exterior/building-grill-area.jpg',
    alt: 'Shaded picnic table and two grills beside the apartment lawn',
    category: 'exterior',
    width: 1240,
    height: 826,
  },
  // Interiors
  {
    id: 'int-kitchen',
    src: '/images/interior/kitchen.jpg',
    alt: 'Oak-cabinet kitchen with charcoal counters and stainless appliances',
    category: 'interiors',
    width: 1240,
    height: 827,
    featured: true,
  },
  {
    id: 'int-dining-area',
    src: '/images/interior/dining-area.jpg',
    alt: 'Round dining table beside a charcoal-cabinet kitchen and brick accent',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-living-room-fireplace',
    src: '/images/interior/living-room-fireplace.jpg',
    alt: 'Neutral living room arranged around a charcoal fireplace',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-master-bedroom',
    src: '/images/interior/master-bedroom.jpg',
    alt: 'Primary bedroom with warm linen, oak dresser, and softly filtered light',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-master-bedroom-2',
    src: '/images/interior/master-bedroom-2.jpg',
    alt: 'Second primary-bedroom setting with clay bedding and a reading chair',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-kids-bedroom',
    src: '/images/interior/kids-bedroom.jpg',
    alt: 'Youth bedroom with a twin bed, bookcase, and muted rust accents',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-bedroom-closet',
    src: '/images/interior/bedroom-closet.jpg',
    alt: 'Organized walk-in closet with wire shelves and neutral clothing',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  {
    id: 'int-bathroom',
    src: '/images/interior/bathroom.jpg',
    alt: 'Compact bathroom with oak vanity, pale counter, and tub shower',
    category: 'interiors',
    width: 1240,
    height: 827,
  },
  // Amenities
  {
    id: 'amen-pool',
    src: '/images/amenities/pool.jpg',
    alt: 'Rectangular community pool with charcoal loungers and a modest pergola',
    category: 'amenities',
    width: 1024,
    height: 695,
    featured: true,
  },
  {
    id: 'amen-pet-park',
    src: '/images/amenities/pet-park.jpg',
    alt: 'Fenced pet lawn with agility hoops, shade canopy, and bench',
    category: 'amenities',
    width: 1024,
    height: 705,
  },
  {
    id: 'ext-community-building',
    src: '/images/exterior/community-building.jpg',
    alt: 'One-story brick gathering building with a covered accessible entrance',
    category: 'exterior',
    width: 1024,
    height: 680,
  },
  {
    id: 'amen-community-2',
    src: '/images/amenities/clubhouse-interior.jpg',
    alt: 'Club room with brick fireplace, warm wood tables, and neutral seating',
    category: 'amenities',
    width: 1024,
    height: 678,
  },
  {
    id: 'amen-clubhouse',
    src: '/images/amenities/clubhouse-lounge.jpg',
    alt: 'Spacious resident lounge with charcoal seating and brick columns',
    category: 'amenities',
    width: 1240,
    height: 827,
  },
  {
    id: 'amen-clubhouse-2',
    src: '/images/amenities/clubhouse-lounge-2.jpg',
    alt: 'Communal oak table and reading chairs beside tall lounge windows',
    category: 'amenities',
    width: 1240,
    height: 827,
  },
  {
    id: 'amen-laundry',
    src: '/images/amenities/laundry-room.jpg',
    alt: 'Bright shared laundry room with two orderly rows of machines',
    category: 'amenities',
    width: 1240,
    height: 827,
  },
  {
    id: 'amen-playground',
    src: '/images/amenities/playground.jpg',
    alt: 'Muted-rust play structure and bench beneath mature shade trees',
    category: 'amenities',
    width: 1240,
    height: 826,
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
