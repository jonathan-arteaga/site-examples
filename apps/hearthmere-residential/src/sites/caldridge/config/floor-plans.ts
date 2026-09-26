import { FloorPlan } from '@hearthmere/config';
import { withBasePath } from './site';

export const floorPlans: FloorPlan[] = ([
  {
    id: '1br-1ba',
    name: '1 Bedroom / 1 Bath Concept',
    bedrooms: 1,
    bathrooms: 1,
    sqft: { min: 745, max: 850 },
    price: { min: 1325, max: 1495 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept'],
    images: {
      floorPlan: '/images/floor-plans/1br-1ba.jpg',
      photos: [
        '/images/interior/unit-1br-1ba.jpg',
        '/images/interior/unit-1br-1ba-2.jpg',
        '/images/interior/interior-2.jpg',
      ],
    },
  },
  {
    id: '2br-1ba',
    name: '2 Bedroom / 1 Bath Concept',
    bedrooms: 2,
    bathrooms: 1,
    sqft: { min: 940, max: 1075 },
    price: { min: 1510, max: 1740 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept'],
    images: {
      floorPlan: '/images/floor-plans/2br-1ba.jpg',
      photos: [
        '/images/interior/interior-1.jpg',
        '/images/interior/interior-3.jpg',
        '/images/interior/interior-6.jpg',
      ],
    },
  },
  {
    id: '2br-1.5ba',
    name: '2 Bedroom / 1.5 Bath Concept',
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: { min: 1050, max: 1190 },
    price: { min: 1695, max: 1930 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept', 'Half-bath concept'],
    images: {
      floorPlan: '/images/floor-plans/2br-1.5ba-townhome.jpg',
      photos: [
        '/images/interior/unit-2br-1.5ba.jpg',
        '/images/interior/interior-8.jpg',
        '/images/interior/interior-4.jpg',
      ],
    },
  },
  {
    id: '3br-2.5ba',
    name: '3 Bedroom / 2.5 Bath Concept',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: { min: 1275, max: 1480 },
    price: { min: 1985, max: 2240 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept', 'Storage concept'],
    images: {
      floorPlan: '/images/floor-plans/3br-2.5ba-townhome.jpg',
      photos: [
        '/images/interior/interior-5.jpg',
        '/images/interior/interior-7.jpg',
        '/images/interior/interior-9.jpg',
      ],
    },
  },
  {
    id: '3br-3ba',
    name: '3 Bedroom / 3 Bath Townhome Concept',
    bedrooms: 3,
    bathrooms: 3,
    sqft: { min: 1510, max: 1685 },
    price: { min: 2210, max: 2395 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept', 'Storage concept', 'Multiple-bath concept'],
    images: {
      floorPlan: '/images/floor-plans/3br-3ba-townhome.jpg',
      photos: [
        '/images/interior/interior-5.jpg',
        '/images/interior/interior-7.jpg',
        '/images/interior/interior-9.jpg',
      ],
    },
  },
  {
    id: '4br-3ba',
    name: '4 Bedroom / 3 Bath Concept',
    bedrooms: 4,
    bathrooms: 3,
    sqft: { min: 1695, max: 1895 },
    price: { min: 2380, max: 2580 },
    available: false,
    availableDate: 'Demo only',
    features: ['Climate-control concept', 'Fireplace concept', 'Laundry-connection concept', 'Electric-range concept', 'Storage concept', 'Multiple-bath concept'],
    images: {
      floorPlan: '/images/floor-plans/4br-3ba-townhome.jpg',
      photos: [
        '/images/interior/interior-10.jpg',
        '/images/interior/interior-11.jpg',
        '/images/interior/interior-12.jpg',
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
