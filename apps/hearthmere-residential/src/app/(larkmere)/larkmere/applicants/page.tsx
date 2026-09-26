import { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { ApplyNowButton } from '@larkmere/components/cta/ApplyNowButton';
import { CallButton } from '@larkmere/components/cta/CallButton';
import { propertyConfig } from '@larkmere/config/property';
import { CheckIcon } from '@larkmere/components/icons';
import { StructuredData } from '@larkmere/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Application Interface Preview',
  description: `Review a browser-only application concept for ${propertyConfig.name}. The preview accepts no real applicant record or documents.`,
  alternates: { canonical: '/larkmere/applicants' },
};

const applicationSteps = [
  {
    step: 1,
    title: 'Review Example Cards',
    description: 'Browse four invented layout records used only to populate the interface.',
  },
  {
    step: 2,
    title: 'Launch the Interface Preview',
    description: 'Open a local dialog that demonstrates the next visual state.',
  },
  {
    step: 3,
    title: 'Keep Inputs Invented',
    description: 'Use sample values only; this concept does not need personal information.',
  },
  {
    step: 4,
    title: 'Observe the Local Result',
    description: 'The browser displays a completion state without creating a record.',
  },
  {
    step: 5,
    title: 'Continue Browsing',
    description: 'Close the preview and return to the fictional community pages.',
  },
];

const requirements = [
  'Use invented names and contact values',
  'Do not enter identity or income documents',
  'No credit, rental, or screening data is requested',
  'No payment or deposit fields are present',
  'Everything remains a visual portfolio example',
];

const faqs = [
  {
    question: 'Does this interface create a record?',
    answer:
      'No. It changes only the visible demo state and has no application service behind it.',
  },
  {
    question: 'Can money be entered or charged?',
    answer:
      'No. The preview contains no payment fields, processor, deposit flow, or billing action.',
  },
  {
    question: 'Does the preview evaluate eligibility?',
    answer:
      'No. It performs no screening, scoring, qualification, approval, or denial.',
  },
  {
    question: 'Where do typed values go?',
    answer:
      'They remain in the temporary browser interaction and are not transmitted to or stored by a property system.',
  },
];

export default function ApplicantsPage() {
  return (
    <>
      <StructuredData type="faq" faqs={faqs} />
      <section className="py-12 lg:py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Preview a Fictional Application Interface
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Follow sample interface states without submitting information to{' '}
            {propertyConfig.name} or any third party.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex justify-center">
            <ApplyNowButton size="lg" location="applicants_hero" showIcon>
              Launch Local Preview
            </ApplyNowButton>
          </div>

          {/* Application Steps */}
          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Five Visual Demo States
            </h2>
            <ol className="mt-6 space-y-6">
              {applicationSteps.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full flex items-center justify-center font-semibold">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          {/* Requirements */}
          <Card className="mt-8 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Safe Sample-Data Rules
            </h2>
            <ul className="mt-4 space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 text-[var(--color-primary-500)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Illustrative Status Labels */}
          <Card className="mt-8 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Sample Status Tokens
            </h2>
            <p className="mt-2 text-gray-600">
              These labels demonstrate visual hierarchy only:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 text-[var(--color-primary-500)] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Sample token: Started</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 text-[var(--color-primary-500)] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Sample token: Ready</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 text-[var(--color-primary-500)] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Sample token: Finished</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              They are design tokens, not leasing, screening, or eligibility outcomes.
            </p>
          </Card>

          {/* FAQs */}
          <Card className="mt-8 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Demo Interface Questions
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-1 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Secondary CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Open the browser-only interaction?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <ApplyNowButton location="applicants_bottom">
                Launch Preview
              </ApplyNowButton>
              <CallButton
                variant="outline"
                location="applicants_bottom"
                showNumber
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
