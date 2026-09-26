import { PortfolioImage as Image } from '@hearthmere/ui';
import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container, buttonVariants } from '@hearthmere/ui';
import { companyConfig } from '@/config/company';

const HERO_IMAGE = '/images/hero.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[65vh] lg:min-h-[75vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Hearthmere Residential fictional apartment portfolio"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay with subtle grid for text readability */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-eyebrow text-[var(--color-secondary-400)] mb-4">
            Fictional Multi-Site Portfolio Showcase
          </p>

          {/* Main Headline */}
          <h1 className="heading-display text-display-xl text-white text-shadow-hero mb-6">
            {companyConfig.name}
          </h1>

          {/* Tagline */}
          <p className="text-lead text-white/90 mb-8 max-w-2xl">
            {companyConfig.tagline}. Explore four cohesive community concepts representing
            544 illustrative apartment homes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/properties" className={buttonVariants('white', 'lg', 'w-full sm:w-auto')}>
              Explore Community Concepts
            </Link>
            <Link href="/contact" className={buttonVariants('outline-light', 'lg', 'w-full sm:w-auto')}>
              Try the Demo Form
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
