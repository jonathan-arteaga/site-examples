import { PropertyConfig } from '@hearthmere/config';

export const propertyConfig: PropertyConfig = {
  id: 'caldridge-townhomes',
  name: 'Caldridge Townhomes',
  tagline: 'Townhome Space with Foundry Row Character',

  address: {
    street: '4812 Foundry Row',
    city: 'Example Heights',
    state: 'TN',
    zip: '00000',
    formatted: '4812 Foundry Row, Example Heights, TN 00000',
  },

  contact: {
    phone: '+14235550144',
    phoneDisplay: '(423) 555-0144',
    email: 'caldridge-townhomes@hearthmere.example',
    officeHours: [
      { days: 'Illustrative hours', hours: 'Monday-Friday, 10:00 AM-6:00 PM' },
    ],
    tourHours: 'Illustrative only: 10:30 AM-5:00 PM',
    phonePlaceholder: '(423) 555-0144',
    formDisclosure: 'Demo only. Use fictional details; nothing is submitted, stored, or sent to a leasing team.',
  },

  includePhotoVariationDisclaimer: true,

  social: {
    // Update with actual social links when available
  },

  residentPortalPath: '/resident-portal',

  coordinates: null,

  features: {
    petFriendly: true,
    parking: 'Illustrative resident and guest parking concept',
    unitCount: 156,
    yearBuilt: 2016,
  },
};
