import { PropertyConfig } from '@hearthmere/config';

export const propertyConfig: PropertyConfig = {
  id: 'larkmere-gardens',
  name: 'Larkmere Gardens',
  tagline: 'A Fictional Garden-Community Interface',

  address: {
    street: '3640 Garden Terrace',
    city: 'Demo City',
    state: 'KS',
    zip: '00000',
    formatted: '3640 Garden Terrace, Demo City, KS 00000',
  },

  contact: {
    phone: '+17855550133',
    phoneDisplay: '(785) 555-0133',
    email: 'larkmere-gardens@hearthmere.example',
    officeHours: [
      { days: 'Monday - Friday', hours: '9:00 AM - 5:30 PM' },
    ],
  },

  social: {
    // Update with actual social links when available
  },

  residentPortalPath: '/resident-portal',

  coordinates: null,

  features: {
    petFriendly: true,
    parking: 'Open parking with optional covered spaces',
    unitCount: 128,
    yearBuilt: 2004,
  },
};
