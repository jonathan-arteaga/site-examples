'use client';

import { PortfolioLink as Link } from '@hearthmere/ui';
import { Container, buttonVariants } from '@hearthmere/ui';
import { PhoneIcon } from '@/components/icons';
import { companyConfig } from '@/config/company';

export function CTABanner() {
  return (
    <section className="bg-[var(--color-primary-900)] py-12 lg:py-16">
      <Container>
        <div className="text-center">
          {/* Headline */}
          <h2 className="heading-display text-display-md text-white mb-4">
            Explore the Fictional Portfolio
          </h2>

          {/* Subheadline */}
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Open a community concept, test the local interactions, or use the demo
            contact form without sending any information.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={buttonVariants('white', 'lg', 'w-full sm:w-auto')}>
                Open Demo Contact
            </Link>
            <button
              type="button"
              data-demo-action="phone"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium"
            >
              <PhoneIcon className="h-5 w-5" />
              {companyConfig.contact.phoneDisplay}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
