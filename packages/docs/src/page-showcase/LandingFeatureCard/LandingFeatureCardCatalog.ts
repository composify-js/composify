import { Catalog } from '@composify/react/renderer';
import { LandingFeatureCard } from './LandingFeatureCard';

Catalog.register('LandingFeatureCard', {
  component: LandingFeatureCard,
  category: 'Showcase / Landing',
  props: {
    icon: {
      label: 'Icon',
      type: 'text',
      placeholder: 'e.g. an emoji',
    },
    title: {
      label: 'Title',
      type: 'text',
      default: 'Feature Title',
    },
    description: {
      label: 'Description',
      type: 'text',
      default: 'Describe this feature in a sentence or two.',
    },
    accentColor: {
      label: 'Accent Color',
      type: 'select',
      options: [
        { label: 'Violet', value: 'violet' },
        { label: 'Blue', value: 'blue' },
        { label: 'Orange', value: 'orange' },
        { label: 'Green', value: 'green' },
        { label: 'Red', value: 'red' },
      ],
      default: 'violet',
    },
  },
});
