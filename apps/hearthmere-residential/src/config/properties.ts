import { SHOWCASE_SITES } from '@hearthmere/config';

export interface Property {
  id: string;
  name: string;
  path: string;
  image: string;
  city?: string;
  unitCount?: number;
  priceRange?: string;
}

export const properties: Property[] = [
  {
    id: 'alderwyck-apartments',
    name: 'Alderwyck Apartments',
    path: `/examples/property-management${SHOWCASE_SITES.alderwyck.basePath}/`,
    image: '/images/properties/alderwyck-apartments.jpg',
    city: 'Example City, TX',
    unitCount: 148,
    priceRange: '$1,245–$1,495',
  },
  {
    id: 'caldridge-townhomes',
    name: 'Caldridge Townhomes',
    path: `/examples/property-management${SHOWCASE_SITES.caldridge.basePath}/`,
    image: '/images/properties/caldridge-townhomes.jpg',
    city: 'Example Heights, TN',
    unitCount: 156,
    priceRange: '$1,325–$2,580',
  },
  {
    id: 'norvale-commons',
    name: 'Norvale Commons',
    path: `/examples/property-management${SHOWCASE_SITES.norvale.basePath}/`,
    image: '/images/properties/norvale-commons.jpg',
    city: 'Sample City, TN',
    unitCount: 112,
    priceRange: '$1,045–$1,840',
  },
  {
    id: 'larkmere-gardens',
    name: 'Larkmere Gardens',
    path: `/examples/property-management${SHOWCASE_SITES.larkmere.basePath}/`,
    image: '/images/properties/larkmere-gardens.jpg',
    city: 'Demo City, KS',
    unitCount: 128,
    priceRange: '$995–$1,530',
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertyOptions() {
  return properties.map((p) => ({
    value: p.id,
    label: p.name,
  }));
}
