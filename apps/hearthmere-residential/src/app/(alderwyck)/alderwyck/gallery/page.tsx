'use client';

import { PropertyGalleryPage } from '@hearthmere/ui';
import { propertyConfig } from '@alderwyck/config/property';
import { galleryCategories, getImagesByCategory } from '@alderwyck/config/gallery';

export default function GalleryPage() {
  return (
    <PropertyGalleryPage
      propertyName={propertyConfig.name}
      categories={galleryCategories}
      getImagesByCategory={getImagesByCategory}
    />
  );
}
