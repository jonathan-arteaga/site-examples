import { Container } from './Container';

interface PropertyPrivacyPolicyPageProps {
  propertyName: string;
  effectiveDate: string;
  addressFormatted: string;
  phone: string;
  phoneDisplay: string;
  email: string;
}

export function PropertyPrivacyPolicyPage({
  propertyName,
  effectiveDate,
  addressFormatted,
  phoneDisplay,
  email,
}: PropertyPrivacyPolicyPageProps) {
  return (
    <section className="py-12 lg:py-16">
      <Container size="md">
        <article className="prose prose-gray max-w-none">
          <h1>Privacy Policy</h1>
          <p className="lead text-gray-600">Portfolio review date: {effectiveDate}</p>

          <h2>Introduction</h2>
          <p>
            {propertyName} is a fictional property in a portfolio demonstration.
            This notice describes the limited browser behavior of the demo, not
            the practices of a real property manager.
          </p>

          <h2>Form Information</h2>
          <p>
            Contact and tour forms validate entries in your browser and briefly
            show a simulated loading and success state. Entered values are not
            sent, logged, stored, hashed, or shared. The forms reset after the
            simulation.
          </p>

          <h2>Local Preference</h2>
          <p>
            The demo may store one preference in local browser storage to remember
            that you dismissed the preference notice. The preference contains no
            contact or form information and is not shared with another service.
          </p>

          <h2>External Services</h2>
          <p>
            The portfolio does not load third-party measurement tools, listing
            systems, map embeds, video players, email-delivery services, or remote
            images. Phone, email, map, application, and resident-service controls
            show local demo notices instead.
          </p>

          <h2>Browser Safety Controls</h2>
          <p>
            The site applies a restrictive browser policy that permits same-origin
            connections only, blocks frames and form destinations, and prevents
            the demo forms from posting when scripts are unavailable.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can clear the saved demo preference at any time by removing this
            site&apos;s local browser data. Avoid entering real personal information;
            fictional values are sufficient to preview validation.
          </p>

          <h2>Fictional Contact Details</h2>
          <p>
            These details exist to demonstrate contact presentation. Their controls
            show local notices and do not place a call or create a message:
          </p>
          <address className="not-italic">
            <strong>{propertyName}</strong>
            <br />
            {addressFormatted}
            <br />
            Phone:{' '}
            <button
              type="button"
              data-demo-action="phone"
              className="text-[var(--button-primary-bg)] hover:underline"
            >
              {phoneDisplay}
            </button>
            <br />
            Email:{' '}
            <button
              type="button"
              data-demo-action="email"
              className="text-[var(--button-primary-bg)] hover:underline"
            >
              {email}
            </button>
          </address>

          <h2>Demo Notice Revisions</h2>
          <p>
            This notice may change as the portfolio evolves. The review date above
            identifies the version currently displayed.
          </p>
        </article>
      </Container>
    </section>
  );
}
