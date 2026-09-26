import { FloorPlan } from '@hearthmere/config';
import { withBasePath } from './site';

export const floorPlans: FloorPlan[] = ([
  {
    id: '1br',
    name: '1 Bedroom',
    bedrooms: 1,
    bathrooms: 1,
    sqft: { min: 625, max: 710 },
    price: { min: 995, max: 1125 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Generous Closets', 'Connectivity Ready'],
    images: {
      floorPlan: '/images/floor-plans/1br-1ba.jpg',
      photos: [
        '/images/interior/living-room.jpg',
        '/images/interior/kitchen.jpg',
        '/images/interior/bedroom.jpg',
        '/images/interior/bathroom.jpg',
      ],
    },
  },
  {
    id: '2br',
    name: '2 Bedroom',
    bedrooms: 2,
    bathrooms: 1,
    sqft: { min: 735, max: 820 },
    price: { min: 1140, max: 1295 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Generous Closets', 'Connectivity Ready', 'Extra Storage'],
    images: {
      floorPlan: '/images/floor-plans/2br-1ba.jpg',
      photos: [
        '/images/interior/living-room.jpg',
        '/images/interior/kitchen.jpg',
        '/images/interior/bedroom.jpg',
        '/images/interior/bedroom-2.jpg',
        '/images/interior/bathroom.jpg',
      ],
    },
  },
  {
    id: '2br-xl',
    name: '2 Bedroom XL',
    bedrooms: 2,
    bathrooms: 1,
    sqft: { min: 850, max: 930 },
    price: { min: 1285, max: 1410 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Generous Closets', 'Connectivity Ready', 'Extra Storage', 'Laundry Connections'],
    images: {
      floorPlan: '/images/floor-plans/2br-xl-1ba.jpg',
      photos: [
        '/images/interior/living-kitchen-open.jpg',
        '/images/interior/kitchen-2.jpg',
        '/images/interior/bedroom.jpg',
        '/images/interior/bedroom-2.jpg',
        '/images/interior/bathroom.jpg',
        '/images/interior/washer-dryer-hookup.jpg',
      ],
    },
  },
  {
    id: '3br',
    name: '3 Bedroom',
    bedrooms: 3,
    bathrooms: 1,
    sqft: { min: 920, max: 985 },
    price: { min: 1395, max: 1530 },
    available: false,
    availableDate: 'Demo only',
    features: ['Central Climate Control', 'Generous Closets', 'Connectivity Ready', 'Extra Storage', 'Laundry Connections'],
    images: {
      floorPlan: '/images/floor-plans/3br-1ba.jpg',
      photos: [
        '/images/interior/living-kitchen-open.jpg',
        '/images/interior/kitchen-2.jpg',
        '/images/interior/bedroom.jpg',
        '/images/interior/bedroom-2.jpg',
        '/images/interior/kids-room.jpg',
        '/images/interior/bathroom.jpg',
        '/images/interior/washer-dryer-hookup.jpg',
      ],
    },
  },
] satisfies FloorPlan[]).map((plan) => ({
  ...plan,
  images: {
    floorPlan: plan.images.floorPlan
      ? withBasePath(plan.images.floorPlan)
      : undefined,
    photos: plan.images.photos.map(withBasePath),
  },
}));

export const getPriceRange = (): { min: number; max: number } => ({
  min: Math.min(...floorPlans.map((fp) => fp.price.min)),
  max: Math.max(...floorPlans.map((fp) => fp.price.max)),
});

export const getBedroomOptions = (): number[] => {
  const bedrooms = [...new Set(floorPlans.map((fp) => fp.bedrooms))];
  return bedrooms.sort((a, b) => a - b);
};
