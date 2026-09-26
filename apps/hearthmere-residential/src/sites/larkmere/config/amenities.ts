import { AmenityCategory, Amenity } from '@hearthmere/config';

export const amenityCategories: AmenityCategory[] = [
  {
    id: 'community',
    name: 'Shared-Space Concepts',
    amenities: [
      {
        id: 'laundry',
        name: 'Shared Laundry Concept',
        icon: 'washer',
        description: 'Illustrative machines arranged in a portfolio utility-room scene',
      },
      {
        id: 'parking',
        name: 'Open and Covered Parking',
        icon: 'car',
        description: 'Rendered parking configurations shown only as visual examples',
      },
      {
        id: 'playground',
        name: 'Garden Play-Space Concept',
        icon: 'tree',
        description: 'A fictional outdoor scene designed to demonstrate amenity cards',
      },
      {
        id: 'grill-areas',
        name: 'Courtyard Gathering Concept',
        icon: 'flame',
        description: 'Illustrative picnic seating and outdoor gathering details',
      },
      {
        id: 'basketball',
        name: 'Recreation-Court Concept',
        icon: 'sparkles',
        description: 'A sample recreation feature used to populate this fictional page',
      },
      {
        id: 'office',
        name: 'Welcome-Room Concept',
        icon: 'building',
        description: 'Rendered reception seating with no real leasing operation behind it',
      },
      {
        id: 'maintenance',
        name: 'Service-Request Placeholder',
        icon: 'wrench',
        description: 'A decorative example of how service information could be presented',
      },
      {
        id: 'pet-friendly',
        name: 'Garden Path Concept',
        icon: 'paw',
        description: 'An illustrative outdoor detail, not a statement of real pet policy',
      },
    ],
  },
  {
    id: 'apartment',
    name: 'Interior Feature Concepts',
    amenities: [
      {
        id: 'stove',
        name: 'Range and Oven Concept',
        icon: 'flame',
        description: 'Illustrative cooking equipment shown in synthetic kitchen imagery',
      },
      {
        id: 'refrigerator',
        name: 'Refrigerator Concept',
        icon: 'refrigerator',
        description: 'A staged appliance included only to complete the room rendering',
      },
      {
        id: 'dishwasher',
        name: 'Dishwasher Concept',
        icon: 'dishwasher',
        description: 'A fictional built-in appliance used as a visual layout detail',
      },
      {
        id: 'disposal',
        name: 'Sink Fixture Concept',
        icon: 'disposal',
        description: 'A sample fixture label included to demonstrate feature-card density',
      },
      {
        id: 'dining',
        name: 'Dining-Nook Concept',
        icon: 'dining',
        description: 'Illustrative seating zones shown in the staged interior scenes',
      },
      {
        id: 'ac-heat',
        name: 'Climate-Control Placeholder',
        icon: 'thermometer',
        description: 'A sample systems label with no equipment or comfort guarantee',
      },
      {
        id: 'wd-hookups',
        name: 'Laundry-Alcove Concept',
        icon: 'washer',
        description: 'Synthetic utility connections shown in one portfolio interior',
      },
      {
        id: 'utilities',
        name: 'Utility-Card Placeholder',
        icon: 'bolt',
        description: 'Decorative copy included only to demonstrate the amenity-card layout',
      },
    ],
  },
];

// Flatten for simple listing
export const allAmenities: Amenity[] = amenityCategories.flatMap(
  (cat) => cat.amenities
);

// Get featured amenities for home page
export const featuredAmenities: Amenity[] = [
  allAmenities.find((a) => a.id === 'laundry')!,
  allAmenities.find((a) => a.id === 'parking')!,
  allAmenities.find((a) => a.id === 'ac-heat')!,
  allAmenities.find((a) => a.id === 'pet-friendly')!,
  allAmenities.find((a) => a.id === 'utilities')!,
  allAmenities.find((a) => a.id === 'playground')!,
];
