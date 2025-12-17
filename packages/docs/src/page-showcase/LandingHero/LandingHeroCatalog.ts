import { Catalog } from '@composify/react/renderer';
import { LandingHero } from './LandingHero';

Catalog.register('LandingHero', {
  component: LandingHero,
  category: 'Showcase / Landing',
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      placeholder: 'Analytics Platform',
      optional: true,
    },
    title: {
      label: 'Title',
      type: 'text',
      default: 'Your amazing headline here',
    },
    description: {
      label: 'Description',
      type: 'text',
      placeholder: 'A compelling description of your product or service.',
    },
    primaryCta: {
      label: 'Primary CTA',
      type: 'object',
      fields: {
        label: {
          label: 'Label',
          type: 'text',
          default: 'Get started',
        },
        href: {
          label: 'Link',
          type: 'text',
          default: '#',
        },
      },
      default: {
        label: 'Get started',
        href: '#',
      },
    },
    secondaryCta: {
      label: 'Secondary CTA',
      type: 'object',
      fields: {
        label: {
          label: 'Label',
          type: 'text',
          default: 'Learn more',
        },
        href: {
          label: 'Link',
          type: 'text',
          default: '#',
        },
      },
      default: {
        label: 'Learn more',
        href: '#',
      },
    },
    centered: {
      label: 'Centered',
      type: 'boolean',
      default: true,
    },
  },
});
