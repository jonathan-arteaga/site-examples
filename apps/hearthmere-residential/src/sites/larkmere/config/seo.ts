import { propertyConfig } from './property';
import { siteUrl } from './site';

const baseUrl = siteUrl;

export const seoConfig = {
  defaultTitle: `${propertyConfig.name} | Fictional Portfolio Demonstration`,
  defaultDescription: `Explore ${propertyConfig.name}, a fictional property-management interface built from synthetic imagery and sample data. Nothing on this site represents a real property or offer.`,
  keywords: [
    'property website demo',
    'fictional portfolio',
    'synthetic property imagery',
    'interface design showcase',
    'sample floor plan cards',
    'illustrative amenity cards',
    'fictional neighborhood data',
    propertyConfig.name.toLowerCase(),
    'browser-only form demo',
  ],

  // Canonical URL configuration
  canonicalUrl: baseUrl,

  // Open Graph meta tags
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: propertyConfig.name,
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${propertyConfig.name} fictional interface demonstration`,
      },
    ],
  },

  // Twitter card meta tags
  twitter: {
    card: 'summary_large_image' as const,
    site: propertyConfig.social?.twitter ? `@${propertyConfig.social.twitter.split('/').pop()}` : undefined,
    creator: propertyConfig.social?.twitter ? `@${propertyConfig.social.twitter.split('/').pop()}` : undefined,
  },

  // This fictional showcase intentionally omits geographic coordinates.
  geo: null,

  // Robots meta directives
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },

  verification: {
    google: undefined,
    bing: undefined,
  },
};

// Per-page SEO configurations
export const pageSeoConfig = {
  home: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  floorPlans: {
    title: `Floor Plan Concepts | ${propertyConfig.name}`,
    description: `Compare four fictional layout cards populated with sample dimensions, rates, and status labels for ${propertyConfig.name}.`,
    keywords: ['floor plan demo', 'sample layout cards', 'fictional rate data', 'interface showcase'],
  },
  amenities: {
    title: `Amenity Concepts | ${propertyConfig.name}`,
    description: `Preview fictional shared-space and interior-feature cards for the ${propertyConfig.name} portfolio demonstration.`,
    keywords: ['amenity interface', 'feature card demo', 'synthetic imagery', 'portfolio showcase'],
  },
  gallery: {
    title: `Synthetic Image Gallery | ${propertyConfig.name}`,
    description: `View AI-generated exterior, interior, and amenity concepts created for the fictional ${propertyConfig.name} showcase.`,
    keywords: ['synthetic gallery', 'AI-generated property images', 'visual portfolio'],
  },
  neighborhood: {
    title: `Neighborhood Data Demo | ${propertyConfig.name}`,
    description: `Explore invented destination cards, distances, and mobility scores around ${propertyConfig.name}.`,
    keywords: ['fictional map panel', 'sample destination cards', 'illustrative mobility scores'],
  },
  contact: {
    title: `Contact Form Demo | ${propertyConfig.name}`,
    description: `Try a browser-only contact interaction for ${propertyConfig.name} using invented values. No message is sent or saved.`,
    keywords: ['contact form demo', 'local form simulation', 'fictional contact values'],
  },
  scheduleTour: {
    title: `Tour Request Demo | ${propertyConfig.name}`,
    description: `Preview a local tour-request interface for ${propertyConfig.name}. It creates no appointment, message, or record.`,
    keywords: ['tour form demo', 'browser-only workflow', 'local interaction simulation'],
  },
};
