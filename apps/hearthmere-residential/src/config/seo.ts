import { companyConfig } from './company';

export const seoConfig = {
  defaultTitle: `${companyConfig.name} | Fictional Property Portfolio`,
  titleTemplate: `%s | ${companyConfig.shortName}`,
  description: companyConfig.description,
  keywords: [
    'property management',
    'fictional apartment portfolio',
    'property management showcase',
    'apartment communities',
    'apartment rentals',
    'sample apartment websites',
    'public portfolio showcase',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: companyConfig.name,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export const pageSeo = {
  home: {
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
  },
  properties: {
    title: 'Our Properties',
    description: `Browse four fictional apartment communities in the public ${companyConfig.name} portfolio showcase.`,
  },
  about: {
    title: 'About Us',
    description: `Learn about the fictional ${companyConfig.name} portfolio and its resident-focused management approach.`,
  },
  contact: {
    title: 'Contact Us',
    description: `Try the browser-only contact experience for the fictional ${companyConfig.name} portfolio.`,
  },
};
