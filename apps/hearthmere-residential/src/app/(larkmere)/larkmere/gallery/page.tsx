'use client';

import { PropertyGalleryPage } from '@hearthmere/ui';
import { propertyConfig } from '@larkmere/config/property';
import { galleryCategories, getImagesByCategory } from '@larkmere/config/gallery';

export default function GalleryPage() {
  return (
    <PropertyGalleryPage
      propertyName={propertyConfig.name}
      categories={galleryCategories}
      getImagesByCategory={getImagesByCategory}
    />
  );
}
