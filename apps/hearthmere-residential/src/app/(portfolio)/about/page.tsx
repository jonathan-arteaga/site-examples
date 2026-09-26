import type { Metadata } from 'next';
import { Container } from '@hearthmere/ui';
import { Card } from '@hearthmere/ui';
import { CTABanner } from '@/components/sections/CTABanner';
import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  BuildingIcon,
} from '@/components/icons';
import { companyConfig } from '@/config/company';
import { pageSeo } from '@/config/seo';

export const metadata: Metadata = {
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: pageSeo.about.title,
    description: pageSeo.about.description,
  },
  twitter: {
    title: pageSeo.about.title,
    description: pageSeo.about.description,
  },
};

const values = [
  {
    icon: HomeIcon,
    title: 'Thoughtful Upkeep',
    description:
      'A portfolio concept centered on clear service paths and carefully presented community spaces.',
  },
  {
    icon: UsersIcon,
    title: 'Resident Clarity',
    description:
      'Interface examples make routine questions, local resources, and demo actions easy to find.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Transparent Details',
    description:
      'Fictional pricing, availability, policies, and contact details are labelled throughout the showcase.',
  },
  {
    icon: HeartIcon,
    title: 'Welcoming Design',
    description:
      'Each invented community has its own visual identity while sharing an approachable experience.',
  },
];

const benefits = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'Clear Service Channels',
    description: 'Straightforward paths for routine and urgent service requests.',
  },
  {
    icon: BuildingIcon,
    title: 'Consistent Structure',
    description: 'The same clear information architecture supports all four concepts.',
  },
  {
    icon: HomeIcon,
    title: 'Varied Home Options',
    description: 'Layouts and price points designed for a range of household needs.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Consistent Standards',
    description: 'A shared resident-service approach across all four communities.',
  },
];

const hasStats =
  companyConfig.stats.yearsInBusiness !== 'X' &&
  companyConfig.stats.totalUnits !== 'X';
const statsSentence = hasStats
  ? `The fictional portfolio models ${companyConfig.stats.yearsInBusiness} years of experience and ${companyConfig.stats.totalUnits} units solely to demonstrate realistic information design.`
  : 'The fictional portfolio uses illustrative operating details solely to demonstrate realistic information design.';

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-primary-50)] py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
              About Us
            </p>
            <h1 className="heading-display text-display-lg text-gray-900 mb-3">
              About {companyConfig.shortName}
            </h1>
            <p className="text-body-lg text-gray-600">
              Learn more about the fictional company behind this public portfolio
              showcase and its four community concepts.
            </p>
          </div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-display text-display-md text-gray-900 mb-4 text-center">
              The Showcase Story
            </h2>
            {/* Placeholder text as specified */}
            <div className="prose prose-lg prose-gray mx-auto text-center">
              <p className="text-body-lg text-gray-600">
                {companyConfig.description} {statsSentence}
              </p>
              <p className="text-body-lg text-gray-600 mt-4">
                Hearthmere was invented to present a complete multi-site product without
                exposing a real client. The communities, operating details, and resident
                stories are synthetic, while the interface structure and responsive
                behavior demonstrate the original engineering work.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-16 bg-[var(--color-primary-50)]">
        <Container>
          <div className="text-center mb-8">
            <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
              Design Principles
            </p>
            <h2 className="heading-display text-display-md text-gray-900 mb-4">
              What the Concept Demonstrates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Rent With Us */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="text-center mb-8">
            <p className="text-eyebrow text-[var(--color-primary-600)] mb-4">
              Portfolio System
            </p>
            <h2 className="heading-display text-display-md text-gray-900 mb-4">
              A Cohesive Five-Site Experience
            </h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              The corporate site and four community sites show how one shared platform
              can support distinct identities, content depths, and resident journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-[var(--color-primary-50)]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
