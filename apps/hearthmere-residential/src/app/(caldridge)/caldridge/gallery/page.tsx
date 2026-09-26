'use client';

import { PropertyGalleryPage } from '@hearthmere/ui';
import { propertyConfig } from '@caldridge/config/property';
import { galleryCategories, getImagesByCategory } from '@caldridge/config/gallery';

export default function GalleryPage() {
  return (
    <PropertyGalleryPage
      propertyName={propertyConfig.name}
      categories={galleryCategories}
      getImagesByCategory={getImagesByCategory}
    />
  );
}
