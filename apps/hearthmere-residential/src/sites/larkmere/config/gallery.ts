import { GalleryImage, GalleryCategory } from '@hearthmere/config';
import blurManifest from './gallery-blur-manifest.json';
import { withBasePath } from './site';

export const galleryCategories: GalleryCategory[] = [
  { id: 'all', name: 'All Demo Images' },
  { id: 'exterior', name: 'Exterior Concepts' },
  { id: 'interiors', name: 'Interior Concepts' },
  { id: 'amenities', name: 'Amenity Concepts' },
];

export const galleryImages: GalleryImage[] = [
  // Exterior
  {
    id: 'ext-1',
    src: '/images/exterior/building-front.jpg',
    alt: 'Synthetic pale-brick apartment frontage beside a landscaped parking court',
    category: 'exterior',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'ext-2',
    src: '/images/exterior/exterior-building.jpg',
    alt: 'Fictional three-story garden apartment exterior framed by mature trees',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-4',
    src: '/images/exterior/buildings-parking.jpg',
    alt: 'Rendered garden apartment buildings beside an open parking lane',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-5',
    src: '/images/exterior/entrance-walkway.jpg',
    alt: 'Rendered covered entry walk leading to a fictional apartment building',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-7',
    src: '/images/exterior/entry-sign.jpg',
    alt: 'Fictional brick entry marker set within ornamental landscaping',
    category: 'exterior',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'ext-8',
    src: '/images/exterior/garages-carport.jpg',
    alt: 'Synthetic garage row and covered parking structure',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-9',
    src: '/images/exterior/carport-wide.jpg',
    alt: 'Wide rendered view of covered parking beside detached garages',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  {
    id: 'ext-10',
    src: '/images/exterior/building-picnic-area.jpg',
    alt: 'Fictional garden apartment courtyard with a shaded picnic table',
    category: 'exterior',
    width: 1200,
    height: 900,
  },
  // Interiors
  {
    id: 'int-living-1',
    src: '/images/interior/living-room.jpg',
    alt: 'Synthetic furnished living room in warm neutral tones',
    category: 'interiors',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'int-kitchen-1',
    src: '/images/interior/kitchen.jpg',
    alt: 'Rendered apartment kitchen with a breakfast counter and dark cabinetry',
    category: 'interiors',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'int-kitchen-2',
    src: '/images/interior/kitchen-2.jpg',
    alt: 'Synthetic galley kitchen concept with stainless-look appliances',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-bedroom-1',
    src: '/images/interior/bedroom.jpg',
    alt: 'Rendered primary bedroom concept with simple neutral furnishings',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-bedroom-2',
    src: '/images/interior/bedroom-2.jpg',
    alt: 'Synthetic secondary bedroom with soft blue accents',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-kids-room',
    src: '/images/interior/kids-room.jpg',
    alt: 'Synthetic bedroom concept with twin bunks and colorful accents',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-bath-1',
    src: '/images/interior/bathroom.jpg',
    alt: 'Rendered bathroom concept with a light vanity and tub surround',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-living-2',
    src: '/images/interior/living-room-2.jpg',
    alt: 'Synthetic living area opening toward a compact kitchen',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-living-3',
    src: '/images/interior/living-kitchen-open.jpg',
    alt: 'Rendered open-plan kitchen and lounge in a fictional apartment',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  {
    id: 'int-wd-hookup',
    src: '/images/interior/washer-dryer-hookup.jpg',
    alt: 'Synthetic laundry connection alcove with utility hookups',
    category: 'interiors',
    width: 1200,
    height: 900,
  },
  // Amenities
  {
    id: 'amen-playground-1',
    src: '/images/amenities/playground.jpg',
    alt: 'Rendered play space with bright equipment and garden seating',
    category: 'amenities',
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: 'amen-playground-2',
    src: '/images/amenities/playground-2.jpg',
    alt: 'Synthetic neighborhood play area bordered by trees',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
  {
    id: 'amen-playground-3',
    src: '/images/amenities/playground-wide.jpg',
    alt: 'Wide fictional playground view with apartment buildings in the distance',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
  {
    id: 'amen-laundry-1',
    src: '/images/amenities/laundry-room.jpg',
    alt: 'Rendered shared laundry concept with front-loading machines',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
  {
    id: 'amen-laundry-2',
    src: '/images/amenities/laundry-machines.jpg',
    alt: 'Synthetic row of laundry machines in a bright utility room',
    category: 'amenities',
    width: 1200,
    height: 900,
  },
  {
    id: 'amen-office-1',
    src: '/images/amenities/leasing-office.jpg',
    alt: 'Rendered welcome-room concept with a desk and conversational seating',
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
