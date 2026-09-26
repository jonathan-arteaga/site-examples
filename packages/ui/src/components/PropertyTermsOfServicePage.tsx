import { Container } from './Container';

interface PropertyTermsOfServicePageProps {
  propertyName: string;
  effectiveDate: string;
  fairHousingDisclaimer: string;
  governingLaw: string;
  jurisdiction: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
  };
  includePhotoVariationDisclaimer?: boolean;
}

export function PropertyTermsOfServicePage({
  propertyName,
  effectiveDate,
  fairHousingDisclaimer,
  governingLaw,
  jurisdiction,
  address,
  contact,
  includePhotoVariationDisclaimer = false,
}: PropertyTermsOfServicePageProps) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-600">
            Effective Date: {effectiveDate}
          </p>

          <div className="mt-8 space-y-8 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                1. Portfolio Demonstration
              </h2>
              <p className="mt-3">
                {propertyName} is a fictional property created for a design and
                engineering portfolio. This Site does not represent a landlord, owner,
                broker, property manager, leasing office, or residential community.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                2. Demonstration Use
              </h2>
              <p className="mt-3">
                The Site is available only to demonstrate its visual design, responsive
                behavior, and local interactions. It cannot be used to locate, lease,
                reserve, apply for, or manage a real home.
              </p>
              <p className="mt-3">When exploring the demonstration:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Do not enter sensitive, confidential, or real personal information</li>
                <li>Do not treat displayed availability or pricing as a real offer</li>
                <li>Do not rely on fictional neighborhood or accessibility details</li>
                <li>Use the local form and dialog examples only for interface testing</li>
                <li>Expect phone, email, map, and portal actions to remain simulated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                3. Synthetic Information
              </h2>
              <p className="mt-3">
                Every name, address, phone number, email address, floor plan, image,
                amenity, price, availability statement, mobility score, and neighborhood
                point of interest is synthetic. Images and diagrams are illustrative and
                do not depict an actual unit or property.
                {includePhotoVariationDisclaimer ? (
                  <>
                    {' '}
                    Scene variations are included to demonstrate the original gallery
                    layout and filtering behavior.
                  </>
                ) : null}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                4. Local Interactions
              </h2>
              <p className="mt-3">
                Forms preserve validation, loading, success, and reset states entirely
                in the browser. Submitted values are not sent, logged, stored, hashed,
                or shared. Apply, contact, map, phone, email, and resident-service
                controls produce local demo responses only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                5. No Transactions
              </h2>
              <p className="mt-3">
                The Site cannot accept applications, rent, fees, deposits, maintenance
                requests, reservations, or other transactions. Using it creates no
                tenancy, agency relationship, contract, or professional-service agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                6. No External Services
              </h2>
              <p className="mt-3">
                The demonstration does not load listing providers, maps, videos,
                analytics, advertising tags, email services, or other embedded platforms.
                Its cookie banner stores only a local display preference in this browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                7. Illustrative Content
              </h2>
              <p className="mt-3">
                The portfolio may be changed, suspended, or removed without notice.
                Nothing on the Site should be used for housing, pricing, travel,
                accessibility, financial, or legal decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                8. Fair Housing
              </h2>
              <p className="mt-3">
                {fairHousingDisclaimer} This statement is included to demonstrate
                inclusive housing-site content and is not an advertisement for an
                available dwelling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                9. Demo Notice Revisions
              </h2>
              <p className="mt-3">
                These demonstration notices may be updated as the portfolio evolves.
                The effective date above identifies the current version.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                10. Fictional Legal Labels
              </h2>
              <p className="mt-3">
                The configuration values &quot;{governingLaw}&quot; and
                &quot;{jurisdiction}&quot; are synthetic interface content. They do not
                select a venue, create legal obligations, or describe a real operator.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                11. Demonstration Contact
              </h2>
              <p className="mt-3">
                The following details are fictional and activate local demo notices only:
              </p>
              <address className="mt-3 not-italic">
                <p className="font-medium">{propertyName}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state}{' '}
                  {address.zip}
                </p>
                <p className="mt-2">
                  Phone:{' '}
                  <button
                    type="button"
                    data-demo-action="phone"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    {contact.phoneDisplay}
                  </button>
                </p>
                <p>
                  Email:{' '}
                  <button
                    type="button"
                    data-demo-action="email"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    {contact.email}
                  </button>
                </p>
              </address>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
