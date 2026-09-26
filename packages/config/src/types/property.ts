export interface PropertyConfig {
  id: string;
  name: string;
  tagline: string;
  address: Address;
  contact: ContactInfo;
  social: SocialLinks;
  residentPortalPath: string;
  coordinates: Coordinates | null;
  features: PropertyFeatures;
  includePhotoVariationDisclaimer?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  officeHours: OfficeHours[];
  tourHours?: string;
  phonePlaceholder?: string;
  formDisclosure?: string;
}

export interface OfficeHours {
  days: string;
  hours: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PropertyFeatures {
  petFriendly: boolean;
  parking: string;
  unitCount: number;
  yearBuilt: number;
}

export interface AmenityCategory {
  id: string;
  name: string;
  amenities: Amenity[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  featured?: boolean;
  blurDataURL?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface NeighborhoodSection {
  id: string;
  name: string;
  icon: string;
  description: string;
  pois: PointOfInterest[];
}

export interface PointOfInterest {
  name: string;
  distance: string;
  type: string;
}

export interface FooterNavSection {
  title: string;
  links: FooterNavLink[];
}

export interface FooterNavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface WalkScore {
  walk: number;
  transit: number;
  bike: number;
}
