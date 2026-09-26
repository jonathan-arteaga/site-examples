import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container, buttonVariants } from '@hearthmere/ui';
import { ArrowRightIcon } from '@/components/icons';
import { companyConfig } from '@/config/company';

export function AboutPreview() {
  const hasStats =
    companyConfig.stats.yearsInBusiness !== 'X' &&
    companyConfig.stats.totalUnits !== 'X';
  const statsSentence = hasStats
    ? `The concept models ${companyConfig.stats.yearsInBusiness} years of experience and ${companyConfig.stats.totalUnits} fictional units to give the interface realistic depth.`
    : 'The concept uses fictional operating details to give the interface realistic depth.';

  return (
    <section className="py-12 lg:py-16 bg-[var(--color-primary-50)]">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
            Behind the Demonstration
          </p>

          {/* Headline */}
          <h2 className="heading-display text-display-md text-gray-900 mb-4">
            One Shared Platform, Five Distinct Sites
          </h2>

          {/* Description - Placeholder text as specified */}
          <p className="text-body-lg text-gray-600 mb-6">
            {companyConfig.description} {statsSentence}
          </p>

          {/* CTA */}
          <Link href="/about" className={buttonVariants('link', 'md', 'group')}>
              Explore the Showcase Story
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
