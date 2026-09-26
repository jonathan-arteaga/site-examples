import { PropertyGalleryPreview } from '@hearthmere/ui';
import { getFeaturedImages } from '@alderwyck/config/gallery';
import { siteBasePath } from '@alderwyck/config/site';

export function GalleryPreview() {
  return (
    <PropertyGalleryPreview
      basePath={siteBasePath}
      featuredImages={getFeaturedImages()}
    />
  );
}
