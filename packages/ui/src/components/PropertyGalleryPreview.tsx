import { PortfolioImage as Image } from './PortfolioImage';
import { PortfolioLink as Link } from './PortfolioLink';
import { buttonVariants } from './Button';
import { Container } from './Container';
import { ArrowRightIcon } from '../icons/property';
import { withPropertyBasePath } from '../lib/property-path';

interface PropertyGalleryPreviewImage {
  id: string;
  src: string;
  alt: string;
  blurDataURL?: string;
}

interface PropertyGalleryPreviewProps {
  featuredImages: PropertyGalleryPreviewImage[];
  basePath?: string;
}

export function PropertyGalleryPreview({
  featuredImages,
  basePath = '',
}: PropertyGalleryPreviewProps) {
  const galleryHref = withPropertyBasePath(basePath, '/gallery');
  const previewImages = featuredImages.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Browse the Synthetic Photography
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every scene was generated for this fictional portfolio and depicts no
            client-owned property.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-2">
          {previewImages.map((image) => (
            <Link
              key={image.id}
              href={galleryHref}
              aria-label={`View ${image.alt} in gallery`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 50vw"
                {...(image.blurDataURL
                  ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                  : {})}
              />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={galleryHref} className={buttonVariants('outline', 'lg')}>
              Open the Complete Gallery
              <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
