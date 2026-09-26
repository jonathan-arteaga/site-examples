export const companyConfig = {
  name: 'Hearthmere Residential',
  shortName: 'Hearthmere',
  tagline: 'Thoughtful Apartment Living Across Four Communities',
  description:
    'Hearthmere Residential is a fictional showcase spanning four sample apartment communities and their coordinated digital experiences.',

  address: {
    street: '100 Portfolio Way, Suite 400',
    city: 'Example City',
    state: 'TX',
    zip: '00000',
    full: '100 Portfolio Way, Suite 400, Example City, TX 00000',
  },

  contact: {
    phone: '+12145550100',
    phoneDisplay: '(214) 555-0100',
    email: 'hello@hearthmere.example',
  },

  stats: {
    yearsInBusiness: '12',
    totalUnits: '544',
    propertiesManaged: 4,
  },

  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
};

export type CompanyConfig = typeof companyConfig;
