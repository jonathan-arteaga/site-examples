import type { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { companyConfig } from '@/config/company';

const title = 'Privacy Policy';
const description = `Privacy notice for the fictional ${companyConfig.name} portfolio showcase.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    url: '/privacy-policy',
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="prose prose-lg prose-gray max-w-3xl mx-auto">
          <h1 className="heading-display text-display-md text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">Last updated: July 25, 2026</p>

          <h2>Introduction</h2>
          <p>
            {companyConfig.name} is a fictional company in a public portfolio
            demonstration. This notice describes the limited browser behavior of the
            showcase, not the practices of a real property manager.
          </p>

          <h2>Form Information</h2>
          <p>
            Contact and tour forms validate entries in your browser and briefly show a
            simulated loading and success state. Entered values are not sent, logged,
            stored, hashed, or shared. The forms reset after the simulation.
          </p>

          <h2>Local Preference</h2>
          <p>
            The showcase may store one preference in local browser storage to remember
            that you dismissed the preference notice. The preference contains no contact
            or form information and is not shared with another service.
          </p>

          <h2>External Services</h2>
          <p>
            The portfolio does not load third-party measurement tools, listing systems,
            map embeds, video players, email-delivery services, or remote images. Phone,
            email, map, application, and resident-service controls show local demo
            notices instead.
          </p>

          <h2>Browser Safety Controls</h2>
          <p>
            The site applies a restrictive browser policy that permits same-origin
            connections only, blocks frames and form destinations, and prevents the demo
            forms from posting when scripts are unavailable.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can clear the saved demo preference at any time by removing this
            site&apos;s local browser data. Avoid entering real personal information;
            fictional values are sufficient to preview validation.
          </p>

          <h2>Fictional Contact Details</h2>
          <p>
            The showcase displays{' '}
            {companyConfig.contact.email} or {companyConfig.contact.phoneDisplay}. These
            fictional details activate local notices and do not reach a real leasing team.
          </p>

          <h2>Notice Revisions</h2>
          <p>
            This notice can change alongside the demonstration. Check the revision
            label near the top to identify the version currently shown.
          </p>
        </div>
      </Container>
    </section>
  );
}
