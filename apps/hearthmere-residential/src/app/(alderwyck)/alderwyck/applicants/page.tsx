import { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { ApplyNowButton } from '@alderwyck/components/cta/ApplyNowButton';
import { CallButton } from '@alderwyck/components/cta/CallButton';
import { propertyConfig } from '@alderwyck/config/property';
import { CheckIcon } from '@alderwyck/components/icons';
import { StructuredData } from '@alderwyck/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Applicant Flow Demo',
  description: `Explore a fictional applicant-flow demonstration for ${propertyConfig.name}. No application is submitted or reviewed.`,
  alternates: { canonical: '/alderwyck/applicants' },
};

const applicationSteps = [
  {
    step: 1,
    title: 'Explore Sample Layouts',
    description: 'Compare the fictional floor-plan examples in this showcase.',
  },
  {
    step: 2,
    title: 'Open the Demo Form',
    description: 'Preview how a future application form could be organized.',
  },
  {
    step: 3,
    title: 'Use Fictional Details',
    description: 'Enter sample-only information; never provide personal documents.',
  },
  {
    step: 4,
    title: 'Preview the Confirmation',
    description: 'See a simulated confirmation without sending or storing a record.',
  },
  {
    step: 5,
    title: 'Return to the Showcase',
    description: 'Continue exploring the fictional property experience.',
  },
];

const requirements = [
  'No government-issued identification',
  'No proof of income or personal documents',
  'No rental, credit, or background history',
  'No application fee or security deposit',
  'Fictional contact details only',
];

const faqs = [
  {
    question: 'Is this a real application?',
    answer:
      'No. This page demonstrates an applicant experience for a fictional property and cannot create an application.',
  },
  {
    question: 'Are any fees charged?',
    answer:
      'No. The showcase does not collect application fees, deposits, rent, or payment information.',
  },
  {
    question: 'Is applicant screening performed?',
    answer:
      'No. There are no credit checks, background checks, qualification rules, approvals, or denials.',
  },
  {
    question: 'What happens to demo form entries?',
    answer:
      'The interface only simulates a workflow. It does not submit an applicant record to a property or screening service.',
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
            Explore the Applicant Flow for {propertyConfig.name}
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            This fictional demo does not accept, review, or store applications.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex justify-center">
            <ApplyNowButton size="lg" location="applicants_hero" showIcon>
              Open Demo Application
            </ApplyNowButton>
          </div>

          {/* Application Steps */}
          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Illustrative Application Flow
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
              Demo-Only Guidelines
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

          {/* FAQs */}
          <Card className="mt-8 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Frequently Asked Questions
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
              Want to preview the fictional form interaction?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <ApplyNowButton location="applicants_bottom">
                Open Demo Form
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
