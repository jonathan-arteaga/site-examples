import { Container } from './Container';

interface PropertyAccessibilityPageProps {
  propertyName: string;
  lastReviewed: string;
  contactEmail: string;
  contactPhone: string;
  phoneDisplay: string;
  fairHousingDisclaimer: string;
}

export function PropertyAccessibilityPage({
  propertyName,
  lastReviewed,
  contactEmail,
  contactPhone,
  phoneDisplay,
  fairHousingDisclaimer,
}: PropertyAccessibilityPageProps) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Accessibility in This Demo
          </h1>
          <p className="mt-4 text-gray-600">
            Portfolio review date: {lastReviewed}
          </p>

          <div className="mt-8 space-y-8 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Demonstration Accessibility
              </h2>
              <p className="mt-3">
                The fictional {propertyName} site was built to demonstrate an inclusive
                digital experience. This statement describes the portfolio interface,
                not the services or physical accessibility of a real property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Design Target
              </h2>
              <p className="mt-3">
                The interface follows WCAG 2.2 Level AA design patterns where practical,
                including semantic structure, keyboard operation, visible focus, and
                labelled controls. It has not been presented as a formal conformance audit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Interface Accessibility Patterns
              </h2>
              <p className="mt-3">
                The portfolio implementation includes these accessibility patterns:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Keyboard Paths:</strong> Navigation, galleries, forms, and
                  dialogs can be operated without a pointer.
                </li>
                <li>
                  <strong>Image Descriptions:</strong> Synthetic photographs and
                  diagrams include concise alternative text.
                </li>
                <li>
                  <strong>Control Names:</strong> Interactive examples expose explicit
                  labels, roles, and dialog relationships.
                </li>
                <li>
                  <strong>Visual Contrast:</strong> Text, controls, and focus indicators
                  use the shared accessible color system.
                </li>
                <li>
                  <strong>Responsive Reflow:</strong> Content adapts to narrow screens
                  and increased browser zoom.
                </li>
                <li>
                  <strong>Form Guidance:</strong> Browser-only fields have visible
                  labels, validation messages, and live status updates.
                </li>
                <li>
                  <strong>Focus Handling:</strong> Lightboxes and demo dialogs provide
                  visible focus and keyboard dismissal.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Demonstration Boundaries
              </h2>
              <p className="mt-3">
                Keep these portfolio limitations in mind:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  Generated photographs and illustrative floor plans do not describe a
                  real dwelling or verified physical feature.
                </li>
                <li>Illustrative map panels provide text labels and keyboard controls.</li>
                <li>Demo notices are announced as live status messages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Local Feedback Example
              </h2>
              <p className="mt-3">
                The following fictional details demonstrate how accessibility contact
                options appear in the design. Activating them shows a local notice and
                does not place a call or create a message:
              </p>
              <address className="mt-3 not-italic">
                <p>
                  Email:{' '}
                  <button
                    type="button"
                    data-demo-action="email"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    {contactEmail}
                  </button>
                </p>
                <p>
                  Phone:{' '}
                  <button
                    type="button"
                    data-demo-action="phone"
                    className="text-[var(--color-primary-600)] hover:underline"
                  >
                    {phoneDisplay}
                  </button>
                </p>
              </address>
              <p className="mt-3">
                No response is generated because these contact channels are part of the
                browser-only portfolio simulation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Physical Accessibility Information
              </h2>
              <p className="mt-3">
                {propertyName} has no physical location or rentable homes. Any accessible
                feature, floor plan, or amenity described elsewhere is illustrative and
                must not be used to make a real housing decision.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Assistive Technology Review
              </h2>
              <p className="mt-3">
                The implementation is designed for review with common assistive
                technology categories, including:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Desktop and mobile screen readers</li>
                <li>Browser zoom and screen magnification tools</li>
                <li>Voice-driven navigation software</li>
                <li>Keyboard and switch-style input</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Inclusive Housing Pattern
              </h2>
              <p className="mt-3">
                {fairHousingDisclaimer} The language is displayed as an inclusive
                housing-site pattern for a fictional community, not as a real listing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Ongoing Portfolio Review
              </h2>
              <p className="mt-3">
                This portfolio is reviewed as components and browser behavior evolve.
                Accessibility findings can be addressed in the shared interface so the
                improvement reaches all five demonstration sites.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
