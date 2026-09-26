import { Metadata } from 'next';
import { PortfolioImage as Image } from '@hearthmere/ui';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { IconWrapper } from '@caldridge/components/ui/IconWrapper';
import { CTABanner } from '@caldridge/components/sections/CTABanner';
import { propertyConfig } from '@caldridge/config/property';
import { placeholderImages } from '@caldridge/config/images';
import { amenityCategories } from '@caldridge/config/amenities';
import { getAmenityIcon } from '@caldridge/components/icons';

export const metadata: Metadata = {
  title: 'Illustrative Amenities',
  description: `Explore fictional amenity concepts for ${propertyConfig.name}. No feature, service, or policy represents a real property.`,
  alternates: { canonical: '/caldridge/amenities' },
};

export default function AmenitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={placeholderImages.amenitiesHero}
          alt={`Synthetic amenity showcase for ${propertyConfig.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Illustrative Amenity Concepts
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
