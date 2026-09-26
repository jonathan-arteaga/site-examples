'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioImage as Image } from './PortfolioImage';
import { Container } from './Container';
import { cn } from '@hearthmere/utils/client';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';

const SWIPE_THRESHOLD = 50;

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

interface GalleryCategory {
  id: string;
  name: string;
}

export interface PropertyGalleryPageProps {
  propertyName: string;
  categories: GalleryCategory[];
  getImagesByCategory: (categoryId: string) => GalleryImage[];
}

export function PropertyGalleryPage({
  propertyName,
  categories,
  getImagesByCategory,
}: PropertyGalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filteredImages = getImagesByCategory(activeCategory);
  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const neighborImages =
    lightboxIndex !== null && filteredImages.length > 1
      ? [
          filteredImages[
            lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1
          ],
          filteredImages[
            lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1
          ],
        ]
      : [];

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredImages.length - 1 : prev - 1) : null
    );
  }, [lightboxIndex, filteredImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev === filteredImages.length - 1 ? 0 : prev + 1) : null
    );
  }, [lightboxIndex, filteredImages.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    previouslyFocusedRef.current = document.activeElement;

    requestAnimationFrame(() => {
      const closeBtn = dialogRef.current?.querySelector<HTMLElement>('button');
      if (closeBtn) {
        closeBtn.focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Tab': {
          const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements?.length) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';

      if (previouslyFocusedRef.current instanceof HTMLElement) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <>
      <section className="py-12 lg:py-16">
        <Container>
          <h1 className="text-4xl font-bold text-gray-900 text-center">Synthetic Photo Gallery</h1>
          <p className="mt-4 text-lg text-center max-w-2xl mx-auto">
            <span className="font-semibold text-gray-900">Explore generated scenes</span>{' '}
            <span className="text-gray-500">
              created specifically for the fictional {propertyName} concept.
            </span>
          </p>

          {/* Category Filter */}
          <div
            className="mt-8 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Gallery categories"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls="gallery-grid"
                className={cn(
                  'px-4 py-3 rounded-full text-sm font-medium transition-colors min-h-[44px]',
                  activeCategory === category.id
                    ? 'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div
            id="gallery-grid"
            role="tabpanel"
            className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2"
                aria-label={`View ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  {...(image.blurDataURL
                    ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                    : {})}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {currentImage && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Fictional property photo viewer. Use horizontal gestures to browse."
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <XIcon className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} of {filteredImages.length}
          </div>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              priority
              className="object-contain"
              sizes="100vw"
              {...(currentImage.blurDataURL
                ? { placeholder: 'blur' as const, blurDataURL: currentImage.blurDataURL }
                : {})}
            />
          </div>

          {/* Preload neighbor images at lightbox size so swipe / arrow nav is instant. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0"
          >
            {neighborImages.map((neighbor) => (
              <div key={neighbor.id} className="absolute inset-0">
                <Image
                  src={neighbor.src}
                  alt=""
                  fill
                  loading="eager"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
