import { Metadata } from 'next';
import { PortfolioImage as Image } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { IconWrapper } from '@alderwyck/components/ui/IconWrapper';
import { CTABanner } from '@alderwyck/components/sections/CTABanner';
import { propertyConfig } from '@alderwyck/config/property';
import { placeholderImages } from '@alderwyck/config/images';
import { amenityCategories } from '@alderwyck/config/amenities';
import { getAmenityIcon } from '@alderwyck/components/icons';

export const metadata: Metadata = {
  title: 'Amenities',
  description: `Preview the fictional amenity collection created for ${propertyConfig.name}.`,
  alternates: { canonical: '/alderwyck/amenities' },
};

export default function AmenitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={placeholderImages.amenitiesHero}
          alt={`Synthetic garden and pool amenity scene for ${propertyConfig.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Fictional Community Amenities
          </h1>
        </div>
      </section>

      {/* Amenity Categories */}
      {amenityCategories.map((category, index) => (
        <section
          key={category.id}
          className={`py-12 lg:py-16 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
        >
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.amenities.map((amenity) => (
                <Card key={amenity.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <IconWrapper size="md" variant="primary">
                      {getAmenityIcon(amenity.icon, 'h-6 w-6')}
                    </IconWrapper>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {amenity.name}
                      </h3>
                      {amenity.description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {amenity.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CTABanner variant="dark" />
    </>
  );
}
