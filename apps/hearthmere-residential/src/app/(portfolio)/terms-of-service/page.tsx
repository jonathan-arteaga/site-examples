import type { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { companyConfig } from '@/config/company';

const title = 'Terms of Service';
const description = `Portfolio demonstration terms for the fictional ${companyConfig.name} website.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/terms-of-service',
  },
  openGraph: {
    url: '/terms-of-service',
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="prose prose-lg prose-gray max-w-3xl mx-auto">
          <h1 className="heading-display text-display-md text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">Portfolio review date: July 25, 2026</p>

          <p>
            This website is a fictional portfolio demonstration. It does not represent
            a property manager, owner, broker, leasing office, or service provider.
            These notices explain the limited, demonstration-only behavior of the site.
          </p>

          <h2>How to Explore the Demo</h2>
          <ul>
            <li>Browse the fictional pages and interactive examples.</li>
            <li>Do not rely on the site to locate, rent, or manage a real home.</li>
            <li>Do not submit sensitive, confidential, or real personal information.</li>
          </ul>

          <h2>Fictional Information</h2>
          <p>
            Every property, address, phone number, email address, price, availability
            statement, statistic, image, and neighborhood detail is synthetic. None of
            it is a listing, offer, recommendation, or representation of a real place.
          </p>

          <h2>Local Demonstrations</h2>
          <p>
            Forms, calls, emails, maps, applications, listings, and resident services
            are simulations. Interactions remain in this browser and do not contact,
            transmit information to, or create an account with any person or business.
          </p>

          <h2>No Transactions</h2>
          <p>
            The site cannot accept rent, fees, deposits, applications, reservations,
            maintenance requests, or other transactions. Nothing displayed here creates
            a tenancy, agency relationship, contract, or professional-service agreement.
          </p>

          <h2>Privacy</h2>
          <p>
            The demonstration does not send form values or load analytics. Its cookie
            banner stores only a local preference in this browser. See the Privacy
            Policy for the complete demo-data explanation.
          </p>

          <h2>Illustrative Content</h2>
          <p>
            The interface is shown as a portfolio sample. Visuals and copy may be
            updated as the demonstration evolves and should not be used for real-world
            housing, pricing, accessibility, travel, or legal decisions.
          </p>

          <h2>Availability</h2>
          <p>
            The portfolio may be changed, suspended, or removed without notice. No
            uptime, browser compatibility, or continued availability is promised.
          </p>

          <h2>About the Name</h2>
          <p>
            {companyConfig.name} and every community shown on this site are invented
            portfolio identities. Similarity to an actual organization or property is
            coincidental.
          </p>

          <h2>Demo Notice Revisions</h2>
          <p>
            These demonstration notices may be updated as the portfolio changes. The
            date above identifies the current version.
          </p>

          <h2>Demonstration Contact</h2>
          <p>
            The contact details below are fictional and activate local demo notices
            only:{' '}
            <button
              type="button"
              data-demo-action="email"
              className="text-[var(--color-primary-600)] hover:underline"
            >
              {companyConfig.contact.email}
            </button>{' '}
            or call{' '}
            <button
              type="button"
              data-demo-action="phone"
              className="text-[var(--color-primary-600)] hover:underline"
            >
              {companyConfig.contact.phoneDisplay}
            </button>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
